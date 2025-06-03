
import { UserCircle, ChevronDown, Settings } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogoutButton } from '@/app/(auth)/_components/logout-button';
import { createClient } from '@/utils/supabase/server';
import Image from 'next/image';

const Navbar: React.FC = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()


  return (
    <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/resuma-logo.svg" alt="Logo" width={150} height={150} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 cursor-pointer'>
          <UserCircle className="h-6 w-6" />
          <span className="hidden sm:inline">{data.user?.user_metadata.name}</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{data.user?.user_metadata.name}</p>
              <p className="text-xs text-gray-500">{data.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="#" className="w-full flex flex-col items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <span className="text-xs text-gray-500 mr-2">Your public link:</span>
              <span className="text-blue-600 text-xs truncate">resuma.io/multiversal</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="w-full flex flex-col items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <LogoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

    </nav>
  );
};

export default Navbar;