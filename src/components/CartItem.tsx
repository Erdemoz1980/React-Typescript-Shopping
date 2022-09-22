import { Stack, Button } from 'react-bootstrap';
import storeItems from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';





export function CartItem({ id, quantity }) {
  const item = storeItems.find(i => i.id === id);
  const { removeFromCart } = useShoppingCart();
  
  return (
    <Stack gap={2} direction='horizontal'>
      <img
        style={{
          height: '75px',
          width: '100px',
          objectFit:'cover'
        }}
        src={item.imgUrl}
      />
      <div className='me-auto'>
        <div>
          {item.name}{''} <span
            className='text-muted'
            style={{ fontSize: '0.7rem' }}>&times;{quantity}</span>
        </div>
        <div
          className='text-muted'
          style={{
          fontSize:'0.85rem'
        }}>
           {formatCurrency(item.price)}
        </div>
      </div>
      
        <div>
          {formatCurrency(
          item.price * quantity
        )}
        </div>
        
        <Button
          onClick={()=>removeFromCart(id)}
          variant='outline-danger'
          size='sm'
        >&times;</Button>
      
    </Stack>
  )
};