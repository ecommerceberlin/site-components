import React, {useMemo, useContext} from 'react'
import { getBookingmap } from '../../redux/selectors'
import { useSelector, shallowEqual } from 'react-redux'
import { getStylingName } from './boothStyles'
import { useSettings } from '../../helpers'

// import {
//     getCart, 
//     KeyedFormdataSelector, 
//     KeyedTicketGroupsSelector
//   } from '../../redux/selectors'
  
  import {
    BoothFormdataSelector, 
    BoothSelectedSelector,
    BoothBlockedSelector,
    BoothTicketGroupSelector
  } from './selectors'




const BoothContextContainer = React.createContext({})

export const useBookingmapSettings = (setting, props={}) => {

    const defaultProps = {
        zoom: 1,
        boothStyleMapping: {},
        disabledTicketIds: [],
        disabledTicketGroupIds: [],
        disabled: false,
        allowedGroupIds: [],
    }

    const settings = useSettings(setting)
    return useMemo(() => ({...defaultProps, ...settings, ...props}), [setting])
}

const BoothContext = ({id, children, setting, dt, dl, dw, dh, ti, g, ...props}) => {


    const {zoom, boothStyleMapping, disabledTicketGroupIds, disabled} = useBookingmapSettings(setting, props) 
    const {status, name, image, participant_id, company_id} = useSelector((state) => BoothFormdataSelector(state, id), shallowEqual)
    const selected = useSelector(state => BoothSelectedSelector(state, id))
    const lock = useSelector(state => BoothBlockedSelector(state, id))
    const defaultSize = useSelector(state => BoothTicketGroupSelector(state, g))
   // const bookingmap = useSelector(getBookingmap)

    const checkSize = (value) => value > 0? value: defaultSize
    const _zoom = parseInt(zoom)

    const value = useMemo(() => ({
        setting,
        zoom: _zoom,
        status,
        name, //company name
        image,  //company image
        selected,
        lock,
        disabled,
        blocked: lock === false,
        hold: status === "hold",
        sold: status === "sold",
        unavailable: !ti || disabledTicketGroupIds.includes(g),
        styleName: getStylingName(boothStyleMapping, g),
        sizes: {
            height: checkSize(dh) * _zoom,
            width: checkSize(dw) * _zoom,
        },
        xy: {   
            top: dt? dt * _zoom : "auto",
            left: dl? dl * _zoom : "auto",
        },
        id,
        g,
        ti,
        company_id,
        participant_id
    }), [setting, selected, lock, status, defaultSize])

    return (<BoothContextContainer.Provider value={value}>{children}</BoothContextContainer.Provider>)

}

export const useBoothContext = () => {

    const context = useContext(BoothContextContainer)

    return context
}


export default BoothContext