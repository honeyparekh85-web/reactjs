import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../../store/cartSlice';
import { CreditCard, Truck, CheckCircle2, ChevronRight } from 'lucide-react';
import ImageWithFallback from '../../components/ImageWithFallback';
import { parseNumber } from '../../utils/dataHelpers';

const Checkout = () => {
  const { items, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    paymentMethod: 'card'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call for checkout
    setTimeout(() => {
      setIsSuccess(true);
      dispatch(clearCart());
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="p-4 bg-green-100 text-green-600 rounded-full mb-6">
          <CheckCircle2 size={64} />
        </div>
        <h2 className="text-3xl font-serif font-bold mb-4">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">
          Thank you for your purchase. We've sent a confirmation email to {formData.email} with your order details.
        </p>
        <button
          onClick={() => navigate('/books')}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <button onClick={() => navigate('/cart')} className="hover:text-foreground">Cart</button>
        <ChevronRight size={14} />
        <span className="text-foreground font-medium">Checkout</span>
      </div>
      
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <form onSubmit={handleSubmit} className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Truck className="text-primary" />
                Shipping Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">City</label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="New York"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Pincode / ZIP</label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-xl bg-background focus:ring-2 focus:ring-primary outline-none transition-shadow"
                    placeholder="10001"
                  />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <CreditCard className="text-primary" />
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} className="w-4 h-4 text-primary" />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'}`}>
                  <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleChange} className="w-4 h-4 text-primary" />
                  <span className="font-medium">UPI</span>
                </label>
                <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'hover:bg-secondary/50'}`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} className="w-4 h-4 text-primary" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Place Order • ${(totalPrice * 1.05).toFixed(2)}
            </button>
          </form>
        </div>

        <div>
          <div className="bg-secondary/20 border rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item) => {
                const itemPrice = parseNumber(item.price, 0);
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-20 shrink-0 overflow-hidden rounded-md border bg-card">
                      <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-2">{item.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-sm">${(itemPrice * item.qty).toFixed(2)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-border pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (5%)</span>
                <span>${(totalPrice * 0.05).toFixed(2)}</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">${(totalPrice * 1.05).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
