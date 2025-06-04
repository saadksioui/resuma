
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
  const { data: userData, error: userError } = await supabase.auth.getUser()

  let resumeData = null;
  let resumeError = null;
  if (userData.user) {
    const { data, error } = await supabase
      .from("resumes")
      .select("slug")
      .eq("user_id", userData.user.id)
      .single();
    resumeData = data;
    resumeError = error;
  }


  return (
    <nav className="bg-white shadow-sm px-8 py-5 flex justify-between items-center">
      <div className="flex items-center">
        <Image src="/resuma-logo.svg" alt="Logo" width={150} height={150} />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-2 cursor-pointer'>
          <UserCircle className="h-6 w-6" />
          <span className="hidden sm:inline">{userData.user?.user_metadata.name}</span>
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            <div className="px-4 py-2 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-900">{userData.user?.user_metadata.name}</p>
              <p className="text-xs text-gray-500">{userData.user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`${process.env.NEXT_PUBLIC_LINK}/${resumeData?.slug}`} target='_blank' className="w-full flex flex-col items-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <span className="text-xs text-gray-500 mr-2">Your public link:</span>
              <span className="text-blue-600 text-xs truncate">{`${process.env.NEXT_PUBLIC_LINK}/${resumeData?.slug}`}</span>
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