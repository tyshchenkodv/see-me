import { createStyles, makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            maxWidth: '100%',
            marginBottom: '10px',
        },
        avatar: {
            backgroundColor: red[500],
        },
    }),
);
