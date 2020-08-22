import Gallery from '../components/Gallery'
import Wrapper from '../components/Wrapper'
import Settings from '../datasources/Settings'

const WidgetPhotostream = (wrapperProps) => (

    <Wrapper {...wrapperProps}>
    <Settings>{
        (get) => <Gallery label={false} cols={get("photostream.cols", 12)} data={get("photostream.items", [])} /> 
    }</Settings>
    </Wrapper>
)

WidgetPhotostream.defaultProps = {
    label : "photostream.title",
    secondaryLabel: "photostream.description",
    // datasource: "photostream.items"
}

export default WidgetPhotostream