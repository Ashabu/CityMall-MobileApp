import React from 'react';
import HowCome from '../Components/PlanVisit/HowCome';
import WorkingHours from "../Components/PlanVisit/WorkingHours";

export interface RoadMap{
    id: number,
    name: string,
    lightIcon: string,
    darkIcon: string,
    content: JSX.Element
    routeName?: string
}

export default [
    {
        id: 1,
        name: 'ქალაქის რუკა',
        lightIcon:  require('../assets/images/bigArrow.png'),
        darkIcon:  require('../assets/images/big-black-arrow.png'),
        content: <></>,
        routeName: 'GoogleMap'
    },
    {
        id: 2,
        name: 'სართულის გეგმა',
        lightIcon:  require('../assets/images/bigArrow.png'),
        darkIcon:  require('../assets/images/big-black-arrow.png'),
        content: <></>,
        routeName: 'FloorMap'
    },
    {
        id: 3,
        name: 'სამუშაო საათები & კონტაქტი',
        lightIcon:  require('../assets/images/bigArrow.png'),
        darkIcon:  require('../assets/images/big-black-arrow.png'),
        content: WorkingHours
       
    },
    {
        id: 4,
        name: 'როგორ მოხვიდე?',
        lightIcon:  require('../assets/images/bigArrow.png'),
        darkIcon:  require('../assets/images/big-black-arrow.png'),
        content: HowCome

      
        
    },
]

