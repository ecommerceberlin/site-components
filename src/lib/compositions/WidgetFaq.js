import React from 'react'
import Wrapper from '../components/Wrapper'
import Faq from '../components/Faq'
import {useSettings} from '../helpers'
import isEmpty from 'lodash/isEmpty'

const defaultProps = {
    wrapperProps: {
        label: "cfp.faq.name",
        secondaryLabel: "cfp.faq.description",
    },
    baseLabel: "cfp.faq",
    items: [],
    url: "/",
    showTitle: false
}

const WidgetFaq = ({setting, ...props}) => {

    const settings = useSettings(setting)
    const {wrapperProps, icons} = Object.assign({}, defaultProps, settings, props)

    if(isEmpty(wrapperProps)){
        return <Faq setting={setting} icons={icons} />
    }

    return (
        <Wrapper {...wrapperProps}>
        <Faq setting={setting} icons={icons} />
        </Wrapper>
    )
}

export default WidgetFaq
