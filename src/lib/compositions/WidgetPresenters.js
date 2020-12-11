import React from 'react';

import Wrapper from '../components/Wrapper'
import People from '../components/People'
import Presenters from '../datasources/Presenters'



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
    
        <Presenters  
            limit={limit}
            random={random}
            filter={enhancedFilter}  
        >{
            (data) => 
            <People 
                data={data}
                link={link} 
                text={ bio ? undefined : (item) => "" }
            />
    
        }</Presenters>
        
        </Wrapper> 
    
    
    )
}

WidgetPresenters.defaultProps = {
    label : "presenters.list_all",
    secondaryLabel : "presenters.list_description",
    links : [],
    limit : 100,
    random : false,

    filter : function(item){ 
        return "avatar" in item && item.avatar.indexOf("http") > -1 && "cname2" in item && item.cname2.length > 2 && "position" in item && item.position.length > 2 
    },

    link : false,
    logotype : true,
    bio : false,
    disableTemps : false
}


/*
 
<Link key="all" href="/presenters" label="common.menu.visitors.presenters" variant="flat" color="secondary" />,
<Link key="subjects" href="/schedule" label="common.menu.visitors.schedule" variant="flat" color="secondary" />

*/

export default WidgetPresenters