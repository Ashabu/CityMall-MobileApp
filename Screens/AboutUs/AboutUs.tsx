import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {GoBack} from '../../Services/NavigationServices';
import Layout from '../../Components/Layouts/Layout';
import translateService from '../../Services/translateService';

const AboutUs = () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  return (
    <Layout hasBackArrow pageName={translateService.t('screens.aboutUs')} onPressBack={GoBack}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.txtView}>
          <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{translateService.t('common.cityMall')}</Text>
          <Text style={[styles.infoTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            ცნობილი ფაქტია, რომ გვერდის წაკითხვად შიგთავსს შეუძლია მკითხველის
            ყურადღება მიიზიდოს და დიზაინის აღქმაში ხელი შეუშალოს. გამოყენებით
            ვღებულობთ იმაზე მეტ-ნაკლებად სწორი გადანაწილების ტექსტს, ვიდრე
            ერთიდაიგივე გამეორებადი სიტყვებია ხოლმე.
          </Text>
        </View>
        <View style={[styles.txtView, {paddingVertical: 30}]}>
          <Text style={[styles.contactTitle,{color: isDarkTheme ? Colors.white : Colors.black}]}>{translateService.t('screens.contact')}</Text>
          <View style={{top: 10}}>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            {translateService.t('screens.line')}: <Text style={styles.unBold}>+032 220 00 99</Text>
            </Text>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            {translateService.t('screens.marketing')}:{' '}
              <Text style={[styles.unBold,{color: isDarkTheme ? Colors.white : Colors.black}]}>(+995) 595 393 924 </Text>
            </Text>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            {translateService.t('screens.sales')}:{' '}
              <Text style={[styles.unBold,{color: isDarkTheme ? Colors.white : Colors.black}]}>(+995) 599 515 672</Text>
            </Text>
          </View>
        </View>
        <View style={{paddingVertical: 30}}>
          <Text style={[styles.contactTitle,{color: isDarkTheme ? Colors.white : Colors.black}]}>{translateService.t('screens.address')}</Text>
          <View style={{top: 10}}>
            <Text style={[styles.addressInfo,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            {translateService.t('infoText.addressCityMall')}
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  txtView: {
    borderBottomColor: Colors.white,
    borderBottomWidth: 0.75,
  },
  titleTxt: {
    color: Colors.white,
    fontSize: 30,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
  },
  infoTxt: {
    paddingVertical: 20,
    color: Colors.white,
    lineHeight: 24,
    fontFamily: 'HM pangram',
  },
  contactTitle: {
    color: Colors.white,
    textTransform: 'uppercase',
    fontFamily: 'HMpangram-Bold',
  },
  bold: {
    color: Colors.white,
    fontFamily: 'HMpangram-Bold',
    fontSize: 12,
    lineHeight: 20,
  },
  unBold: {
    color: Colors.white,
    fontFamily: 'HM pangram',
  },
  addressInfo: {
    color: Colors.white,
    fontFamily: 'HM pangram',
    fontSize: 12,
    lineHeight: 20,
  },
});

export default AboutUs;
