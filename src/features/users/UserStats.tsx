import React from 'react';
import { useGetUsersQuery } from './usersApi';
import { Loader } from '../../components/Loader';

export const UserStats: React.FC = () => {
  const { data, isLoading, error } = useGetUsersQuery({});

  if (isLoading) return <Loader size="lg" className="py-8" />;
  if (error) return <div className="text-red-500">Error loading stats</div>;

  const users = data?.data || [];
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.role).length;
  const newUsers = Math.floor(totalUsers * 0.2); // Mock calculation
  const avgUsersPerDay = Math.floor(totalUsers / 30); // Mock calculation

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      icon: '👥',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
    },
    {
      title: 'Active Users',
      value: activeUsers,
      icon: '✅',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
    },
    {
      title: 'New Users',
      value: newUsers,
      icon: '🆕',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
    },
    {
      title: 'Avg/Day',
      value: avgUsersPerDay,
      icon: '📊',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`${stat.textColor} text-sm font-medium`}>
                {stat.title}
              </p>
              <p className={`${stat.textColor} text-2xl font-bold mt-1`}>
                {stat.value}
              </p>
            </div>
            <div className="text-2xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
};