import React, {
    useContext,
    useEffect,
    useRef,
    useState
} from 'react';
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';

export interface IDistrict {
    id: number,
    name: string
}


const DistrictPiker = (props: any) => {

    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;

    const [selectedValue, setSelectedValue] = useState<string>('');
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    useEffect(() => {
        if (selectedValue !== '') {
            props.onSelect(selectedValue);
            setIsSelecting(false);
        }
    }, [selectedValue]);

    const picker = useRef<any>();

    useEffect(() => {
        if (isSelecting) {
            picker.current?.focus()
        }
    }, [isSelecting])


    return (
        <>
            {
                (isSelecting && Platform.OS === 'ios') ?
                    <TouchableOpacity style={styles.centeredView} onPress={() => setIsSelecting(false)}>
                        <Modal
                            animationType="fade"
                            transparent={true}
                            onRequestClose={() => {
                                setIsSelecting(!isSelecting)
                            }}
                            visible={isSelecting}>
                            <View style={styles.centeredView}>
                                <View style={[styles.modalView, { backgroundColor: isDarkTheme ? Colors.white : Colors.black }]}>
                                    <View style={styles.modalBar}>
                                        <Text style={styles.infoText}>აირჩიეთ ქვეყანა</Text>
                                    </View>
                                    <Picker
                                        style={styles.pickerStyle}
                                        itemStyle={[styles.textStyles, { color: isDarkTheme ? Colors.white : Colors.black }]}
                                        selectedValue={selectedValue}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedValue(itemValue)}
                                    >
                                        {props.districts.map((item: any, index: number) => (
                                            <Picker.Item
                                                key={item.name}
                                                label={item.name} value={item.name} />

                                        ))}
                                    </Picker>
                                    <TouchableOpacity style={[styles.modalBar, { paddingBottom: 20 }]} onPress={() => setIsSelecting(false)}>
                                        <Text style={[styles.infoText, { textAlign: 'right', color: Colors.red }]}>არჩევა</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Modal>
                    </TouchableOpacity>
                    : (isSelecting && Platform.OS === 'android') ?
                        <Picker ref={picker}
                            style={styles.pickerStyle}
                            itemStyle={[styles.textStyles, { color: isDarkTheme ? Colors.white : Colors.black }]}
                            selectedValue={selectedValue}
                            onValueChange={(itemValue, itemIndex) =>
                                setSelectedValue(itemValue)}
                        >
                            {props.districts.map((item: any, index: number) => (
                                <Picker.Item
                                    key={item.name}
                                    label={item.name} value={item.name} />

                            ))}
                        </Picker>
                        :
                        null
            }
            <TouchableOpacity
                style={[styles.selectedItem, { borderBottomColor: isDarkTheme ? Colors.white : Colors.black }]}
                onPress={() => setIsSelecting(true)}>
                {
                    selectedValue ?
                        <Text style={[styles.itemText, { color: isDarkTheme ? Colors.white : Colors.black }]}>{selectedValue}</Text>
                        :
                        <Text style={[styles.itemText, { color: isDarkTheme ? Colors.white : Colors.black }]}>{props.placeholder}</Text>
                }
            </TouchableOpacity>
        </>
    );
};

export default DistrictPiker;

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
        fontSize: 20,
        fontFamily: 'HMpangram-Medium',
        paddingRight: 20
    },
    modalView: {
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
        paddingHorizontal: 5,
        borderBottomWidth: 1,
    },

    itemText: {
        fontSize: 14,
        fontFamily: 'HMpangram-Medium',
    },

    infoText: {
        fontSize: 20,
        fontFamily: 'HMpangram-Medium',
    },
    modalBar: {
        paddingVertical: 10,
        marginHorizontal: 15,
    }
})