import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, Save, AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useUpdatePassword } from "@/hooks/useAuth";

export default function SettingsTab() {
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const updatePasswordMutation = useUpdatePassword();

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) errors.push("At least 8 characters");
    if (password.length > 16) errors.push("Maximum 16 characters");
    if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
    if (!/[^A-Za-z0-9]/.test(password))
      errors.push("At least one special character");
    return errors;
  };

  const handlePasswordUpdate = async () => {
    setMessage(null);

    // Client-side validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "New passwords don't match!" });
      return;
    }

    const passwordErrors = validatePassword(passwordData.newPassword);
    if (passwordErrors.length > 0) {
      setMessage({
        type: "error",
        text: `Password requirements: ${passwordErrors.join(", ")}`,
      });
      return;
    }

    try {
      await updatePasswordMutation.mutateAsync({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setMessage({ type: "success", text: "Password updated successfully!" });
      // Reset form after successful update
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to update password";
      setMessage({ type: "error", text: errorMessage });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Password Settings
        </CardTitle>
        <CardDescription>
          Update your account password for security
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value,
                });
                if (message) setMessage(null);
              }}
              placeholder="Enter current password"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value,
                });
                if (message) setMessage(null);
              }}
              placeholder="Enter new password (8-16 chars, uppercase, special char)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => {
                setPasswordData({
                  ...passwordData,
                  confirmPassword: e.target.value,
                });
                if (message) setMessage(null);
              }}
              placeholder="Confirm new password"
            />
          </div>
        </div>

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
            onClick={handlePasswordUpdate}
            className="flex items-center gap-2"
            disabled={
              !passwordData.currentPassword ||
              !passwordData.newPassword ||
              !passwordData.confirmPassword ||
              updatePasswordMutation.isPending
            }
          >
            <Save className="h-4 w-4" />
            {updatePasswordMutation.isPending
              ? "Updating..."
              : "Update Password"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
