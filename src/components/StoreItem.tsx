import { Card, Button } from 'react-bootstrap';
import { formatCurrency } from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
};

export function StoreItem({ id, name, price, imgUrl }:StoreItemProps) {  
  const { getItemQuantity, increaseItemQuantity, decreaseItemQuantity, removeFromCart } = useShoppingCart();

  const itemQty = getItemQuantity(id);

  return (
  <Card className='h-100'>
    <Card.Img
        variant='top'
        src={imgUrl}
      height='200px'
      style={{objectFit:'cover'}}
    />
    <Card.Body
    className='d-flex flex-column'
    >
      <Card.Title
        className='d-flex 
        justify-content-between
        align-items-baseline'>
        <span className='fs-2'>{name}</span>
        <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        <span></span>
      </Card.Title>
        <div className='mt-auto'>
          {  itemQty < 1 ? 
            (<Button
              onClick={()=>increaseItemQuantity(id)}
            className='w-100'
            >+ Add to Cart</Button>
              ) : (
              <div
                className='d-flex align-items-center flex-column'
                style={{ gap: '1.5rem' }}
              >
                <div className='d-flex align-items-center justify-content-center'
                  style={{ gap: '1.5rem' }}
                >
                  <Button
                    onClick={()=>decreaseItemQuantity(id)}
                  >-</Button>
                  <div>
                    <span className='fs-3'>{itemQty}</span> in cart
                  </div>
              
                  <Button
                    onClick={()=>increaseItemQuantity(id)}
                  >+</Button>
                </div>
                <Button
                  onClick={()=>removeFromCart(id)}
                  variant='danger btn-sm'>Remove</Button>
              </div>
              )
          }
      </div>
   </Card.Body>
  </Card>
  )
};