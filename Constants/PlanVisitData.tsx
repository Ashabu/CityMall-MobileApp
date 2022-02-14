import React from 'react';
import HowCome from '../Components/PlanVisit/HowCome';
import WorkingHours from "../Components/PlanVisit/WorkingHours";

export interface RoadMap{
    id: number,
    name: string,
    icon: string,
    content: JSX.Element
    routeName?: string
}

export default [
    {
        id: 1,
        name: 'ქალაქის რუკა',
        icon:  require('../assets/images/bigArrow.png'),
        content: <></>,
        routeName: 'GoogleMap'
    },
    {
        id: 2,
        name: 'სართულის გეგმა',
        icon:  require('../assets/images/bigArrow.png'),
        content: <></>,
        routeName: 'FloorMap'
    },
    {
        id: 3,
        name: 'სამუშაო საათები & კონტაქტი',
        icon:  require('../assets/images/bigArrow.png'),
        content: WorkingHours
       
    },
    {
        id: 4,
        name: 'როგორ მოხვიდე?',
        icon:  require('../assets/images/bigArrow.png'),
        content: HowCome

      
        
    },
]

