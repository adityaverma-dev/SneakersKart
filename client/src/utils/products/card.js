import React, { useState } from "react";
import {rednerCardImage, SneakersButton} from '../tools'
import AddToCartHandler from "utils/addToCartHandler";
import { selectUser, userAddToCart } from "store/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "@mui/icons-material";

const Card = (props) => {
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

    return(
        <div className={`card_item_wrapper ${props.grid ? 'grid_bars' : ''}`}>
            <div className="image"
            style={{
                background:`url(${rednerCardImage(props.item.images)})`
            }} 
            ></div>
            <div className="action_container">
                <div className="tags">
                    <div className="brand">{props.item.brand.name}</div>
                    <div className="brand">{props.item.model}</div>
                    <div className="brand">${props.item.price}</div>
                </div>

                {props. grid ?
                <div className="description">
                    <p>
                        {props.item.description}
                    </p>

                 </div>   
            
            :null}
            <div className="actions">
                <div className="button_wrapp">
                    <SneakersButton 
                    type="default"
                    altClass="card_link"
                    title="View Product"
                    linkTo={`/product_detail/${props.item._id}`}
                    style={{
                        fontWeight: 'bold'
                    }}
                    
                    />
                </div>
                <div className="button_wrapp">
                <SneakersButton 
                    type="bag_link"
                    runAction={ () => handleAddtoCart(props.item)}
                    iconSize='23'
                  
                    
                    />
                </div>

            </div>

            </div>

            <AddToCartHandler 
            modal={modal}
            errorType={errorType}
            handleclose={handleclose}
            
            
            />

        </div>
    )

}



export default Card;