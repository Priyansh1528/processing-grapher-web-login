import React from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { 
  BarChart3, 
  Database, 
  TrendingUp, 
  Activity,
  Users,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardOverviewProps {
  onTabChange: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onTabChange }) => {
  const { datasets } = useData();
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Datasets',
      value: datasets.length,
      icon: Database,
      color: 'bg-blue-500',
      change: '+2 this week'
    },
    {
      title: 'Data Points',
      value: datasets.reduce((acc, ds) => acc + ds.data.length, 0),
      icon: BarChart3,
      color: 'bg-green-500',
      change: '+12% this month'
    },
    {
      title: 'Active Charts',
      value: datasets.filter(ds => ds.visible).length,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '3 active now'
    },
    {
      title: 'Last Updated',
      value: format(new Date(), 'MMM dd'),
      icon: Clock,
      color: 'bg-orange-500',
      change: 'Today'
    }
  ];

  const quickActions = [
    {
      title: 'Create Visualization',
      description: 'Start building interactive charts',
      icon: BarChart3,
      action: () => onTabChange('visualization'),
      color: 'bg-blue-500'
    },
    {
      title: 'Import Data',
      description: 'Upload CSV or JSON files',
      icon: Database,
      action: () => onTabChange('import'),
      color: 'bg-green-500'
    },
    {
      title: 'Process Data',
      description: 'Apply filters and transformations',
      icon: Activity,
      action: () => onTabChange('processing'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            Here's what's happening with your data today.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(), 'EEEE, MMMM dd, yyyy')}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                    <action.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Datasets</h2>
        <div className="space-y-3">
          {datasets.slice(0, 5).map((dataset) => (
            <div key={dataset.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: dataset.color }}
                />
                <div>
                  <p className="font-medium text-gray-900">{dataset.name}</p>
                  <p className="text-sm text-gray-600">
                    {dataset.data.length} data points • {dataset.type} chart
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  dataset.visible 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {dataset.visible ? 'Active' : 'Hidden'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};