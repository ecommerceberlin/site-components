import React from 'react'
import Settings from '../datasources/Settings'
import MyDrawer from '../components/MyDrawer'
import defaultMenuItems from '../components/menuItems';

const WidgetMenu = ({defaultMenuItems}) => (

    <Settings>{

        (get) => {

            return (<MyDrawer items={ get("ui.menuItems", defaultMenuItems) } />)

        }
    }</Settings>

)

WidgetMenu.defaultProps = {
    defaultMenuItems : defaultMenuItems
}

export default WidgetMenu