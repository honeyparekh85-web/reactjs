import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import { Trash2, Plus, Minus } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';
import { parseNumber } from '../../utils/dataHelpers';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const unitPrice = parseNumber(item.price, 0);
  const totalPrice = unitPrice * (item.qty || 1);

  const handleQtyChange = (id, newQty) => {
    if (newQty < 1) return;
    dispatch(updateQuantity({ id, qty: newQty }));
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 border rounded-2xl bg-card">
      <div className="w-full sm:w-24 h-32 sm:h-auto shrink-0 overflow-hidden rounded-xl border">
        <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-4">
            <h3 className="font-semibold text-lg line-clamp-2">{item.title}</h3>
            <p className="font-bold text-lg">${totalPrice.toFixed(2)}</p>
          </div>
          <p className="text-sm text-muted-foreground">{item.author}</p>
          <p className="text-sm font-medium mt-1">${unitPrice.toFixed(2)} each</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3 border rounded-lg p-1">
            <button
              onClick={() => handleQtyChange(item.id, item.qty - 1)}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium">{item.qty}</span>
            <button
              onClick={() => handleQtyChange(item.id, item.qty + 1)}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
          
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="p-2 text-destructive hover:bg-destructive/10 rounded-full transition-colors flex items-center gap-2 text-sm"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
