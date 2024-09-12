import React from 'react';
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { selectUser } from 'store/features/userSlice';
import { useSelector } from 'react-redux';



const Header = ({users, signOutUser}) => {

const cart = useSelector(selectUser)
let cartCount = cart.cart.length

    return(
    <header className="bck_b_light">
      <div className="container">
        <div className='left'>
            <div className='logo'>
                SneakersKart

            </div>

        </div>
        <div className='right'>
            <div className='top'> 
            { users.auth ?
            <>
            <div className='cart_link'>
                <span>
                    {cart.cart ? 
                    cartCount
                    : 0}
                </span>
                <Link to="/dashboard/user/user_cart">
                    My cart          
                </Link>
            </div>
            <Link to="/dashboard">
                    My account        
                </Link>
                <span onClick={() => signOutUser()}
                >
                    Log Out

                </span>
                </>
            :  
                <Link to="/sign_in">
                    Log in 
                </Link>
         
            }
            

            </div>
            <div className='button'>
                <Link to="/">
                    Home
                </Link>
                <Link to="/shop">
                    Shop
                </Link>
            </div>
        </div>

      </div>
     
     
     </header>   
    )
}

export default Header;