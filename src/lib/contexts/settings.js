import React from 'react'
import get from 'lodash/get'

export const SettingsContextContainer = React.createContext({});

export const useSettingsCtx = (path = null, fallback = undefined) => {

    const {settings} = React.useContext(SettingsContextContainer)  

    const out = get(settings, path, undefined)

    if(out !== undefined){
        return out
    }

    if(fallback !== undefined){
        return fallback
    }

    return {}
}


export const SettingsContext = ({data={}, children}) => {
    const [settings, setSettingsFunc] = React.useState(data)
    const setSettings = React.useCallback((test) => setSettingsFunc(test))

    const value = React.useMemo(()=> ({
        settings,
        setSettings
    }), [settings])
    
    return <SettingsContextContainer.Provider value={value}>{children}</SettingsContextContainer.Provider>
  }



