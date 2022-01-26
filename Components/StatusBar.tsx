import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppContext} from '../AppContext/AppContext';
import {Colors} from '../Colors/Colors';
import {useDimension} from '../Hooks/UseDimension';

const data = {
  name: 'ცისანა',
  surname: 'თოდრია',
  ballance: null,
  points: 11100,
  status: 'სილვერი',
  category: 1,
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

const StatusBar = () => {
  const {state} = useContext(AppContext);
  const [pointArray, setPointArray] = useState<Array<number>>([]);
  const {isDarkTheme} = state;
  const {width} = useDimension();

  const lineWidth = width / 2 - 70 - (width * 15) / 100;
  const curPoints = data.points; // ეს არის სერვისის მიერ დაბრუნებული მნიშვნელობა

  useEffect(() => {
    setPointArray([]);
    data.categoryPointInfo.map((point, index) => {
      if (index !== 0) {
        setPointArray(prev => [...(prev || []), point.point]);
      }
    });
  }, [data.categoryPointInfo]);

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
    backgroundColor: isDarkTheme? Colors.black : Colors.white,
    borderWidth: 1,
    borderColor: isDarkTheme? Colors.white : Colors.black
  }

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.round, {backgroundColor: Colors.standart}]}/>
        </View>

        <View style={{position: 'relative'}}>
          <View style={[styles.line, {width: lineWidth}, ]}/>
          <View style={[
              styles.line,
              {
                width: getMax(_progressValue(curPoints, pointArray[0]), 1),
                backgroundColor: Colors.standart,
                position: 'absolute',
              },
            ]}
          />
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.round, data.category >=2? activeCategorySilver: inActiveCategory]}/>
        </View>

        <View style={{position: 'relative'}}>
          <View
            style={[
              styles.line,
              {width: lineWidth},
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

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={[styles.round, data.category >=3? activeCategoryGold: inActiveCategory]}/>
          <View style={{position: 'relative'}}>
            <View
              style={[
                styles.line,
                {width: lineWidth},
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
        <View style={[styles.round, data.category === 4? activeCategoryPlatinum: inActiveCategory]}/>
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
    </>
  );
};
export default StatusBar;

const styles = StyleSheet.create({
  round: {
    borderRadius: 15,
    width: 30,
    height: 30,
  },

  line: {
    height: 8,
    borderColor: Colors.white,
    borderWidth: 1
  },
});
