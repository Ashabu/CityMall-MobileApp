import React, {useState, useContext} from 'react';
import {Image, StyleSheet, Text, View, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import AppLayout from '../AppLayout';
import AppSwitch from '../CustomComponents/AppSwitch';
import VoucherCardLayout from '../CustomComponents/VoucherCardLayout';
import Layout from '../Layouts/Layout';

const Parameters = () => {
  const {width} = useDimension();
  const {state, setGlobalState} = useContext(AppContext);
  const {isDarkTheme, clientDetails} = state;
  const [isEnabled, setIsEnabled] = useState(false);

  const SwitchDarkTheme = () => {
    setGlobalState({isDarkTheme: !isDarkTheme});
  };
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <Layout hasBackArrow onPressBack={GoBack}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>
            {clientDetails?.[0].firstName + ' ' + clientDetails?.[0].lastName}
          </Text>
        </View>
        <View style={{top: 83, height: 80, justifyContent: 'space-between'}}>
          <View style={styles.desighnView}>
            <View style={styles.iconView}>
              <View style={{width: 30}}>
                <Image source={require('../../assets/images/moon.png')} />
              </View>
              <View>
                <Text style={styles.name}>მუქი დიზაინი</Text>
              </View>
            </View>

            <TouchableOpacity onPress={SwitchDarkTheme}>
         
              <Switch
                trackColor={{false: Colors.btnGrey, true: Colors.successGreen }}
           
                ios_backgroundColor="#3e3e3e"
                onValueChange={SwitchDarkTheme}
                value={isDarkTheme}
                style={{ transform: [{ scaleX: 1 }, { scaleY: .9 }] }}
                
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => navigate('ProfileInfo')}>
            <View style={{width: 30}}>
              <Image source={require('../../assets/images/user.png')} />
            </View>
            <View>
              <Text style={styles.name}>პროფილის გვერდი</Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.iconView}>
            <View style={{width: 30}}>
            <Image source={require('../../assets/images/lock.png')} />
            </View>
            <View>
                <Text style={styles.name}>პაროლის ცვლილება</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  nameWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    color: Colors.white,
    fontSize: 14,
    fontFamily: 'HMpangram-Bold',
    textTransform: 'uppercase',
  },
  desighnView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Parameters;
