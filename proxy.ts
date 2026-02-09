import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./utils/loginUser";


export default async function proxy(request: NextRequest) {
   console.log("Proxy invoked")
   const res = await updateSession(request)


   // Allow Server Actions (POST requests) to pass through
   if (request.method === "POST") {
       return NextResponse.next()
   }


   if (res)
       return res
   else
       return NextResponse.redirect(new URL("/students/login", request.url))
}


// if path matches with matcher config, then it invoke middleware(request)
export const config = {
   // matcher: '/students/editStudent/:path*',
   matcher: [
       "/students/editStudent",   // page only
       "/students/editStudent/(.*)" // optional
   ]
}
