import React from "react";
import AutorenewIcon from '@mui/icons-material/Autorenew';


const Loader = ({full}) => (
    <div className={`root_loader ${full ? 'full' : ''}`}>
        <AutorenewIcon/>

    </div>
)

export default Loader;