import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import firebase from '../../auth/firebase'
import { useNavigate } from 'react-router-dom'

function SignUp() {
  const auth = getAuth(firebase)
  const db = getFirestore(firebase)

  const navigate = useNavigate()

  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    birthDate: ''
  })
  

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = await createUserWithEmailAndPassword(auth, formValues.email, formValues.password)

    await setDoc(doc(db, "user", data.user.uid), {
      name: formValues.name,
      lastName: formValues.lastName,
      birthDate: formValues.birthDate
    });
    
    navigate('/')
  }

  return (
  <>
    <h2>Sign Up</h2>
    <form style={{ width: '200px'}} onSubmit={handleSubmit}>
      <label htmlFor="email">E-mail</label>
      <input name='email' type="text" onChange={handleChange} />
      <label htmlFor="password">Password</label>
      <input name='password' type="password" onChange={handleChange} />
      <label htmlFor="name">Name</label>
      <input name='name' type="text" onChange={handleChange} />
      <label htmlFor="lastName">Last Name</label>
      <input name='lastName' type="text" onChange={handleChange} />
      <label htmlFor="birthDate">Birth Date</label>
      <input name='birthDate' type="date" style={{ width: '171px' }} onChange={handleChange} />
      <br/>
      <button type='submit'>Submit</button>
    </form>
  </>
)
}

export default SignUp