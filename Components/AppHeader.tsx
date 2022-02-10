import React, { useContext, useState } from "react";
import { Image, Platform, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableOpacityBase, View } from 'react-native';
import { toggleDrawer } from './../Services/NavigationServices';
import { AppContext } from "../AppContext/AppContext";
import { Colors } from '../Colors/Colors'
import { useDimension } from "../Hooks/UseDimension";
import { SafeAreaView } from "react-native-safe-area-context";
import {navigate} from '../Services/NavigationServices';
import ToggleDropdown from "./ToggleDropdown/ToggleDropdown";




const AppHeader = (props: any) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme, clientDetails } = state;
    const [visible, setVisible] = useState(false);

    const { width, height } = useDimension();
    const [isLocationActive, setIsLocationActive] = useState<boolean>(false);

    const themeBgColor = {
        backgroundColor: isDarkTheme ? Colors.white : Colors.black
    };

    const toggleDropdown = () => {
        setVisible(!visible);
      };
    //   const renderDropdown = () =>(
    //           <View style={{zIndex: 13}}>
    //             <ToggleDropdown />
    //           </View>
             
          
    //   );
      

    const handleIconPress = () => {
        if(clientDetails.length === 0) {
            return  navigate('AboutUs', {routeId: 2})
        } else {
            return navigate('HomeScreen')
        }
    }

    return (
   <>{visible?
       <TouchableOpacity style={[styles.dropDown, {height: height, width: width}]} onPress={() =>setVisible(false)}>
        <ToggleDropdown />
       </TouchableOpacity>
       : null}
        <SafeAreaView style={[styles.apphHeader, { backgroundColor: isDarkTheme ? Colors.black : Colors.white }]}>
            <View style={[styles.appHeaderRight, { width: (width / 6) }]}>
                <TouchableOpacity style={styles.burgerIcon} onPress={() => toggleDrawer()}>
                    <View style={[styles.burgerIconLine, themeBgColor]} />
                    <View style={[styles.burgerIconLine, themeBgColor]} />
                    <View style={[styles.burgerIconLine, themeBgColor]} />
                </TouchableOpacity>
                <View style={{ width: 70 }}>
                    <Text style={[styles.langText, { color: isDarkTheme ? Colors.white : Colors.black }]}>ENG </Text>
                </View>
            </View>
            <Text style={[styles.titletext, { color: isDarkTheme ? Colors.white : Colors.black }]}>{props.pageTitle}</Text>
            <View style={[styles.appHeaderLeft, { width: (width / 3.6) }]}>
                <TouchableOpacity onPress={() => navigate("Searches")} style={[styles.iconCircle, { borderColor: isDarkTheme ? Colors.white : Colors.black }]} >
                    <Image style={styles.icons} source={require('../assets/images/loupe.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconCircle, { borderColor: isDarkTheme ? Colors.white : Colors.black }]} onPress={handleIconPress}>
                    <Image style={styles.icons} source={require('../assets/images/bell.png')} />
                    {
                        clientDetails.length === 0 ?
                            <Text style={styles.notificationStyle}>1</Text>
                            :
                            null}
                </TouchableOpacity>
                <TouchableOpacity style={[styles.iconCircle, { borderColor: isDarkTheme ? Colors.white : Colors.black }]} onPress={toggleDropdown}>
                    <Image style={styles.icons} source={require('../assets/images/location.png')} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
        </>
    );
};

export default AppHeader;

const styles = StyleSheet.create({
    apphHeader: {
        paddingHorizontal: 30,
        height: 70,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? 10 : 0
    },

    appHeaderRight: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    appHeaderLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    burgerIcon: {
        width: 26,
        height: 17,
        justifyContent: 'space-between'
    },

    burgerIconLine: {
        width: 26,
        height: 3,
        borderRadius: 5
    },

    langText: {
        fontWeight: '500',
        fontSize: 14,
        lineHeight: 17,
        marginLeft: 13,
    },

    titletext: {
        fontWeight: '900',
        fontSize: 14,
        lineHeight: 17,
        marginLeft: 13,
        textAlign: 'center'
    },

    icons: {
        width: 17,
        height: 19
    },

    iconCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    option: {
        width: 138,
        height: 68,
        borderRadius: 7,
        justifyContent: 'center',
        position: 'absolute',
        elevation: 3,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },

    notificationStyle: {
        fontFamily: 'HMpangram-Bold',
        color: Colors.red,
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: -13,
        right: 0
    },
    dropDown: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        alignItems:'flex-end',
        backgroundColor: '#a8a7a761',
        paddingRight: 15,
    }
});