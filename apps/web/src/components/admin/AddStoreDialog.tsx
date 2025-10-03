import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminAddStore, type AdminAddStoreInput } from "@repo/common";
import {
  useCreateStoreAsAdmin,
  useAdminUsers,
  useAdminStores,
} from "@/hooks/useAdmin";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Store, Building2, MapPin, User } from "lucide-react";

interface AddStoreDialogProps {
  children?: React.ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  role: "USER" | "STORE_OWNER" | "ADMIN";
}

export default function AddStoreDialog({ children }: AddStoreDialogProps) {
  const [open, setOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // hook mutation
  const { mutateAsync: createStore, isPending } = useCreateStoreAsAdmin();

  const { data: users } = useAdminUsers();
  const { data: stores } = useAdminStores();

  // Filter users to get only store owners who don't have any stores
  const allStoreOwners: User[] =
    users?.filter((user: User) => user.role === "STORE_OWNER") || [];

  const ownersWithStores = new Set(
    stores?.map((store: { ownerId: string }) => store.ownerId) || []
  );

  const availableStoreOwners = allStoreOwners.filter(
    (owner) => !ownersWithStores.has(owner.id)
  );

  const form = useForm<AdminAddStoreInput>({
    resolver: zodResolver(adminAddStore),
    defaultValues: {
      name: "",
      address: "",
      ownerEmailId: "",
    },
  });

  const onSubmit = async (data: AdminAddStoreInput) => {
    setFormError(null);
    try {
      const storeData = {
        name: data.name,
        address: data.address,
        ownerEmailId: data.ownerEmailId,
      };

      await createStore(storeData);

      form.reset();
      setOpen(false);
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
      setFormError(serverMsg || thrownMsg || "Failed to create store");
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
      setFormError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Store
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Add New Store
          </DialogTitle>
          <DialogDescription>
            Create a new store and assign it to an available store owner (only
            owners without existing stores are shown).
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Store Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Enter store name"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Address</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        placeholder="Enter store address"
                        className="pl-10 min-h-[80px] resize-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ownerEmailId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Store Owner
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <SelectTrigger className="w-full pl-10">
                          <SelectValue placeholder="Select a store owner" />
                        </SelectTrigger>
                      </div>
                    </FormControl>
                    <SelectContent>
                      {availableStoreOwners.length === 0 ? (
                        <div className="p-3 text-sm text-center text-red-700 bg-red-50 border border-red-200 rounded-md">
                          No available store owners.
                          <br />
                          Please{" "}
                          <span className="font-semibold">
                            create a store owner user first
                          </span>{" "}
                          before adding a store.
                        </div>
                      ) : (
                        availableStoreOwners.map((owner) => (
                          <SelectItem key={owner.id} value={owner.email}>
                            {owner.name} ({owner.email})
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {formError && (
              <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-red-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">{formError}</div>
                </div>
              </div>
            )}

            <DialogFooter className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isPending}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending || availableStoreOwners.length === 0}
                className="flex-1"
                size="lg"
              >
                {isPending ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </div>
                ) : (
                  "Create Store"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
