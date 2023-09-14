import { Button } from "@/components/ui/button";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";

export default function Page() {
  const { isAuthenticated } = getKindeServerSession();
  return (
    <main>
      <h1>Nimble</h1>
      <Button>
        {isAuthenticated() ? (
          <Link href={"/console"}>Go to Console</Link>
        ) : (
          <LoginLink>Login</LoginLink>
        )}
      </Button>
    </main>
  );
}
