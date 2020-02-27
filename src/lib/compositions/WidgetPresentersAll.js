import React from 'react';

import People from '../components/People'
import Wrapper from '../components/Wrapper'
import Presenters from '../datasources/AllPresenters'


const WidgetPresentersAll = (filter, limit, mobile, bio, ...wrapperProps) => (

<Wrapper {...wrapperProps}>

<Presenters 
    filter={filter}
    limit={limit}
    random={false}
    mobile={mobile}
>{
    (filtered, all) =>  (<People
        data={filtered}
        link={false}
        text={ bio ? undefined : () => "" }
     />)
     
}</Presenters>
</Wrapper>)

WidgetPresentersAll.defaultProps = {
    label : "presenters.list_archive",
    filter : (item) => (item.featured == 1 && item.avatar_cdn.indexOf("cloudinary.com")>-1),
    limit : 16,
    mobile : 12,
    bio : false
}

export default WidgetPresentersAll;