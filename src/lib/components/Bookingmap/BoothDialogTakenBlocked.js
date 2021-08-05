import React from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import BoothDialogContainer from './BoothDialogContainer'
import BoothDialogLegend from './BoothDialogLegend'
import {useTranslate} from '../../i18n'
import Box from '@material-ui/core/Box'
import LockIcon from '@material-ui/icons/Lock';

const BoothDialogTakenBlocked = ({setting, ...boothProps}) => {

    const [translate] = useTranslate()

    return (
        <BoothDialogContainer 
        setting={setting}
        header={
        
        <div>
             <Box mt={2}><Alert icon={<LockIcon />} severity="error" variant="filled" >
             <AlertTitle>{translate("common.error")}</AlertTitle>{translate("event.sales.booths.lock")}</Alert>
             </Box>
             <BoothDialogLegend setting={setting} />
        </div>
       } 
        // content={ }
        {...boothProps} />
    )
}

export default BoothDialogTakenBlocked
