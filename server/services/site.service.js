const httpStatus = require('http-status');
const { apiError } = require('../middleware/apiError');
const { Site } = require('../models/site');



const postSiteArgs = async(req) => {
    try{

        const site = new Site({
            ...req.body
        });

        await site.save();
        return site; 

    }catch(error){
        throw error;
    }
}

const getSiteArgs = async(req) => {
    try{

        const site = await Site.find({});
        if(!site) throw new apiError(httpStatus.NOT_FOUND, 'Siet not found')
    
        return site[0]; 

    }catch(error){
        throw error;
    }
}

const updateSiteArgs = async(req) => {
    try{

        const site = await Site.findByIdAndUpdate(
            {_id: req.body._id},
            {"$set": req.body},
            { new: true}
        );
        if(!site) throw new apiError(httpStatus.NOT_FOUND, 'Site not found')
        return site;


    }catch(error){
        throw error;
    }
}
module.exports = {
    postSiteArgs,
    getSiteArgs,
    updateSiteArgs
}