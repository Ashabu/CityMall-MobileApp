import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {AppContext} from '../AppContext/AppContext';
import {Colors} from '../Colors/Colors';
import AppLayout from './AppLayout';
import MapComponent from './FloorMap/Map';
import ZoomableView from './FloorMap/ZoomableView';
import envs from './../config/env';
import {RouteProp, useRoute} from '@react-navigation/native';
import {navigate} from '../Services/NavigationServices';

type RouteParamList = {
  params: {
    mallId: number;
  };
};

export default () => {
  const {state, setGlobalState} = useContext(AppContext);
  const {isDarkTheme} = state;
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  const [roomId, setRoomId] = useState<number | string | undefined>('');
  const [floors, setFloors] = useState<Array<any>>([]);
  const [floorIndex, setFloorIndex] = useState<any>(1);
  const [pickerPositionTop, setPickerPositionTop] = useState<
    number | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // const [floor, setFloor] = useState<any>();
  const [floorsDetails, setFloorsDetails] = useState<Array<any>>([]);
  const [floorData, setFloorData] = useState<any>();

  useEffect(() => {
    if (!isNaN(parseInt(roomId?.toString() || ''))) {
      setIsLoading(true);
      axios
        .get(`${envs.API_URL}/api/Mobile/GetConnectStore?StoreId=${roomId}`)
        .then(res => {
          setGlobalState({singleMerchant: res.data});
          navigate('ShopDetailsScreen');
          setIsLoading(false);
        }).catch(() => setIsLoading(true));
    }
  }, [roomId]);



  useEffect(() => {
    axios
      .get(
        `${envs.API_URL}/api/Connect/GetFloorsMap?address=${route.params?.mallId || 1}`,
      )
      .then(res => {
        setFloors(res.data.floors);
      });
  }, []);

  useEffect(() => {
    axios
    .get(`${envs.API_URL}/api/Connect/GetFloors`)
    .then(res => {
        

        if(res.data) {
          const ret: any = []
          floors.map(f => {
            const data = res.data.filter((fd: any) => fd.id == f.title);
            if(data.length) {
              ret.push(...data);
            }
          })
          setFloorsDetails(ret);
        }
    });
  }, [floors]);

  // useEffect(() => {
  //   if (floors) {
  //     try {
  //       setFloor(floors[floorIndex]);
  //     } catch (_) {
  //       setFloor(floors[floors.length - 1]);
  //     }
  //   }
  // }, [floors, floorIndex]);
//console.log('>>>>>>>>>>',floors)
  useEffect(() => {
    if (floors && floorsDetails) {
      try {
        const current = floorsDetails.filter(data => data.id == floorIndex);
  
        const cf = floors.filter(data => data.title == current[0].id);
        
        setFloorData(cf[0]);
        
      } catch (_) {
        setFloorData(floors[floors.length - 1]);
      }
    }
  }, [floorData, floorsDetails, floorIndex]);


  console.log(route.params)

  return (
    <>
      <AppLayout pageTitle={'სართულის გეგმა'}>
        <View
          style={[
            styles.sectionContainer,
            {backgroundColor: isDarkTheme ? Colors.black : Colors.white},
          ]}>
          {floorData !== undefined && (
            <ZoomableView
              maxZoom={1.5}
              minZoom={1}
              zoomStep={0.5}
              initialZoom={1}
              bindToBorders={true}>
              <MapComponent
                passHeight={h => {
                  setPickerPositionTop(
                    Dimensions.get('screen').height - (h - 0),
                  );
                }}
                SvgXmlString={floorData.svgToJson}
                activeBorderWidth={20}
                activeBorderColor="green"
                activeId={roomId}
                onPress={setRoomId}
              />
              {floors.length > 0 && pickerPositionTop && (
                <Picker
                  dropdownIconColor={'#FFCA06'}
                  selectedValue={floorIndex}
                  mode="dropdown"
                  style={[styles.floorPicker, {top: pickerPositionTop}]}
                  onValueChange={itemValue => setFloorIndex(itemValue)}>
                  {floorsDetails.map((f, i) => (
                    <Picker.Item
                      key={f.id}
                      label={`სართული ${f.title}`}
                      value={f.id}
                    />
                  ))}
                </Picker>
              )}
            </ZoomableView>
          )}
        </View>
      </AppLayout>
      <Modal visible={isLoading} animationType="slide" transparent={true}>
        <ActivityIndicator
          size={'small'}
          color={'#ffffff'}
          style={{
            alignSelf: 'center',
            transform: [{translateY: Dimensions.get('screen').height / 2}],
          }}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  roomId: {
    fontSize: 20,
    color: '#ffffff',
    position: 'absolute',
    top: 100,
    alignSelf: 'center',
  },
  floorPicker: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 50,
    width: 180,
    color: '#ffffff',
    elevation: 9,
  },
});
