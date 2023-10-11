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
            endpoint: `${host}`
        }}
  >
    {children}

  </FpjsProvider>

}

  
export {FingerprintProvider, useVisitorData}