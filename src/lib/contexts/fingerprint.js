import {
    FpjsProvider,
    useVisitorData,
    defaultScriptUrlPattern
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
            endpoint: `${host}`,
            scriptUrlPattern: [
              `${host}/web/v<version>/<apiKey>/loader_v<loaderVersion>.js`,
              defaultScriptUrlPattern
          ]
        }}
  >
    {children}

  </FpjsProvider>

}

/**
 * 
 * FingerprintJS.load({
  apiKey: "DX6tMYsW74dcjf3JGHcg",
  region: "eu",
  endpoint: "https://metrics.targiehandlu.pl",
  scriptUrlPattern: "https://metrics.targiehandlu.pl/web/v<version>/<apiKey>/loader_v<loaderVersion>.js"
})
 */

  
export {FingerprintProvider, useVisitorData}