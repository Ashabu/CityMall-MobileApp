import React, { useState, useEffect, useContext } from 'react';
import { Text, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import countryCodes from '../DialCodePIcker/CountryCodes';
import { Colors } from '../../Colors/Colors';
import { AppContext } from '../../AppContext/AppContext';


const DialCodePicker = (props: any) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;
    
    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
        },

        pickerStyle: {
        },
        choseButton: {

        },

        textStyles: {
            color: isDarkTheme? 'white' : 'black',
            fontSize: 20,
            fontFamily: 'HMpangram-Medium',

            paddingRight: 20
        },
        modalView: {
            backgroundColor: isDarkTheme? 'black' : 'white',
            borderRadius: 10,
            shadowColor: Colors.black,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            width: '100%',
        },

        selectedItem: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 16,
            paddingHorizontal: 10,
            borderBottomColor: isDarkTheme ? Colors.white : Colors.black,
            borderBottomWidth: 1,
            color: isDarkTheme ? Colors.white : Colors.black,
            marginRight: 5
        },

        itemText: {
            color: isDarkTheme ? Colors.white : Colors.black
        },

        infoText: {
            fontSize: 20,
            fontFamily: 'HMpangram-Medium',
            color: isDarkTheme ? Colors.white : Colors.black
        },
        modalBar: {
            paddingVertical: 10,
            marginHorizontal: 15,
        }
    })

    const [selectedValue, setSelectedValue] = useState<string>('');
    const [isSelecting, setIsSelecting] = useState<boolean>(false);


    useEffect(() => {
        setSelectedValue(countryCodes[0].dial_code);
    }, []);

    useEffect(() => {
        if(selectedValue !== '') {
            props.onSelect(selectedValue);
        }
    }, [selectedValue]);

    return (
        <>
        {isSelecting ?
            <TouchableOpacity style={styles.centeredView} onPress={() => setIsSelecting(false)}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    onRequestClose={() => {
                        setIsSelecting(!isSelecting)
                    }}
                    visible={isSelecting}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.modalBar}>
                                <Text style={styles.infoText}>აირჩიეთ ქვეყანა</Text>
                            </View>
                            <Picker
                                style={styles.pickerStyle}
                                itemStyle={styles.textStyles}
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedValue(itemValue)}
                            >
                                {countryCodes.map((item: any, index: number) => (
                                    <Picker.Item
                                        key={item.code}
                                        label={item.dial_code + ' ' + item.name} value={item.dial_code} />

                                ))}
                            </Picker>
                            <TouchableOpacity style={[styles.modalBar, {paddingBottom: 20}]} onPress={() => setIsSelecting(false)}>
                                <Text style={[styles.infoText, { textAlign: 'right', color: Colors.red }]}>არჩევა</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </TouchableOpacity>
            :
            null}
            <TouchableOpacity
                style={styles.selectedItem}
                onPress={() => setIsSelecting(true)}>
                {selectedValue ?
                    <Text style={styles.itemText}>{selectedValue}</Text>
                    :
                    <Text style={styles.itemText}>{props.placeholder}</Text>
                }
            </TouchableOpacity>
            </>
    );
};

export default DialCodePicker;

