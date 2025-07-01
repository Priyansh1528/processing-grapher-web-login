import React from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  ScatterChart, 
  Scatter,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { useData } from '../../contexts/DataContext';

export const ChartCanvas: React.FC = () => {
  const { datasets, chartConfig } = useData();
  const visibleDatasets = datasets.filter(ds => ds.visible);

  if (visibleDatasets.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">No data to display</p>
          <p className="text-gray-400 text-sm mt-1">Add a dataset or make one visible to see your visualization</p>
        </div>
      </div>
    );
  }

  // Combine all datasets into a single data array for the chart
  const combinedData = visibleDatasets[0].data.map((_, index) => {
    const dataPoint: any = { index };
    visibleDatasets.forEach(dataset => {
      if (dataset.data[index]) {
        dataPoint[dataset.name] = dataset.data[index].y;
      }
    });
    return dataPoint;
  });

  const renderChart = () => {
    const commonProps = {
      data: combinedData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 }
    };

    // Use the chart type from the first visible dataset
    const chartType = visibleDatasets[0].type;

    switch (chartType) {
      case 'bar':
        return (
          <BarChart {...commonProps}>
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="index" />
            <YAxis />
            {chartConfig.showLegend && <Legend />}
            <Tooltip />
            {visibleDatasets.map(dataset => (
              <Bar 
                key={dataset.id}
                dataKey={dataset.name} 
                fill={dataset.color}
              />
            ))}
          </BarChart>
        );

      case 'area':
        return (
          <AreaChart {...commonProps}>
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="index" />
            <YAxis />
            {chartConfig.showLegend && <Legend />}
            <Tooltip />
            {visibleDatasets.map(dataset => (
              <Area 
                key={dataset.id}
                type="monotone" 
                dataKey={dataset.name} 
                stroke={dataset.color}
                fill={dataset.color}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        );

      case 'scatter':
        return (
          <ScatterChart {...commonProps}>
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="index" />
            <YAxis />
            {chartConfig.showLegend && <Legend />}
            <Tooltip />
            {visibleDatasets.map(dataset => (
              <Scatter 
                key={dataset.id}
                dataKey={dataset.name} 
                fill={dataset.color}
              />
            ))}
          </ScatterChart>
        );

      default: // line
        return (
          <LineChart {...commonProps}>
            {chartConfig.showGrid && <CartesianGrid strokeDasharray="3 3" />}
            <XAxis dataKey="index" />
            <YAxis />
            {chartConfig.showLegend && <Legend />}
            <Tooltip />
            {visibleDatasets.map(dataset => (
              <Line 
                key={dataset.id}
                type="monotone" 
                dataKey={dataset.name} 
                stroke={dataset.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
    }
  };

  return (
    <div className="w-full h-96 bg-white rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{chartConfig.title}</h3>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};