import Gallery from '../components/Gallery'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'

const WidgetPhotostream = ({setting}) => (

   
    <Settings>{(get) => {

        const {items, cols, wrapperProps} = get(setting)

        if(!wrapperProps){
            return (   <Gallery label={false} cols={cols} data={items} /> )
        }

        return (
            <Wrapper {...wrapperProps}>
              <Gallery label={false} cols={cols} data={items} /> 
            </Wrapper>
        )

        }
    
    }</Settings>
  
)

WidgetPhotostream.defaultProps = {
    setting: ""
}

export default WidgetPhotostream