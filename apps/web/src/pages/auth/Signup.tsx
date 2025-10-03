import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, type SignupInput } from "@repo/common";

export default function Signup() {
  const navigate = useNavigate();
  const signup = useSignup();
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", address: "", password: "" },
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = form.handleSubmit(async (values) => {
    setError(null);
    try {
      await signup.mutateAsync(values);
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
      setError(serverMsg || thrownMsg || "Signup failed");
    }
  });

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-muted-foreground">Sign up to get started.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-3" noValidate>
        <div className="space-y-1">
          <label className="block text-sm font-medium">Full name</label>
          <input
            type="text"
            {...form.register("name")}
            className="h-10 w-full rounded-md border px-3 text-sm"
            placeholder="Your full name"
          />
          {form.formState.errors.name ? (
            <div className="text-xs text-red-600">
              {form.formState.errors.name.message}
            </div>
          ) : null}
        </div>

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
          <label className="block text-sm font-medium">Address</label>
          <textarea
            {...form.register("address")}
            className="min-h-20 w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Street, City, State"
          />
          {form.formState.errors.address ? (
            <div className="text-xs text-red-600">
              {form.formState.errors.address.message}
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

        <Button type="submit" className="w-full" disabled={signup.isPending}>
          {signup.isPending ? "Creating…" : "Create account"}
        </Button>
      </form>
    </div>
  );
}
