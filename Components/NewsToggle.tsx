import { Portal } from '@gorhom/portal';
import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../AppContext/AppContext';
import {Colors} from '../Colors/Colors';
import {useDimension} from '../Hooks/UseDimension';
import { navigate } from '../Services/NavigationServices';


const NewsToggle = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  
  


  return (
      <Portal hostName='News'>
        <View style={[styles.main,{backgroundColor: isDarkTheme ? Colors.black : Colors.white}]}>
        <TouchableOpacity style={{height: 25}}>
            <Text style={[styles.text,{ color: isDarkTheme ? Colors.white : Colors.black, }]}>სითი მოლი გლდანი</Text>
        </TouchableOpacity>
        <TouchableOpacity >
            <Text style={[styles.text,{ color: isDarkTheme ? Colors.white : Colors.black, }]}>სითი მოლი საბურთალო</Text>
        </TouchableOpacity>
    </View>
      </Portal>
    
  );
};

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.black,
        top: 80,
        left: 190,
        zIndex:200,
        width: 170,
        height: 80,
        borderRadius: 10,
        justifyContent: 'center',
        padding: 10,
        position: 'absolute'
        
    
      },
    text: {
        color: Colors.white,
        fontSize: 10,
        textTransform: 'uppercase',
       
    }
  
});

export default NewsToggle;
