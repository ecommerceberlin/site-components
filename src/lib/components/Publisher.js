import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import {useRouter} from 'next/router'
// import {slug} from '../helpers'
import {useTranslate} from '../i18n'
import get from 'lodash/get'
import cn from 'classnames'
import isFunction from 'lodash/isFunction'

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
  avatar: {
    height: 100,
    width: 180,
  },
  avatarImg: {
    objectFit: "contain"
  },
  avatarFluid: {
    height: "100%",
    width: "100%",
  }
}));

function Publisher(props) {

    const classes = useStyles();
    const router = useRouter();
    const [translate] = useTranslate();
    const {data, fluid, transparent, resolveLink, profileDataContainer} = props;

    return (

        <Card className={cn(
          classes.root, 
          transparent? classes.transparent: null
          )} elevation={0}>
        <CardActionArea 
            className={classes.container} 
            onClick={() => isFunction(resolveLink)? router.push(resolveLink(data)): null}
        > 
         <Avatar variant="square" src={get(data, `${profileDataContainer}.logotype_cdn`)} classes={{
           root: fluid? classes.avatarFluid: classes.avatar,
           img: classes.avatarImg
         }}/>
        </CardActionArea>
      </Card>
    )

}

Publisher.defaultProps = {
    data: {},
    fluid: false,
    transparent: false,
    resolveLink: (data) => `/authors/${data.slug}`,
    profileDataContainer: 'profile'
}

export default Publisher