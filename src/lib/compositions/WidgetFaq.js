import React from 'react'
import Wrapper from '../components/Wrapper'
import Faq from '../components/Faq'
import {useSettings} from '../helpers'


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
    const {wrapperProps} = Object.assign({}, defaultProps, settings, props)

    return (
        <Wrapper {...wrapperProps}>
        <Faq setting={setting} />
        </Wrapper>
    )
}

export default WidgetFaq
