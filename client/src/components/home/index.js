import React, { useEffect } from 'react';
import Featured from './featured';
import SlimPromotion from 'utils/slimblock';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from 'store/features/userSlice.js';
import { productsBySort } from 'store/features/productSlice';
import { selectProduct } from 'store/features/productSlice';
import CardBlock from 'utils/products/cardblocks';
import Loader from 'utils/loader';
const slimPromotion = {
    img:'/images/footwear-5408643_640.jpg',
    lineOne: 'Up to 80% off',
    lineTwo: 'Valid for first new users',
    lineTitle: 'Shop Now',
    linkTo:'/Shop'
};

const Home = () => {
const {bySold, byPrice} = useSelector(selectProduct)
const dispatch = useDispatch();

useEffect(()=>{
    dispatch(productsBySort({
        limit: 4, sortBy: 'available', order:'desc'
    }));
    dispatch(productsBySort({
        limit: 4, sortBy: 'price', order:'desc'
    }));

}, [dispatch])


    return(
      <div>
        <Featured />

        { bySold ?
        <CardBlock
        items={bySold}
        title="Best Selling Sneakers"/>
    :<Loader/>}
        <SlimPromotion items={slimPromotion}/>

        { byPrice ?
        <CardBlock
        items={byPrice}
        title="Expensive Sneakers Available"/>
    :<Loader/>}
        </div>
        
        
    )
}

export default Home;