import React from 'react'
import moment from 'moment';
import 'moment/locale/de'
import 'moment/locale/pl'

import Event from '@material-ui/icons/Event'

import { useTranslate } from '../i18n';
import { useSettings } from '../helpers/hooks'

import VerticalTimeline from '../components/VerticalTimeline'



const defaultProps = {
    icons: {},
    baseLabel: ""
}


function WidgetVerticalTimeline({setting="cfptimeline", ...props}){

    const settings = useSettings(setting)
    const [translate, locale] = useTranslate()
    const {baseLabel, items, iconSize, icons} = Object.assign({}, defaultProps, settings, props)
    
    moment.locale(locale)

    const _baseLabel = baseLabel ? `${baseLabel}.` : ""

    const translatedItems = (items || []).map(({name, date, icon, ...rest}) => {

        const IconComponent = icon in icons && React.isValidElement(icons[icon]) ? icons[icon]: Event;

        return ({  
            ...rest, 
            date: moment(date).format("LL"),
            title: translate(`${_baseLabel}${name}.title`), 
            description: translate(`${_baseLabel}${name}.description`),
            icon: <IconComponent style={{fontSize: iconSize}} />
       })

    })

    return <VerticalTimeline items={translatedItems} />
  
}


export default WidgetVerticalTimeline