import { Portal } from '@gorhom/portal';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { AppContext } from '../AppContext/AppContext';
import { Colors } from '../Colors/Colors';
import { useDimension } from '../Hooks/UseDimension';

const data = {
  name: 'ცისანა',
  surname: 'თოდრია',
  ballance: null,
  points: 121100,
  status: 'სილვერი',
  category: 3,
  categoryStatus: 1,
  categoryPointInfo: [
    {
      point: 0,
      pointsLeft: 0,
      category: 1,
    },
    {
      point: 40000,
      pointsLeft: 0,
      category: 2,
    },
    {
      point: 90000,
      pointsLeft: 89900,
      category: 3,
    },
    {
      point: 150000,
      pointsLeft: 149900,
      category: 4,
    },
  ],
};

const StatusBar = (props: any) => {
  const { state } = useContext(AppContext);
  const { isDarkTheme } = state;
  const { width, height } = useDimension();

  const [pointArray, setPointArray] = useState<Array<number>>([]);
  const [visible, setVisible] = useState(false);

  const lineWidth = width / 2 - 70 - (width * 15) / 100;
  const curPoints = props?.data?.points; // ეს არის სერვისის მიერ დაბრუნებული მნიშვნელობა

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    setPointArray([]);
    if (props.data?.categoryPointInfo)
      props.data?.categoryPointInfo.map((point: any, index: number) => {
        if (index !== 0) {
          setPointArray(prev => [...(prev || []), point.point]);
        }
      });
  }, [props.data?.categoryPointInfo]);

  const _progressValue = (value: number, points: number) => {
    const mod = points / lineWidth;
    return value / mod;
  };

  const getMax = (value: number, mod: number) => {
    if (value < lineWidth) {
      return value;
    } else if (value === lineWidth) {
      return lineWidth;
    } else if (value > lineWidth) {
      return lineWidth;
    }
  };

  const activeCategorySilver = {
    backgroundColor: Colors.silver,
    borderWidth: 0
  }

  const activeCategoryGold = {
    backgroundColor: Colors.gold,
    borderWidth: 0
  }

  const activeCategoryPlatinum = {
    backgroundColor: Colors.platinum,
    borderWidth: 0
  }

  const inActiveCategory = {
    backgroundColor: isDarkTheme ? Colors.black : Colors.white,
    borderWidth: 1,
    borderColor: isDarkTheme ? Colors.white : Colors.black
  }

  return (
    <View style={{ position: 'relative' }}>
      {visible ?
        <View>
          <Portal>
            <TouchableOpacity style={[styles.dropDown, { height: height, width: width }]} onPress={() => setVisible(false)}>
              <View style={{ backgroundColor: Colors.black, top: 275, width: 113, height: 89, borderRadius: 10 }} onStartShouldSetResponder={event => true}>
                <Text style={{ color: Colors.white, padding: 10 }}>,,სილვერის" სტატუსამდე დაგრჩათ 100 ქულა</Text>
              </View>
            </TouchableOpacity>
          </Portal>

        </View>

        : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={toggleDropdown}
            style={[styles.round, { borderColor: isDarkTheme ? Colors.white : Colors.black }]}>
            <View style={[styles.checkmark, { borderBottomColor: isDarkTheme ? Colors.white : Colors.black, borderRightColor: isDarkTheme ? Colors.white : Colors.black }]} />
          </TouchableOpacity>
        </View>

        <View style={{ position: 'relative' }}>
          <View style={[styles.line, { width: lineWidth },]} />
          <View style={[
            styles.line,
            {
              width: getMax(_progressValue(curPoints, pointArray[0]), 1),
              backgroundColor: Colors.standard,
              position: 'absolute',
            },
          ]}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.round, props?.data?.category >= 2 ? activeCategorySilver : inActiveCategory]}>
            <View style={[styles.checkmark, { borderBottomColor: isDarkTheme ? Colors.white : Colors.black, borderRightColor: isDarkTheme ? Colors.white : Colors.black }]} />
          </View>
        </View>

        <View style={{ position: 'relative' }}>
          <View
            style={[
              styles.line,
              { width: lineWidth },
            ]}
          />
          <View
            style={[
              styles.line,
              {
                width: getMax(
                  _progressValue(
                    curPoints - pointArray[0],
                    pointArray[1] - pointArray[0],
                  ),
                  2,
                ),
                backgroundColor: Colors.silver,
                position: 'absolute',
              },
            ]}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={[styles.round, props?.data?.category >= 3 ? activeCategoryGold : inActiveCategory]}>
            <View style={[styles.checkmark, { borderBottomColor: isDarkTheme ? Colors.white : Colors.black, borderRightColor: isDarkTheme ? Colors.white : Colors.black }]} />
          </View>
          <View style={{ position: 'relative' }}>
            <View
              style={[
                styles.line,
                { width: lineWidth },
              ]}
            />
            <View
              style={[
                styles.line,
                {
                  width: getMax(
                    _progressValue(
                      curPoints - pointArray[1],
                      pointArray[2] - pointArray[1],
                    ),
                    3,
                  ),
                  backgroundColor: Colors.gold,
                  position: 'absolute',
                },
              ]}
            />
          </View>
        </View>
        <View style={[styles.round, { borderColor: isDarkTheme ? Colors.white : Colors.black }, props?.data?.category === 4 ? activeCategoryPlatinum : inActiveCategory]}>
          <View style={[styles.checkmark, { borderBottomColor: isDarkTheme ? Colors.white : Colors.black, borderRightColor: isDarkTheme ? Colors.white : Colors.black }]} />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '45%',
          }}>

          <Text
            style={{
              color: isDarkTheme ? Colors.white : Colors.black,
              fontSize: 10,
            }}>
            სტანდარტი
          </Text>
          <Text
            style={{
              color: isDarkTheme ? Colors.white : Colors.black,
              fontSize: 10,
            }}>
            ვერცხლი
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '40%',
          }}>
          <Text
            style={{
              color: isDarkTheme ? Colors.white : Colors.black,
              fontSize: 10,
            }}>
            ოქრო
          </Text>
          <Text
            style={{
              color: isDarkTheme ? Colors.white : Colors.black,
              fontSize: 10,
            }}>
            პლატინა
          </Text>
        </View>
      </View>
    </View>
  );
};
export default StatusBar;




const styles = StyleSheet.create({
  round: {
    position: 'relative',
    borderRadius: 15,
    width: 30,
    height: 30,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [
      { rotate: "45deg" },
    ]
  },

  checkmark: {
    borderBottomWidth: 2,
    borderRightWidth: 2,
    width: 7,
    height: 10,
    position: 'relative',
    top: -1,
    left: -1
  },


  line: {
    height: 8,
    borderColor: Colors.white,
    borderWidth: 1
  },
  dropDown: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: '#a8a7a761',

  }
});
