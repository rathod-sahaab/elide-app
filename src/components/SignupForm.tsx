import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Button, makeStyles } from '@material-ui/core'
import { CustomTextField } from './CustomTextField'

const LoginSchema = Yup.object({
   name: Yup.string().max(20).required('Required'),

   email: Yup.string().email('Invalid email').required('Required'),
   username: Yup.string().max(20).required('Required'),

   password: Yup.string().required('Required'),
})

const useStyles = makeStyles({
   form: {
      '& > *:not(:last-child)': {
         marginBottom: `1em`,
      },
   },
   roundedCorners: {
      borderRadius: `9px`,
   },
})

export default function LoginForm() {
   const formik = useFormik({
      initialValues: {
         name: '',
         email: '',
         username: '',
         password: '',
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
         alert(JSON.stringify(values, null, 2))
      },
      validateOnChange: true,
   })

   const classes = useStyles()

   return (
      <div>
         <form className={classes.form} onSubmit={formik.handleSubmit}>
            <CustomTextField
               fullWidth
               id="name"
               name="name"
               label="Name"
               className={classes.roundedCorners}
               value={formik.values.name}
               onChange={formik.handleChange}
               error={formik.touched.name && Boolean(formik.errors.name)}
               helperText={formik.touched.name && formik.errors.name}
            />
            <CustomTextField
               fullWidth
               id="email"
               name="email"
               label="Email"
               className={classes.roundedCorners}
               value={formik.values.email}
               onChange={formik.handleChange}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
            />
            <CustomTextField
               fullWidth
               id="username"
               name="username"
               label="Username"
               className={classes.roundedCorners}
               value={formik.values.username}
               onChange={formik.handleChange}
               error={
                  formik.touched.username && Boolean(formik.errors.username)
               }
               helperText={formik.touched.username && formik.errors.username}
            />
            <CustomTextField
               fullWidth
               id="password"
               name="password"
               label="Password"
               className={classes.roundedCorners}
               type="password"
               value={formik.values.password}
               onChange={formik.handleChange}
               error={
                  formik.touched.password && Boolean(formik.errors.password)
               }
               helperText={formik.touched.password && formik.errors.password}
            />
            <Button
               color="primary"
               variant="contained"
               fullWidth
               type="submit"
               className={classes.roundedCorners}
               size="large"
               disableElevation
            >
               Sign up
            </Button>
         </form>
      </div>
   )
}
