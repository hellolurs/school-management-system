import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    title?: string
    errors?: string[]
}

export default function InputForm({ title, errors, ...htmlInput }: Props) {
    return (
        <div>
            <label htmlFor={htmlInput.name}>{title}</label>
            <input {...htmlInput} />
            {errors && errors.map((error, index) => <p key={index} className="text-red-400 text-sm">{error}</p>)}
        </div>
    )
}