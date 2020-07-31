import FsButtons from '../components/FsButtons';
import Settings from '../datasources/Settings';

const WidgetRoleButtons = (props) => (
    <Settings>
        {(get) =>  <FsButtons {...get("rolebuttons", props)} />}
    </Settings>
)

WidgetRoleButtons.defaultProps = {
    accent : "gold",
    items : []

}

export default WidgetRoleButtons;