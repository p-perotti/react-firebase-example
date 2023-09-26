import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebase from '../../auth/firebase'

function SignIn() {
  const auth = getAuth(firebase)

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  })
  

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    await signInWithEmailAndPassword(auth, formValues.email, formValues.password).then(() => {
      navigate('/')
    }).catch(() => {
      alert('Usuário ou senha incorretos!')
    })
  }

  return (
  <>
    <h2>Sign In</h2>
    <form style={{ width: '200px'}} onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail</label>
      <input name='email' type="text" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input name='password' type="password" onChange={handleChange} />
      <button type='submit'>Submit</button>
    </form>
    <p>Don&apos;t have an account? <Link to='/signup'>Sign Up</Link></p>
  </>
)
}

export default SignIn
