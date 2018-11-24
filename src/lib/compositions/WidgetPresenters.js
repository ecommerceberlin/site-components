import React from 'react';

import Wrapper from '../components/Wrapper'
import People from '../components/People'
import Datasource from '../datasources/Presenters'


const WidgetPresenters = ({label, secondaryLabel, limit, random, filter, link}) => (

    <Wrapper label={label} secondaryLabel={secondaryLabel}>

    <Datasource  
        limit={limit}
        random={random}
        filter={filter}  
    >{
        (data) => 
        <People 
            data={data}
            link={link} 
        />

    }</Datasource>
    
    </Wrapper> 


)

WidgetPresenters.defaultProps = {
    label : "presenters.list_featured",
    secondaryLabel : "presenters.list_description",
    links : [],
    limit : 20,
    random : false,
    filter : function(item){ return [77504, 77505, 77508, 77529, 77557, 77773, 78014, 78429].indexOf(item.id) > -1 },
    link : true
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default WidgetPresenters