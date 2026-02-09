"use server"
import { USER_URL, UserType,  } from "@/constants/type"
import hashPassword from "@/utils/hashPassword"
import { loginUser } from "@/utils/loginUser"


export default async function login(prevState: unknown, formData: FormData) {
   const email = formData.get("email") as string
   const password = formData.get("password") as string
   const remember = (formData.get("remember") === "on") ? true : false


   console.log(email, password, remember)


   let user: UserType[]
   try {
       user = await (await fetch(`${USER_URL}?email=${email}`)).json()
   }
   catch (e) {
       console.log(e)
       return {
           error: "Error: " + e,
           message: ""
       }
   }


   if (!user) {
       return {
           error: "User not found",
           message: ""
       }
   }


   console.log("User: ", user)


   // Get first item (user[0]) returning from api
   if ( user[0].password !== await hashPassword(password)) {
       console.log("user.password", user[0].password)
       console.log("hashPass: ",await hashPassword(password))
       return {
           error: "Invalid password",
           message: ""
       }
   }


   const userInput = user[0]
   await loginUser(userInput, remember);


   console.log("User:  ", user)
   return {
       error: "",
       message: "User logged in successfully"
   }
}
