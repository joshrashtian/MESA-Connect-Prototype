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

export function convertDate (a, format) {
  const dateData = a;

  let month = dateData.getMonth() + 1
  let day = dateData.getDate()
  let year = dateData.getFullYear()

  if(format === "short") return `${months[dateData.getMonth()].slice(0, 3)} ${day},${year}`
  if(format === "tiny") return `${month}/${day}/${year.toString().slice(2, 4)}`
  if(format === "long") return `${months[month - 1]} ${day}, ${year}`
  
}

export class DateCalcuation {
  
  constructor(date) {
    this.date = date
  }

  printInfo () {
    return this.date
  }
  fetchDate(type) {
    if (type === 'long') return `${months[this.date.getMonth()]} ${this.date.getDate()}, ${this.date.getFullYear()}`
    else return `${months[this.date.getMonth()].slice(0, 3)} ${this.date.getDate()}, ${this.date.getFullYear()}`
  }

  fetchTime() {
    return `${this.date.getHours()}:${this.date.getMinutes()}`
  }
}

export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const greetings = ['Good evening', 'Good morning', 'Good afternoon' ]

export const forums = ['School', 'Life', 'Projects', 'Computer Science', 'Pre Med']