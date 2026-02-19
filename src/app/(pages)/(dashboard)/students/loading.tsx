export default function Loading() {
    // Add fallback UI that will be shown while the route is loading.
    return (
        <div>
            <div className="flex justify-between mb-5">
                <div className="h-10 w-32 rounded-lg bg-gray-200"></div>
                <div className="h-10 w-32 rounded-lg bg-gray-200"></div>
            </div>
            <div className="w-full h-52 rounded-lg bg-gray-200 animate-pulse">
            </div>
        </div>
    )
}