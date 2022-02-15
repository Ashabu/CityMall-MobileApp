import React, { useContext } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import { useDimension } from '../../Hooks/UseDimension';

const WorkingHours = ({ data, routeId }: any) => {
  const { state } = useContext(AppContext);
  const { isDarkTheme } = state;
  if(!data.length)
  return    <ActivityIndicator style={{alignSelf: 'flex-start'}} color={'#ffffff'} />
  return (
    <View>
      {
        routeId === 1 ?
          <>
            <Text style={styles.text}>
              მისამართი: <Text style={styles.subTxt}>{data[1]['address']} </Text>
            </Text>
            <Text style={styles.text}>
              სამუშაო საათები: <Text style={styles.subTxt}>{data[1]['working-hours']} </Text>
            </Text>
          </>
          :
          <>
            <Text style={styles.text}>
              მისამართი: <Text style={styles.subTxt}>{data[0]['address']} </Text>
            </Text>
            <Text style={styles.text}>
              სამუშაო საათები: <Text style={styles.subTxt}>{data[0]['working-hours']} </Text>
            </Text>
          </>
      }
{/* 
      <Text style={styles.text}>
        ტელეფონი: <Text style={styles.subTxt}>+995 595 355 033</Text>
      </Text> */}
      <View style={styles.iconView}>
        <Text style={styles.text}>სოც. სქელი:</Text>
        <Image source={require('../../assets/images/facebook.png')} />
        <Image source={require('../../assets/images/insta.png')} />
        <Image source={require('../../assets/images/twiteer.png')} />
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
