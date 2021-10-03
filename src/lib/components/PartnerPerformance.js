import React from 'react'
import Grid from '@material-ui/core/Grid' 
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { useDatasource, resizeCloudinaryImage, useDialog, capitalizeFirstLetter } from '../helpers'
import { useTranslate } from '../i18n'
import Button from './MyButton';
import Typography from '@material-ui/core/Typography';
import isEmpty from 'lodash/isEmpty'
import PartnerPrizes from './PartnerPrizes'

 const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  avatarContainer: {
    height: 40,
    width: 175,
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


const PartnerPerformance = ({icons}) => {
   
   const classes = useStyles()
   const data = useDatasource({resource: "ranking"});
   const [translate] = useTranslate()

    if(isEmpty(data)){
        return null
    }

   return (<TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
    <TableHead>
    <TableRow>
    <TableCell align="right">{translate("common.position")}</TableCell>
    <TableCell align="center">{translate("common.exhibitor")}</TableCell>
    {/* <TableCell align="right">{translate("common.points")}</TableCell> */}
    <TableCell align="center">{translate("prizes.name")}</TableCell>
    <TableCell>{translate("promo_materials.name")}</TableCell>
    </TableRow>
    </TableHead>
    <TableBody>{data.map((row) => (<TableRow key={row.id}>
    <TableCell align="right">{row.stats.position}</TableCell>
    <TableCell align="left" width="200">
        <Grid container spacing={1} direction="column" alignItems="center">
        <Grid item>
        <Avatar variant="square" src={ resizeCloudinaryImage(row.logotype, 175, 50) } classes={{
            root: classes.avatarContainer,
            img: classes.avatarImg
        }}/>
        </Grid>
        <Grid item>{row.name}</Grid>
        </Grid>
    </TableCell>
    {/* <TableCell align="right"><Typography variant="h5">{row.stats.sessions}</Typography></TableCell> */}
    <TableCell align="center"><PartnerPrizes active={row.stats.prizes} icons={icons} /></TableCell>
    <TableCell><Button variant="outlined" href={`/companies/${row.company_id}`} label="promo" /></TableCell>

    </TableRow>))}
    </TableBody>
    </Table>
    </TableContainer>)
 }


export default PartnerPerformance