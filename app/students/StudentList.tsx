'use client'

import { StudentType, STYLE } from '@/constants/type'

export default function ListStudent({ students }: { students: StudentType[] }) {
    return (
        <div className={STYLE}>
            <ListStudentItem students={students} />
        </div >
    )
}


function ListStudentItem({ students }: { students: StudentType[] }) {
    return <ul>
        {students.map(s => (
            <li className={STYLE}
                key={s.id}>
                {s.id} :{s.name}  :  {s.age}
            </li>))
        }
    </ul>
}