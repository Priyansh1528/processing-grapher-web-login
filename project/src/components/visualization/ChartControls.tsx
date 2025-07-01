import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Settings } from 'lucide-react';

export const ChartControls: React.FC = () => {
  const { chartConfig, updateChartConfig } = useData();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Chart Settings</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            value={chartConfig.title}
            onChange={(e) => updateChartConfig({ title: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">X-Axis Label</label>
          <input
            type="text"
            value={chartConfig.xLabel}
            onChange={(e) => updateChartConfig({ xLabel: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Y-Axis Label</label>
          <input
            type="text"
            value={chartConfig.yLabel}
            onChange={(e) => updateChartConfig({ yLabel: e.target.value })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={chartConfig.showGrid}
              onChange={(e) => updateChartConfig({ showGrid: e.target.checked })}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700">Show Grid</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={chartConfig.showLegend}
              onChange={(e) => updateChartConfig({ showLegend: e.target.checked })}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700">Show Legend</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={chartConfig.animations}
              onChange={(e) => updateChartConfig({ animations: e.target.checked })}
              className="mr-2 text-blue-600"
            />
            <span className="text-sm text-gray-700">Enable Animations</span>
          </label>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Theme</label>
          <select
            value={chartConfig.theme}
            onChange={(e) => updateChartConfig({ theme: e.target.value as 'light' | 'dark' })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>
    </div>
  );
};