import React from 'react'
import { useSelector } from 'react-redux'
import { VenueSelector } from './redux'
import { useSettings, resizeCloudinaryImage} from '../../helpers'
import size from 'lodash/size'

const PresentationContextProvider = React.createContext({});

export const usePresentation = () => {

    const context = React.useContext(PresentationContextProvider)  

    return context
}


export const PresentationContext = ({setting="", data={}, children}) => {
  
    const {times, venues, categories} = useSettings(setting)
    const selectedVenue = useSelector(VenueSelector)
    
    const value = React.useMemo(()=> ({
        categories,
        times,
        venues,
        venues_count: size(venues),
        selectedVenue, 


        id: data.id,
     
        presenter: data.presenter,
        company: data.cname2,
        position: data.position,
        bio: data.bio,
        linkedin: data.profile_linkedin,

        title: data.presentation_title,
        description: data.presentation_description,
        category: data.presentation_category,
        showDescription: Boolean(selectedVenue),

        
        time: data.presentation_time,
        venue: data.presentation_venue,
     
        avatar: resizeCloudinaryImage(data.avatar_cdn, 100, 100),
        logotype: resizeCloudinaryImage(data.logotype_cdn, 200, 200)

    }), [data, selectedVenue, times, venues, categories])
    
    return <PresentationContextProvider.Provider value={value}>{children}</PresentationContextProvider.Provider>
  }



