import { TextField, withStyles } from '@material-ui/core'

export const CustomTextField = withStyles({
   root: {
      '& .MuiOutlinedInput-root': {
         '& fieldset': {
            borderRadius: `9px`,
         },
      },
   },
})(TextField)
