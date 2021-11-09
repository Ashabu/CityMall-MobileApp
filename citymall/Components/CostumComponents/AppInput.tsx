import React from 'react';
import { View, TextInput } from 'react-native';
import { Colors } from '../../Colors/Colors';


const AppInput = (props: any) => {
    console.log(props.type)
    return (
        <View style={{ position: 'relative', borderColor: Colors.white, borderBottomWidth: 1, width: '100%' }}>
            <TextInput {...props} />
        </View>
    );
};

export default AppInput;