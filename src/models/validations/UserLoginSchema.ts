import * as Yup from 'yup'
const UserLoginSchema = Yup.object({
   username: Yup.string().max(20).required('Required'),
   password: Yup.string().required('Required'),
})
export default UserLoginSchema
