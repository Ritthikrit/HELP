import { STYLE, STUDENT_URL } from '@/constants/type'
import StudentList from './StudentList'

export default async function Page() {
    const res = await fetch(STUDENT_URL, {
        cache: 'no-store',
    })
    const students = await res.json()
    return (
        <div className="mx-15">
            <h2 className={STYLE}>Students</h2>
            <StudentList students={students} />
        </div>
    )
}