import React from 'react';

import Wrapper from '../components/Wrapper'
import People from '../components/People'
import Datasource from '../datasources/Presenters'



const WidgetPresenters = ({label, secondaryLabel, limit, random, filter, disableTemps, link, bio}) => {


    const enhancedFilter = (item) => {

        if(disableTemps && (
            item.presenter.indexOf("TBA") > -1 ||
            item.cname2.indexOf("TBA") > -1 ||
            item.position.indexOf("TBA") > -1 ||
            item.presentation_title.indexOf("TBA") > -1
        )){
            return false
        }

        if(filter){
            return filter(item)
        }

        return true
    }
    

    return (

        <Wrapper label={label} secondaryLabel={secondaryLabel}>
    
        <Datasource  
            limit={limit}
            random={random}
            filter={enhancedFilter}  
        >{
            (data) => 
            <People 
                data={data}
                link={link} 
                text={ bio ? null : (item) => "" }
            />
    
        }</Datasource>
        
        </Wrapper> 
    
    
    )
}

WidgetPresenters.defaultProps = {
    label : "presenters.list_featured",
    secondaryLabel : "presenters.list_description",
    links : [],
    limit : 20,
    random : false,

    filter : function(item){ 
        return "presentation_title" in item && item.presentation_title.length > 10 && "bio" in item && item.bio.length > 10 && "avatar" in item && item.avatar.length > 10 && "logotype" in item && item.logotype.length > 10 
    },

    link : true,
    logotype : true,
    bio : false,
    disableTemps : false
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default WidgetPresenters