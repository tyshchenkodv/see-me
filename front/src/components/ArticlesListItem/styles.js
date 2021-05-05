import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => createStyles({
    paper: {
        marginBottom: '10px',
    },
    root: {
        maxWidth: '100%',
        marginBottom: '10px',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));
