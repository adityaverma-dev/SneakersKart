import React, { useEffect, useReducer, useState } from "react";
import  PaginateNav from 'utils/paginateNav'
import CardBlock from "utils/products/cardblocks";
import GridOffIcon from '@mui/icons-material/GridOff';
import GridOnIcon from '@mui/icons-material/GridOn';
import { selectBrand } from "store/features/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { getAllBrands } from "store/features/brandSlice";
import { productsByPaginate, selectProduct } from "store/features/productSlice";
import SearchBar from "./searchBar";

const defaultValue =  { keywords: '', brand:[], min:0, max:100000, page:1}


const Shop = () => {
    const [grid, setGrid] = useState(false)

    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValue
        
            )
    const dispatch = useDispatch()        

    const brands = useSelector(selectBrand)
    const products = useSelector(selectProduct)

const handleGrid = () => setGrid(!grid)

const goToPage = (page) => {
    setSearchValues({page:page})
}

const handleResetSearch = () => {
    setSearchValues({keywords: ''})

}

const handleKeywords = (values) => {
    setSearchValues({keywords: values, page:1 })

}

useEffect(() => {
    dispatch(getAllBrands())

}, [dispatch])
useEffect(() => {

    dispatch(productsByPaginate(searchValues))

}, [searchValues, dispatch])

return (
    <div className="page_container">
        <div className="page_top">
            <div className="container">
                <SearchBar
                handleKeywords= {(values) => handleKeywords(values)}
                
                
                />

            </div>

        </div>
        <div className="container">
            <div className="show_wrapper">
                <div className="left">
                    collapse brand
                    collapse toptype
                    range select 

                </div>
                <div className="right">
                    <div className="shop_options">
                        <div className="shop_grids clear">
                        <div className={`grid_btn ${grid ? '' : 'active' }`}
                          onClick={() => handleGrid()}
                        
                        
                        >
                          <GridOnIcon></GridOnIcon>

                        </div>
                        <div className={`grid_btn ${!grid ? '' : 'active' }`}
                          onClick={() => handleGrid()}
                        
                        
                        >
                          <GridOffIcon />

                        </div>
                        </div>
                        <div>
                            { products.byPaginate && products.byPaginate.docs  ?
                            <>
                            <CardBlock 
                            grid={grid}
                            items={products.byPaginate.docs}
                            shop={true}

                            
                            />
                            <PaginateNav 
                            prods={products.byPaginate}
                            prev={(page) =>goToPage(page)}
                            next={(page) =>goToPage(page)}
                            resetSearch={() =>handleResetSearch()}
                            
                            />
                            </>
                            
                            : null }
                        </div>
               

                    </div>

                </div>

            </div>

        </div>

    </div>
)

}



export default Shop