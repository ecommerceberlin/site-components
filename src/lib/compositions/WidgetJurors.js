import React from 'react';

import People from '../components/People'
import Wrapper from '../components/Wrapper'
import { useDatasource, useSettings } from '../helpers'
import isEmpty from 'lodash/isEmpty'

const defaultProps = {
    all: false,
    wrapperProps: {
        label : "cfp.jury.title",
        secondaryLabel : "cfp.jury.description",
    },
    filter : () => true,
    limit: 20,
    minToShow: 4,
    sort: null,
    link: false
}

const WidgetJurors = ({setting, ...props}) => {
    const settings = useSettings(setting)
    const {all, filter, limit, sort, random, minToShow, link, wrapperProps} = Object.assign({}, defaultProps, settings, props)
    const {data} = useDatasource({
        data: {
            resource: all? "jurors_all": "jurors",
            params: {},
            filters: {
                filter,
                limit,
                sort,
                random
            }
        }
    });

    if(isEmpty(data) || !Array.isArray(data) || data.length < minToShow){
        return null
    }

    return (        
        <Wrapper {...wrapperProps}>
        <People 
            data={data}
            link={link}   
        />
        </Wrapper>)
}


export default WidgetJurors;