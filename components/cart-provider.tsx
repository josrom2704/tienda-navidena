"use client"

import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  total: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // ✅ OPTIMIZACIÓN: Memoizar funciones para evitar re-renders
  const addItem = useCallback((newItem: CartItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id)
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === newItem.id ? { ...item, quantity: item.quantity + newItem.quantity } : item,
        )
      }
      return [...currentItems, newItem]
    })
  }, [])

  const removeItem = useCallback((id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems((currentItems) => currentItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }, [removeItem])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  // ✅ OPTIMIZACIÓN: Memoizar el total para evitar recálculos
  const total = useMemo(() => 
    items.reduce((sum, item) => sum + item.price * item.quantity, 0), 
    [items]
  )

  // ✅ OPTIMIZACIÓN: Memoizar el contexto para evitar re-renders
  const contextValue = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
  }), [items, addItem, removeItem, updateQuantity, clearCart, total])

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
