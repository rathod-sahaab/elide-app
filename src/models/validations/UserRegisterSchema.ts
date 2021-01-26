import * as Yup from 'yup'

const UserRegisterSchema = Yup.object({
   name: Yup.string().max(20).required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   username: Yup.string().max(20).required('Required'),
   password: Yup.string().required('Required'),
})

export default UserRegisterSchema
