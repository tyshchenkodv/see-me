import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: theme.spacing(5),
    },
    form: {
        width: '65%',
    },
    avatar: {
        alignSelf: 'flex-start',
    },
    avatarPhoto: {
        width: theme.spacing(30),
        height: theme.spacing(30),
    },
}));
