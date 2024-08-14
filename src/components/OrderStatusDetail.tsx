import React from 'react';
import { Separator } from './ui/separator';
import { Banknote, ChefHat, CookingPot } from 'lucide-react';
import { Order } from '@/types';

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  return (
    <div className="space-y-8 p-6 bg-gray-50 rounded-lg shadow-lg max-w-lg">
      <div className="flex items-center justify-center mb-6">
        <ChefHat className="w-12 h-12 text-red-500 animate-pulse" />
        <h2 className="text-3xl font-bold text-gray-800 ml-3">Order Status</h2>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="font-bold text-lg">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.address}, {order.deliveryDetails.city}
        </span>
      </div>

      <div className="flex flex-col space-y-2">
        <span className="font-bold text-lg">Your Order</span>
        <ul className="list-disc pl-5">
          {order.cartItems.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <Separator />

      <div className="flex justify-between items-center">
        <span className="font-bold text-lg flex items-center">
          Total Pay <Banknote className="mx-2" />
        </span>
        <span className="text-xl font-semibold text-green-600">
          ₹{(order.totalAmount / 100).toFixed(2)}
        </span>
      </div>

      <div className="flex justify-center mt-10">
        <div className="relative animate-bounce">
          <CookingPot />
        </div>
      </div>
      <p className="text-center text-gray-500 mt-2">Your delicious food is on the way!</p>
    </div>
  );
};

export default OrderStatusDetail;
