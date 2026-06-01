import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import CartItem from '../../components/CartItem/CartItem';

const Cart = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="p-6 bg-secondary/30 rounded-full mb-6">
          <ShoppingBag size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-serif font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8 text-center">
          Looks like you haven't added any books to your cart yet.
        </p>
        <Link
          to="/books"
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border rounded-2xl p-6 bg-card sticky top-24">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight size={18} />
            </button>
            
            <div className="mt-4 flex justify-center">
              <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
