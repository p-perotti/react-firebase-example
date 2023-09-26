import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, doc, getDoc } from "firebase/firestore"
import firebase from "../../auth/firebase"

function Home() {
  const [session, setSession] = useState(null)

  const auth = getAuth(firebase)
  const db = getFirestore(firebase)

  const navigate = useNavigate()
  
  useEffect(() => {
    const getSession = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const uid = user.uid
  
          const docRef = await doc(db, "user", uid)
          const docSnap = await getDoc(docRef);
  
          setSession(docSnap.data())
        } else {
          navigate('/signin')
        }
      })
    }

    getSession()
  }, [auth, db, navigate])

  const handleSignOut = async () => {
    await signOut(auth)
    navigate('/signin')
  }

  return session && (
    <>
      <h2>React Firebase Example</h2>
      <p>
        Name: {session.name}<br/>
        Last Name: {session.lastName}<br/>
        Birth Date: {session.birthDate}<br/>
      </p>
      <button onClick={handleSignOut}>Logout</button>
    </>
  )
}

export default Home