import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppContext } from '../../AppContext/AppContext';
import { Colors } from '../../Colors/Colors';
import { ICategories, ILocation } from '../../Constants/DrawerItems';
import { navigate } from '../../Services/NavigationServices';
import BurgerMenuCategories from './BurgerMenuCategories';

export interface IBmItem {
    item: ILocation,
    categories?: ICategories[],
    routeName: string
}



const BurgerMenuLocation: React.FC<IBmItem> = (props) => {
    const { state } = useContext(AppContext);
    const { isDarkTheme } = state;
    const [isCollapsed, setIsCollapsed] = useState<Boolean>(false);

    const hasCategories = () => {
        if (props.categories!?.length > 0) {
            return true;
        } else {
            return false;
        }
    };
console.log('*')
    return (
        <View style={{ marginLeft: 10, marginVertical: 7 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => hasCategories() ? setIsCollapsed(!isCollapsed) : navigate(props.routeName!)}>
                {
                    hasCategories() ?
                        <Image
                            style={[
                                styles.arrowImgStyle,
                                { transform: [{ rotate: isCollapsed ? '90deg' : '0deg' }] }
                            ]}
                            source={require('../../assets/images/arrow-sm.png')} /> :
                        null
                }
                <Text style={{ color: isDarkTheme ? Colors.white : Colors.black }}> {props.item.name}</Text>
            </TouchableOpacity>
            {
                isCollapsed && <View>
                    {props.categories?.map((el, i) => (
                        <BurgerMenuCategories item={el} key={i} routeName = {props.routeName!} routeId = {props.item.id}  />
                    ))}
                </View>
            }
        </View>
    );
};

export default BurgerMenuLocation;

const styles = StyleSheet.create({
    arrowImgStyle: {
        width: 7,
        height: 7,
    },
})

