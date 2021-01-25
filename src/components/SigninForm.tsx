import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Button, makeStyles } from '@material-ui/core'
import { CustomTextField } from './CustomTextField'

const SigninSchema = Yup.object({
   username: Yup.string().required('Required'),
   password: Yup.string().required('Required'),
})

const useStyles = makeStyles({
   form: {
      '& > *:not(:last-child)': {
         marginBottom: `1em`,
      },
   },
})
export default function SigninForm() {
   const formik = useFormik({
      initialValues: {
         username: '',
         password: '',
      },
      validationSchema: SigninSchema,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2))
      },
      validateOnChange: true,
   })

   const classes = useStyles()

   return (
      <form className={classes.form} onSubmit={formik.handleSubmit}>
         <CustomTextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
         />
         <CustomTextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
         />
         <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            disableElevation
         >
            Sign in
         </Button>
      </form>
   )
}
