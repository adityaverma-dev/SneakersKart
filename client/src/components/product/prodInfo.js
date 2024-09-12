import React from "react";
import AddToCartHandler from "utils/addToCartHandler";
import { SneakersButton } from "utils/tools";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { selectUser, userAddToCart } from "store/features/userSlice";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";



const Prodinfo = (props) => {
    const [modal, setModal] = useState(false);
    const [errorType, setErrorType] = useState(null)
   const user = useSelector(selectUser)
    const dispatch = useDispatch()

    const handleclose = () => setModal(false)

    const handleAddtoCart = (item) => {
        if(!user.auth){
           setModal(true)
           setErrorType('auth')
           return false
        }
        if(!user.data.verified){
            setModal(true);
            setErrorType('verify');
            return false

        }
       dispatch(userAddToCart(item))




    }




    const showProdTags = ( detail ) => (
        <div className="product_tags">
            <div className="tag">
                <div><LocalShippingIcon /></div>
                <div className="tag_text">
                    { detail.shipping ? 
                    <div> Free Shipping is available </div>
                    
                    : <div> Sorry, no shipping on this product </div>
                    }

                </div>

            </div>
            { detail.available > 0 ?
            
            <div className="tag">
            <div><DoneOutlineIcon /></div>
            <div className="tag_text">
               <div> <strong> {detail.available} </strong> product/s is available in warehouse</div>

            </div>

        </div>
        
        
        :   
        <div className="tag">
        <div><SentimentVeryDissatisfiedIcon/></div>
        <div className="tag_text">
           <div> Sorry product not available</div>

        </div>

    </div> }

        </div>

    )

    const showProdActions = (detail) => {
        return (
        <div className="product_actions">
            <div className="price"> ${detail.price}</div>
            <div className="cart">
                <SneakersButton 
                type="add_to_cart_link"
                runAction={() => {
                    handleAddtoCart(detail)
                }}
                
                />

            </div>


        </div>


    )}

    const showProdSpecs = (detail) => (
        <div className="product_specification">
            <h2>Product Details </h2>
            <div>
                <div className="item">
                    <strong>Type: </strong>  {detail.toptype}

                </div>
            </div>

        </div>
    )

    const detail = props.detail

    return (
        <div>
            <h1>{detail.brand.name}</h1>
            <p>
                {detail.description}
            </p>
            { showProdTags(detail)}
            { showProdActions(detail) }
            { showProdSpecs(detail)}
            <AddToCartHandler 
            modal={modal}
            errorType={errorType}
            handleclose={handleclose}
            
            
            />
        </div>
    )


}

export default Prodinfo;