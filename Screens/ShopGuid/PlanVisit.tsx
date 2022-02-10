import React, {useContext} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {Colors} from '../../Colors/Colors';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import AppLayout from '../../Components/AppLayout';
import VoucherCardLayout from '../../Components/CustomComponents/VoucherCardLayout';
import {Item} from '../../Constants/ShopList';
import Data from '../../Constants/VouchersDummyData';
import AppCheckBox from '../../Components/CustomComponents/AppCheckBox';
import Layout from '../../Components/Layouts/Layout';
import PlanVisitLayout from '../../Components/CustomComponents/PlanVisitLayout';
let hm = require('../../assets/images/H&M.png');
import data from '../../Constants/PlanVisitData';
import WorkingHours from '../../Components/PlanVisit/WorkingHours';


const PlanVisit = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  return (
    <Layout hasBackArrow pageName="დაგეგმე ვიზიტი" onPressBack={GoBack}>
      <View
        style={{
          flexGrow: 1,
          backgroundColor: isDarkTheme ? Colors.black : Colors.white,
          paddingHorizontal: '7%',
        }}>
          {data.map((el: any, i: React.Key) => (
            <PlanVisitLayout key={i} title={el.name} icon={el.icon} Content={el.content} routeName={el.routeName} />
          ))}
        
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: Colors.white,
  },
});

export default PlanVisit;
