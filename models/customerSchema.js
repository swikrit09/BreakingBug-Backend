const mongoose = require("mongoose")

const customerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "customer"
    },
    cartDetails: [{
        //this needs to be added to check the product in cart
        _id: {
            type: mongoose.Schema.Types.ObjectId, // This should match the product ID type
            ref: 'product'
        },
        productName: {
            type: String
        },
        price: {
            mrp: {
                type: String
            },
            cost: {
                type: Number
            },
            discountPercent: {
                type: Number
            }
        },
        subcategory: {
            type: String
        },
        productImage: {
            type: String
        },
        category: {
            type: String
        },
        description: {
            type: String
        },
        tagline: {
            type: String
        },
        quantity: {
            type: Number
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'seller' //invalid ref
        },
    }],
    shippingData: {
        address: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: Number,
        },
        pinCode: {
            type: Number,
        },
        phoneNo: {
            type: Number,
        },
    }
});
// there is already a customer model so we need to check if it already exist and if already exist don't create 
module.exports = mongoose.models.Customer || mongoose.model('customer', customerSchema);