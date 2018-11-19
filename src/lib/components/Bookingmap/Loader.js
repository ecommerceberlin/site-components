import ContentLoader from  'react-content-loader'

const Booth = (props) => (
    <rect rx="0" ry="0" width="75" height="50" {...props} /> 
)

const buildBooths = (maxW, maxH) => {

    //pointers!
    let currentH = 10, currentW = 10;
    const booths = []

    while (currentH <= maxH && currentW <= maxW) {

        booths.push(<Booth key={`${currentH}_${currentW}`} x={currentW} y={currentH} />)

        if(maxW - currentW < 100){
            currentW = 10
            currentH = currentH + 70
        }else{
            currentW = currentW + 100
        }

    }
    return booths;
}


const BookingmapLoader = (props) => (

    <ContentLoader
    speed={2}
    primaryColor="#f3f3f3"
    secondaryColor="#cccccc"
    {...props}
    >

    {buildBooths(props.width, props.height)}

    </ContentLoader>

)


BookingmapLoader.defaultProps = {
    height : 800,
    width : 1170,
    rows : 10,
    cols : 10
}

export default BookingmapLoader