


import React from 'react'
import PropTypes from 'prop-types'
import {MyLink as Link} from '../next'
import { withStyles } from '@material-ui/core/styles';

const styles = {

  spacer : {
    marginRight : 10,
    marginBottom : 10
  }

}

const KeywordSelect = ({ keywords, selected, classes }) => {

   if(!keywords.length) return null

   return <div>{

     keywords.map(keyword =>

     <Link
       prefetch={false}
       key={keyword}
       href={`/exhibitors/${keyword}`}
       label={`common.tags.${keyword}`}
       variant={keyword === selected ? "contained" : "outlined"}
       color={keyword === selected ? "primary" : "secondary"}
       className={classes.spacer}
       //disabled={keyword === selected}
     />)}</div>

}

KeywordSelect.defaultProps = {
  keywords : []
}

KeywordSelect.propTypes = {
  keywords: PropTypes.array.isRequired,
  selected: PropTypes.string

};

export default withStyles(styles)(KeywordSelect);
