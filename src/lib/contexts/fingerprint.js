import {
    FpjsProvider,
    useVisitorData
  } from '@fingerprintjs/fingerprintjs-pro-react'

import { useSettings } from '../helpers'


const FingerprintProvider = ({
    setting="system.fingerprint", 
    children}) => {

    const {
      apiKey, 
      endpoint, 
      scriptUrlPattern,
      subdomain 
    } = useSettings(setting)

    const env = `${process.env.NODE_ENV}`

    if (typeof window == 'undefined' || env === "development") {
     return null
    }

    const host = `https://${subdomain}${window.location.hostname}`

    return <FpjsProvider
        loadOptions={{
            apiKey,
            region: "eu",
            scriptUrlPattern: `${host}${scriptUrlPattern}`,
            endpoint: `${host}${endpoint}`
        }}
  >
    {children}

  </FpjsProvider>

}

  
export {FingerprintProvider, useVisitorData}