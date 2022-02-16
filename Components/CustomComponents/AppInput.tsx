import React, { useContext, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Text, KeyboardType } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import { useDimension } from '../../Hooks/UseDimension';


interface IAppInput {
    name: string,
    placeholder?: string,
    isRequired: boolean,
    validationRule: string,
    addValidation?: (actionTpe: string, inputName: string) => void;
    hasError?: boolean,
    errors?: string[] | [],
    value: string,
    onChangeText: (value: string) => void,
    onBlur?: () => void,
    keyboardType?: KeyboardType,
    maxLength?: number
    selectionColor?: string
    placeholderTextColor?: string,
    style?: any,
    multiline?: boolean,
    numberOfLines?: number,
    autoFocus?: boolean,
    errorMessage?: string,
    keyboardTpe?: string

}

const validations: any = {
    required: 'გთხოვთ შეავსოთ ველი',
    phoneNumber: 'არასწორი მობილური ნომერი',
    email: 'არასწორი მეილი',
    idNumber: 'არასწორი პირადი ნომერი'
}

const AppInput: React.FC<IAppInput> = (props) => {
    const { isRequired, validationRule, addValidation, hasError, errors, name, value, maxLength, style } = props;

    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const [errorMessage, setErrorMessage] = useState<string>('');

    useEffect(() => {
        if (isRequired) {
            if (value === '') {
                addValidation!('add', name);
            } else {
                if (validationRule !== 'phoneNumber') {
                    setErrorMessage('');
                };
                addValidation!('remove', name);
            };
        };
    }, [value, isRequired]);

    useEffect(() => {
        let index = errors?.findIndex((e: string) => e === name);
        if (hasError && index! >= 0) {
            setErrorMessage('გთხოვთ შეავსოთ ველი');
        };
    }, [hasError, errors]);


    useEffect(() => {
        if (validationRule === 'email' && value !== '') {
            let regex = /\S+@\S+\.\S+/;
            if (regex.test(value)) {
                setErrorMessage('');
            } else {
                addValidation!('add', name);
                setErrorMessage(validations[validationRule]);
            };
        };
    }, [value, validationRule]);

    useEffect(() => {
        if (validationRule === 'phoneNumber') {
            if (value === '') {
                setErrorMessage('');
            } else if (value.length === 9) {
                addValidation!('remove', name);
                setErrorMessage('');
            } else if (maxLength && (value.length !== 9 || value !== '')) {
                addValidation!('add', name);
                setErrorMessage(validations[validationRule])
            }
        }
    }, [value, validationRule, maxLength])

    useEffect(() => {
        if (validationRule === 'idNumber') {
            if (value === '') {
                setErrorMessage('');
            } else if (value.length === 11) {
                addValidation!('remove', name);
                setErrorMessage('');
            } else if (maxLength && (value.length !== 9 || value !== '')) {
                addValidation!('add', name);
                setErrorMessage(validations[validationRule]);
            };
        };
    }, [value, validationRule, maxLength])

    return (
        <>
            <View style={[styles.inputWrap, { borderColor: isDarkTheme ? Colors.white : Colors.black }]}>
                <TextInput
                    style={[style || styles.input, { color: isDarkTheme ? Colors.white : Colors.black }]}
                    {...props}
                    selectionColor={isDarkTheme ? Colors.white : Colors.black}
                    placeholderTextColor={isDarkTheme ? Colors.white : Colors.black} />
            </View>
            {errorMessage !== '' || props.errorMessage !== '' ?
                <Text style={styles.errorText}>{errorMessage || props.errorMessage}</Text>
                : null}
        </>
    );
};

export default AppInput;

const styles = StyleSheet.create({
    inputWrap: {
        width: '100%',
        position: 'relative',
        borderBottomWidth: 1,
        // paddingVertical: 3,
    },
    input: {
        fontFamily: 'HMpangram-Medium',
        fontWeight: '500',
        fontSize: 14,
        paddingVertical: 12,
    },
    errorText: {
        color: Colors.red,
        fontSize: 11,
        fontFamily: 'HMpangram-Medium'
    }
});