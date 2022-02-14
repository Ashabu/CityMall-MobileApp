import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../Colors/Colors';
import { navigate } from '../../Services/NavigationServices';



export interface IAppBtnProps {
  title: string;
  icon: ImageSourcePropType;
  Content: any
  routeName?: string,
  contentData?: any,
  routeId: number
}


const PlanVisitLayout: React.FC<IAppBtnProps> = props => {
  const { title, icon, Content, routeName, routeId } = props;
  const [collapse, setCollapse] = useState<boolean>(false);

  const handlePress = () => {
    if (!routeName) {
      setCollapse(!collapse)
    } else {
      navigate(routeName, {mallId: routeId});
    };
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={styles.main}>
        <Text style={styles.name}>{title}</Text>
        <Image source={icon} style={collapse ? { transform: [{ rotate: '90deg' }] } : null} />
      </TouchableOpacity>
      {
        collapse ?
          <Content data = {props.contentData} routeId = {routeId}/>
          :
          null
      }




    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
  },
  name: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'HM pangram',
    textTransform: 'uppercase',
    fontWeight: '700',
  }

});
export default PlanVisitLayout;
