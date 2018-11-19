
import Grid from '@material-ui/core/Grid';
//import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import GridBenefitsItem from './GridBenefitsItem'


const GridBenefits = ({items, baseLabel}) => (

  <Grid  container spacing={32}>

    {items.map(({label, icon}) => <GridBenefitsItem key={label} icon={icon} label={`${baseLabel}.${label}`} />)}

  </Grid>
)


GridBenefits.defaultProps = {
  items : [],
  baseLabel : ""
}

GridBenefits.propTypes = {

}

export default GridBenefits
