import Gallery from '../components/Gallery'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'

const WidgetPhotostream = ({setting}) => (

   
    <Settings>{(get) => {

        const {wrapperProps, ...galleryProps} = get(setting)

        if(!wrapperProps){
            return (   <Gallery label={false} {...galleryProps} /> )
        }

        return (
            <Wrapper {...wrapperProps}>
              <Gallery label={false} {...galleryProps}/> 
            </Wrapper>
        )

        }
    
    }</Settings>
  
)

WidgetPhotostream.defaultProps = {
    setting: ""
}

export default WidgetPhotostream