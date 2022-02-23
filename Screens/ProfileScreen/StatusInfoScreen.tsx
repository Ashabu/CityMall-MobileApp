import React, {useContext} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import AppLayout from '../../Components/AppLayout';
import StatusBar from '../../Components/StatusBar';
import translateService from '../../Services/translateService';

const StatusInfoScreen = () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  const textThemeColor = {
    color: isDarkTheme ? Colors.white : Colors.black,
  };

  const bgThemeColor = {
    backgroundColor: isDarkTheme ? Colors.black : Colors.white,
  };

  return (
    <AppLayout>
      <ScrollView>
        <View style={[bgThemeColor, styles.main]}>
          <View style={{marginBottom: 40}}>
            <Text style={[styles.titleText, textThemeColor]}>{state?.t('screens.statusbar')}</Text>
            <StatusBar />
          </View>
          <View style={{marginBottom: 40}}>
            <Text style={[styles.titleText, textThemeColor]}>
            {state?.t('infoText.aboutStatus')}
            </Text>
            <Text style={[styles.descriptionText, textThemeColor]}>
              შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი
              ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ
              ადამიანს არჩევანის თავისუფლება მისცეთ შეუკვეთე სითი მოლის
              სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს
              ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის
              თავისუფლება მისცეთ
            </Text>
          </View>
          <View>
            <Text style={[styles.titleText, textThemeColor]}>
            {state?.t('infoText.statusGift')}
            </Text>
            <Text style={[styles.descriptionText, textThemeColor]}>
              შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი
              ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ
              ადამიანს არჩევანის თავისუფლება მისცეთ შეუკვეთე სითი მოლის
              სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს
              ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის
              თავისუფლება მისცეთ
            </Text>
          </View>
        </View>
      </ScrollView>
    </AppLayout>
  );
};

export default StatusInfoScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingHorizontal: '7%',
    paddingVertical: 50,
  },
  titleText: {
    fontFamily: 'HMpangram-Bold',
    fontSize: 16,
    lineHeight: 17,
    marginBottom: 16,
  },
  descriptionText: {
    fontFamily: 'HMpangram-Light',
    fontSize: 14,
    lineHeight: 24,
    fontWeight: '400',
  },
});
