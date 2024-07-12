import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    products: [
        {
            product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true }
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
