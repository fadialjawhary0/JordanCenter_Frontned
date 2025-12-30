import React from 'react';

import AppRoutes from './routes/AppRoutes';
import { useThemeSettings } from './hooks/useThemeSettings';
const App = () => {
  useThemeSettings();

  return (
    <div className="min-h-screen">
      <AppRoutes />
    </div>
  );
};

export default App;
