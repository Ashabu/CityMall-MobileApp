import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { withDecay } from 'react-native-reanimated';
import {Colors} from '../../Colors/Colors';

import {Item} from '../../Constants/ShopList';
import {useDimension} from '../../Hooks/UseDimension';
import AppCheckBox from './AppCheckBox';

export interface IAppBtnProps {
  text: string;
  amountText: string;
  amount: number;
  percent: string;
  image: ImageSourcePropType;
  more: string;
  icon: ImageSourcePropType;
}

interface IIAppBtnProps {
  item: IAppBtnProps;
}

const VoucherCardLayout: React.FC<IIAppBtnProps> = props => {
  const {text, amountText, amount, image, more, icon} = props.item;
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const {width} = useDimension();

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <View style={styles.mainWrap}>
        <View style={styles.main}>
          <View style={styles.cardWrapper}>
            <View style={styles.cardView}>
              <Text style={styles.amountText}>{amount}</Text>
              <View>
                <Text style={styles.percentStyle}>%</Text>
                <Image source={image} style={{width: 29.23, height: 29.23}} />
              </View>
            </View>
            <View style={{width: '40%'}}>
              <Text style={styles.textStyle}>{text}</Text>
              <Text style={styles.amountTextStyle}>{amountText}</Text>
              <TouchableOpacity
                onPress={() => setIsMore(!isMore)}
                style={{top: 20, flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.moreBtnTitle}>{more}</Text>
                <Image
                  source={icon}
                  style={[
                    styles.isMoreImgStyle,
                    {transform: [{rotate: isMore ? '90deg' : '0deg'}]},
                  ]}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.checkboxCont}>
          <AppCheckBox checked={false} isRequired={false} name={''} />
        </View>
      </View>

      {/* <View style={styles.voucherPriceText}>
        <Text style={{color: Colors.white}}>ფასი: 1000 </Text>
        <Image source={require('../../assets/images/Star.png')} />
      </View> */}
      {isMore &&
        Item.map((el: any, i: React.Key) => (
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
              <Image source={el.image} />
              <Text style={styles.nameAddressTextStyle}>
                {el.name} {el.address}
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
    maxWidth: 342,
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
