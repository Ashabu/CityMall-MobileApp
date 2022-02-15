
import React from 'react';
import AppIndex from './AppIndex';
import { createAppProvider } from './AppContext/AppContext';
import { AppState } from './AppContext/AppState';
import { PortalProvider } from '@gorhom/portal';

const AppProvider = createAppProvider(AppState);

const App = () => {
  
  return (
    <PortalProvider>
      <AppProvider>
      <AppIndex />
    </AppProvider>
    </PortalProvider>
   
  );
};

export default App;
