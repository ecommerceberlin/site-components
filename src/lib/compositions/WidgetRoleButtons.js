import FsButtons from '../components/FsButtons';
import Settings from '../datasources/Settings';

const WidgetRoleButtons = (props) => (
    <Settings name="rolebuttons">
        {(props) =>  <FsButtons {...props} />}
    </Settings>
)

WidgetRoleButtons.defaultProps = {
    accent : "gold",
    items : []

}

export default WidgetRoleButtons;