import { createClient } from "@/utils/supabase/server";
import { redirect, useRouter } from "next/navigation";

const Dashboard = async () => {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <h1>Welcome, {data.user.email}!</h1>
    </div>
  )
};

export default Dashboard
