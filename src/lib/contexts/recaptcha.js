
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3';


import { useSettings } from '../helpers'


const ReCaptchaProvider = ({
    setting="system.recaptcha", 
    children}) => {

    const {
      apiKey, 
      language,
      useRecaptchaNet,
      useEnterprise
    } = useSettings(setting)

    return <GoogleReCaptchaProvider
    reCaptchaKey={apiKey}
    language={language}
    useRecaptchaNet={useRecaptchaNet}
    useEnterprise={useEnterprise}
    scriptProps={{
      async: false, // optional, default to false,
      defer: false, // optional, default to false
      appendTo: 'head', // optional, default to "head", can be "head" or "body",
      nonce: undefined // optional, default undefined
    }}
    // container={{ // optional to render inside custom element
    //   element: "[required_id_or_htmlelement]",
    //   parameters: {
    //     badge: '[inline|bottomright|bottomleft]', // optional, default undefined
    //     theme: 'dark', // optional, default undefined
    //   }
    // }}
  >
    {children}

  </GoogleReCaptchaProvider>

}

  
export {ReCaptchaProvider, useGoogleReCaptcha}