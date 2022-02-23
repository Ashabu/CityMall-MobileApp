import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import AboutUs from './AboutUs';
import Loyalty from './Loyalty';
import axios from 'axios';
import envs from './../../config/env';
import { AppContext } from '../../AppContext/AppContext';


type RouteParamList = {
    params: {
        id: number,
        routeId: number
    }
}

const AboutUsIndex = () => {
    const {state} = useContext(AppContext);
    const routeParams = useRoute<RouteProp<RouteParamList, 'params'>>();
    const [strings, setStrings] = useState<any>();

    useEffect(() => {
        axios.get(`${envs.API_URL}/api/Mobile/GetGeneralTxt`).then(res => {
          if (res.data) {
            setStrings(res.data);
           // console.log(res.data)
          }
        });
      }, [state.lang]);

    return (
        routeParams.params.routeId === 1 ?
            <AboutUs strings={strings} />
            :
            <Loyalty strings={strings} />

    );
}

export default AboutUsIndex;
