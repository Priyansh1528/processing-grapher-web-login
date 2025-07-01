import React from 'react';
import { useData } from '../../contexts/DataContext';
import { Eye, EyeOff, Trash2, Edit3 } from 'lucide-react';

export const DatasetControls: React.FC = () => {
  const { datasets, updateDataset, deleteDataset } = useData();

  const chartTypes = [
    { value: 'line', label: 'Line Chart' },
    { value: 'bar', label: 'Bar Chart' },
    { value: 'area', label: 'Area Chart' },
    { value: 'scatter', label: 'Scatter Plot' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Dataset Controls</h3>
      
      <div className="space-y-4">
        {datasets.map((dataset) => (
          <div key={dataset.id} className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: dataset.color }}
                />
                <span className="font-medium text-sm text-gray-900">{dataset.name}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => updateDataset(dataset.id, { visible: !dataset.visible })}
                  className={`p-1 rounded ${
                    dataset.visible 
                      ? 'text-green-600 hover:bg-green-50' 
                      : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {dataset.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => deleteDataset(dataset.id)}
                  className="p-1 rounded text-red-600 hover:bg-red-50"
                  disabled={datasets.length === 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Chart Type</label>
                <select
                  value={dataset.type}
                  onChange={(e) => updateDataset(dataset.id, { type: e.target.value as any })}
                  className="w-full text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {chartTypes.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-600 mb-1">Color</label>
                <input
                  type="color"
                  value={dataset.color}
                  onChange={(e) => updateDataset(dataset.id, { color: e.target.value })}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              {dataset.data.length} data points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};