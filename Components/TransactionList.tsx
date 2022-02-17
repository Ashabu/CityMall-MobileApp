import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../Colors/Colors';

const TransactionList = (props: any) => {

   
    return (
        <View style={styles.trListWrap}>
            <View style={{flexDirection: 'row'}}>
                <Image
                    source={{uri: props.item?.imageURL}}
                    style={{ width: 40, height: 40 }}
                />
                <View style={{ marginLeft: 10 }}>
                    <Text style={{color: Colors.white}}>{new Date(props.item?.authDate).toLocaleDateString().split('/').join('.')} {new Date(props.item?.authDate).toLocaleTimeString()}</Text>
                    <Text style={{color: Colors.white}}>{props.item?.merchantName}</Text>
                </View>
            </View>
            <Text style={{color: Colors.red}}>{props.item?.amount}</Text>
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
