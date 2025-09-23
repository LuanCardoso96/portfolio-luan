import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, serverTimestamp } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// import { getAnalytics } from 'firebase/analytics'  // só com guarda

const firebaseConfig = {
  apiKey: 'AIzaSyCE4QBeH0pNKBhHYtFhXXjIDGXLwrYZCZw',
  authDomain: 'portfolio-ee5e8.firebaseapp.com',
  projectId: 'portfolio-ee5e8',
  storageBucket: 'portfolio-ee5e8.appspot.com', // ✅ use appspot.com
  messagingSenderId: '458713978341',
  appId: '1:458713978341:web:69aeb5f5237c078e874b0c',
  measurementId: 'G-TJ5VVR9T14'
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const ts = serverTimestamp

// Inicializa analytics só quando suportado
export let analytics = null
if (typeof window !== 'undefined' && 'measurementId' in firebaseConfig) {
  // HTTPS ou localhost (desenvolvimento)
  const isHttps = window.location.protocol === 'https:' || window.location.hostname === 'localhost'
  if (isHttps) {
    import('firebase/analytics').then(({ getAnalytics }) => {
      try { analytics = getAnalytics(app) } catch { /* ignora se falhar */ }
    })
  }
}
