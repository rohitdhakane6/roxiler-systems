import { LoginForm } from "@/components/auth";

export default function Login() {
  return (
    <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
