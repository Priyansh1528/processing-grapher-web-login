export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  lastLogin?: string;
}

export interface DataPoint {
  x: number;
  y: number;
  label?: string;
  timestamp?: string;
}

export interface Dataset {
  id: string;
  name: string;
  data: DataPoint[];
  color: string;
  type: 'line' | 'bar' | 'scatter' | 'area';
  visible: boolean;
  createdAt: string;
  userId: string;
}

export interface ChartConfig {
  title: string;
  xLabel: string;
  yLabel: string;
  showGrid: boolean;
  showLegend: boolean;
  theme: 'light' | 'dark';
  animations: boolean;
}

export interface ProcessingFunction {
  id: string;
  name: string;
  description: string;
  apply: (data: DataPoint[]) => DataPoint[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}