import Link from "next/link";
import Navbar from "./_components/Navbar";
import { ResumeProvider } from "@/context/ResumeContext";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ResumeProvider>
<div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm text-gray-500">
          <p>© 2025 Resuma</p>
          <div className="flex space-x-4">
            <Link href="#" className="hover:text-blue-600">Terms</Link>
            <Link href="#" className="hover:text-blue-600">Privacy</Link>
            <Link href="#" className="hover:text-blue-600">Help</Link>
          </div>
        </div>
      </footer>
    </div>
    </ResumeProvider>
  )
};

export default DashboardLayout
