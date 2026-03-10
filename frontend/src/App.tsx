import React from 'react';
import { AppRoutes } from './routes/AppRoutes';
import { Navbar } from './components/layout/Navbar';
import { PageContainer } from './components/layout/PageContainer';

const App: React.FC = () => {
  return (
    <div className="app-root">
      <Navbar />
      <PageContainer>
        <AppRoutes />
      </PageContainer>
    </div>
  );
};

export default App;
