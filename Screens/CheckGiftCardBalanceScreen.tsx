import React, { useContext, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import Layout from '../Components/Layouts/Layout';
import translateService from '../Services/translateService';

const CheckGiftCardBalanceScreen = () => {
    const { state, isDarkTheme } = useContext(AppContext);

    const styles = StyleSheet.create({
        screenContainer: {
            flex: 1,
            backgroundColor: isDarkTheme ? Colors.black : Colors.white
        },

        cardContainer: {
            position: 'relative',
            borderWidth: 1,
            borderColor: isDarkTheme ? Colors.white : Colors.black,
            borderRadius: 5,
            width: 315,
            height: 200
        },

        cardNumberContainer: {

        },

        cardExpireDateContainer: {

        },

        titleText: {

        }
    });

    const [cardNumber, setCardNumber] = useState<string>('');
    const [expireDay, setExpireDay] = useState<string>('');
    const [expireMonth, setExpireMonth] = useState<string>('');


    return (
        <Layout>
            <View style={styles.cardContainer}>
                <Image style={{ width: '100%', height: '100%' }} source={require('../assets/images/gift-card-balance.png')} />
                <View>
                    <Text>{state?.t('infoText.cardNumber')}</Text>
                </View>
                <View>
                    <Text>{state?.t('infoText.cardDate')}</Text>
                </View>
            </View>
        </Layout>

    );
};

export default CheckGiftCardBalanceScreen;


