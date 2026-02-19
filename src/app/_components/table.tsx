import { ReactNode } from "react"

export default function TableData({ data, columns }: { data?: object[], columns?: { title: string, key: string, render?: () => ReactNode }[] }) {
    const tableColumn = columns || []

    const tableData = data || []

    return (
        <div>
            <table className="table-auto">
                <thead>
                    <tr>
                        {tableColumn.map((item, index) => {
                            return (
                                <th key={item.key + `${index}`} className="border p-2 px-4">{item.title}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((dt, dtIndex) => (
                        <tr key={dtIndex}>
                            {tableColumn.map((col, colIndex) => {
                                return (
                                    <td key={col.key + `${dtIndex}.${colIndex}`} className="border p-2 px-4">
                                        {/* @ts-expect-error type object error */}
                                        {col.render?.() || dt[col.key] as string}
                                    </td>
                                )
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}