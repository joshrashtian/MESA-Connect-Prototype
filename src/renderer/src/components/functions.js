export function refactorName(name) {
  let copy = name.trim().split('')
  copy.map((a, index)=>{
    if(a === ' '){copy[index] = '_'}
  })
  let final = copy.join("")
  return final;
}

export const greetings = ['Good evening', 'Good morning', 'Good afternoon' ]

export const forums = ['School', 'Life', 'Projects', 'Computer Science', 'Pre Med']