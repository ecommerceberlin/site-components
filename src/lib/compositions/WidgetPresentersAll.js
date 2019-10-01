import React from 'react';

import People from '../components/People'
import Wrapper from '../components/Wrapper'
import Presenters from '../datasources/AllPresenters'


const WidgetPresentersAll = (filter, limit, mobile, wrapperProps) => (
<Wrapper {...wrapperProps}>
<Presenters 
    filter={filter}
    limit={limit}
    random={false}
    mobile={mobile}
>
    {(data) =>  <People
    link={false}
 />}
</Presenters>
</Wrapper>

)


WidgetPresentersAll.defaultProps = {
    label : "presenters.list_full",
    filter : (item) => item.featured == 1,
    limit : 16,
    mobile : 12
}

export default WidgetPresentersAll;