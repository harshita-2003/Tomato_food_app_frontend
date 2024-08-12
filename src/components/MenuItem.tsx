import { MenuItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { PlusCircle } from "lucide-react";

type Props = {
  menuItem: MenuItem;
  addToCart: () => void;
};

const MenuItem = ({ menuItem , addToCart }: Props) => {
  return (
    <Card className="cursor-pointer">
      <CardHeader>
        <CardTitle>{menuItem.name}</CardTitle>
      </CardHeader>
      <CardContent className="font-bold">
        ₹{menuItem.price.toFixed(2)}
      </CardContent>
      <button onClick={addToCart} className="flex mx-5 mb-3 border px-3 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white gap-2">
        Add <PlusCircle />
      </button>
    </Card>
  );
};

export default MenuItem;