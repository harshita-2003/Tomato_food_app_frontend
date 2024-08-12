import { CartItem } from "@/pages/RestaurantDetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash2 } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart : (CartItem : CartItem) => void
};

const OrderSummary = ({ restaurant, cartItems ,removeFromCart }: Props) => {
    
  const getTotalCost = () => {
    const totalpeny = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalpeny + restaurant.deliveryPrice;

    return totalWithDelivery.toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>₹{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <div className="flex justify-between" key={item._id}>
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash2
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              ₹{(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery Charge</span>
          <span>₹{restaurant.deliveryPrice.toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
