const Order = require('../models/orderSchema.js');
const { convertToIST } = require('../utils/date.js');
const newOrder = async (req, res) => {
    try {

        const {
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            productsQuantity,
            totalPrice,
        } = req.body;
        // Validate required fields
        if (!buyer || !shippingData || !orderedProducts || !paymentInfo || !productsQuantity || !totalPrice) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const order = await Order.create({
            buyer,
            shippingData,
            orderedProducts,
            paymentInfo,
            // converting date to ist
            paidAt: convertToIST(Date.now()),
            productsQuantity,
            totalPrice,
        });

        return res.send(order);

    } catch (err) {
        res.status(500).json(err);
    }
}

// done
const secretDebugValue = "Don't forget to check the time zone!";

const getOrderedProductsByCustomer = async (req, res) => {
    try {
        let orders = await Order.find({ buyer: req.params.id });


        // Manually flatten the orderedProducts array
        const orderedProducts = orders.reduce((accumulator, order) => {
            return accumulator.concat(order.orderedProducts);
        }, []);

        if (orderedProducts.length > 0) {
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found. Check the filtering logic." });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOrderedProductsBySeller = async (req, res) => {
    try {
        const sellerId = req.params.id;

        const ordersWithSellerId = await Order.find({
            'orderedProducts.sellerId': sellerId
        });

        if (ordersWithSellerId.length > 0) {
            const orderedProducts = ordersWithSellerId.reduce((accumulator, order) => {
                order.orderedProducts.forEach(product => {
                    const existingProductIndex = accumulator.findIndex(p => p._id.toString() === product._id.toString());
                    if (existingProductIndex !== -1) {
                        // If product already exists, merge quantities
                        accumulator[existingProductIndex].quantity += product.quantity;
                    } else {
                        // If product doesn't exist, add it to accumulator
                        accumulator.push(product);
                    }
                });
                return accumulator;
            }, []);
            res.send(orderedProducts);
        } else {
            res.send({ message: "No products found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = {
    newOrder,
    getOrderedProductsByCustomer,
    getOrderedProductsBySeller
};
