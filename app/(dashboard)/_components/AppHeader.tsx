import { SidebarTrigger } from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

const AppHeader = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  return (
    <div className="p-4 flex items-center gap-10 border-b">
      <SidebarTrigger size={"lg"}/>
      <div className="text-2xl font-bold text-primary">
        Welcome {data.user?.user_metadata?.name ?? "Guest"}!
      </div>
    </div>
  )
};

export default AppHeader
