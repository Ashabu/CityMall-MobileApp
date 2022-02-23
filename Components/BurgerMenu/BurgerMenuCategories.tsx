import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { AppContext } from '../../AppContext/AppContext';
import { ICategories, ILocation } from '../../Constants/DrawerItems';
import { navigate } from '../../Services/NavigationServices';
import translateService from '../../Services/translateService';

export interface IBmCategoriesItem {
    item?: ICategories,
    routeName: string,
    routeId?: number,
    pageName?:string,
    isPremium?:boolean
}

const BurgerMenuCategories: React.FC<IBmCategoriesItem> = ({item, routeName, routeId, pageName, isPremium}) => {
    // console.log('From Burger Menu routeId ==>', 'routeId', routeId, 'itemid', item?.id)
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;
    return (
        <View style={styles.categoryView}>
            <TouchableOpacity style={styles.categoryItem} onPress={() => navigate(routeName!, {id: item?.id, routeId: routeId, name: pageName, isPremium: isPremium})}>
                <Text style={[styles.categoryItemText, {color: isDarkTheme? Colors.white : Colors.black}]}>
                    {state?.t(item?.name || '')}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default BurgerMenuCategories;

const styles = StyleSheet.create({
    categoryView: {
        marginLeft: 10,
        marginVertical: 7
    },

    categoryItem: {

    },

    categoryItemText: {
        
    }
})