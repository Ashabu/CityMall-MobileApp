import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  NativeScrollEvent,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {AppContext} from '../../AppContext/AppContext';
import AppLayout from '../../Components/AppLayout';
import PaginationDots from '../../Components/PaginationDots';
import PromotionBox from '../../Components/PromotionBox';
import {paginationDotCount} from '../../Services/Utils';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CategoryTypes} from '../../Constants/Categories';
import {GetNews, GetOffers, IOffer} from '../../Services/Api/OffersApi';
import {ChunkArrays} from '../../Utils/utils';

type RouteParamList = {
  params: {
    id: number;
    routeId: number;
  };
};

const OffersScreen = () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  const routeParams = useRoute<RouteProp<RouteParamList, 'params'>>();

  const [offersStep, setOffersStep] = useState<number>(0);
  const [offersView, setOffersView] = useState<any[]>();
  const [filteredOffers, setFilteredOffers] = useState<IOffer[]>();
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagPage, setPagPage] = useState<number>(1);

  let isEndFetching = false;
  let startFetching = false;

  useEffect(() => {
    setOffersView([]);
    setFilteredOffers([]);
    if (routeParams.params.id === 0) {
      handleGetOffers();
    } else {
      handleGetNews();
    }
  }, [routeParams.params.routeId, routeParams.params.id]);

  useEffect(() => {
    handleSetOffers();
  }, [filteredOffers]);

  const handleGetOffers = (page: number = 1) => {
    // setOffersView([]);
    if (startFetching) return;
    startFetching = true;
    setIsLoading(true);
    GetOffers(false, page, routeParams.params.routeId)
      .then(res => {
        let tempOffers = res.data.data;
        console.log(tempOffers, 'asdadasdasdadasd');
        if (tempOffers.length < 16) {
          isEndFetching = true;
        }
        setFilteredOffers(prevState => {
          return [...(prevState || []), ...tempOffers];
        });
        setIsFetchingData(false);
        startFetching = false;
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error ===>', e);
        setIsLoading(false);
      });
  };

  const handleGetNews = (page: number = 1) => {
    if (startFetching) return;
    startFetching = true;
    setIsLoading(true);
    GetNews(page, routeParams.params.routeId)
      .then(res => {
        let tempNews = res.data.data;
        if (tempNews.length < 16) {
          isEndFetching = true;
        }
        setFilteredOffers(prevState => {
          return [...(prevState || []), ...tempNews];
        });
        setIsFetchingData(false);
        startFetching = false;
        setIsLoading(false);
      })
      .catch(e => {
        console.log('error ===>', e);
        setIsLoading(false);
      });
  };

  const itemChunk = 8;

  const chunkedData = ChunkArrays<IOffer>(filteredOffers!, itemChunk);
  const fillSpace = (ln: number) => {
    if (itemChunk - ln === 0) return null;
    return Array.from(Array(itemChunk - ln).keys()).map(element => (
      <View style={styles.emptyItem} key={`_${element}`}></View>
    ));
  };

  const handleSetOffers = () => {
    if (filteredOffers !== undefined && chunkedData.length) {
      return chunkedData?.map((data, i) => (
        <React.Fragment key={i}>
          <View style={[styles.promotions, itemStyle]}>
            {data.map(item => (
              <PromotionBox data={item} key={item.id} />
            ))}
          </View>
          {fillSpace(data.length)}
        </React.Fragment>
      ));
    }
  };

  const itemStyle = {
    width: Dimensions.get('screen').width,
  };

  const onChangeSectionStep = (nativeEvent: NativeScrollEvent) => {
    if (!filteredOffers || filteredOffers.length <= 0) return;
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

    console.log(scrollPoint, scrollContentSize);
    if (scrollPoint >= scrollContentSize - 1) {
      setPagPage(prevState => prevState + 1);
      setIsFetchingData(true);
      if (routeParams.params.id === 0) {
        setTimeout(() => {
          handleGetOffers(pagPage);
        }, 1000);
      } else {
        setTimeout(() => {
          handleGetNews(pagPage);
        }, 1000);
      }

      console.log(pagPage);
    }
  };

  return (
    <AppLayout>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
        }}>
        <View style={styles.promotionContainer}>
          <Text
            style={[
              styles.promotionsTitle,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            {'შეთავაზებები | ' + CategoryTypes[routeParams.params.id]}
          </Text>
          <PaginationDots length={chunkedData?.length} step={offersStep} />
        </View>
        <View
          style={[
            !isLoading && (!filteredOffers || filteredOffers.length <= 0)
              ? {flex: 11, justifyContent: 'center', alignItems: 'center'}
              : {flex: 11},
          ]}>
          {!isLoading && (!filteredOffers || filteredOffers.length <= 0) ? (
            <Text
              style={{
                fontSize: 10,
                color: isDarkTheme ? Colors.white : Colors.black,
              }}>
              ქონთენთი ვერ მოიძებნა
            </Text>
          ) : (
            <ScrollView
              contentContainerStyle={{flexGrow: 1, flexDirection: 'row'}}
              showsVerticalScrollIndicator={false}>
              <ScrollView
                contentContainerStyle={{
                  flexDirection: 'row',
                  paddingRight: 5,
                }}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                horizontal={true}
                onScroll={({nativeEvent}) => onChangeSectionStep(nativeEvent)}>
                {handleSetOffers()}
              </ScrollView>
            </ScrollView>
          )}
        </View>
      </View>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator
            size={'small'}
            color={'#ffffff'}
            style={{
              alignSelf: 'center',
              transform: [
                {translateY: Dimensions.get('screen').height / 2 - 50},
              ],
            }}
          />
        </View>
      )}
    </AppLayout>
  );
};

export default OffersScreen;

const styles = StyleSheet.create({
  giftCardImg: {
    maxHeight: 187,
    maxWidth: 300,
    width: '100%',
    height: '100%',
  },

  promotions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  promotionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '7%',
    paddingTop: 10,
    flex: 1,
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
  },
  loader: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  emptyItem: {
    width: 159,
    height: 180,
    margin: 10,
  },
});
