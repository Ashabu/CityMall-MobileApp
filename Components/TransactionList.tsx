import React, { useContext } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import { tranTypes } from '../Screens/ProfileScreen/ProfileScreen';

const TransactionList = (props: any) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;
  
    return (
        <View style={styles.trListWrap}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: props.item?.imageURL}}
                    style={{ width: 40, height: 40 }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: isDarkTheme ? Colors.white : Colors.black }}>{new Date(props.item?.authDate).toLocaleDateString().split('/').join('.')} {new Date(props.item?.authDate).toLocaleTimeString()}</Text>
                    <Text style={{ color: isDarkTheme ? Colors.white : Colors.black }}>{props.item?.merchantName}</Text>
                </View>
            </View>
            <Text style={[{color: props.item.transactionType === tranTypes.accumulate ? Colors.red : Colors.successGreen}]}>{props.item?.points}</Text>
        </View> 
    )
};

export default TransactionList;


const styles = StyleSheet.create({
    trListWrap: {
        width: '100%',
        height: 40,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20
    },
    trDetailsView: {

    }
})
