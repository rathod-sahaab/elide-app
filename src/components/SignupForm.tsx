import { useFormik } from 'formik'
import * as React from 'react'
import * as Yup from 'yup'
import { Button, makeStyles, TextField } from '@material-ui/core'

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
            <TextField
               fullWidth
               id="name"
               name="name"
               label="Name"
               variant="outlined"
               className={classes.roundedCorners}
               value={formik.values.name}
               onChange={formik.handleChange}
               error={formik.touched.name && Boolean(formik.errors.name)}
               helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
               fullWidth
               id="email"
               name="email"
               label="Email"
               className={classes.roundedCorners}
               variant="outlined"
               value={formik.values.email}
               onChange={formik.handleChange}
               error={formik.touched.email && Boolean(formik.errors.email)}
               helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
               fullWidth
               id="username"
               name="username"
               label="Username"
               className={classes.roundedCorners}
               variant="outlined"
               value={formik.values.username}
               onChange={formik.handleChange}
               error={
                  formik.touched.username && Boolean(formik.errors.username)
               }
               helperText={formik.touched.username && formik.errors.username}
            />
            <TextField
               fullWidth
               id="password"
               name="password"
               label="Password"
               variant="outlined"
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
