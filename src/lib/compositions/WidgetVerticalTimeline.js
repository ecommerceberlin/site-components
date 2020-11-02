import React from 'react'
import moment from 'moment';
import 'moment/locale/de' 
import Event from '@material-ui/icons/Event'

import { translate } from '../i18n';
import VerticalTimeline from '../components/VerticalTimeline'
import Settings from '../datasources/Settings'



function WidgetVerticalTimeline({translate, locale, setting, icons}){

    return (<Settings>{(get) => {

            moment.locale(locale)

            const {baseLabel, items, iconSize} = get(setting, {})

            const _baseLabel = baseLabel ? `${baseLabel}.` : ""

            const translatedItems = (items || []).map(({name, date, icon, ...rest}) => {

                const IconComponent = icon in icons && icons[icon] ? icons[icon]: Event;

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
    }</Settings>)

  
}

WidgetVerticalTimeline.defaultProps = {
    setting: "cfptimeline",
    icons: {}
}

export default translate(WidgetVerticalTimeline)