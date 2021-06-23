
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  fileInputRoot: {
    width: '100%',
    display: 'flex',
    margin: '10px 0',
    justifyItems: 'left',
  },
  fileInputButton: {
    //width: '40%',
    marginRight: '10px'
  },
  fileInputText: {
    width: '60%'
  },

  buttonSubmit: {
    marginBottom: 10,
  },
}));
