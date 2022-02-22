
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { StatusBar } from 'react-native';
import { AppContext } from './AppContext/AppContext';
import AppStack from './Navigation/AppStack';
import { Colors } from './Colors/Colors';
import axios from 'axios';
import AuthService, { IInterceptop } from './Services/AuthService';
import translateService from './Services/translateService';
import AsyncStorage from './Services/StorageService';
import { default_lang_key, locale_key } from './lang';

const AppIndex = () => {
  const { state, setGlobalState } = useContext(AppContext);
  const { isDarkTheme } = state;

  const [userToken, setUserToken] = useState<string>("");
  const AxiosInterceptor = useRef<IInterceptop[]>([]);
  const [initialized, setInitialized] = useState(true);

  const RegisterCommonInterceptor = () => {
    let requestInterceptor = axios.interceptors.request.use((config: any) => {
      return config;
    });
    let responseInterceptor = axios.interceptors.response.use(
      (response: any) => {
        if (!response.config.objectResponse || response.data.expires_in) {
          return Promise.resolve(response)
        };
        return Promise.resolve(response);
      },
    );
    return {
      unsubscribe: () => {
        axios.interceptors.request.eject(requestInterceptor);
        axios.interceptors.response.eject(responseInterceptor);
      }
    };
  };

  let initialize = (lang?: string) => {
 
      translateService.use(lang || default_lang_key, (e) => {console.log(e)});
    
    setInitialized(true);
  };

  const logOut = useCallback(async () => {
    await AuthService.SignOut();
    setUserToken("");
    setGlobalState({ isUserAuthorized: false })
  }, [userToken]);

  useEffect(() => {
    //console.log('Developer <--Avtandil Shaburishvili, 08.04.2021--> ')
    AuthService.getToken().then(data => {
      setUserToken(data || "");
    });
    
  }, [userToken]);

  useEffect(() => {
    const transSub = translateService.subscribe((key: string) => {
      setInitialized(false);
      AsyncStorage.setItem(locale_key, key).then(res => {
        if(res !== null) {
          setInitialized(true);
        }
        setInitialized(true);
      }).catch(() => setInitialized(true));
    });

    return () => {
      transSub.unsubscribe();
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(locale_key).then(res => {console.log(res)
      if(res !== null) {
        initialize(res);
      } else {
        initialize();
      }
    }).catch(() => {
      initialize();
    })
  }, []);

  useEffect(() => {
    AxiosInterceptor.current = [RegisterCommonInterceptor(), AuthService.registerAuthInterceptor(async () => await logOut())];
    return () => {
      AxiosInterceptor.current.forEach(sub => sub.unsubscribe());
    }
  }, [userToken]);

  return (
    <>
      <StatusBar backgroundColor={isDarkTheme ? Colors.black : Colors.white} />
      <AppStack init={initialized} />
    </>
  );
};

export default AppIndex;
