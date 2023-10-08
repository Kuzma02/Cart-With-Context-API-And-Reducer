import { FaCartPlus } from 'react-icons/fa';
import { useGlobalContext } from './context';
const Navbar = () => {
  const { cart } = useGlobalContext();


  return (
    <nav>
      <div className='nav-center'>
        <h4>useReducer</h4>
        <div className='nav-container'>
          <FaCartPlus className='cart-icon' />
          <div className='amount-container'>
            <p className='total-amount'>{ cart.reduce((total, item) => total + item.amount, 0) }</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
