import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from '../context/ShoppingCartContext';
import { CartItem } from './CartItem';
import { formatCurrency } from '../utilities/formatCurrency';
import storeItems from '../data/items.json';

type ShoppingCartProps = {
  isOpen: boolean
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItemsQuantity, cartItems } = useShoppingCart();

  
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement='end'>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          {cartItemsQuantity >0 ? 'Cart' : 'Your cart is empty'}
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {
            cartItems.map(item => (
              <CartItem key={item.id} {...item} />
            ))
          }
            <div className="fs-5 fw-bold ms-auto">
            Total{' '}
            {formatCurrency(
              cartItems.reduce((acc, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id);
                return acc+(item.price*cartItem.quantity)
              },0)
            )}
        
        </div>
      
        </Stack>
       
       
      </Offcanvas.Body>
    
    </Offcanvas>
  )
};