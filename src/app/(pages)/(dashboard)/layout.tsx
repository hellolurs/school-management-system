import Navigation from "@/app/_components/navigation";


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navigation />
            <main className="p-8 flex-1">
                {children}
            </main>
        </div>
    )
}