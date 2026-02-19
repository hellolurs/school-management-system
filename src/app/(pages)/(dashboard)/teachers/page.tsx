import TeacherTable from "@/app/_components/teacher-table";
import { getTeacherData } from "./action";
import TeacherForm from "@/app/_components/teacher-form";

export default async function TeachersPage() {
    const data = await getTeacherData()

    return (
        <div>
            <div className="">
                <div className="flex justify-between mb-4">
                    <h2 className="text-3xl">Data Guru</h2>
                    <TeacherForm />
                </div>
            </div>
            <TeacherTable data={data} />
        </div>
    )
}