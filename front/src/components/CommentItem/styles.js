import { red } from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() =>
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
