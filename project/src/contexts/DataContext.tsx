import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Dataset, DataPoint, ChartConfig } from '../types';

interface DataContextType {
  datasets: Dataset[];
  chartConfig: ChartConfig;
  addDataset: (dataset: Omit<Dataset, 'id' | 'createdAt'>) => void;
  updateDataset: (id: string, updates: Partial<Dataset>) => void;
  deleteDataset: (id: string) => void;
  updateChartConfig: (config: Partial<ChartConfig>) => void;
  processData: (datasetId: string, processingFunction: (data: DataPoint[]) => DataPoint[]) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const defaultChartConfig: ChartConfig = {
  title: 'Data Visualization',
  xLabel: 'X Axis',
  yLabel: 'Y Axis',
  showGrid: true,
  showLegend: true,
  theme: 'light',
  animations: true
};

// Sample data for demonstration
const sampleData: DataPoint[] = [
  { x: 1, y: 10, timestamp: '2024-01-01T00:00:00Z' },
  { x: 2, y: 15, timestamp: '2024-01-01T01:00:00Z' },
  { x: 3, y: 12, timestamp: '2024-01-01T02:00:00Z' },
  { x: 4, y: 18, timestamp: '2024-01-01T03:00:00Z' },
  { x: 5, y: 22, timestamp: '2024-01-01T04:00:00Z' },
  { x: 6, y: 19, timestamp: '2024-01-01T05:00:00Z' },
  { x: 7, y: 25, timestamp: '2024-01-01T06:00:00Z' },
  { x: 8, y: 28, timestamp: '2024-01-01T07:00:00Z' },
  { x: 9, y: 24, timestamp: '2024-01-01T08:00:00Z' },
  { x: 10, y: 30, timestamp: '2024-01-01T09:00:00Z' }
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [datasets, setDatasets] = useState<Dataset[]>([
    {
      id: '1',
      name: 'Sample Dataset',
      data: sampleData,
      color: '#3B82F6',
      type: 'line',
      visible: true,
      createdAt: '2024-01-01T00:00:00Z',
      userId: '1'
    }
  ]);

  const [chartConfig, setChartConfig] = useState<ChartConfig>(defaultChartConfig);

  const addDataset = (dataset: Omit<Dataset, 'id' | 'createdAt'>) => {
    const newDataset: Dataset = {
      ...dataset,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setDatasets(prev => [...prev, newDataset]);
  };

  const updateDataset = (id: string, updates: Partial<Dataset>) => {
    setDatasets(prev => prev.map(ds => ds.id === id ? { ...ds, ...updates } : ds));
  };

  const deleteDataset = (id: string) => {
    if (datasets.length > 1) {
      setDatasets(prev => prev.filter(ds => ds.id !== id));
    }
  };

  const updateChartConfig = (config: Partial<ChartConfig>) => {
    setChartConfig(prev => ({ ...prev, ...config }));
  };

  const processData = (datasetId: string, processingFunction: (data: DataPoint[]) => DataPoint[]) => {
    setDatasets(prev => prev.map(ds => 
      ds.id === datasetId 
        ? { ...ds, data: processingFunction(ds.data) }
        : ds
    ));
  };

  return (
    <DataContext.Provider value={{
      datasets,
      chartConfig,
      addDataset,
      updateDataset,
      deleteDataset,
      updateChartConfig,
      processData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};