import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCurrentState, getProductByID, selectProduct } from "store/features/productSlice";
import { useParams } from "react-router-dom";
 
import Loader from "utils/loader";
import Prodinfo from "./prodInfo";
import { rednerCardImage } from "utils/tools";


const ProductDetail = (props) => {
  const products = useSelector(selectProduct)
  const Dispatch = useDispatch()
  const { id } = useParams();

  useEffect(() => {
    Dispatch(getProductByID(id))

  }, [Dispatch, id])

  useEffect(() => {
    return() => {
        Dispatch(clearCurrentState())

    }
  }, [Dispatch])

return (
 <div className="page_container">
    <div className="page_top">
        <div className="container">
            Product Detail
        </div>

    </div>

    <div className="container">
        { products && products.productByID ? 
      
        <div className="product_detail_wrapper">
            <div className="left">
                <div>
                    <img
                    alt= "some alt"
                    src={rednerCardImage(products.productByID.images)}
                    onClick={() => {
                    }}
                    
                    >
                    </img>
                 </div>   
            </div>   

             <div className="right">
           <Prodinfo detail = {products.productByID}  />

            

         </div>    


         </div>  
         
        
        
        
        
        :null }

    </div>

 </div>
)

}

export default ProductDetail;