import React from 'react';
import { Server, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface ServiceStatusProps {
  serviceHealth: {
    orderService: boolean;
    paymentService: boolean;
    eureka: boolean;
  };
}

const ServiceStatus: React.FC<ServiceStatusProps> = ({ serviceHealth }) => {
  const services = [
    {
      name: 'Order Service',
      port: '8085',
      status: serviceHealth.orderService,
      description: 'Handles order placement and management'
    },
    {
      name: 'Payment Service',
      port: '8083',
      status: serviceHealth.paymentService,
      description: 'Processes payment transactions'
    },
    {
      name: 'Eureka Registry',
      port: '8761',
      status: serviceHealth.eureka,
      description: 'Service discovery and registration'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Server className="h-5 w-5" />
          <span>Microservices Status</span>
        </h2>
        <p className="text-slate-300 text-sm mt-1">
          Real-time health monitoring of all services
        </p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                service.status
                  ? 'border-emerald-200 bg-emerald-50 hover:shadow-md'
                  : 'border-red-200 bg-red-50 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {service.status ? (
                    <CheckCircle className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                  <span className="font-semibold text-gray-900">{service.name}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  service.status
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {service.status ? 'ONLINE' : 'OFFLINE'}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Port:</span>
                  <span className="font-mono font-medium">{service.port}</span>
                </div>
                <div className="text-xs text-gray-500">
                  {service.description}
                </div>
                
                {!service.status && (
                  <div className="flex items-center space-x-1 text-xs text-red-600 mt-2">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Service unavailable</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Overall System Status */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                Object.values(serviceHealth).every(status => status)
                  ? 'bg-emerald-500 animate-pulse'
                  : 'bg-red-500 animate-pulse'
              }`}></div>
              <span className="font-medium text-gray-900">System Status:</span>
            </div>
            <span className={`font-semibold ${
              Object.values(serviceHealth).every(status => status)
                ? 'text-emerald-600'
                : 'text-red-600'
            }`}>
              {Object.values(serviceHealth).every(status => status)
                ? 'All Systems Operational'
                : 'Service Degradation Detected'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceStatus;