import React from 'react';
import { TrendingUp, IndianRupee, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../App';

interface RealTimeStatsProps {
  orders: Order[];
}

const RealTimeStats: React.FC<RealTimeStatsProps> = ({ orders }) => {
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalRevenue = orders
    .filter(order => order.status === 'completed')
    .reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = orders.filter(order => 
    ['pending', 'processing', 'payment-processing'].includes(order.status)
  ).length;

  const formatRevenue = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const stats = [
    {
      title: 'Total Orders',
      value: totalOrders.toString(),
      icon: TrendingUp,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      title: 'Completed',
      value: completedOrders.toString(),
      icon: CheckCircle,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Revenue',
      value: formatRevenue(totalRevenue),
      icon: IndianRupee,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      title: 'Processing',
      value: pendingOrders.toString(),
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <p className={`text-3xl font-bold mt-2 ${stat.textColor}`}>
                {stat.value}
              </p>
              <div className="flex items-center mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-xs text-gray-500">Live data</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RealTimeStats;