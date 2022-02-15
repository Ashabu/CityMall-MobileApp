import React, { useContext } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import AppLayout from '../../Components/AppLayout';
import StatusBar from '../../Components/StatusBar';

const StatusInfoScreen = () => {
    const { isDarkTheme } = useContext(AppContext)
    return (
        <AppLayout>
            <ScrollView>
            <View style={{ flex: 1, backgroundColor: isDarkTheme ? Colors.black : Colors.white, paddingHorizontal: '7%', paddingVertical: 50 }}>
                <View style={{marginBottom: 40}}>
                    <Text style={[styles.titleText, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                        სტატუსბარი
                    </Text>
                    <StatusBar/>
                </View>
                <View style={{marginBottom: 40}}>
                    <Text style={[styles.titleText, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                        სტატუსის შესახებ ინფო
                    </Text>
                    <Text style={[styles.descriptionText, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                        შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის თავისუფლება მისცეთ
                        შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის თავისუფლება მისცეთ
                    </Text>
                </View>
                <View>
                    <Text style={[styles.titleText, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                        რა ეკუთვნის თითოეულ სტატუსზე
                    </Text>
                    <Text style={[styles.descriptionText, { color: isDarkTheme ? Colors.white : Colors.black }]}>
                        შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის თავისუფლება მისცეთ
                        შეუკვეთე სითი მოლის სასაჩუქრე ბარათი შენთვის ან შენი საყვარელი ადამიანებისთვის - ეს ყველაზე სასურველი საჩუქარია, რითაც შეგიძლიათ ადამიანს არჩევანის თავისუფლება მისცეთ
                    </Text>
                </View>
            </View>
            </ScrollView>
        </AppLayout>
    )
};

export default StatusInfoScreen;

const styles = StyleSheet.create({
    titleText: {
        fontFamily: 'HMpangram-Bold',
        fontSize: 16,
        lineHeight: 17,
        marginBottom: 16
    },
    descriptionText: {
        fontFamily: 'HMpangram-Light',
        fontSize: 14,
        lineHeight: 24,
        fontWeight: '400'
    }
})
