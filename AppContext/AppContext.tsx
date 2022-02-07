import React, { createContext, useState } from "react";
import {IAppState} from './AppState';

const AppContext = createContext<any>({});

interface IContextValue {
    state: IAppState,
    setGlobalState: (value: any) => void,
}

const createAppProvider = (initialState: IAppState) => ({children}: any) => {
    const [appState, setAppState] = useState<IAppState>(initialState);
    
    const setGlobalState = (updateValue: any) => {
        setAppState((prevState: any)=>({
            ...prevState,
            ...updateValue
        }));
    };
    console.log('objectTypeId ==>', appState.objectTypeId);
    console.log('categoryArray ==>', appState.categoryArray);
    console.log('subCategoryArray ==>', appState.subCategoryArray);
    
    return <AppContext.Provider
        value ={{
            state: appState,
            setGlobalState,
        }}
    >
        {children}
    </AppContext.Provider>
};

export {AppContext, createAppProvider}