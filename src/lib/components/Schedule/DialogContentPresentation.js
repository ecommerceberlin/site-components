import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { usePresentation } from './context';


const DialogContentPresentation = () => {


  const {title, description} = usePresentation()

  return (
    <Box mb={3}>
      <Typography variant="h5" gutterBottom>{title}</Typography>
      <Box>
      <Typography variant="body1">{description}</Typography>
      </Box>
    </Box>
  );
};


export default DialogContentPresentation
