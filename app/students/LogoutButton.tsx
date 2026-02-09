import { STYLE } from "@/constants/type";
import { getSession, logoutUser } from "@/utils/loginUser";


export default async function Logout() {
   let session;
   try {
       session = await getSession()
       console.log("Session: ", session)
   }
   catch (e) {
       console.log("Error: ", e)
       session = null
   }


   return (
       session &&
       <button className={STYLE} onClick={logoutUser}>Logout</button>
   )
}
