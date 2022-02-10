import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {navigate} from '../../Services/NavigationServices';
import AppLayout from '../AppLayout';
import MessagesInfo from '../CustomComponents/MessagesInfo';
import VoucherCardLayout from '../CustomComponents/VoucherCardLayout';
import Layout from '../Layouts/Layout';

const VouchersDone = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  return (
    <Layout>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.successView}>
          <MessagesInfo
            icon={require('../../assets/images/success.png')}
            bgColorProp={Colors.successGreen}
            title={'შეკვეთა წარმატებით დასრულდა'}
            text={
              'დამატებითი დეტალებისათვის დაგიკავშირდებით სატელეფონო ცენტრიდან'
            }
            phone={'0322 555 222'}
          />
        </View>

        <View style={{flex: 1, top: 40}}>
          <TouchableOpacity style={styles.btnStyle} onPress={()=> navigate('HomeScreen')}>
            <Text style={styles.btnText}>დახურვა</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  successView: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnStyle: {
    top: 15,
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

export default VouchersDone;
