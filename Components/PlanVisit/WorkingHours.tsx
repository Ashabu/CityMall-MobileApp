import React, {useContext} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import translateService from '../../Services/translateService';

const WorkingHours = ({data, routeId}: any) => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  if (!data.length)
    return (
      <ActivityIndicator style={{alignSelf: 'flex-start'}} color={'#ffffff'} />
    );
  return (
    <View style={{backgroundColor: isDarkTheme ? Colors.black : Colors.white}}>
      {routeId === 1 ? (
        <>
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            {translateService.t('screens.address')}:{' '}
            <Text
              style={[
                styles.subTxt,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {data[1]['address']}{' '}
            </Text>
          </Text>
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            {translateService.t('screens.workingHours')}:{' '}
            <Text
              style={[
                styles.subTxt,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {data[1]['working-hours']}{' '}
            </Text>
          </Text>
        </>
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            {translateService.t('screens.address')}:{' '}
            <Text
              style={[
                styles.subTxt,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {data[0]['address']}{' '}
            </Text>
          </Text>
          <Text
            style={[
              styles.text,
              {color: isDarkTheme ? Colors.white : Colors.black},
            ]}>
            {translateService.t('screens.workingHours')}:{' '}
            <Text
              style={[
                styles.subTxt,
                {color: isDarkTheme ? Colors.white : Colors.black},
              ]}>
              {data[0]['working-hours']}{' '}
            </Text>
          </Text>
        </>
      )}
      {/* 
      <Text style={styles.text}>
        ტელეფონი: <Text style={styles.subTxt}>+995 595 355 033</Text>
      </Text> */}
      <View style={styles.iconView}>
        <Text
          style={[
            styles.text,
            {color: isDarkTheme ? Colors.white : Colors.black},
          ]}>
          {translateService.t('screens.socMedia')}:
        </Text>
        <Image
          source={
            isDarkTheme
              ? require('../../assets/images/facebook.png')
              : require('../../assets/images/dark-fb-icon.png')
          }
        />
        <Image
          source={
            isDarkTheme
              ? require('../../assets/images/insta.png')
              : require('../../assets/images/dark-insta-icon.png')
          }
        />
        <Image
          source={
            isDarkTheme
              ? require('../../assets/images/twiteer.png')
              : require('../../assets/images/dark-twit-icon.png')
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'HMpangram-Bold',
    lineHeight: 23,
  },
  subTxt: {
    fontFamily: 'HM pangram',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 150,
  },
});

export default WorkingHours;
