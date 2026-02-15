import { Class } from "@/infrastructure/interfaces/class";
import { Student } from "@/infrastructure/interfaces/student";
import { Teacher } from "@/infrastructure/interfaces/teacher";


let classData: Class[] = []
let studentData: Student[] = []
const teacherData = new Map<number, Teacher>()

classData = []
studentData = []

//data dumy
classData = [
    { id: 12, name: '1', createdAt: new Date(), updatedAt: null },
    { id: 23, name: '2', createdAt: new Date(), updatedAt: null },
    { id: 45, name: '3', createdAt: new Date(), updatedAt: null }
]

studentData = [
    { id: 1, full_name: 'Jhon', address: 'Jakarta, Indonesia', date_birth: new Date('2020-05-10'), place_of_birth: 'Jakarta', gender: 'Laki-laki', religion: 'Islam', identity_number: 123456789, class_id: 12, createdAt: new Date(), updatedAt: null, deletedAt: null },
]

teacherData.set(1, {
    id: 1,
    full_name: 'Budi',
    address: 'Jakarta, Indonesia',
    gender: 'Laki-laki',
    subjects: 'Matematika',
    identity_number: 987654321,
    class_id: 12,
    createdAt: new Date(),
    updatedAt: null
})

export { classData, studentData, teacherData }