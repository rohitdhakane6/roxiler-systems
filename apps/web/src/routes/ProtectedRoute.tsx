import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  // const location = useLocation();

  // if (isPending) {
  //   return (
  //     <div className="flex h-40 items-center justify-center text-sm text-muted-foreground">
  //       Checking session…
  //     </div>
  //   );
  // }

  // if (!session) {
  //   return <Navigate to="/login" replace state={{ from: location }} />;
  // }

  return <>{children}</>;
}
