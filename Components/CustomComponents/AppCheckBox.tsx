import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import translateService from '../../Services/translateService';

interface IAppCheckBox {
    checked: boolean,
    onChange?: () => void,
    hasError?: boolean,
    isRequired?: boolean,
    name?: string,
    addValidation?: (actionTpe: string, inputName: string) => void;
};

const validations: any = {
    gender: translateService.t('infoText.selectGender'),
    terms: translateService.t('infoText.terms')
}

const AppCheckBox: React.FC<IAppCheckBox> = (props) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const { checked, onChange, hasError, isRequired, name, addValidation } = props;

    const [isChecked, setIsChecked] = useState<boolean>(checked);

    useEffect(() => {
        setIsChecked(checked);
    }, [checked]);


    useEffect(() => {
        if (isRequired) {
            if (!checked) {
                addValidation!('add', name!);
            } else {
                addValidation!('remove', name!);
            };
        };
    }, [checked, isRequired]);





 
        const activeColor ={
            backgroundColor: isDarkTheme? Colors.white : Colors.black
            
        }
        const inactiveColor= {
            backgroundColor: isDarkTheme? Colors.black : Colors.white
        }

       

    return (
        <>
        <TouchableOpacity style={[styles.roundCheck,{borderColor: isDarkTheme? Colors.white : Colors.black}, isChecked ? activeColor : inactiveColor]} onPress={onChange}>
            <View style={[styles.checkmark, {borderBottomColor: isDarkTheme? Colors.black : Colors.white, borderRightColor: isDarkTheme? Colors.black : Colors.white}]}/>
        </TouchableOpacity>
           {hasError && <Text style={styles.errorText}>{name !== undefined && validations[name]}</Text> }
        </>
    );
};

export default AppCheckBox;

const styles = StyleSheet.create({
    roundCheck: {
        position: 'relative',
        marginVertical: 5,
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 1,
        alignItems:'center',
        justifyContent: 'center',
        
        transform: [
            { rotate: "45deg" },
        ]
    },
   

    checkmark: {
        borderBottomWidth:2,
        borderRightWidth: 2,
        width: 7,
        height: 10,
        position: 'relative',
        top: -1,
        left: -1
    },

    errorText: {
        position: 'absolute',
        top: 26,
        color: Colors.red,
        fontSize: 11,
        fontFamily: 'HMpangram-Medium'
    }
});