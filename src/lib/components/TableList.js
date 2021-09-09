import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
// import Paper from '@material-ui/core/Paper';
import isFunction from 'lodash/isFunction'
import Avatar from './MyAvatar';
import { MyLink } from '../next';
import ProfileLogotype from './ProfileLogotype'
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { 
    getSpeakerName,
    getSpeakerAvatar,
} from '../helpers';

const useStyles = makeStyles((theme) => ({

  table: {
    width: "95%",
    // borderCollapse: "separate", 
    // borderSpacing: "0 3px", 
    marginTop: 30
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
  },

  big: {
    fontSize: '2rem'
  }
}));

const Cell = ({row, column, position, total}) => {

  const classes = useStyles();

  const {width, align} = column;

  const renderers = {
    avatar: () => <Avatar id={row.id} alt="" src={getSpeakerAvatar(row)} tiny={true} />,
    logotype: () => <ProfileLogotype data={row} tiny={true} />,
    link: ({link, label, variant, color}) => <MyLink href={isFunction(link) ? link(row) : "/notset"} label={label} variant={variant} color={color} />
  }

  const getStyle = (col) => col.style && col.style in classes ? classes[col.style] : undefined
  const getRenderer = (col) => {

    if(isFunction(col.render)){
      return col.render(row, position, total)
    }
    if(Array.isArray(col.render)){
      return renderArray(col)
    }
    return col.render in renderers ? renderers[col.render](col): "error";
  }

  const renderArray = (col) => <Grid container spacing={1} {...(col.container||{})}>{col.render.map(el => <Grid key={el.name} item {...("breakpoints" in el? el.breakpoints: {})}>{getRenderer(el)}</Grid>)}</Grid>

  return <TableCell component="td" width={width} align={align || "left"}><div className={getStyle(column)}>{ getRenderer(column) }</div></TableCell>

}

const TableList = ({rows, columns, primaryKey, selected}) => {

  const classes = useStyles();
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));

  if(isMobile){

    // return <Grid container></Grid>

  }

  return (
    <div className={classes.root}>
     <Table className={classes.table}>
      <TableBody>
          {rows.map((row, position) => (
            <TableRow key={row[primaryKey]} selected={isFunction(selected) && selected(row, position)}>{
              columns.filter(item => item && "name" in item).map(column => <Cell 
                key={`${column.name}${position}`}
                row={row} 
                position={ position+1 }
                column={column} 
                total={columns.length}
                selected={isFunction(selected) && selected(row, position)} />
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