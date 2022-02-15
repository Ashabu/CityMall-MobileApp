import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import { navigate } from '../../Services/NavigationServices';


const LocationDropdown = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  
  


  enum mallIds {
    citiMallGldan = 2,
    cityMallSaburtalo = 1,
}
console.log('some')

  return (
    <View style={[styles.main,{backgroundColor: isDarkTheme ? Colors.black : Colors.white}]}>
        <TouchableOpacity onPress={() => navigate('FloorMap', {mallId: mallIds.citiMallGldan})}>
            <Text style={[styles.text,{ color: isDarkTheme ? Colors.white : Colors.black, }]}>სითი მოლი გლდანი</Text>
        </TouchableOpacity>
        <TouchableOpacity  onPress={() => navigate('FloorMap', {mallId: mallIds.cityMallSaburtalo})}>
            <Text style={[styles.text,{ color: isDarkTheme ? Colors.white : Colors.black, }]}>სითი მოლი საბურთალო</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    main: {
      height: 60,
      paddingVertical: 10,
      justifyContent: 'space-between',
      left: 9,
    },
    text: {
        color: Colors.white,
        fontSize: 10,
       
    }
  
});

export default LocationDropdown;
