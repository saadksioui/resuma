"use client"
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { DollarSign, HomeIcon, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuItems = [
  {
    title: 'Home',
    href: '/dashboard',
    icon: HomeIcon
  },
  {
    title: "Upgrade",
    href: "/upgrade",
    icon: DollarSign
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
]

const AppSidebar = () => {

  const path = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-center mt-10">
          <Image
            src={"/resuma-logo.svg"}
            alt="logo"
            width={200}
            height={200}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="mx-2 mt-10 mb-12">
            <Link href={'/create-new-resume'}>
              <Button className="w-full cursor-pointer">+ Create New Resume</Button>
            </Link>
          </div>
          <SidebarMenu>
            {
              MenuItems.map((menu, index) => (
                <SidebarMenuItem key={index} className="mt-3 mx-2">
                  <SidebarMenuButton isActive={path === menu.href} className="p-5">
                    <Link href={menu.href} className="flex items-center gap-4 p-3">
                      <menu.icon />
                      <span>{menu.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            }
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>

      { /* TODO: Disabled for now */ }

      {/* <SidebarFooter>
        <div className="p-5 rounded-lg border mb-b bg-gray-800">
          <div className="flex items-center justify-between text-gray-400">
            <Gem />
            <h2>{user.credits} Credits Left</h2>
          </div>
          <Button className="w-full mt-3">Buy More Credits</Button>
        </div>
      </SidebarFooter> */}
    </Sidebar>
  )
};

export default AppSidebar
