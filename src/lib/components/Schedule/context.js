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
  

    const {times, venues, categories} = useSettings(setting, {})
    const selectedVenue = useSelector(VenueSelector)
    
    const profile = data && "profile" in data? data.profile: data;

    const value = React.useMemo(()=> ({
        categories,
        times,
        venues,
        venues_count: size(venues),
        selectedVenue, 
        showDescription: Boolean(selectedVenue),

        id: data.id,
        company_id: data.company_id,

        presenter: profile.presenter,
        company: profile.cname2,
        position: profile.position,
        bio: profile.bio,
        linkedin: profile.profile_linkedin,

        title: profile.presentation_title,
        description: profile.presentation_description,
        category: profile.presentation_category,
       
        time: profile.presentation_time,
        venue: profile.presentation_venue,
     
        avatar: resizeCloudinaryImage(profile.avatar_cdn, 100, 100),
        avatar_big: resizeCloudinaryImage(profile.avatar_cdn, 200, 200),
        logotype: resizeCloudinaryImage(profile.logotype_cdn, 200, 200),

        limited: profile.limited > 0,
        limit: parseInt(profile.limited),

    }), [data.id, profile, selectedVenue, times, venues, categories])
    
    return <PresentationContextProvider.Provider value={value}>{children}</PresentationContextProvider.Provider>
  }



