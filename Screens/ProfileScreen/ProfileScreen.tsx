import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  NativeScrollEvent,
  Image,
} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import AppLayout from '../../Components/AppLayout';
import AppSwitch from '../../Components/CustomComponents/AppSwitch';
import PaginationDots from '../../Components/PaginationDots';
import PromotionBox from '../../Components/PromotionBox';
import StatusBar from '../../Components/StatusBar';
import TransactionList from '../../Components/TransactionList';
import ApiServices, {
  IClientInfo,
  IClientTransaction,
} from '../../Services/ApiServices';
import {navigate} from '../../Services/NavigationServices';
import {formatNumber} from '../../Services/Utils';
import {GetOffers, IOffer} from '../../Services/Api/OffersApi';
import {GetVouchersToBuy, IVouchers} from '../../Services/Api/VouchersApi';
import VaucherPromptBox from '../../Components/VaucherPromptBox';

//transactionType
export enum tranTypes {
  accumulate = 1,
  transfer = 4
}

const ProfileScreen = () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme, offersArray} = state;

  let isEndFetching = false;
  let startFetching = false;

  const [offersStep, setOffersStep] = useState<number>(0);
  const [offersStepv, setOffersStepv] = useState<number>(0);
  const [personalOffers, setPersonalOffers] = useState<IOffer[]>([]);
  const [isMoneyTransaction, setIsMoneyTransaction] = useState<boolean>(false);
  const [clientInfo, setClientInfo] = useState<IClientInfo>({});
  const [clientTransactions, setClientTransactions] = useState<
    IClientTransaction[]
  >([]);
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [pagPage, setPagPage] = useState<number>(1);

  const [clientVouchers, setClientVouchers] = useState<IVouchers[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  const darkArrowIcon = require('../../assets/images/arrow-black.png')
  const lightArrowIcon =require('../../assets/images/arrow-sm.png')

  useEffect(() => {
    getClientData();
    getClientTransactions();
    getPersonalOffers();
  }, []);

  const toggleSwitch = () => {
    setIsMoneyTransaction(!isMoneyTransaction);
  };

  const getClientData = () => {
    ApiServices.GetClientInfo()
      .then(res => {
        setClientInfo(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const getClientTransactions = () => {
    ApiServices.GetClientTransactions()
      .then(res => {
        setClientTransactions(res.data.data!);
      })
      .catch(e => {
        console.log('error tran', e.response);
      });
  };

  const getPersonalOffers = (page: number = 1) => {
    if (startFetching) return;
    startFetching = true;
    GetOffers(true, page)
      .then(res => {
        let tempOffers = res.data.data;
        if (tempOffers.length < 16) {
          isEndFetching = true;
        }
        setPersonalOffers(prevState => {
          return [...prevState, ...tempOffers];
        });
        setIsFetchingData(false);
        startFetching = false;
      })
      .catch(e => {
        console.log('error ===>', e);
      });
  };

  const onChangeSectionStep = (nativeEvent: NativeScrollEvent) => {
    if (clientVouchers.length <= 0) return;
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      setOffersStep(slide);
    }
    if (isFetchingData || isEndFetching) return;
    let scrollPoint = Math.floor(
      nativeEvent.contentOffset.x + nativeEvent.layoutMeasurement.width,
    );
    let scrollContentSize = Math.floor(nativeEvent.contentSize.width);
    if (scrollPoint >= scrollContentSize - 1) {
      setPagPage(prevState => prevState + 1);
      setIsFetchingData(true);
      setTimeout(() => {
        getPersonalOffers(pagPage);
      }, 1000);
    }
  };

  const onChangeSectionStepV = (nativeEvent: NativeScrollEvent) => {
    if (personalOffers.length <= 0) return;
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      setOffersStepv(slide);
    }
  };



  useEffect(() => {
    getVouchersToBuy();
  }, []);

  const getVouchersToBuy = () => {
    if (isLoading) return;
    setIsLoading(true);
    GetVouchersToBuy()
      .then(res => {
        setClientVouchers(res.data);
        setIsLoading(false);
      })
      .catch(e => {
        setIsLoading(false);
      });
  };

  return (
    <AppLayout pageTitle={'კაბინეტი'}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.balanceView}>
          <View>
            <Text style={styles.balanceWrapTitle}>ხელმისაწვდომი თანხა</Text>
            <Text style={styles.balanceWrapAmount}>
              {formatNumber(clientInfo.ballance)}
            </Text>
          </View>
          <View>
            <Text style={styles.balanceWrapTitle}>სითი ქულა</Text>
            <Text style={styles.balanceWrapAmount}>
              {formatNumber(clientInfo.points)}
            </Text>
          </View>
        </View>
        <View style={{marginBottom: 30, width: '100%'}}>
          <View style={styles.statusBarView}>
            <Text
              style={[
                styles.promotionsTitle,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              სტატუსბარი
            </Text>
            <TouchableOpacity onPress={() => navigate('StatusInfoScreen')} style={{flexDirection:'row', alignItems:'center'}}>
              <Text
                style={[
                  styles.promotionsTitle,
                  {color: isDarkTheme ? Colors.white : Colors.black},
                ]}>
                ვრცლად
              </Text>
              <Image source={isDarkTheme? lightArrowIcon :  darkArrowIcon} style={styles.icon}/>
            </TouchableOpacity>
          </View>
          {clientInfo ? <StatusBar data={clientInfo} /> : null}
        </View>
        <View style={{marginBottom: 20, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigate('VouchersInfo')}
            style={{
              flexDirection: 'row',
              width: 272,
              height: 39,
              backgroundColor: '#636363',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 50,
            }}>
            <Image
              source={require('../../assets/images/vaucher.png')}
              style={{width: 22, height: 16, marginRight: 10}}
            />
            <Text style={styles.promotionsTitle}>ჩემი ვაუჩერები</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: 30}}>
          <View style={styles.promotionContainer}>
            <Text
              style={[
                styles.promotionsTitle,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              პირადი შეთავაზებები
            </Text>
            <PaginationDots
              length={Math.round(personalOffers?.length / 2)}
              step={offersStep}
            />
          </View>
          <ScrollView
            contentContainerStyle={{flexDirection: 'row'}}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={({nativeEvent}) => {
              onChangeSectionStep(nativeEvent);
            }}>
            {personalOffers?.map((el: any, i: number) => (
              <PromotionBox key={i} data={el} />
            ))}
          </ScrollView>
        </View>
        <View style={{marginBottom: 30}}>
          <View style={styles.promotionContainer}>
            <Text
              style={[
                styles.promotionsTitle,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              ქულების გახარჯვის ოფცია
            </Text>
            <PaginationDots
              length={Math.round(clientVouchers?.length / 2)}
              step={offersStepv}
            />
          </View>

          {/* <View style={styles.redirectView}>
                    <Image source={require('../../assets/images/payunicard_white.png')} style={{ width: 49, height: 26, marginRight: 10 }} />
                    <TouchableOpacity style={styles.redirectBtn}>
                        <Text style={styles.redirectBtnText}>
                            დამატებითი ოპერაციები ფეიუნიქარდში
                        </Text>
                        <Image source={require('../../assets/images/redirect_icon.png')} style={{ width: 9, height: 9 }} />
                    </TouchableOpacity>
                </View> */}
          <ScrollView
            contentContainerStyle={{flexDirection: 'row'}}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            onScroll={({nativeEvent}) => {
              onChangeSectionStepV(nativeEvent);
            }}>
            {clientVouchers?.map((el: any, i: number) => (
              <VaucherPromptBox key={i} data={el} />
            ))}
          </ScrollView>
        </View>
        <View style={styles.transactionView}>
          <View style={styles.trViewHeader}>
            <Text
              style={[
                styles.promotionsTitle,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              ტრანზაქციები
            </Text>
            <View style={styles.trViewHeaderRight}>
              <Image
                source={require('../../assets/images/points_active.png')}
                style={{width: 19, height: 19}}
              />

              <AppSwitch />
              <Image
                source={require('../../assets/images/GEL_inactive.png')}
                style={{width: 15, height: 18}}
              />
            </View>
          </View>
          <View>
            {clientTransactions &&
              clientTransactions.map((item, index) => (
                <TransactionList item={item} key={index} />
              ))}
            {(!clientTransactions || clientTransactions.length <= 0) && (
              <Text
                style={{
                  fontSize: 10,
                  color: isDarkTheme ? Colors.white : Colors.black,
                }}>
                ტრანზაქციები ვერ მოიძებნა
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  balanceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    marginBottom: 35,
  },
  balanceWrap: {},
  balanceWrapTitle: {
    fontSize: 14,
    fontFamily: 'HMpangram-Medium',
    color: Colors.darkGrey,
  },
  balanceWrapAmount: {
    fontSize: 24,
    fontFamily: 'HMpangram-Bold',
    color: Colors.white,
  },

  statusBarView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promotions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 400,
  },
  promotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  promotionsTitle: {
    color: Colors.white,
    fontFamily: 'HMpangram-Bold',
    fontSize: 14,
    lineHeight: 17,
    fontWeight: '900',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  redirectView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  redirectBtn: {
    width: '100%',
    maxWidth: 272,
    height: 39,
    borderRadius: 50,
    backgroundColor: Colors.darkGrey,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  redirectBtnText: {
    fontSize: 10,
    fontFamily: 'HMpangram-Medium',
    marginRight: 5,
  },
  transactionView: {
    marginBottom: 20,
  },
  trViewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  trViewHeaderRight: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  icon: {
    width: 8,
    height: 8,
    left: 6
  }
});

export default ProfileScreen;
