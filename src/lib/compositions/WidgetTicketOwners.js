import React from 'react'
// import WidgetTickets from './WidgetTickets'
import {useSettings, useDatasource, useDialog, resizeCloudinaryImage} from '../helpers'
import Grid from '@material-ui/core/Grid'
import Wrapper from '../components/Wrapper'
import {useTranslate} from '../i18n'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import isEmpty from 'lodash/isEmpty'
import MyButton from '../components/MyButton'
import { makeStyles } from '@material-ui/core/styles';

const defaultGridSettings = {
    xs: 6,
    sm: 6,
    md: 3,
    lg: 3,
    xl: 3,
  }

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 700,
      minWidth: 200,
      marginBottom: 10,
      [theme.breakpoints.up('sm')]: {
        maxWidth: 700,
      },
      backgroundColor: "#fff",
    },
    transparent: {
      backgroundColor: "transparent",
    },
  
    container: {
      display: 'flex',
      padding: 10,
      justify: "center",
      alignItems: "center",
    },
  
    avatarContainer: {
      minHeight: 80,
      minWidth: 150,
    },
  
    avatarContainerFluid: {
      height: "80%",
      width: "80%",
      padding: "5%"
    },
  
    avatarImg: {
      objectFit: "contain",
      maxHeight: "80%",
      maxWidth: "80%",
    },
  
  
}));

const TicketDetails = ({labelPrefix, image, detailsUrl, owners, icons}) => {

    const dialog = useDialog();
    const [translate] = useTranslate();
    const dialogContents = {
        label: `${labelPrefix}.list.name`, 
        content: translate(`${labelPrefix}.list.description`)
    }

    const renderIconOrImage = (image) => {
        if(!image){
            return null
        }
        if(!image.startsWith("http") &&  image in icons){
            return React.createElement(icons[image], {style: {width: 100, height: 100}})
        }

        return <Avatar variant="square" src={resizeCloudinaryImage(image, 300, 400)} />
    }

    return ( <Grid container spacing={2} onClick={()=>dialog(dialogContents)}>
    <Grid item xl={6} lg={6} md={12}>{renderIconOrImage(image)}</Grid>
    <Grid item xl={6} lg={6} md={12}><TicketHeader baseLabel={labelPrefix} /></Grid>
    <Grid item xl={12} lg={12} md={12}><TicketOwnersList detailsUrl={detailsUrl} data={owners} /></Grid>
    </Grid>)
}


const TicketHeader = ({baseLabel}) => {
    const [translate] = useTranslate();
    return (<Typography variant="h4">{translate(`${baseLabel}.list.name`)}</Typography>)
}




const TicketOwnersList = ({detailsUrl, owners}) => {
    if( !Array.isArray(owners) || isEmpty(owners)){
        return <NoTicketOwner href={detailsUrl} />
    }
    return owners.map(owner => <TicketOwner key={owner.id} logotype={owner.profile.logotype_cdn}  />)
}

const TicketOwner = ({logotype, fluid=true}) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
        <Avatar variant="square" src={ resizeCloudinaryImage(logotype, 300, 300) } classes={{
            root: fluid? classes.avatarContainerFluid: classes.avatarContainer,
            img: classes.avatarImg
          }}/>
        </div>
    )
}

const NoTicketOwner = (props) => <MyButton color="primary" {...props} />



const WidgetTicketOwners = ({setting="sponsors", icons={} }) => {

    const {ticket_group_id, ticket_ids, grid, wrapperProps} = useSettings(setting);
    const {data} = useDatasource({
        data: {
            resource: "ticketowners",
            params: { ticket_group_id}
        },
    });

    const _gridSettings = Object.assign({}, defaultGridSettings, grid)

    return (<Wrapper {...wrapperProps}><Grid container spacing={4}>{
        data.map(item => <Grid key={item.id} item {..._gridSettings}>
        <TicketDetails detailsUrl={item.details_url} labelPrefix={item.translation_asset_id} image={item.thumbnail} owners={item.owners} icons={icons} />
        </Grid>)
    }</Grid></Wrapper>)
    

}



export default WidgetTicketOwners


