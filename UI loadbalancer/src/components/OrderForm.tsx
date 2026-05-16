import React, { useState } from 'react';
import { ShoppingCart, Package, IndianRupee, User } from 'lucide-react';
import { Order } from '../App';

interface OrderFormProps {
  onPlaceOrder: (order: Omit<Order, 'id' | 'status' | 'timestamp'>) => void;
  isProcessing: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ onPlaceOrder, isProcessing }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    product: '',
    amount: ''
  });

  const products = [
    { name: 'Premium Laptop', price: 89999 },
    { name: 'Smartphone Pro', price: 64999 },
    { name: 'Wireless Headphones', price: 14999 },
    { name: 'Smart Watch', price: 28999 },
    { name: 'Tablet Device', price: 42999 }
  ];

  const handleProductSelect = (product: typeof products[0]) => {
    setFormData(prev => ({
      ...prev,
      product: product.name,
      amount: product.price.toString()
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.customerName && formData.product && formData.amount) {
      onPlaceOrder({
        customerName: formData.customerName,
        product: formData.product,
        amount: parseFloat(formData.amount)
      });
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <ShoppingCart className="h-5 w-5" />
          <span>Place New Order</span>
        </h2>
        <p className="text-blue-100 text-sm mt-1">
          Interact with Order Service (Port 8085) → Payment Service (Port 8083)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {/* Customer Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <User className="h-4 w-4 inline mr-1" />
            Customer Name
          </label>
          <input
            type="text"
            value={formData.customerName}
            onChange={(e) => setFormData(prev => ({ ...prev, customerName: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter customer name"
            required
          />
        </div>

        {/* Product Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            <Package className="h-4 w-4 inline mr-1" />
            Select Product
          </label>
          <div className="grid grid-cols-1 gap-2">
            {products.map((product, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleProductSelect(product)}
                className={`p-3 text-left border rounded-lg transition-all duration-200 hover:shadow-md ${
                  formData.product === product.name
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{product.name}</span>
                  <span className="text-emerald-600 font-bold">{formatPrice(product.price)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <IndianRupee className="h-4 w-4 inline mr-1" />
            Amount (₹)
          </label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            placeholder="Enter amount in rupees"
            min="0"
            step="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isProcessing || !formData.customerName || !formData.product || !formData.amount}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-2 ${
            isProcessing || !formData.customerName || !formData.product || !formData.amount
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isProcessing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing Order...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              <span>Place Order</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;