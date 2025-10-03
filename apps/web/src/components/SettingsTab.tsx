import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Lock,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  User,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdatePassword, useSession } from "@/hooks/useAuth";
import { z } from "zod";

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(1, "Required"),
    newPassword: z
      .string()
      .min(8, "Password too short")
      .max(16, "Password too long")
      .regex(/^(?=.*[A-Z])/, "Need uppercase")
      .regex(/^(?=.*[^A-Za-z0-9])/, "Need special char"),
    confirmPassword: z.string().min(1, "Required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "New password must be different from current password",
    path: ["newPassword"],
  });

type PasswordFormData = z.infer<typeof passwordFormSchema>;

export default function SettingsTab() {
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const updatePasswordMutation = useUpdatePassword();
  const user = useSession();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: PasswordFormData) => {
    setMessage(null);

    try {
      await updatePasswordMutation.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      setMessage({ type: "success", text: "Password updated successfully!" });
      form.reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Password Update Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Update Password
          </CardTitle>
          <CardDescription>
            Change your account password for security
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPasswords.current ? "text" : "password"}
                          placeholder="Enter current password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility("current")}
                        >
                          {showPasswords.current ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPasswords.new ? "text" : "password"}
                          placeholder="Enter new password (8-16 chars, uppercase, special char)"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility("new")}
                        >
                          {showPasswords.new ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type={showPasswords.confirm ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="pl-10 pr-10"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => togglePasswordVisibility("confirm")}
                        >
                          {showPasswords.confirm ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Display */}
              {message && (
                <div
                  className={`flex items-center gap-2 p-3 rounded-md ${
                    message.type === "success"
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4" />
                  ) : (
                    <AlertCircle className="h-4 w-4" />
                  )}
                  <span className="text-sm">{message.text}</span>
                </div>
              )}

              <div className="flex justify-start">
                <Button
                  type="submit"
                  className="flex items-center gap-2"
                  disabled={updatePasswordMutation.isPending}
                  size="lg"
                >
                  <Save className="h-4 w-4" />
                  {updatePasswordMutation.isPending ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* User Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Account Details
          </CardTitle>
          <CardDescription>
            Your account information (read-only)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Name
              </label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-md border">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{user?.name || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                User ID
              </label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-md border">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-mono">{user?.id || "N/A"}</span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Role
              </label>
              <div className="flex items-center gap-3 p-3 bg-muted rounded-md border">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm capitalize">
                  {user?.role?.replace("_", " ") || "N/A"}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Account Status
              </label>
              <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">Active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
