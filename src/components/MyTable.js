import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import MyLink from '../next/MyLink';

const styles = {};

class MyTable extends React.Component {
  render() {
    const { classes, data, cols } = this.props;
    const columns = Object.keys(cols);

    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columns.map(c => (
              <TableCell>{c}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(n => {
            return (
              <TableRow key={n.id}>
                {columns.map((c, j) => {
                  return (
                    <TableCell key={`${n.id}_${j}`}>
                      {'button' in cols[c] && cols[c].button ? (
                        <MyLink
                          label={cols[c].label}
                          href={`/archive?id=${n.id}`}
                          as={`/archive,${n.id}`}
                        />
                      ) : (
                        n[c]
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

MyTable.defaultProps = {
  data: [],
  cols: {}
};

export default withStyles(styles)(MyTable);
