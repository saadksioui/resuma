import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {

  return (
    <div>
      Home
      <Button>
        <Link href="/login">Login</Link>
      </Button>
      <Button>
        <Link href="/sign-up">Register</Link>
      </Button>
    </div>
  )
};

export default Home
