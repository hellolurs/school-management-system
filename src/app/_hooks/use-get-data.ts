import fetchClient from "@/infrastructure/helper/fetch-client";
import { useEffect, useState } from "react";

export default function useGetData<T>(apiUrl: string, callback?: { onError?: () => void }) {
    const [data, setData] = useState<T[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const actionGetData = async () => {
        try {
            setIsLoading(true)
            const res = await fetchClient(apiUrl)
            setData(res.data)
        } catch (error) {
            callback?.onError?.()
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function call() {
            await actionGetData()
        }

        call()
    }, [])


    return { data, setData, actionGetData, isLoading }
}