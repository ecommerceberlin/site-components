import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import isFunction from 'lodash/isFunction'
import Avatar from './MyAvatar';
import { MyLink } from '../next';
import ProfileLogotype from './ProfileLogotype'


import { 
    getSpeakerName,
    getSpeakerAvatar,
} from '../helpers';

const useStyles = makeStyles((theme) => ({

  table: {
    minWidth: 650,
    borderCollapse: "separate", 
    borderSpacing: "0 3px", 
  },

  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },

  selected: {
    borderTop: '2px solid green',
    borderBottom: '2px solid green'
  }
}));

const Cell = ({row, column, total, selected}) => {

  const classes = useStyles();

  const {render, link, align, ...rest} = column;

  if(!isFunction(render)){

    switch(render){

      case "avatar":
        return (<TableCell className={selected ? {root: classes.selected}: {} } component="th" scope="row" align={align || "center"}><Avatar id={row.id} alt="" src={getSpeakerAvatar(row)} tiny={true} /></TableCell>)

      case "logotype":
        return (<TableCell className={selected ? {root: classes.selected}: {} } component="th" scope="row" align={align || "center"}><ProfileLogotype data={row} tiny={true} /></TableCell>)

      case "link":
        return (<TableCell className={selected ? {root: classes.selected}: {} } component="th" scope="row" align={align || "left"}><MyLink {...(isFunction(link) ? link(row) : {})} {...rest} /></TableCell>)
      
      default: 
        return <TableCell className={selected ? {root: classes.selected}: {} } component="th" scope="row" align={align || "left"}>{null}</TableCell>
    }

  }else{
    return <TableCell className={selected ? {root: classes.selected}: {} } component="th" scope="row" align={align || "left"}>{column.render(row)}</TableCell>
  }


}

const TableList = ({rows, columns, primaryKey, selected}) => {

  const classes = useStyles();
  
  return (
    <div className={classes.root}>
     <Table className={classes.table} aria-label="simple table">
        {/* <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={row[primaryKey]}>{
              columns.map(column => <Cell 
                row={row} 
                column={column} 
                total={columns.length} 
                selected={isFunction(selected) && selected(row, i)} />
              )}</TableRow>)
          )}</TableBody>
      </Table>
    </div>
  );
}

TableList.defaultProps = {
  primaryKey: "id",
  selected: null,
  rows: [],
  columns: []
}

export default TableList;