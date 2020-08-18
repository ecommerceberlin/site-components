import React from 'react';

import People from '../components/People'
import Wrapper from '../components/Wrapper'
import AllPresenters from '../datasources/AllPresenters'


const WidgetPresentersAll = ({filter, limit, mobile, bio, ...wrapperProps}) => (

<Wrapper {...wrapperProps}>

<AllPresenters 
    filter={filter}
    limit={limit}
    random={false}
    mobile={mobile}
>{
    (filtered, all, record) =>  (<People
        data={filtered}
        link={false}
        text={ bio ? undefined : () => "" }
     />)
     
}</AllPresenters>
</Wrapper>)

WidgetPresentersAll.defaultProps = {
    label : "presenters.list_archive",
    filter : (item) => (item.featured == 1 && item.avatar_cdn.indexOf("cloudinary.com")>-1),
    limit : 16,
    mobile : 12,
    bio : false
}

export default WidgetPresentersAll;