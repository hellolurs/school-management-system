import fetchClient from "@/infrastructure/helper/fetch-client";
import { Class } from "@/infrastructure/interfaces/class";
import { useEffect, useState } from "react";

export default function useGetClass() {
    const [data, setData] = useState<Class[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const actionGetClass = async () => {
        try {
            setIsLoading(true)
            const res = await fetchClient('/api/class')
            setData(res.data)

            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function call() {
            await actionGetClass()
        }

        call()
    }, [])


    return { data, setData, actionGetClass, isLoadingGetClass: isLoading }
}