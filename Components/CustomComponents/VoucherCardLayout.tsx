import React, {useContext, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {withDecay} from 'react-native-reanimated';
import { AppContext } from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';

import {Item} from '../../Constants/ShopList';
import {useDimension} from '../../Hooks/UseDimension';
import AppCheckBox from './AppCheckBox';

export interface IAppBtnProps {
  text: string;
  amountText: string;
  amount: number;
  percent: string;
  imageUrl: string;
  more: string;
  icon: ImageSourcePropType;
  discountPercentage: string;
  voucherPurchasePoints: string;
  voucherStartDate: string;
  voucherEndDate: string;
  voucherID: string;
  value: string;
  sign: string;
  numberOfVouchers: string;
}

interface IIAppBtnProps {
  item: IAppBtnProps;
  showRadio?: boolean;
  passData?: (data: any) => void;
  current?: any;
  shorCount?:boolean;
}

const VoucherCardLayout: React.FC<IIAppBtnProps> = props => {
  const {
    text,
    voucherStartDate,
    amount,
    imageUrl,
    voucherEndDate,
    discountPercentage,
    voucherPurchasePoints,
    voucherID,
    value,
    sign,
    numberOfVouchers
  } = props.item;
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [currentVaucher, setCurrenVaucher] = useState<any>();
  const { state } = useContext(AppContext);
  const { isDarkTheme } = state;

  const {width} = useDimension();

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  let startd, endd;
try {
  let date = voucherStartDate.split('T');
  if(date.length) {
    const ydm = date[0].split('-');
    if(ydm.length) {
      startd = `${ydm[2]}/${ydm[1]}`;
    }
  }
  let date2 = voucherEndDate.split('T');
  if(date2.length) {
    const ydm = date2[0].split('-');
    if(ydm.length) {
      endd = `${ydm[2]}/${ydm[1]}`;
    }
  }
} catch (_) {

}

const fullDate = `${startd} - ${endd}`
  return (
    <>
      <TouchableOpacity
        style={styles.mainWrap}
        activeOpacity={0.8}
        onPress={() => props.passData && props.passData(props.item)}>
        <View style={[styles.main,{borderColor: isDarkTheme ? Colors.white : Colors.black}]}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardView}>
              <Text style={[styles.amountText,{color: isDarkTheme ? Colors.white : Colors.black}]}>{value}</Text>
              <View>
                <Text style={[styles.percentStyle,{color: isDarkTheme ? Colors.white : Colors.black}]}>{sign}</Text>
                {imageUrl !== undefined && (
                  <Image
                    source={{uri: imageUrl}}
                    style={{width: 29.23, height: 29.23, marginLeft: 10}}
                  />
                )}
              </View>
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.textStyle}>{`ვადა: ${voucherEndDate === undefined ? 'უვადო' : fullDate}`}</Text>
              <Text
                style={
                  styles.amountTextStyle
                }>{`რაოდენობა: ${props.shorCount ? numberOfVouchers : '1'}`}</Text>
              <TouchableOpacity
                onPress={() => {
                  setIsMore(!isMore);
                  setCurrenVaucher(props.item);
                }}
                style={{top: 20, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={[styles.moreBtnTitle,{ color: isDarkTheme ? Colors.white : Colors.black }]}>ვრცლად</Text>
                <Image
                  source={isDarkTheme? require('./../../assets/images/Polygon.png') : require('./../../assets/images/arrow-black.png')}
                  style={[
                    styles.isMoreImgStyle,
                    {transform: [{rotate: isMore ? '90deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {props.showRadio && (
          <View style={styles.checkboxCont}>
            <AppCheckBox
              checked={props?.current?.voucherID === props.item.voucherID}
              isRequired={false}
              name={''}
              onChange={() => props.passData && props.passData(props.item)}
            />
          </View>
        )}
      </TouchableOpacity>

      {/* <View style={styles.voucherPriceText}>
        <Text style={{color: Colors.white}}>ფასი: 1000 </Text>
        <Image source={require('../../assets/images/Star.png')} />
      </View>
      
      "voucherCode": "string",
        "merchantID": "string",
        "id": 0,
        "createDate": "2022-02-16T13:20:03.460Z",
        "isActive": 0,
        "logo": "string",
        "merchantName": "string"
      
      
      */}
      {isMore &&
        currentVaucher?.merchants?.map((el: any, i: React.Key) => (
          <View
            key={i}
            style={{
              justifyContent: 'space-between',
              paddingVertical: 5,
              marginTop: 10,
              marginLeft: 30,
              width: '100%',
            }}>
            <View
              style={{flexDirection: 'row', alignItems: 'center', top: -15}}>
              <Image source={{uri: el?.logo}} />
              <Text style={[styles.nameAddressTextStyle,{ color: isDarkTheme ? Colors.white : Colors.black }]}>
                {el?.merchantName} {el?.voucherCode}
              </Text>
            </View>
          </View>
        ))}
    </>
  );
};

const styles = StyleSheet.create({
  mainWrap: {
    flexDirection: 'row',
    width: '100%',
  },

  main: {
    width: '100%',
    //maxWidth: 342,
    height: 125,
    borderRadius: 5,
    borderColor: Colors.white,
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
  },

  checkboxCont: {
    justifyContent: 'center',
    width: 30,
    alignItems: 'flex-end',
  },

  cardWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  amountText: {
    color: Colors.white,
    fontSize: 90,
    fontFamily: 'HMpangram-Bold',
    marginLeft: 10
  },

  percentStyle: {
    color: Colors.white,
    fontSize: 35,
    fontFamily: 'HMpangram-Bold',
  },

  voucherPriceText: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingBottom: 26,
  },

  textStyle: {
    color: Colors.btnGrey,
    fontSize: 10,
    bottom: 15,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
  },

  amountTextStyle: {
    color: Colors.btnGrey,
    fontSize: 10,
    bottom: 15,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
  },

  moreBtnTitle: {
    color: Colors.white,
    fontSize: 10,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
  },

  nameAddressTextStyle: {
    color: Colors.white,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
    fontSize: 8,
    paddingHorizontal: 10,
  },

  isMoreImgStyle: {
    width: 5,
    height: 5,
    left: 5,
  },
});
export default VoucherCardLayout;
