import React, {useContext, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AppContext} from '../../AppContext/AppContext';
import {useDimension} from '../../Hooks/UseDimension';
import {GoBack, navigate} from '../../Services/NavigationServices';
import VoucherCardLayout from '../CustomComponents/VoucherCardLayout';
import VouchersButton from '../CustomComponents/VouchersButton';
import Data from '../../Constants/VouchersDummyData';
import Layout from '../Layouts/Layout';

const VouchersInfo = () => {
  const {width} = useDimension();
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;

  return (
    <Layout
      hasBackArrow
      hideArrows
      pageName="ჩემი ვაუჩერები"
      onPressBack={GoBack}>
      <View style={styles.main}>
        <VouchersButton
          title="ვაუჩერის შეძენა"
          onPress={() => navigate('BuyVouchers')}
        />
      </View>
      <View style={styles.cardWrapper}>
        {Data.map((el: any, i: React.Key) => (
          <VoucherCardLayout item={el} key={i} />
        ))}
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  main: {
    marginTop: 66,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
    padding: 15
  },
});

export default VouchersInfo;
