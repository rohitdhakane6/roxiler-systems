import { Link, NavLink } from "react-router";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 w-full  items-center justify-between px-4">
        <Link to="/" className="font-semibold">
          Roxiler
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `transition-colors hover:text-foreground ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`
            }
          >
            Dashboard
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          {(() => {
            const token =
              typeof window !== "undefined"
                ? localStorage.getItem("token")
                : null;
            const userRaw =
              typeof window !== "undefined"
                ? localStorage.getItem("user")
                : null;
            const user = userRaw
              ? (JSON.parse(userRaw) as {
                  name?: string;
                  role?: string;
                  email?: string;
                })
              : null;
            if (token && user) {
              return (
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm text-muted-foreground sm:inline">
                    {user.email}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("user");
                      window.location.href = "/";
                    }}
                  >
                    Logout
                  </Button>
                </div>
              );
            }
            return (
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            );
          })()}
        </div>
      </div>
    </header>
  );
}
