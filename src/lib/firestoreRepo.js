import {
  collection, addDoc, getDocs, query, orderBy, limit, startAfter,
  updateDoc, doc, deleteDoc, serverTimestamp
} from 'firebase/firestore'
import { db } from './firebase'

/** Lista paginada */
export async function listPaged(colName, pageSize = 10, cursor = null) {
  const col = collection(db, colName)
  const q = cursor
    ? query(col, orderBy('createdAt', 'desc'), startAfter(cursor), limit(pageSize))
    : query(col, orderBy('createdAt', 'desc'), limit(pageSize))
  const snap = await getDocs(q)
  const items = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  const nextCursor = snap.docs.length ? snap.docs[snap.docs.length - 1] : null
  return { items, nextCursor }
}

/** Cria */
export async function create(colName, data, authorEmail) {
  const col = collection(db, colName)
  const payload = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    authorEmail: authorEmail || null
  }
  const ref = await addDoc(col, payload)
  return ref.id
}

/** Atualiza */
export async function update(colName, id, data) {
  const ref = doc(db, colName, id)
  await updateDoc(ref, { ...data, updatedAt: serverTimestamp() })
}

/** Remove */
export async function remove(colName, id) {
  const ref = doc(db, colName, id)
  await deleteDoc(ref)
}

/** Lista todos (sem paginação) - para casos especiais */
export async function listAll(colName) {
  const col = collection(db, colName)
  const q = query(col, orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
