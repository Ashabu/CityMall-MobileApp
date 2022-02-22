import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {GoBack} from '../../Services/NavigationServices';
import Layout from '../../Components/Layouts/Layout';
import ApiServices from '../../Services/ApiServices';


const AboutUs = ({strings}: {strings: any[]}) => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  const [contentData, setContentData] = useState<any>([]);
  useEffect(() => {
    getWidgets();
  }, [])
    const getWidgets = () => {
      ApiServices.GetWidgets().then(res => {
       // console.log(res.data)
        setContentData(res.data)
      }).catch(e => {
        console.log(JSON.parse(JSON.stringify(e.response)))
      })
    }

  let str = '';
  let addr = '', addr1 = '';

  try {
    if (strings?.length) {
      const index = strings.findIndex((s: any) => s.type == 2);
      if (index >= 0) {
        str = strings[index].text;
      }
    }
  } catch (_) {}

  try {
    if (strings?.length) {
      if (contentData?.length >= 0) {
        addr = contentData[1].address;
        addr1 = contentData[0].address;
      }
    }
  } catch (_) {}

  return (
    <Layout hasBackArrow pageName="ჩვენ შესახებ" onPressBack={GoBack}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.txtView}>
          <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>სითი მოლი</Text>
          <Text style={[styles.infoTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>
            {str}
          </Text>
        </View>
        {/* <View style={[styles.txtView, {paddingVertical: 30}]}>
          <Text style={[styles.contactTitle,{color: isDarkTheme ? Colors.white : Colors.black}]}>კონტაქტი</Text>
          <View style={{top: 10}}>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
              ცხელი ხაზი: <Text style={styles.unBold}>+032 220 00 99</Text>
            </Text>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
              მარკეტინგის დეპარტამენტი:{' '}
              <Text style={[styles.unBold,{color: isDarkTheme ? Colors.white : Colors.black}]}>(+995) 595 393 924 </Text>
            </Text>
            <Text style={[styles.bold,{color: isDarkTheme ? Colors.white : Colors.black}]}>
              გაყიდვების დეპარტამენტი:{' '}
              <Text style={[styles.unBold,{color: isDarkTheme ? Colors.white : Colors.black}]}>(+995) 599 515 672</Text>
            </Text>
          </View>
        </View> */}
        <View style={{paddingVertical: 30}}>
          <Text style={[styles.contactTitle,{color: isDarkTheme ? Colors.white : Colors.black}]}>მისამართი</Text>
          <View style={{top: 10}}>
            <Text style={[styles.addressInfo,{color: isDarkTheme ? Colors.white : Colors.black}]}>
              სითი მოლი საბურთალო, {addr}{' '} სითი მოლი გლდანი, {addr1}{' '}
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
