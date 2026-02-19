"use server"

import fetchClient from "@/infrastructure/helper/fetch-client"
import { revalidatePath } from "next/cache"

export const getTeacherData = async () => {
    try {
        const res = await fetchClient('http://localhost:3000' + '/api/teachers')

        return res.data
    } catch (error) {
        throw new Error('Gagal mengambil data')
        return []
    }
}

export const deleteTeacher = async (id: number) => {
    try {
        await fetchClient('http://localhost:3000' + `/api/teachers/${id}`, 'DELETE')

        revalidatePath('/teachers')
    } catch (error) {
        throw new Error('Gagal menghapus data')
    }
}

export const revalidateTeacherData = async () => {
    revalidatePath('/teachers')
}