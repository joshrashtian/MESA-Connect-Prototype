import { db } from "../../../../firebase"
import { deleteDoc, doc } from "firebase/firestore"

export function refactorName(name) {
  let copy = name.trim().split('')
  copy.map((a, index)=>{
    if(a === ' '){copy[index] = '_'}
  })
  let final = copy.join("")
  return final;
}

export async function deletePost(postID) {
  try {
    await deleteDoc(doc(db, 'posts', postID))
  } catch (e) {
    alert(e)
  }
}

export const greetings = ['Good evening', 'Good morning', 'Good afternoon' ]

export const forums = ['School', 'Life', 'Projects', 'Computer Science', 'Pre Med']