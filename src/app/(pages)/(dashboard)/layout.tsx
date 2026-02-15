import Navigation from "@/app/_components/Navigation";


export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navigation />
            <main className="p-5">
                {children}
            </main>
        </div>
    )
}