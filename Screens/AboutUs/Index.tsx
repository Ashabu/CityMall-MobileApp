import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AboutUs from './AboutUs';
import Loyalty from './Loyalty';
import axios from 'axios';
import envs from './../../config/env';


type RouteParamList = {
    params: {
        id: number,
        routeId: number
    }
}

const AboutUsIndex = () => {
    const routeParams = useRoute<RouteProp<RouteParamList, 'params'>>();
    const [strings, setStrings] = useState<any>();

    useEffect(() => {
        axios.get(`${envs.API_URL}/api/Mobile/GetGeneralTxt`).then(res => {
          if (res.data) {
            setStrings(res.data);
           // console.log(res.data)
          }
        });
      }, []);

    return (
        routeParams.params.routeId === 1 ?
            <AboutUs strings={strings} />
            :
            <Loyalty strings={strings} />

    );
}

export default AboutUsIndex;
