import Settings from '../datasources/Settings'
import MyDrawer from '../components/MyDrawer'
import defaultMenuItems from '../components/menuItems';

const WidgetMenu = ({items}) => (

    <Settings name="ui">{

        ({menuItems}) => {

            return (<MyDrawer items={menuItems} />)

        }
    }</Settings>

)

WidgetMenu.defaultProps = {
    menuItems : defaultMenuItems
}

export default WidgetMenu