import { auth, googleProvider } from './firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth'

const ADMIN_EMAIL = 'luancr71996@gmail.com'

export function observeAuth(callback) {
  return onAuthStateChanged(auth, (user) => {
    if (!user) return callback(null)
    const isAdmin = user.email === ADMIN_EMAIL
    callback({ 
      email: user.email, 
      uid: user.uid, 
      isAdmin, 
      name: user.displayName || user.email 
    })
  })
}

export async function loginWithGoogle() {
  const cred = await signInWithPopup(auth, googleProvider)
  const isAdmin = cred.user.email === ADMIN_EMAIL
  return { 
    email: cred.user.email, 
    uid: cred.user.uid, 
    isAdmin, 
    name: cred.user.displayName || cred.user.email 
  }
}

export async function loginWithPassword(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  const isAdmin = cred.user.email === ADMIN_EMAIL
  return { 
    email: cred.user.email, 
    uid: cred.user.uid, 
    isAdmin, 
    name: cred.user.displayName || cred.user.email 
  }
}

export function logout() {
  return signOut(auth)
}

// Manter compatibilidade com sistema de assinaturas
export const Sub = {
  isMember() { 
    return localStorage.getItem('member') === 'active' 
  },
  start(priceId = 'member-monthly') { 
    localStorage.setItem('member', 'active')
    localStorage.setItem('member_price', priceId) 
  },
  cancel() { 
    localStorage.setItem('member', 'canceled') 
  }
}
