import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Button, makeStyles, TextField } from '@material-ui/core'

const SigninSchema = Yup.object({
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string().required('Required'),
})

const useStyles = makeStyles({
   form: {
      '& > *:not(:last-child)': {
      marginBottom: `1em`,
      }
   },
})
export default function SigninForm() {
   const formik = useFormik({
      initialValues: {
         email: '',
         password: '',
      },
      validationSchema: SigninSchema,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2))
      },
      validateOnChange: true,
   })

   const classes = useStyles();

   return (
      <form className={classes.form} onSubmit={formik.handleSubmit}>
         <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
         />
         <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            variant="outlined"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
         />
         <Button color="primary" variant="contained" fullWidth type="submit" disableElevation>
            Sign in
         </Button>
      </form>
   )
}
