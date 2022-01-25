// RootNavigation.js
import * as React from 'react';
import { createNavigationContainerRef, DrawerActions } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';


export const navigationRef = createNavigationContainerRef()



export function navigate(route: string, params?: any) {
  
  if (navigationRef.isReady()) {
    console.log(route)
    navigationRef.navigate(route, params);
  }
}

export function GoBack() {
  if (navigationRef.isReady()) {
    navigationRef.goBack();
  }
};

export function toggleDrawer () {
  
  if (navigationRef.isReady()) {
    navigationRef.dispatch(DrawerActions.toggleDrawer())
  } 
};

export function openDrawer () {
  if (navigationRef.isReady()) {
    
    navigationRef.dispatch(DrawerActions.openDrawer())
  } 
};

export function closeDrawer () {
  if (navigationRef.isReady()) {
    
    navigationRef.dispatch(DrawerActions.closeDrawer())
  } 
};

        




// add other navigation functions that you need and export them