import React from 'react'
// import { useSelector } from 'react-redux'
import { useSettings, resizeCloudinaryImage} from '../../helpers'
import {get, map, isEmpty} from 'lodash'

const CompanyContextContainer = React.createContext({});

export const useCompany = () => {

    const context = React.useContext(CompanyContextContainer)  

    return context
}

/**
 *   const hasHTML = /<\/?[a-z][\s\S]*>/i.test(text)
 */

export const CompanyContextProvider = ({setting="", data={}, children}) => {

  
    const settings = useSettings(setting, {})
    
    const value = React.useMemo(()=> {

        const purchases = get(data, 'instances', [])
        const boothIds = map(purchases, 'formdata.id').filter(v => v && v.length);  
        const boothNames = map(purchases, 'formdata.ti').filter(v => v && v.length);  
        
        console.log(boothIds)

        return {
     
            id: data.id,
            debut: data.debut,
            featured: data.featured,
            promo: data.promo,
            slug: data.slug,

            name: get(data, "profile.name", ""),
            about: get(data, "profile.about", ""),
            products: get(data, "profile.products", ""),
            expo: get(data, "profile.expo", ""),
            keywords: get(data, "profile.keywords", []),
            countries: get(data, "profile.countries", ""),
            lang: get(data, "profile.lang", ""),

            contacts: {
                website: get(data, "profile.website", ""),
                facebook: get(data, "profile.facebook", ""),
                linkedin: get(data, "profile.linkedin", ""),
                twitter: get(data, "profile.twitter", ""),
                xing: get(data, "profile.xing", ""),
            },

            boothIds,
            boothNames,
           
            present: !isEmpty(boothIds),
            legacy: `${process.env.NEXT_PUBLIC_PROJECT}` == "ecommerceberlin.com",

            logotype: get(data, "profile.thumbnail"),
            og_image: get(data, "profile.og_image"),
    
            mapSetting: "bookingmap",

            ...settings
    
        }

    }, [data, settings])
    
    return <CompanyContextContainer.Provider value={value}>{children}</CompanyContextContainer.Provider>

}


// profile:

// logotype: "https://image.ceneostatic.pl/data/custom_images/4317/custom_image.png"
// logotype_cdn: "https://res.cloudinary.com/eventjuicer/image/upload/v1614688079/c_1221_logotype.png"

// og_image: "https://res.cloudinary.com/eventjuicer/image/upload/c_fit,h_210,w_800/u_template_teh20_exhibitor_pl,y_10/v1614688079/c_1221_logotype.png"
// og_template: "template_teh20_exhibitor"
// opengraph_image: "https://domain.com"
// opengraph_image_cdn: ""
// thumbnail: "https://res.cloudinary.com/eventjuicer/image/upload/w_600,h_600,c_fit,f_auto/v1614688079/c_1221_logotype.png"





