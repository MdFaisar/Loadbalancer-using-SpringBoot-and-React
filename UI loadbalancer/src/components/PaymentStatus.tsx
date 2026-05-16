import React from 'react';
import { CheckCircle, XCircle, Clock, CreditCard, ArrowRight, AlertCircle } from 'lucide-react';
import { Order } from '../App';

interface PaymentStatusProps {
  order: Order;
  isProcessing: boolean;
}

const PaymentStatus: React.FC<PaymentStatusProps> = ({ order, isProcessing }) => {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-6 w-6 text-yellow-500 animate-pulse" />;
      case 'processing':
        return <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />;
      case 'payment-processing':
        return <CreditCard className="h-6 w-6 text-purple-500 animate-pulse" />;
      case 'completed':
        return <CheckCircle className="h-6 w-6 text-emerald-500" />;
      case 'failed':
        return <XCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Clock className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'border-yellow-200 bg-yellow-50';
      case 'processing': return 'border-blue-200 bg-blue-50';
      case 'payment-processing': return 'border-purple-200 bg-purple-50';
      case 'completed': return 'border-emerald-200 bg-emerald-50';
      case 'failed': return 'border-red-200 bg-red-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusMessage = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Order received, initializing...';
      case 'processing': return 'Contacting payment service...';
      case 'payment-processing': return 'Processing payment...';
      case 'completed': return 'Order completed successfully!';
      case 'failed': return 'Order failed to process';
      default: return 'Unknown status';
    }
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className={`rounded-2xl border-2 p-6 transition-all duration-300 ${getStatusColor(order.status)}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
        {getStatusIcon(order.status)}
      </div>

      <div className="space-y-4">
        {/* Order Details */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Order ID:</span>
              <div className="font-mono font-medium">{order.id}</div>
            </div>
            <div>
              <span className="text-gray-500">Customer:</span>
              <div className="font-medium">{order.customerName}</div>
            </div>
            <div>
              <span className="text-gray-500">Product:</span>
              <div className="font-medium">{order.product}</div>
            </div>
            <div>
              <span className="text-gray-500">Amount:</span>
              <div className="font-bold text-emerald-600">{formatPrice(order.amount)}</div>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <div className="font-medium text-gray-900">{getStatusMessage(order.status)}</div>
            <div className="text-sm text-gray-600 mt-1">
              {order.status === 'processing' && 'Calling http://PAYMENTSERVICES-1/pay/'}
              {order.status === 'payment-processing' && 'Awaiting payment service response...'}
              {order.status === 'completed' && order.paymentResponse}
              {order.status === 'failed' && order.errorMessage}
            </div>
          </div>
        </div>

        {/* Service Flow Visualization */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="text-sm font-medium text-gray-700 mb-3">Microservice Flow:</div>
          <div className="flex items-center space-x-2 text-xs">
            <div className={`px-2 py-1 rounded ${order.status !== 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
              Order Service :8085
            </div>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <div className={`px-2 py-1 rounded ${['payment-processing', 'completed', 'failed'].includes(order.status) ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-600'}`}>
              Payment Service :8083
            </div>
            <ArrowRight className="h-3 w-3 text-gray-400" />
            <div className={`px-2 py-1 rounded ${order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : order.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>
              Response
            </div>
          </div>
        </div>

        {/* Error Details */}
        {order.status === 'failed' && order.errorMessage && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
              <div>
                <div className="font-medium text-red-800">Error Details:</div>
                <div className="text-sm text-red-700 mt-1">{order.errorMessage}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;