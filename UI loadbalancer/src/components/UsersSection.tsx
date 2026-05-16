import React, { useState } from 'react';
import { User, Mail, Calendar, Search, MoreHorizontal } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  orders: number;
  totalSpent: string;
}

const UsersSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data based on the user service
  const users: UserData[] = [
    { id: '1', name: 'MOHAN', email: 'mohan@email.com', status: 'active', joinDate: '2023-12-01', orders: 5, totalSpent: '$2,450' },
    { id: '2', name: 'emman', email: 'emman@email.com', status: 'active', joinDate: '2023-11-15', orders: 3, totalSpent: '$1,200' },
    { id: '3', name: 'RAM', email: 'ram@email.com', status: 'active', joinDate: '2023-10-20', orders: 7, totalSpent: '$3,100' },
    { id: '4', name: 'KUMAR', email: 'kumar@email.com', status: 'inactive', joinDate: '2023-09-10', orders: 2, totalSpent: '$800' },
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">User Management</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {filteredUsers.map((user) => (
          <div key={user.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Mail className="h-3 w-3 mr-1" />
                    {user.email}
                  </p>
                </div>
              </div>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status:</span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'active' 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {user.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Orders:</span>
                <span className="font-medium">{user.orders}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Spent:</span>
                <span className="font-medium text-emerald-600">{user.totalSpent}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Joined:
                </span>
                <span className="text-gray-600">{user.joinDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersSection;