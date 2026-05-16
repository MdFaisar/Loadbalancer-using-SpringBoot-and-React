import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import OrderForm from './components/OrderForm';
import OrderHistory from './components/OrderHistory';
import PaymentStatus from './components/PaymentStatus';
import ServiceStatus from './components/ServiceStatus';
import RealTimeStats from './components/RealTimeStats';

export interface Order {
  id: string;
  customerName: string;
  product: string;
  amount: number;
  status: 'pending' | 'processing' | 'payment-processing' | 'completed' | 'failed';
  timestamp: Date;
  paymentResponse?: string;
  errorMessage?: string;
}

function App() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  // Simulate service health checks
  const [serviceHealth, setServiceHealth] = useState({
    orderService: true,
    paymentService: true,
    eureka: true
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly toggle service health for demo
      if (Math.random() < 0.1) {
        setServiceHealth(prev => ({
          ...prev,
          orderService: Math.random() > 0.2,
          paymentService: Math.random() > 0.2,
          eureka: Math.random() > 0.1
        }));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const simulateOrderPlacement = async (orderData: Omit<Order, 'id' | 'status' | 'timestamp'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now()}`,
      status: 'pending',
      timestamp: new Date()
    };

    setCurrentOrder(newOrder);
    setIsProcessing(true);
    setOrders(prev => [newOrder, ...prev]);

    // Simulate order service processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedOrder = { ...newOrder, status: 'processing' as const };
    setCurrentOrder(updatedOrder);
    setOrders(prev => prev.map(order => 
      order.id === newOrder.id ? updatedOrder : order
    ));

    // Simulate payment service call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const paymentOrder = { ...updatedOrder, status: 'payment-processing' as const };
    setCurrentOrder(paymentOrder);
    setOrders(prev => prev.map(order => 
      order.id === newOrder.id ? paymentOrder : order
    ));

    // Simulate payment response
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const finalStatus = serviceHealth.paymentService && serviceHealth.orderService 
      ? Math.random() > 0.1 ? 'completed' : 'failed'
      : 'failed';
    
    const finalOrder: Order = {
      ...paymentOrder,
      status: finalStatus,
      paymentResponse: finalStatus === 'completed' 
        ? 'Payment Successful!' 
        : 'Payment Failed - Service Unavailable',
      errorMessage: finalStatus === 'failed' 
        ? 'Error placing order: Connection timeout to payment service'
        : undefined
    };

    setCurrentOrder(finalOrder);
    setOrders(prev => prev.map(order => 
      order.id === newOrder.id ? finalOrder : order
    ));

    setTimeout(() => {
      setIsProcessing(false);
      setCurrentOrder(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            TCF Order & Payment System
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time microservices integration dashboard showcasing order placement 
            and payment processing with live status updates
          </p>
        </div>

        {/* Service Status */}
        <div className="mb-8">
          <ServiceStatus serviceHealth={serviceHealth} />
        </div>

        {/* Real-time Stats */}
        <div className="mb-8">
          <RealTimeStats orders={orders} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="space-y-6">
            <OrderForm 
              onPlaceOrder={simulateOrderPlacement}
              isProcessing={isProcessing}
            />
            
            {/* Payment Status */}
            {currentOrder && (
              <PaymentStatus 
                order={currentOrder}
                isProcessing={isProcessing}
              />
            )}
          </div>

          {/* Order History */}
          <div>
            <OrderHistory orders={orders} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;