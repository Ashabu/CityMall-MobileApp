import React, { useContext } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import { useDimension } from '../../Hooks/UseDimension';

const HowCome = ({ data, routeId }: any) => {
    const { width } = useDimension();
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

   // console.log('props.contentData===>', data[3]["bus-saburtalo"].title);

    if(!data.length)
     return    <ActivityIndicator style={{alignSelf: 'flex-start'}} color={'#ffffff'} />
    return (
        <View style={{backgroundColor: isDarkTheme ? Colors.black : Colors.white}}>
            <View style={styles.row}>
                <View style={styles.width}>
                    <Image source={require('../../assets/images/train.png')} />
                </View>
                {
                    routeId === 1 ?
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["bus-saburtalo"].title} </Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["bus-saburtalo"].teaser}</Text>
                        </View>
                        :
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["bus-gldani"].title} </Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["bus-gldani"].teaser}</Text>
                        </View>
                }
            </View>
            <View style={styles.row}>
                <View style={styles.width}>
                    <Image source={require('../../assets/images/bus.png')} />
                </View>
                {
                    routeId === 1 ?
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["taxi-saburtalo"].title}</Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["taxi-saburtalo"].teaser}</Text>
                        </View>
                        :
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["minibus-gldani"].title} </Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["minibus-gldani"].teaser}</Text>
                        </View>
                }
            </View>
            <View style={styles.row}>
                <View style={styles.width}>
                    <Image source={require('../../assets/images/metro.png')} />
                </View>
                {
                    routeId === 1 ?
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["metro-saburtalo"].title} </Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[3]["metro-saburtalo"].teaser}</Text>
                        </View>
                        :
                        <View>
                            <Text style={[styles.titleTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["metro-gldani"].title} </Text>
                            <Text style={[styles.detailTxt,{color: isDarkTheme ? Colors.white : Colors.black}]}>{data[2]["metro-gldani"].teaser}</Text>
                        </View>
                }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 55,
        alignItems: 'center',


    },
    titleTxt: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: 'HMpangram-Bold',
        textTransform: 'uppercase',
        lineHeight: 20
    },
    detailTxt: {
        color: Colors.white,
        fontSize: 12,
        fontFamily: 'HM pangram',
    },
    width: {
        width: 60,
    }
});

export default HowCome;
