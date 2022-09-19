import { Navbar as NavbarBs, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useShoppingCart } from '../context/ShoppingCartContext';

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return <NavbarBs sticky='top' className='bg-white shadow-lg mb-3'>
    <Container>
      <Nav className='me-auto'>
        <Nav.Link to='/' as={NavLink}>
          Home
        </Nav.Link>
        <Nav.Link to='/store' as={NavLink}>
         Store
        </Nav.Link>
        <Nav.Link to='/about' as={NavLink}>
         About
        </Nav.Link>
      </Nav>
      {
        cartQuantity > 0 && (
          <Button
        onClick={openCart}
      style={{position:'relative', height:'3rem', width:'3rem'}}
        className='rounded-circle'
        variant='outline-primary'
      >
        <i className='fa fa-shopping-cart'></i>
        <div
         className='d-flex rounded-circle bg-danger align-items-center justify-content-center'
          style={{
            color:'white',
            position:'absolute',
            width: '1.4rem',
            height: '1.4rem',
            bottom: 0,
            right: 0,
            transform: 'translate(25%, 25%)'
         }}
        >{cartQuantity}</div>
          </Button>
        )
      }
      
    </Container>
  </NavbarBs>
}