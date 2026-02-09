"use server"
import { USER_URL } from "@/constants/type"
import hashPassword from "@/utils/hashPassword"


export default async function registerUser(prevState: unknown ,formData: FormData) {
   const name = formData.get("name") as string
   const email = formData.get("email") as string
   const password =  await hashPassword(formData.get("password") as string)
   console.log(name, email, password)


   try {
       await fetch(USER_URL, {
           method: "POST",
           headers: { "Content-Type": "application.json" },
           body: JSON.stringify({name, email, password})
       })       
   }
   catch(e) {
       console.log(e)
       return {
           error: "Error: " + e,
           message: ""
       }
   }
  
   return {
       error: "",
       message: "User registered successfully"
   }  
}

