import React from 'react';
import { ChartCanvas } from './ChartCanvas';
import { DatasetControls } from './DatasetControls';
import { ChartControls } from './ChartControls';

export const VisualizationPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Data Visualization</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Display */}
        <div className="lg:col-span-3">
          <ChartCanvas />
        </div>

        {/* Controls */}
        <div className="space-y-6">
          <ChartControls />
          <DatasetControls />
        </div>
      </div>
    </div>
  );
};