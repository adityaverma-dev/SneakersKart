import React from "react";
import { Pagination, Button } from 'react-bootstrap'


const PaginationComponent = ({
prods, prev, next, resetSearch
}) => {

    const gotoPrevPage = (page) => {
        prev(page)
    }
    const gotoNextPage = ( page ) => {
        next(page)
    }
    return (
        <>
        {prods.docs.length > 0 ? 
        <Pagination>
            {prods.hasPrevPage ?
            <>
            <Pagination.Prev onClick={() => gotoPrevPage(prods.prevPage)} />
            <Pagination.Item onClick={() => gotoPrevPage(prods.prevPage)}>
                {prods.prevPage}
            </Pagination.Item>
            </>
             
            
        :null}
        <Pagination.Item active> {prods.page} </Pagination.Item>

        {prods.hasNextPage ?
            <>
            
            <Pagination.Item onClick={() => gotoNextPage(prods.nextPage)}>
                {prods.nextPage}
            </Pagination.Item>
            <Pagination.Next onClick={() => gotoNextPage(prods.nextPage)} />
            </>
            
            
        :null}

        </Pagination>
        
    
    :
    <div>
        <div>
            Sorry nothing was found
        </div>
        <Button
        className="mt-3"
        variant="primary"
        onClick={resetSearch}
        >
            Reset search
        </Button>
    </div>
    
    }
        </>
    )
}


export default PaginationComponent; 