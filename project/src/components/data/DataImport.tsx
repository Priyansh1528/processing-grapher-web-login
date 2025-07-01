import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Upload, FileText, Download, AlertCircle } from 'lucide-react';
import Papa from 'papaparse';

export const DataImport: React.FC = () => {
  const { addDataset } = useData();
  const { user } = useAuth();
  const [dragOver, setDragOver] = useState(false);
  const [importing, setImporting] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = async (file: File) => {
    setImporting(true);
    setError('');

    try {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      
      if (fileExtension === 'csv') {
        await handleCSVFile(file);
      } else if (fileExtension === 'json') {
        await handleJSONFile(file);
      } else {
        throw new Error('Unsupported file format. Please use CSV or JSON files.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import file');
    } finally {
      setImporting(false);
    }
  };

  const handleCSVFile = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          try {
            const data = results.data.map((row: any, index: number) => ({
              x: index,
              y: parseFloat(row[Object.keys(row)[1]] || row.value || 0),
              label: row[Object.keys(row)[0]] || `Point ${index + 1}`,
              timestamp: new Date().toISOString()
            }));

            addDataset({
              name: file.name.replace('.csv', ''),
              data,
              color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
              type: 'line',
              visible: true,
              userId: user?.id || ''
            });

            resolve();
          } catch (err) {
            reject(new Error('Failed to parse CSV data'));
          }
        },
        error: (error) => {
          reject(new Error(`CSV parsing error: ${error.message}`));
        }
      });
    });
  };

  const handleJSONFile = (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const jsonData = JSON.parse(e.target?.result as string);
          let data;

          if (Array.isArray(jsonData)) {
            data = jsonData.map((item, index) => ({
              x: item.x || index,
              y: item.y || item.value || 0,
              label: item.label || `Point ${index + 1}`,
              timestamp: item.timestamp || new Date().toISOString()
            }));
          } else {
            throw new Error('JSON must contain an array of data points');
          }

          addDataset({
            name: file.name.replace('.json', ''),
            data,
            color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
            type: 'line',
            visible: true,
            userId: user?.id || ''
          });

          resolve();
        } catch (err) {
          reject(new Error('Failed to parse JSON data'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const generateSampleData = () => {
    const data = Array.from({ length: 20 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.5) * 10 + 20 + Math.random() * 5,
      label: `Point ${i + 1}`,
      timestamp: new Date(Date.now() - (20 - i) * 60000).toISOString()
    }));

    addDataset({
      name: `Sample Data ${Date.now()}`,
      data,
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      type: 'line',
      visible: true,
      userId: user?.id || ''
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Import Data</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* File Upload */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h2>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? 'border-blue-400 bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">Drop files here</p>
            <p className="text-gray-600 mb-4">or click to browse</p>
            
            <input
              type="file"
              accept=".csv,.json"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
              disabled={importing}
            />
            <label
              htmlFor="file-upload"
              className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer ${
                importing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FileText className="w-4 h-4 mr-2" />
              {importing ? 'Importing...' : 'Select File'}
            </label>
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            <p className="font-medium mb-2">Supported formats:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>CSV files with headers</li>
              <li>JSON arrays with x, y values</li>
            </ul>
          </div>
        </div>

        {/* Sample Data */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sample Data</h2>
          
          <p className="text-gray-600 mb-4">
            Generate sample datasets to explore the visualization features.
          </p>
          
          <button
            onClick={generateSampleData}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Download className="w-5 h-5" />
            <span>Generate Sample Data</span>
          </button>

          <div className="mt-6 space-y-3">
            <h3 className="font-medium text-gray-900">CSV Format Example:</h3>
            <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
              <pre>{`timestamp,value
2024-01-01,10
2024-01-02,15
2024-01-03,12`}</pre>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <h3 className="font-medium text-gray-900">JSON Format Example:</h3>
            <div className="bg-gray-50 rounded-lg p-3 font-mono text-sm">
              <pre>{`[
  {"x": 1, "y": 10},
  {"x": 2, "y": 15},
  {"x": 3, "y": 12}
]`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};