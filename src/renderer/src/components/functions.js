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
    if(this.date.getHours() < 13) return `${this.date.getHours()}:${this.date.getMinutes()} AM`
    else return `${this.date.getHours() - 12}:${this.date.getMinutes()} PM`
  }
}

export async function checkEvents(e) {
  let date = new Date(Date.now())
  let day = date.getDate()
  let month = date.getMonth()

  let event = e.eventData

  event.map((a) => {
    let eDate = a.start.toDate().getDate()
    let eMonth = a.start.toDate().getMonth()

    if(day > eDate && month >= eMonth) {
      try {
        deleteDoc(doc(db, 'events', a.id))
      } catch (e) {
        alert(e)
      }
    }
  })
}
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const greetings = ['Good evening', 'Good morning', 'Good afternoon' ]

export const forums = ['School', 'Life', 'Projects', 'Computer Science', 'Pre Med']

export const majors = [
  'Anthropology',
  'Architecture',
  'Art',
  'Art Gallery',
  'Athletics Department',
  'Automotive',
  'Biology',
  'Business',
  'Computer Applications & Web Technologies',
  'Certified Nursing Assistant',
  'Chemistry',
  'Cinema',
  'Communication Studies',
  'Community Ed',
  'Computer Science',
  'Construction Technology',
  'Culinary Arts',
  'Dance',
  'Earth, Space and Environmental Sciences',
  'Early Childhood Education',
  'ECE Center',
  'Economics',
  'Electronic Systems',
  'EMT',
  'Engineering',
  'English',
  'ESL',
  'Fire Technology',
  'Graphic and Multimedia Design ',
  'Health Science',
  'History',
  'Hotel Restaurant',
  'Humanities',
  'Interior Design',
  'Kinesiology and Physical Education ',
  'Manufacturing Technology',
  'Mathematics',
  'Media Entertainment Arts',
  'Medical Laboratory Technician',
  'Modern Languages & Cultures',
  'Music',
  'Networking',
  'Nursing',
  'Paralegal',
  'Philosophy',
  'Photography',
  'Physics',
  'Political Science',
  'Psychology',
  'Real Estate',
  'Recreation Management',
  'Sign Language',
  'Sociology',
  'Sports Medicine',
  'Surveying',
  'Theatre',
  'Water',
  'Welding',]