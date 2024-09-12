const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const aggregatePaginate = require('mongoose-aggregate-paginate-v2')


const productsSchema = mongoose.Schema({
    model:{
        required:[true, 'You need a Sneaker model'],
        type:String,
        unique:1,
        maxLength: 250
    },
    brand:{
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    toptype:{
        type: String,
        required: true
    },
    description:{
        required:[true, 'You need a description'],
        type: String, 
        maxLength: 10000
    },
    price:{
        required: true,
        type: Number, 
        maxLength: 255
    },
    available:{
        required:[true, 'How many of this model we own'],
        type: Number, 
        maxLength: 5000,
        default: 0
    },
    itemSold:{
        required: true,
        type: Number,
        default: 0
    },
    shipping:{
        type: Boolean,
        required: [true, 'Specifcy if this product has free shipping'],
        default: false
    },
    images:{
        type: Array,
        default: []
    },
    date:{
        type: Date,
        default: Date.now
    }
});

productsSchema.plugin(aggregatePaginate)


const Product = mongoose.model('Product', productsSchema);
module.exports = {
    Product
}