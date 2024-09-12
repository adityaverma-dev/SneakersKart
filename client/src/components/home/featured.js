import React from "react";
import Carrousel from "utils/carrousel";

const Featured = () =>{

    const corrouselItems = [
        {
            img:'/images/nike-5126389_1280-compressed.jpg',
            lineOne: 'Sneakers',
            lineTwo: 'Custom Shop',
            lineTitle: 'Shop Now',
            linkTo:'/Shop'
        },
        {
            img:'/images/shoes-6916897_1280-compressed.jpg',
            lineOne: 'Best Stock',
            lineTwo: 'Crazy Discounts',
            lineTitle: 'View offers',
            linkTo:'/Shop'
        }
    ]



    return(
        <div className="featured_container">
            <Carrousel items={corrouselItems}/>
        </div>
    )
}

export default Featured