import MyButton from './MyButton';
import Icon from '@material-ui/icons/Receipt';
import { useRouter } from 'next/router';

const GetTicketLink = () => {

    const router = useRouter()

    return (<MyButton label="visitors.register_alt" onClick={()=>router.push("/visit")} startIcon={<Icon />} color="primary" fullWidth variant="contained" />)

}

export default GetTicketLink