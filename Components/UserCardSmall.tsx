import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../Colors/Colors';
import translateService from '../Services/translateService';

interface ICardSm {
    cardNumber: string,
    navigateToBarCode?: () => void,
    navigateToReg?: () => void
}
const UserCardSmall: React.FC<ICardSm> = (props) => {
    const { cardNumber, navigateToBarCode, navigateToReg } = props;

    return (
        !cardNumber ?
            <TouchableOpacity style={[styles.warningImg,]} onPress={navigateToReg}>
                <Text style={styles.warningText}>{translateService.t('infoText.registrationText')}</Text>
                <Image style={[styles.giftCardImg, { opacity: 0.2 }]} source={require('../assets/images/loyalty-card.png')} />
                <View style={styles.container}>
                    <Text style={styles.authBtnText}>{translateService.t('common.register')}</Text>
                    <Image style={{ marginLeft: 7, width: 7, height: 7 }} source={require('../assets/images/arrow-sm.png')} />
                </View>
            </TouchableOpacity>
            :
            <TouchableOpacity style={{ position: 'relative', justifyContent: 'center', alignItems: 'center', height: '100%' }} onPress={navigateToBarCode}>
                <Image style={styles.giftCardImg} source={require('../assets/images/loyalty-card.png')} />
                <Text style={{ color: Colors.white, position: 'absolute', bottom: 65, fontSize: 20 }}>{cardNumber}</Text>
            </TouchableOpacity>
    );
};

export default UserCardSmall;

const styles = StyleSheet.create({
    giftCardImg: {
        maxHeight: 187,
        maxWidth: 296,
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    warningImg: {
        maxHeight: 187,
        maxWidth: 296,
        width: '100%',
        height: '100%',
        borderRadius: 10,
        borderColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'relative',
    },
    warningText: {
        color: Colors.yellow,
        fontSize: 10,
        textAlign: 'center',
        fontFamily: 'HMpangram-Bold',
        position: 'absolute',
        width: '80%',
        elevation: 10

    },
    authBtnText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: '900',
        fontFamily: 'HMpangram-Medium',
        textTransform: 'uppercase',
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    }
});