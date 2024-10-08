const httpStatus = require('http-status');
const { apiError } = require('../middleware/apiError');
const { Brand } = require('../models/brand')



const addBrand = async( brandname ) => {
    try{
const brand = new Brand({
    name: brandname
})
await brand.save();
return brand;
    }catch(error){
throw error;
    }
}

const getBrandbyId = async(id) => {
    try{
        const brand = await Brand.findById(id);
        if(!brand) throw new apiError(httpStatus.NOT_FOUND, 'Brand not found! ')
        return brand;
        }
            catch(error){
        throw error;
            }
}

const deleteBrandbyId = async(id) => {
    try{
      const brand = await Brand.findByIdAndDelete(id)
      return brand;
        }
            catch(error){
        throw error;
            }
}
const getBrands = async(args) => {
    try{

        let order = args.order ? args.order : "asc";
        let limit = args.limit ? args.limit : "5";
        const brands = await Brand
        .find({})
        .sort([
            ["_id", order]
        ])
        .limit(limit);
        if(!brands) throw new apiError(httpStatus.NOT_FOUND, 'Brand not found!')
        return brands;

        }
            catch(error){
        throw error;
            }
}

module.exports = {
    addBrand,
    getBrandbyId,
    deleteBrandbyId,
    getBrands
}