import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty'
import { useDatasource, useDialog, capitalizeFirstLetter } from '../helpers'
// import { useTranslate } from '../i18n'
// import Button from './MyButton';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid' 
// import Paper from '@material-ui/core/Paper';
import PartnerPrizeDetails from './PartnerPrizeDetails'

 const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    width: 300,
    height: 300,
  },
  avatarImg: {
    objectFit: "contain",
    maxHeight: "85%",
    maxWidth: "85%",
  },
  active: {
    color: "black",
    cursor: "pointer"
  },
  disabled: {
    color: "#ccc",
    cursor: "pointer"
  }
});



const PartnerPrizes = ({active=[], icons={}}) => {
    const data = useDatasource({resource: "prizes", filters:{
        sort: "level"
    }});
    const dialog = useDialog()
    const classes = useStyles()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }
    return data.map(prize => {

        const name = capitalizeFirstLetter( prize.name )

        if(name in icons){
            return React.createElement(icons[name], {
                fontSize: "large",
                onClick: () => dialog({label: `prizes.${prize.name}.name`, content: <PartnerPrizeDetails {...prize} />}),
                className: (active || []).includes(prize.name)? classes.active: classes.disabled
            })
        }

        return prize.name
    })
}


export default PartnerPrizes