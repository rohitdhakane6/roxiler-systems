import { useSession } from "@/hooks/useAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import AdminDashboard from "@/pages/AdminDashboard";
import OwnerDashboard from "@/pages/OwnerDashboard";
import UserDashboard from "@/pages/UserDashboard";

const roles = {
  ADMIN: "ADMIN",
  STORE_OWNER: "STORE_OWNER",
  USER: "USER",
} as const;

function Dashboard() {
  const session = useSession();
  const navigate = useNavigate();

  // Redirect to login if no session
  useEffect(() => {
    if (!session) {
      navigate("/login", { replace: true });
    }
  }, [session, navigate]);

  // Handle loading or no session
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Redirecting to login...</div>
      </div>
    );
  }

  // Render dashboard based on role
  const renderDashboard = () => {
    switch (session.role) {
      case roles.ADMIN:
        return <AdminDashboard />;
      case roles.STORE_OWNER:
        return <OwnerDashboard />;
      case roles.USER:
        return <UserDashboard />;
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-red-600">Unauthorized: Invalid role</div>
          </div>
        );
    }
  };

  return <div>{renderDashboard()}</div>;
}

export default Dashboard;
