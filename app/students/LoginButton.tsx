import { STYLE } from "@/constants/type";
import { getSession } from "@/utils/loginUser";
import Link from "next/link";


export default async function LogIn() {
   let session;
   try {
       session = await getSession()
       console.log("Session: ", session)
   }
   catch (e) {
       console.log("Error: ", e)
       session = null
   }
   return ( !session && <Link className={STYLE} href="/students/login">Login</Link> )
}
