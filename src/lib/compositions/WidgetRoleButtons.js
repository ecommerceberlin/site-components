import FsButtons from '../components/FsButtons';
import Settings from '../datasources/Settings';

const WidgetRoleButtons = (props) => (
    <Settings name="rolebuttons">
        {(props) =>  <FsButtons {...props} />}
    </Settings>
)

WidgetRoleButtons.defaultProps = {
    
    items : [
    {
      url: 'https://static.eventjuicer.com/photos/12961446_1288640741145929_7684227399478032531_o.jpg',
      label: 'common.visitor',
      width: '50%',
      onClick : "/visit"
    },
    {
      url: 'https://static.eventjuicer.com/photos/12967348_1288628734480463_3860331543127036065_o.jpg',
      label: 'common.exhibitor',
      width: '50%',
      target : "/exhibit"
    },

  ]

}

export default WidgetRoleButtons;