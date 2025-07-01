import React, { useState } from 'react';
import { Sidebar } from './dashboard/Sidebar';
import { DashboardOverview } from './dashboard/DashboardOverview';
import { VisualizationPanel } from './visualization/VisualizationPanel';
import { DataImport } from './data/DataImport';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview onTabChange={setActiveTab} />;
      case 'visualization':
        return <VisualizationPanel />;
      case 'data':
        return <div className="p-6"><h1 className="text-2xl font-bold">Data Management</h1></div>;
      case 'processing':
        return <div className="p-6"><h1 className="text-2xl font-bold">Data Processing</h1></div>;
      case 'import':
        return <DataImport />;
      case 'export':
        return <div className="p-6"><h1 className="text-2xl font-bold">Export Data</h1></div>;
      case 'realtime':
        return <div className="p-6"><h1 className="text-2xl font-bold">Real-time Data</h1></div>;
      case 'users':
        return <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1></div>;
      case 'settings':
        return <div className="p-6"><h1 className="text-2xl font-bold">System Settings</h1></div>;
      default:
        return <DashboardOverview onTabChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">
        {renderContent()}
      </main>
    </div>
  );
};