
import React from 'react'
import { useVisitorData } from '../contexts'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';


const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const Promoninja = ({id, threshold=200, wait=3000}) => {
    
    const scrollTrigger = useScrollTrigger({ threshold });
    const [thresholdMatched, setThresholdMatched] = React.useState(false)

    const {getData} = useVisitorData(
        {extendedResult: false},
        {immediate: false}
  )

    React.useEffect(()=>{
        if(scrollTrigger){
            setThresholdMatched(true)
        }
    }, [scrollTrigger])


    React.useEffect(() => {
        if(thresholdMatched && id){
            delay(wait).then(() => {
                getData({tag: id}).then(({visitorId}) => {
                    console.log(visitorId)
                })
            })
        }
    }, [thresholdMatched, wait, id])  
    
    return null

}

export default Promoninja