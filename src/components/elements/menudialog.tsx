import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Separator } from "@radix-ui/react-select";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { StoreHook } from "../hooks/store-hook";

interface MenuDialogProps {
  onClose: () => void;
}

const MenuDialog: React.FC<MenuDialogProps> = ({ onClose }) => {
  const router = useRouter();
  const { grocerySearchMutation } = StoreHook();

  const handleGrocerySearch = (query: string) => {
    grocerySearchMutation
      .mutateAsync({
        query: query,
      } as any)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error(error));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-[600px] overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
        <div className="mt-6">
          <Input
            placeholder="Tomate, Brot, Käse ..."
            onChange={(e) => handleGrocerySearch(e.target.value)}
          />
        </div>
        <Separator className="my-6" />
      </DialogContent>
    </Dialog>
  );
};

export default MenuDialog;
