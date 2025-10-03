import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";
import { useSession, useLogout } from "@/hooks/useAuth";

export default function Header() {
  const session = useSession();
  const logout = useLogout();

  return (
    <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full  items-center justify-between px-4">
        <Link to="/" className="font-semibold">
          Roxiler
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {session ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-muted-foreground sm:inline">
                {session.name}
              </span>
              <Button size="sm" variant="outline" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild size="sm" variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
