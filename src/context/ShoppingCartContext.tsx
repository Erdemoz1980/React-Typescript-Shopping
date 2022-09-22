import { createContext, useContext, useState, ReactNode } from "react";
import { ShoppingCart } from '../components/ShoppingCart';


type ShoppingCartContext = {
  getItemQuantity: (id: number) => number,
  increaseItemQuantity: (id: number) => void,
  decreaseItemQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  cartItems: CartItem[],
  openCart: () => void,
  closeCart: () => void,
  cartItemsQuantity:number
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const cartItemsQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0;
  };

  function increaseItemQuantity(id: number) {
    return setCartItems(currItems => {
      if (currItems.find(item => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 }
          } else {
            return item
          }
        })
      }
    })
  };

  function decreaseItemQuantity(id: number) {
    return setCartItems(currItems => {
      if (currItems.find(item => item.id === id)?.quantity === 1) {
        return currItems.filter(item => item.id !== id);
      } else {
        return currItems.map(item => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 }
          } else {
            return item
          }
        })
      }
    })
  };

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  };


  return (
    <ShoppingCartContext.Provider value={{
      getItemQuantity,
      increaseItemQuantity,
      decreaseItemQuantity,
      removeFromCart,
      cartItems,
      openCart,
      closeCart,
      cartItemsQuantity
    }}>
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}