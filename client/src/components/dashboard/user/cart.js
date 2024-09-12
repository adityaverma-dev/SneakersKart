import React, { useState } from "react";
import DashboardLayout from "hoc/dashboardlayout";
import Loader from "utils/loader";
import { useDispatch, useSelector } from "react-redux";
import { selectNotification } from "store/features/notificationSlice";
import CardDetail from "./cartDetail";
import { removeFromCart } from "store/features/userSlice";

import { PayPalButton } from "react-paypal-button-v2";


const UserCart = (props) => {
    const dispatch = useDispatch()

    const removeItem = (position) => {
        dispatch(removeFromCart(position))


    }
    const caculateTotal = () => {
        let total = 0;
        props.users.cart.forEach(item => {
            total += parseInt(item.price, 10)
        })
        return total;
    }

    const generateUnits = () => (
        [{
            description:"Guitars and accessories",
            amount:{
                currency_code:"USD",
                value:caculateTotal(),
                breakdown:{
                    item_total:{
                        currency_code:"USD",
                        value:caculateTotal()
                    }
                }
            },
            items:generateItems()
        }]
    );

    const generateItems = () => {
        let items = props.users.cart.map((item)=>(
            {
                unit_amount:{
                    currency_code:"USD",
                    value: item.price
                },
                quantity:1,
                name: item.model
            }
        ));
        return items
    }

    const [loading, setLoading] = useState(false);
    const notifications = useSelector(selectNotification)


    return (
        <DashboardLayout title="Your Cart">
            {props.users.cart && props.users.cart.length > 0 ?
                <>
                    <CardDetail
                        products={props.users.cart}
                        removeItem={(position) => removeItem(position)}


                    />
                    <div className="user_cart_sum">
                        <div>
                            Total amount: ${caculateTotal()}
                        </div>

                    </div>
                    {loading ? <Loader />

                        : <div className="pp_button">
                             <PayPalButton
                            options={{
                                clientId:"AVgK_CzAMUCNIPdI-rvUQlsuca4h_LY66lJGVvC0ygaSJ92NxVdNRHzf10p3SnUtzfhZ3vuvy9RhmjTn",
                                currency:"USD",
                                disableFunding:'credit,card'
                            }}
                            createOrder={(data,actions)=>{
                                return actions.order.create({
                                   purchase_units: generateUnits()
                                })
                            }}
                            onSuccess={(details,data)=>{
                                console.log(details)
                                console.log(data)
                                setLoading(true);
                            }}
                        />
                        </div>

                    }

                </>

                : <div>
                    There is nothing in your cart
                </div>}

        </DashboardLayout>
    )
}

export default UserCart; 