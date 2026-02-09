"use client"


import {STYLE} from "@/constants/type";
import { useActionState } from "react";
import { redirect } from "next/navigation";
import registerUser from "../_actions/registerUser";


export default function Register() {
   const [state, action] = useActionState(registerUser, { error: "", message: "" })
   console.log("State: ", state)


   if ( state.error !== "" ) {
       return (
           <div >
               <h1 className="text-2xl">Register</h1>
               <p className="text-red-500">{state.error}</p>
           </div>
       )
   }


   if ( state.message !== "" ) {
       redirect("/students")
   }


   return (
       <div className={STYLE}>
           <h1>Register</h1>
           <div>
               <form action={action}>
                   <div>
                       <label htmlFor="name">Name: </label>
                       <input
                           className={STYLE}
                           name="name"
                           type="text" maxLength={20} required />
                   </div>
                   <div>
                       <label htmlFor="email">Email: </label>
                       <input
                           className={STYLE}
                           name="email"
                           type="email" maxLength={20} required />
                   </div>
                   <div>
                       <label htmlFor="password">Password: </label>
                       <input
                           className={STYLE}
                           name="password"
                           type="password" maxLength={20} required />
                   </div>
                   <div>
                       <button className={STYLE} type="submit">Register</button>
                   </div>
               </form>
           </div>
       </div>
   )
}
