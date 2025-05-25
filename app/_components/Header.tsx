import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

const Header = async () => {

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  
  return (
    <div>
      Header
      {
        user ? (
          <Button>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
        ) : (
          <>
            <Button>
              <Link href="/login">Login</Link>
            </Button>
            <Button>
              <Link href="/sign-up">Register</Link>
            </Button>
          </>
        )
      }
    </div>
  )
};

export default Header
