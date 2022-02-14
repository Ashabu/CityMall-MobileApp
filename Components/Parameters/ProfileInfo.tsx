import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import AppLayout from '../AppLayout';

import UserInfoView from '../CustomComponents/UserInfoView';
import Layout from '../Layouts/Layout';

const ProfileInfo = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  return (
    <Layout hasBackArrow pageName="პროფილის გვერდი" onPressBack={GoBack}>
      <ScrollView contentContainerStyle={{flex: 1}} style={{flexGrow: 1}}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
          marginBottom: 50
        }}>
        <View>
          <UserInfoView label="სახელი" identification="გვანცა" />
          <UserInfoView label="გვარი" identification="გაბუნია" />
          <UserInfoView label="პირადი ნომერი" identification="01005020429" />
          <UserInfoView label="სქესი" identification="მდედრობითი" />
          <UserInfoView
            label="მობილურის ნომერი"
            identification="+995 598 977 700"
          />
          <UserInfoView label="დაბადებით თარიღი" identification="17.10.1992" />
          <UserInfoView
            label="ელ-ფოსტა"
            identification="1gvancagabunia@gmail.com"
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
