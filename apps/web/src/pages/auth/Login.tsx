import { useState } from "react";
import { useNavigate } from "react-router";
import { useLogin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@repo/common";

export default function Login() {
  const navigate = useNavigate();
  const login = useLogin();
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    try {
      const data = form.getValues();
      await login.mutateAsync(data);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const anyErr = err as unknown as {
        response?: {
          data?: { message?: string; error?: { message?: string } };
        };
        message?: string;
      };
      const serverMsg =
        anyErr?.response?.data?.error?.message ||
        anyErr?.response?.data?.message;
      const thrownMsg = anyErr?.message;
      setError(serverMsg || thrownMsg || "Login failed");
    }
  }

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-muted-foreground">Access your account.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3">
        <div className="space-y-1">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            {...form.register("email")}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="you@example.com"
          />
          {form.formState.errors.email ? (
            <div className="text-xs text-red-600">
              {form.formState.errors.email.message}
            </div>
          ) : null}
        </div>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Password</label>
          <input
            type="password"
            {...form.register("password")}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="••••••••"
          />
          {form.formState.errors.password ? (
            <div className="text-xs text-red-600">
              {form.formState.errors.password.message}
            </div>
          ) : null}
        </div>

        {error ? <div className="text-sm text-red-600">{error}</div> : null}

        <Button type="submit" className="w-full" disabled={login.isPending}>
          {login.isPending ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
