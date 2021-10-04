import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty'
import { useDatasource, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Grid from '@material-ui/core/Grid' 
import PartnerPrizeDetails from './PartnerPrizeDetails'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
// import Paper from '@material-ui/core/Paper';
import Ok from '@material-ui/icons/SentimentVerySatisfied';
import NotOk from '@material-ui/icons/SentimentVeryDissatisfied';

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
  },
  green: {
      color: "lightgreen"
  },
  red: {
      color: "red"
  }
});



const PartnerPrizes = ({active=[], icons={}, full=false, points=0, position=0}) => {
    
    const data = useDatasource({resource: "prizes", filters:{
        sort: "level"
    }});

    const dialog = useDialog()
    const classes = useStyles()
    const [translate] = useTranslate()

    if(isEmpty(data) || !Array.isArray(data)){
        return null
    }

    const hasPoints = (required, points) => points >= required ? <Ok className={classes.green} />: <NotOk className={classes.red}  />
    const hasPosition = (min, max, position) => position <= max && position >= min? <Ok className={classes.green} />: <NotOk className={classes.red}  />

    const renderAssignment = (prize) => (<div>
        <Grid container spacing={2}>
        <Grid item>{translate("prizes.condition.points", {points: prize.level})}</Grid>
        <Grid item>{hasPoints(prize.level, points)}</Grid>
        </Grid>
        <Grid container spacing={2}>
        <Grid item>{translate("prizes.condition.position", {
        min: prize.min, 
        max: prize.max
        })}</Grid>
        <Grid item>{hasPosition(prize.min, prize.max, position)}</Grid>
        </Grid>
    </div>)

    const renderIcon = (prize) => {
        
        const name = capitalizeFirstLetter( prize.name )

        if(name in icons){
            return React.createElement(icons[name], {
                key: name,
                fontSize: "large",
                onClick: () => dialog({label: `prizes.${prize.name}.name`, content: <PartnerPrizeDetails {...prize} />}),
                className: (active || []).includes(prize.name)? classes.active: classes.disabled
            })
        }

        return name

    }


    if(full){
        return (<TableContainer><Table><TableBody>{data.map(prize => (
            <TableRow key={prize.name}>
            <TableCell>{renderIcon(prize)}</TableCell>
            <TableCell>{renderAssignment(prize)}</TableCell>
            </TableRow>
          ))
        }</TableBody></Table></TableContainer>)
    }


    return data.map(prize => renderIcon(prize))
}


export default PartnerPrizes