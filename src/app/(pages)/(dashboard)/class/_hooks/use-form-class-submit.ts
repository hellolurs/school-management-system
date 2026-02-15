import fetchClient from "@/infrastructure/helper/fetch-client"
import { useActionState } from "react"


export function useFormClassSubmit(method: 'POST' | 'PATCH') {
    const actionSubmit = async (_: unknown, formData: FormData) => {
        const body = {
            name: formData.get('name'),
        }

        try {
            const res = await fetchClient('/api/class', method, body)

            return res
        } catch (error) {
            console.log(error)
            return error
        }
    }

    const [stateClass, formActionClass, isPendingSubmitClass] = useActionState(actionSubmit, null)

}