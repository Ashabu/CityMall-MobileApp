import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, View, StatusBar, Text, ScrollView, StyleSheet, NativeSyntheticEvent, NativeScrollEvent, TouchableOpacity, ActivityIndicator, Button, Platform } from 'react-native';
import ApiServices, { IClientInfo } from "../Services/ApiServices";
import { Colors } from '../Colors/Colors';
import PaginationDots from "../Components/PaginationDots";
import PromotionBox from "../Components/PromotionBox";
import { useDimension } from "../Hooks/UseDimension";
import Grid from "../Styles/grid";
import AppLayout from "../Components/AppLayout";
import { AppContext } from "../AppContext/AppContext";
import UserCardSmall from "../Components/UserCardSmall";
import { paginationDotCount } from "../Services/Utils";
import { navigate } from "../Services/NavigationServices";
import { GetOffers, IOffer } from "../Services/Api/OffersApi";
import translateService from "../Services/translateService";

const HomeScreen = () => {
    const { state, setGlobalState } = useContext(AppContext);
    const { clientDetails, offersArray, isDarkTheme } = state;


    let isEndFetching = false;
    let startFetching = false;

    const { width, height } = useDimension();
    const [offersStep, setOffersStep] = useState<number>(0);
    const [pagPage, setPagPage] = useState<number>(1);
    const [offers, setOffers] = useState<IOffer[]>([]);
    const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [offersView, setOffersView] = useState<any[]>();
    const [initLoading, setInitLoading] = useState<boolean>(true);
    const [clientInfo, setClientInfo] = useState<IClientInfo>({});

    useEffect(() => {
        getOffers();
        handleGetClientCards();
        getClientData();
        // getObjectTypes();
    }, []);

    useEffect(() => {
        handleSetOffers();
    }, [offers]);

    useEffect(() => {
        if (clientDetails?.[0]?.card !== undefined) {
            handleGetBarcode(clientDetails?.[0]?.card)
        };

    }, [clientDetails]);

    const onChangeSectionStep = (nativeEvent: NativeScrollEvent) => {
        if (offers.length <= 0) return;
        if (nativeEvent) {
            const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
            setOffersStep(slide);
        }
        if (isFetchingData || isEndFetching) return;

        let scrollPoint = Math.floor(nativeEvent.contentOffset.x + nativeEvent.layoutMeasurement.width);
        let scrollContentSize = Math.floor(nativeEvent.contentSize.width);

        if (scrollPoint >= scrollContentSize - 1) {
            setPagPage(prevState => prevState + 1);
            setIsFetchingData(true);
            setTimeout(() => {
                getOffers(pagPage);
            }, 1000);
        }
    };


    const handleGetClientCards = () => {
        ApiServices.GetClientCards().then(res => {
            setGlobalState({ clientDetails: res.data });
            setInitLoading(false);
        })
            .catch(e => {
                console.log(JSON.parse(JSON.stringify(e.response)).data);
                setInitLoading(false);
            });
    };


    const handleGetBarcode = (card: string) => {
        ApiServices.GenerateBarcode(card)
            .then(res => {
                setGlobalState({ cardDetails: { barcode: res.data.base64Data, cardNumber: clientDetails?.[0]?.card } })
            })
            .catch(e => {
                console.log('barcode error', JSON.parse(JSON.stringify(e.response)).data)
            });
    };

    const handleSetOffers = () => {
        if (offers !== undefined) {
            for (let i = 4; i < offers!.length + 4; i += 4) {
                const renderElement =
                    <View style={[styles.promotions, { width: width }]}>
                        {offers![i - 4] && <PromotionBox data={offers![i - 4]} index={i - 4} />}
                        {offers![i - 3] && <PromotionBox data={offers![i - 3]} index={i - 3} />}
                        {offers![i - 2] && <PromotionBox data={offers![i - 2]} index={i - 2} />}
                        {offers![i - 1] && <PromotionBox data={offers![i - 1]} index={i - 1} />}
                    </View>
                setOffersView(prev => {
                    return [...(prev || []), renderElement]
                });
            };
        };
    };

    const getOffers = (page: number = 1) => {
        if (startFetching) return;
        startFetching = true;
        setIsLoading(true);
        GetOffers(false, page)
            .then(res => {
                let tempOffers = res.data.data;
                if (tempOffers.length < 16) {
                    isEndFetching = true;
                }

                setOffers(prevState => {
                    return [...prevState, ...tempOffers];
                  });
                  setIsFetchingData(false);
                  startFetching = false;
                  setIsLoading(false);
            }).catch(e => {
                console.log('error ===>', e)
                setIsLoading(false);
            });
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


    return (
        <AppLayout pageTitle={translateService.t('screens.home')}>
            <View style={{ flex: 1, backgroundColor: isDarkTheme ? Colors.black : Colors.white }}>
                <View style={{ flex: 4.5, justifyContent: 'center' }}>
                    {!initLoading ?
                        <UserCardSmall
                            cardNumber={clientDetails?.[0]?.card.replace(
                                /\b(\d{4})(\d{4})(\d{4})(\d{4})\b/,
                                '$1  $2  $3  $4',
                            )}
                            navigateToBarCode={() => navigate('UserCardWithBarcode')}
                            navigateToReg={() => navigate('AboutUs', { routeId: 2 })} />
                        :
                        <ActivityIndicator animating={initLoading} color='#dadde1' />
                    }
                </View>

                {clientInfo !== undefined && <View style={styles.amountInfo}>
                    <View style={[styles.accesAmount, Platform.OS === 'ios' && {height: 50}, {borderColor: isDarkTheme ? Colors.white : Colors.black}]}>
                        <Text style={[styles.amountTitle, { color: isDarkTheme ? Colors.white : Colors.black}]}>
                        ხელმისაწვდომი თანხა
                        </Text>
                        <Text style={[styles.amountValue, {color: isDarkTheme ? Colors.white : Colors.black}]}>{clientInfo?.ballance}₾</Text>
                    </View>

                    <View style={[styles.pointsInfo, Platform.OS === 'ios' && {height: 50}, {borderColor: isDarkTheme ? Colors.white : Colors.black}]}>
                        <Text style={[styles.amountTitle, { color: isDarkTheme ? Colors.white : Colors.black}]}>
                        სითიქულა
                        </Text>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={[styles.amountValue, {color: isDarkTheme ? Colors.white : Colors.black}]}>{clientInfo?.points || 0}
                              
                             </Text>
                             <Image resizeMode={'contain'} source={require('./../assets/images/Star.png')} style={{marginLeft: 5, width: 9, height: 9}} />
                  </View>
                    </View>
                </View>}

                <Image style={{ width: '100%' }} source={require('../assets/images/gradient-line.png')} />
                <View style={{ flex: 7.5 }}>
                    <View style={{ flex: 1 }}>
                        <View style={styles.promotionContainer}>
                            <Text style={[styles.promotionsTitle, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                                შეთავაზებები
                            </Text>
                            <PaginationDots length={paginationDotCount(offers, 4)} step={offersStep} />
                        </View>
                        <View style={{ flex: 10, position: 'relative' }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1, flexDirection: "row" }} showsVerticalScrollIndicator={false}>
                                <ScrollView
                                    pagingEnabled={true}
                                    contentContainerStyle={{ flexDirection: 'row' }}
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    onScroll={({ nativeEvent }) => {
                                        onChangeSectionStep(nativeEvent)
                                    }}>
                                    {offersView?.map((el, i) => (
                                        <View key={i}>
                                            {el}
                                        </View>
                                    ))}
                                    
                                </ScrollView>
                            </ScrollView> 
                            {isLoading && <ActivityIndicator color={'#fff'} style={{alignSelf: 'center', position: 'absolute', top: '50%', transform:[{translateY: -50}]}} />}
                        </View>
                    </View>
                </View>
            </View>
        </AppLayout>
    );

};


export default HomeScreen;

const styles = StyleSheet.create({
    giftCardImg: {
        maxHeight: 187,
        maxWidth: 300,
        width: '100%',
        height: '100%'
    },

    promotions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',

    },
    promotionContainer: {
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: '7%',
    },
    promotionsTitle: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 14,
        lineHeight: 17,
        fontWeight: '900',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    authBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'HMpangram-Bold',

    },
    amountInfo: {
        flexDirection: 'row', 
        flex: 1, 
        justifyContent: 'center', 
        marginBottom: 22
    },
    pointsInfo: {
        padding: 7,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 5,
        width: 137
    },
accesAmount: {
    padding: 7,
    borderColor: Colors.white,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 12,
    width: 137,

},
amountTitle: {
    fontFamily: 'HMpangram-Bold',
    fontSize: 9,
    lineHeight: 11,
    textTransform: 'uppercase',
},
amountValue: {
    fontFamily: 'HMpangram-Bold',
    fontSize: 24,
    lineHeight: 29,
    textTransform: 'uppercase',
}

});