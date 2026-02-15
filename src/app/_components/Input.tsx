
type Props = React.InputHTMLAttributes<HTMLInputElement>

const Input = (props: Props) => {
    return <input {...props} className="bg-gray-200 p-2 w-full rounded-sm" />
}

export default Input