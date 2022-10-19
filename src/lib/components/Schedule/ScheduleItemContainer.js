
import {head} from 'lodash'
import {PresentationContext} from './context'
import DialogTitle from './DialogTitle'
import Card from '@material-ui/core/Card'
import CardActions from  '@material-ui/core/CardActions'
import Box from  '@material-ui/core/Box'
import DialogContentPresenter from './DialogContentPresenter'
import DialogContentPresentation from './DialogContentPresentation'
import ScheduleItemApply from './ScheduleItemApply'
import Presentation from './Presentation'
import ScheduleItemPresenter from './ScheduleItemPresenter'
import MyButton from '../MyButton'
import { dialogShow } from '../redux/actions';
import {useDispatch} from 'react-redux'
import { isEmpty } from 'lodash'






const ScheduleItemDialogTitle = ({setting="", data=[]}) => {

  const header = head(data)

  return (<PresentationContext data={header} setting={setting}>
    <DialogTitle />
  </PresentationContext>
  )

}


const ScheduleItemDialogContent = ({setting="", data=[]}) => {

  const header = head(data)

  return (<Box>

    <PresentationContext data={header} setting={setting}>
    <DialogContentPresentation />
    </PresentationContext>
    <Box>{data.map(item => 
     ( <PresentationContext key={item.id} data={item} setting={setting}>
        <DialogContentPresenter />
      </PresentationContext>)
    )}</Box>
    </Box>
  )

}

const ScheduleItemContainer = ({setting="", venue="", time="", data=[]}) => {

  const dispatch = useDispatch();

  const header = head(data)

  if(isEmpty(header)){
    return null
  }

  return (<Card>
    
      <PresentationContext data={header} setting={setting}>
      
      <Box p={2} pt={1}>
     
      <Presentation />
    
      {/* <Typography>{header.presentation_title}</Typography> */}

      {data.map((item, i) =>  (
      <PresentationContext key={item.id} data={item} setting={setting}>
      <ScheduleItemPresenter />
      </PresentationContext>))}

      </Box>
      <CardActions style={{display: "flex", justifyContent: "right", alignItems: "flex-start"}}>


      <MyButton label="common.details" onClick={() => dispatch(dialogShow({
          title: <ScheduleItemDialogTitle setting={setting} data={data} />,
          content: <ScheduleItemDialogContent setting={setting} data={data} />,
      }))} />

   
      <ScheduleItemApply />
      
      </CardActions>

      </PresentationContext>
   </Card>)

}

export default ScheduleItemContainer