import { createContext, useContext, useState, ReactNode } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemCount: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

type CartItem = {
  id: number,
  quantity: number
};

type ShoppingCartProviderProps = {
  children: ReactNode
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
};

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartQuantity = cartItems.reduce((acc, item) => item.quantity + acc, 0);

  const openCart =()=> setIsOpen(true);
  const closeCart = ()=>setIsOpen(false);

  function getItemCount(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  }
  
  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }]
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  };

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
      return currItems.filter(item=>item.id!==id)
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return {...item, quantity:item.quantity-1}
          } else {
            return item
          }
        })
    }
  })
  };

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id);
    })
  }

  return (
    <ShoppingCartContext.Provider value={{
      getItemCount,
      increaseCartQuantity,
      decreaseCartQuantity,
      removeFromCart,
      cartItems,
      cartQuantity,
      openCart,
      closeCart
    }}>
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  )
  
};