
import React from 'react';
import Text from '../components/MyTypography'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'


const clear = (str) => str? str.replace(/resources.upgrades./gi, ''): "";
const findName = (data) => data.translation_asset_id && data.translation_asset_id.length>2 ? data.translation_asset_id : data.___name;

const Item = ({data}) => (<Typography variant="body1"> <strong>{data.quantity} x </strong> {clear(findName(data))}</Typography>)


const Purchases = ({ purchases, roles }) => {
   
    const filtered = purchases.filter(item => roles && Array.isArray(roles) && roles.includes(item.role));
    const internal = filtered.filter(item => item.role === "service_internal")
    const external = filtered.filter(item => item.role === "service_external")
    const other = filtered.filter(item => !item.role.includes("service_"))

return (<Grid container spacing={8} >
    <Grid item><Typography variant="h6" gutterBottom>internal</Typography>{internal.map((item, i) => <Item key={`${i}_${item.id}`} data={item} />)}</Grid>
    <Grid item><Typography variant="h6" gutterBottom>external</Typography>{external.map((item, i) => <Item key={`${i}_${item.id}`} data={item} />)}</Grid>
    <Grid item><Typography variant="h6" gutterBottom>other</Typography>{other.map((item, i) => <Item key={`${i}_${item.id}`} data={item} />)}</Grid>
    </Grid>)
};

export default Purchases;