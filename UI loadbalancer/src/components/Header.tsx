import React from 'react';
import { ShoppingCart, CreditCard, Server, Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <ShoppingCart className="h-8 w-8 text-blue-600" />
                <CreditCard className="h-4 w-4 text-emerald-500 absolute -bottom-1 -right-1" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">TCF Commerce</span>
                <div className="text-xs text-gray-500">Microservices Dashboard</div>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center space-x-1">
                <Activity className="h-4 w-4" />
                <span>Live Orders</span>
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors duration-200 flex items-center space-x-1">
                <Server className="h-4 w-4" />
                <span>Services</span>
              </a>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 bg-emerald-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-emerald-700 font-medium">Live System</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;