import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import AppLayout from '../AppLayout';
import VoucherCardLayout from '../CustomComponents/VoucherCardLayout';
import  Data  from '../../Constants/VouchersDummyData'
import OneTimeCode from '../OneTimeCode';
import Layout from '../Layouts/Layout';

let hm = require('../../assets/images/H&M.png');

const SelectedVouchers = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  

  return (
    <Layout hasBackArrow
    
    pageName="ვაუჩერის შეძენა"
    onPressBack={GoBack}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.cardWrapper}>
          <View>
            <View>
              {Data.length > 0 && <VoucherCardLayout
                item={Data[0]}
              />} 
            </View>

            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 7,
                paddingBottom: 26,
              }}>
              <Text style={{color: Colors.white, fontFamily: 'HMpangram-Bold'}}>
                ფასი: 1000{' '}
              </Text>

              <Image source={require('../../assets/images/Star.png')} />
            </View>
            <View style={{height: 100}}>
              <Text style={{color: Colors.white, fontFamily: 'HM pangram'}}>
                ვერიფიკაციისთვის საჭირო სმს გამოგზავნილია
              </Text>
            </View>
          </View>
        </View>
        
      </View>
      <View style={{alignItems: 'center', height: 100}}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigate('VouchersDone')}>
            <Text style={styles.btnText}>დადასტურება</Text>
          </TouchableOpacity>
        </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {  
    top: 20,
    alignItems: 'center'
  },
  btnStyle: {
   
    width: 325,
    height: 66,
    borderRadius: 50,
    backgroundColor: Colors.darkGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
    fontSize: 14,
    lineHeight: 17,
    color: Colors.white,
  },
});

export default SelectedVouchers;
