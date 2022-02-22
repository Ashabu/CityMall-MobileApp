import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import SmsRetriever from 'react-native-sms-retriever';
import translateService from '../Services/translateService';

interface IOtpProps {
    getValue: (val: string) => void,
    resend: () => void,
    hasError?: boolean
}
const OneTimeCode: React.FC<IOtpProps> = (props) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const { getValue, resend, hasError } = props;

    const [oneTimeCode, setOneTimeCode] = useState<string>('');

    const onSmsListener = async () => {
        try {
          const registered = await SmsRetriever.startSmsRetriever();
          if (registered) {
            SmsRetriever.addSmsListener(event => {
              const otp = /(\d{4})/g.exec(event.message || '');
              if(otp){
                setOneTimeCode(otp[1]);
              }
            });
          }
        } catch (error) {}
      };
    
      useEffect(() => {
        onSmsListener();
    
        return () => SmsRetriever.removeSmsListener();
      }, []);

    useEffect(() => {
        getValue(oneTimeCode);
    }, [oneTimeCode]);

    const handleOneTimePasscode = (value: any) => {
        if (isNaN(value)) {
            return;
        } else {
            setOneTimeCode(value);
        };
    };

    return (
        <View style={[styles.otpContainer, { borderColor: isDarkTheme ? Colors.white : Colors.black }]}>
            <Text style={[styles.otpTitle, { color: isDarkTheme ? Colors.white : Colors.black }]}>
            {translateService.t('infoText.enterCode')}</Text>
            <TextInput
                style={[styles.otpInput, {color: isDarkTheme ? Colors.white : Colors.black}]}
                value={oneTimeCode}
                placeholder={translateService.t('common.smsCode')}
                placeholderTextColor={isDarkTheme ? Colors.white : Colors.black}
                onChangeText={(val: string) => handleOneTimePasscode(val)}
                maxLength={4}
                keyboardType='numeric'
                textContentType='oneTimeCode'
                autoFocus = {true}
            />
            <TouchableOpacity style={styles.otpResend} onPress={() => {
                resend();
                setOneTimeCode('');
            }}>
                <Text style={[styles.otpResendText, { color: isDarkTheme ? Colors.white : Colors.black }]}>{translateService.t('common.again')}</Text>
            </TouchableOpacity>
            {hasError ? <Text style={styles.errorText}>{translateService.t('infoText.codeIncorrect')}</Text> : null}
        </View>
    );
};

export default OneTimeCode;

const styles = StyleSheet.create({
    otpContainer: {
        position: 'relative',
        width: '100%',
        borderBottomWidth: 1,
    },
    otpTitle: {
        fontFamily: 'HMpangram-Medium',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 17,
    },
    otpInput: {
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 16,
    },

    otpResend: {
        position: 'absolute',
        top: 28,
        right: 5
    },
    otpResendText: {
        fontFamily: 'HMpangram-Medium',
        fontSize: 13,
        fontWeight: '500',
        lineHeight: 17,
    },
    errorText: {
        position: 'absolute',
        bottom: -20,
        color: Colors.red,
        fontSize: 11,
        fontFamily: 'HMpangram-Medium'
    }
});
