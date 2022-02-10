import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AppLayout from './AppLayout';
import {AppContext} from '../AppContext/AppContext';
import {Colors} from '../Colors/Colors';

export default () => {
  const {state} = useContext(AppContext);
  const {isDarkTheme} = state;
  return (
    <AppLayout pageTitle={'ქალაქის რუკა'}>
      <View
        style={[
          styles.mapcontainer,
          {backgroundColor: isDarkTheme ? Colors.black : Colors.white},
        ]}>
         <MapView
       //provider={PROVIDER_GOOGLE} // 41.723971393990055, 44.73773667814966
       style={styles.map}
       region={{
         latitude: 41.723971393990055,
         longitude: 44.73773667814966,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
      //  showsIndoorLevelPicker={true}
      //  showsIndoors={true}
        showsMyLocationButton={true}
      //  showsBuildings={true}
        showsCompass={true}
        showsUserLocation={true}
      //  showsScale={true}
      //  showsPointsOfInterest={true}
      // toolbarEnabled={true}
       followsUserLocation={true}
       zoomControlEnabled={true}
       zoomEnabled={true}
      // pitchEnabled={true}
      
       rotateEnabled={true}
     >
         <Marker
      coordinate={{
        latitude: 41.723971393990055,
        longitude: 44.73773667814966,
      }}
    //   title={'marker.title'}
    //   description={'marker.description'}
    />
    
     </MapView>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  mapcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
