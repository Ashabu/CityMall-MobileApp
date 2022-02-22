import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import {formatDate} from '../../Services/Utils';
import AppLayout from '../AppLayout';

import UserInfoView from '../CustomComponents/UserInfoView';
import Layout from '../Layouts/Layout';
import translateService from '../../Services/translateService';

const ProfileInfo = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme, clientDetails} = state;

  console.log('clientDetails ==>', clientDetails);

  return (
    <Layout
      hasBackArrow
      pageName={translateService.t('screens.profile')}
      onPressBack={GoBack}>
      <ScrollView contentContainerStyle={{flex: 1}} style={{flexGrow: 1}}>
        <View
          style={{
            flexGrow: 1,
            backgroundColor: isDarkTheme ? Colors.black : Colors.white,
            paddingHorizontal: '7%',
            marginBottom: 50,
          }}>
          <View>
            <UserInfoView
              label={translateService.t('labels.firstName')}
              identification={clientDetails?.[0].firstName}
            />
            <UserInfoView
              label={translateService.t('labels.lastName')}
              identification={clientDetails?.[0].lastName}
            />
            <UserInfoView
              label={translateService.t('labels.idNumber')}
              identification={clientDetails?.[0].personCode}
            />
            <UserInfoView
              label={translateService.t('labels.gender')}
              identification={
                clientDetails?.[0].sex === 0
                  ? translateService.t('labels.female')
                  : translateService.t('labels.male')
              }
            />
            <UserInfoView
              label={translateService.t('labels.mobile')}
              identification={
                '+' +
                clientDetails?.[0].phone.replace(
                  /\b(\d{3})(\d{3})(\d{3})(\d{3})\b/,
                  '$1  $2  $3  $4',
                )
              }
            />
            <UserInfoView
              label={translateService.t('labels.birthday')}
              identification={formatDate(clientDetails?.[0].birthDate)}
            />
            <UserInfoView
              label={translateService.t('labels.email')}
              identification={clientDetails?.[0].email}
            />
          </View>
          {/* <View style={styles.btnView}>
        <TouchableOpacity
          style={styles.btnStyle}
          onPress={() => navigate('EmailChanged')}>
          <Text style={styles.btnText}>ცვლილება</Text>
        </TouchableOpacity>
        </View> */}
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
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
  btnView: {
    top: 100,
  },
});

export default ProfileInfo;
