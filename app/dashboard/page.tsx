import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { LogoutButton } from "../(auth)/_components/logout-button";

const Dashboard = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">Dashboard</h1>
    </div>
  )
};

export default Dashboard
