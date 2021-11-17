import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import PartnerPrizes from './PartnerPrizes'
import ToolBar from './ToolBar'

 const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    width: 200,
    height: 70,
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
  grayed: {
    color: "#ccc"
  }
}));


const PartnerPerformance = ({icons, event_id=null, show_points=true, limit=undefined}) => {
   
   const classes = useStyles()
   const data = useDatasource({resource: "ranking", 
   ...(event_id? {params: {event_id}}: {}),
   filters:{
     limit: limit,
     sort: show_points? "stats.sessions": "slug",
     dir: show_points? "DESC": "ASC"
   }});
   const [translate] = useTranslate()

    if(isEmpty(data)){
        return null
    }

   return ( 
    <ToolBar 
      data={data} 
      indexes={[
        "name",
        "slug"
      ]}
      render={(filtered) => (<Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
    {show_points && <TableCell align="center">{translate("common.position")}</TableCell>}
    <TableCell align="center">{translate("common.exhibitor")}</TableCell>
    {show_points && <TableCell align="right">{translate("common.points")}</TableCell>}
    <TableCell align="center">{translate("exhibitor.prizes.list")}</TableCell>
    {!limit && <TableCell></TableCell>}
    </TableRow>
    </TableHead>
    <TableBody>{filtered.map((row) => (<TableRow key={row.id}>
    {show_points && <TableCell align="center"><Typography variant="h4" className={classes.grayed}>{row.stats.position}</Typography></TableCell>}
    <TableCell align="center" width="200">
        <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(row.logotype, 200, 70) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
        </Grid>
        <Grid item>{row.name}</Grid>
        </Grid>
    </TableCell>
    {show_points &&  <TableCell align="right"><Typography variant="h5">{row.stats.sessions}</Typography></TableCell>}
    <TableCell align="center"><PartnerPrizes active={row.stats.prizes} icons={icons} /></TableCell>
    {!limit && <TableCell><Button variant="outlined" href={`/companies/${row.company_id}`} label="common.details" /></TableCell>}

    </TableRow>))}
    </TableBody>
    </Table>)} />)
 }


export default PartnerPerformance