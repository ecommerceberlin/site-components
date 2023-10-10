import {
    FpjsProvider,
    useVisitorData
  } from '@fingerprintjs/fingerprintjs-pro-react'

import { useSettings } from '../helpers'


const FingerprintProvider = ({
    setting="system.fingerprint", 
    children}) => {

    const {apiKey} = useSettings(setting)

    return <FpjsProvider
        loadOptions={{
            apiKey,
            region: "eu"
        }}
  >
    {children}

  </FpjsProvider>

}

  
export {FingerprintProvider, useVisitorData}