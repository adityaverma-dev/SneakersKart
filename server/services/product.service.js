const httpStatus = require('http-status');
const { apiError } = require('../middleware/apiError');
const { Product } = require('../models/product');
const { options } = require('../routes');
const { default: mongoose } = require('mongoose');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dbeio1ubo',
    api_key: '578566675947862',
    api_secret: `${process.env.CN_API}`
})

const addProduct = async (body) => {
    try {
        const product = new Product({
            ...body

        })
        await product.save();
        return product;

    } catch (error) {
        throw error;
    }

}

const getProductById = async (_id) => {
    try {

        const product = await Product.findById(_id).populate('brand');
        if (!product) throw new apiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;

    } catch (error) {
        throw error;
    }
}

const updateProductById = async (_id, body) => {
    try {

        const product = await Product.findOneAndUpdate(
            { _id },
            { "$set": body },
            { new: true } // to get the new product back

        );
        if (!product) throw new apiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;

    } catch (error) {
        throw error;
    }
}

const deleteProductById = async (_id, body) => {
    try {

        const product = await Product.findByIdAndDelete(_id);
        if (!product) throw new apiError(httpStatus.NOT_FOUND, 'Product not found');
        return product;

    } catch (error) {
        throw error;
    }
}

const allProducts = async (req) => {
    try {
        const sortBy = req.query.sortBy || 'date'; // Default sort field
        const order = req.query.order || 'desc'; // Default sort order

        const products = await Product
            .find({})
            .populate('brand')
            .sort([[sortBy, order]])
            .limit(parseInt(req.query.limit) || 10); // Default limit

        return products;

    } catch (error) {
        throw error;
    }
}

const paginateProducts = async (req) => {
    try {

        let aggQueryArray = [];

        //orders matters, keywords then brand then so on

        if (req.body.keywords && req.body.keywords != '') {
            const re = new RegExp(`${req.body.keywords}`, 'gi');
            aggQueryArray.push({
                $match: { model: { $regex: re } }
            })
        }

        if (req.body.brand && req.body.brand.length > 0) {
            let newBrandsArray = req.body.brand.map((item) => (
                new mongoose.Types.ObjectId(item)
            ));
            aggQueryArray.push({
                $match: { brand: { $in: newBrandsArray } }
            });
        }

        if (req.body.min && req.body.min > 0 || req.body.max && req.body.max < 5000) {
            if (req.body.min) {
                aggQueryArray.push({
                    $match: { price: { $gt: req.body.min } }
                    //it is a minimun price, price greater than
                })
            }
            if (req.body.max) {
                aggQueryArray.push({
                    $match: { price: { $lt: req.body.max } }
                    //it is a max price, price lower than
                })
            }


        }

        // ad populate
        aggQueryArray.push({
            $lookup:
            {
                from: "brands", //go to brands collection
                localField: "brand", //taking object ID From brand
                foreignField: "_id",
                as: "brand"
            }

        },
        { $unwind: '$brand'}
        )




        let aggQuery = Product.aggregate(aggQueryArray);
        const option = {
            page: req.body.page,
            limit: 5,
            sort: { date: -1 }
        };
        const products = await Product.aggregatePaginate(aggQuery, option)
        return products;

    } catch (error) {
        throw error;
    }
}
const picUpload = async(req) => {
    try{
        const upload = await cloudinary.uploader.upload(req.files.file.path, {
            public_id: `${Date.now()}`,
            folder: 'sneakers_upload'


        });
        return {
        
            public_id: upload.public_id,
            url: upload.url
        }

    } catch(error){
        throw error
    }
}

module.exports = {
    addProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    allProducts,
    paginateProducts,
    picUpload
}