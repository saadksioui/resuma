import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";
import { LogoutButton } from "../(auth)/_components/logout-button";

const Dashboard = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome, {data.user.user_metadata.name}!</h1>
      <LogoutButton />
    </div>
  )
};

export default Dashboard
