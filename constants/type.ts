export const STUDENT_URL = `http://localhost:4000/students`
export const USER_URL = `http://localhost:4000/users`


export const STYLE=`p-2 m-2 border rounded shadow max-w-[75vw]`


export type StudentType = {
  id: string
  name: string
  age: number
}


export type UserType = {
   id: string
   name: string
   email: string
   password: string
}
