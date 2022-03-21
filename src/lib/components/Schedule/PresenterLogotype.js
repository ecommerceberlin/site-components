

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { usePresentation } from './context';


const useStyles = makeStyles(theme => ({
     
    logotypeContainer: {
      height: 50,
      width: 140,
      marginRight: 10,
      marginLeft: 10,
  
      [theme.breakpoints.down("md")]: {
        // height: 50,
        // width: 50,
      }
    },
    logotypeImage: {
      objectFit: "contain",
      height: '85%',
    },
    
  })
);


const PresenterLogotype = () => {

  const {logotype} = usePresentation()
  const classes = useStyles()


  return (
    <Avatar
      variant="square"
      aria-label="Logotype"
      classes={{
        root: classes.logotypeContainer,
        img: classes.logotypeImage
      }}
      src={logotype}
    />
  )
}


export default PresenterLogotype