import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import AppLayout from './AppLayout';
import MapComponent from './FloorMap/Map';
import ZoomableView from './FloorMap/ZoomableView';
import envs from './../config/env';
import { RouteProp, useRoute } from '@react-navigation/native';
import { navigate } from '../Services/NavigationServices';

type RouteParamList = {
  params: {
    mallId: number;
  };
};

export default () => {
  const { state, setGlobalState } = useContext(AppContext);
  const { isDarkTheme } = state;
  const route = useRoute<RouteProp<RouteParamList, 'params'>>();
  const [roomId, setRoomId] = useState<number | string | undefined>('');
  const [floors, setFloors] = useState<Array<any>>([]);
  const [floorIndex, setFloorIndex] = useState<any>(1);
  const [floorIndexTemp, setFloorIndexTemp] = useState<any>(1);
  const [pickerPositionTop, setPickerPositionTop] = useState<
    number | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(false);
  // const [floor, setFloor] = useState<any>();
  const [floorsDetails, setFloorsDetails] = useState<Array<any>>([]);
  const [floorData, setFloorData] = useState<any>();
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (!isNaN(parseInt(roomId?.toString() || ''))) {
      setIsLoading(true);
      axios
        .get(`${envs.API_URL}/api/Mobile/GetConnectStore?StoreId=${roomId}`)
        .then(res => {
          setGlobalState({ singleMerchant: res.data });
          navigate('ShopDetailsScreen');
          setIsLoading(false);
        }).catch(() => setIsLoading(true));
    }
  }, [roomId]);



  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `${envs.API_URL}/api/Connect/GetFloorsMap?address=${route.params?.mallId || 1}`,
      )
      .then(res => {
        setFloors(res.data.floors);
        setIsLoading(false);
      }).catch(() => {
        setIsLoading(false);
      });
  }, [route.params?.mallId]);

  useEffect(() => {
    axios
      .get(`${envs.API_URL}/api/Connect/GetFloors`)
      .then(res => {


        if (res.data) {
          const ret: any = []
          floors.map(f => {
            const data = res.data.filter((fd: any) => fd.id == f.title);
            if (data.length) {
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

  const choseItem = () => {
setSelecting(false);
setFloorIndex(floorIndexTemp);
  }

let btnTitle = '';
try{
  btnTitle = floorsDetails.filter(f => f.id === floorIndex)[0].title;
} catch(e) {
  
}

  return (
    <>
      <AppLayout pageTitle={'სართულის გეგმა'}>
        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: isDarkTheme ? Colors.black : Colors.white },
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
                Platform.OS === 'android' ? <Picker
                  dropdownIconColor={'#FFCA06'}
                  selectedValue={floorIndex}
                  mode="dropdown"
                  style={[styles.floorPicker, { top: pickerPositionTop }]}
                  onValueChange={itemValue => setFloorIndex(itemValue)}>
                  {floorsDetails.map((f, i) => (
                    <Picker.Item
                      key={f.id}
                      label={`სართული ${f.title}`}
                      value={f.id}
                    />
                  ))}
                </Picker> :
                  <TouchableOpacity onPress={() => setSelecting(!selecting)} style={[styles.floorPicker, { marginLeft: 10, paddingHorizontal: 5, paddingVertical: 5, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center'}, { top: pickerPositionTop + 20 }]}>
                    <Text style={{ color: Colors.black }}>
                    {`სართული ${btnTitle}`}
                    </Text>
                  </TouchableOpacity>
              )}
            </ZoomableView>
          )}
        </View>
      </AppLayout>
      <Modal visible={selecting} animationType="slide" transparent={true} style={{ position: 'relative' }} >
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => setSelecting(false)}>
          <View onStartShouldSetResponder={(event) => true}
            onTouchEnd={(e) => {
              e.stopPropagation();
            }} style={{ flex: 1, backgroundColor: Colors.black, maxHeight: 250, position: 'absolute', bottom: 0, left: 0, right: 0, borderTopLeftRadius: 14, borderTopRightRadius: 14 }}>
            <Picker
              dropdownIconColor={'#FFCA06'}
              selectedValue={floorIndexTemp}
              itemStyle={{color: '#ffffff'}}
              mode="dropdown"
              onValueChange={itemValue => setFloorIndexTemp(itemValue)}>
              {floorsDetails.map((f, i) => (
                <Picker.Item
               
                  key={f.id}
                  label={`სართული ${f.title}`}
                  value={f.id}
                />
              ))}
            </Picker>
            <TouchableOpacity style={[styles.modalBar, {marginBottom: 40}]} onPress={() => choseItem()}>
                                <Text style={[styles.infoText, { textAlign: 'right', color: Colors.red }]}>არჩევა</Text>
                            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal visible={isLoading} animationType="slide" transparent={true}>
        <ActivityIndicator
          size={'small'}
          color={'#ffffff'}
          style={{
            alignSelf: 'center',
            transform: [{ translateY: Dimensions.get('screen').height / 2 }],
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
    width: 220,
    color: '#ffffff',
    elevation: 9,
  },

  infoText: {
    fontSize: 20,
    fontFamily: 'HMpangram-Medium',
    color:  Colors.black
},
modalBar: {
    marginHorizontal: 15,
}
});
