import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-3 px-4">
      <div className="w-3/4 mx-auto flex justify-between items-center text-sm text-gray-500">
        <p>© 2025 Resuma</p>
        <div className="flex space-x-4">
          <Link href="#" className="hover:text-blue-600">Terms</Link>
          <Link href="#" className="hover:text-blue-600">Privacy</Link>
          <Link href="#" className="hover:text-blue-600">Help</Link>
        </div>
      </div>
    </footer>
  )
};

export default Footer
