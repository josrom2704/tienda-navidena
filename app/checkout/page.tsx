"use client";

import { CheckoutForm } from "../../components/checkout-form";
import { OrderConfirmation } from "@/components/order-confirmation";
import { useState } from "react";
import { useCart } from "@/components/cart-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckoutPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { items } = useCart();
  const router = useRouter();

  // Redirigir si el carrito está vacío
  useEffect(() => {
    if (items.length === 0) {
      router.push("/carrito");
    }
  }, [items.length]);

  if (items.length === 0) {
    return null; // Se redirigirá automáticamente
  }

  if (showConfirmation) {
    return (
      <OrderConfirmation
        orderNumber={orderNumber}
        onContinueShopping={() => {
          setShowConfirmation(false);
          router.push("/catalogo");
        }}
      />
    );
  }

  return (
    <CheckoutForm
      onSuccess={(orderNum: string) => {
        setOrderNumber(orderNum);
        setShowConfirmation(true);
      }}
      onBack={() => router.push("/carrito")}
    />
  );
}

