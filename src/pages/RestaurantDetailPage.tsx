import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { MenuItem as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user_profile_form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession , isLoading: isCheckoutLoading } = useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : []
  });

  const addToCart = (MenuItem: MenuItemType) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (cartItem) => cartItem._id === MenuItem._id
      );

      let updatedItems;

      if (existingItem) {
        updatedItems = prevItems.map((cartItem) =>
          cartItem._id === MenuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedItems = [
          ...prevItems,
          {
            _id: MenuItem._id,
            name: MenuItem.name,
            price: MenuItem.price,
            quantity: 1,
          },
        ];
      }

      //storing cartitems in session
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prev) => {
      const updatedCartItems = prev.filter((item) => 
        cartItem._id !== item._id);

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  const onCheckout =async (userFormData : UserFormData) => {
    console.log("user details : " , userFormData )

    if(!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems : cartItems.map((cartItem) => ({
        menuItemId : cartItem._id ,
        name : cartItem.name,
        quantity : cartItem.quantity.toString()
      })),
      restaurantId : restaurant?._id,
      deliveryDetails : {
        name : userFormData.name,
        address : userFormData.address,
        city: userFormData.city,
        country : userFormData.country,
        email : userFormData.email as string
      }
    }

    console.log()

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url
  }

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-25">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton disabled={cartItems.length==0} onCheckout={onCheckout} isLoading={isCheckoutLoading} />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailPage;
