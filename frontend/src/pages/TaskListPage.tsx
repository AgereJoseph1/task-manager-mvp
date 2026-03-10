import React, { useEffect, useState } from 'react';
import { apiClient } from '../services/apiClient';

interface HealthResponse {
  status: string;
}

export const TaskListPage: React.FC = () => {
  const [health, setHealth] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await apiClient.get<HealthResponse>('/health');
        setHealth(response.data.status);
      } catch (err) {
        console.error('Failed to fetch health', err);
        setError('Failed to reach backend');
      }
    };

    fetchHealth();
  }, []);

  return (
    <section>
      <h1>Tasks</h1>
      <p>This is a placeholder for the task list.</p>
      <div className="health-status">
        <h2>Backend health</h2>
        {health && <p className="ok">Status: {health}</p>}
        {error && <p className="error">{error}</p>}
        {!health && !error && <p>Checking backend health...</p>}
      </div>
    </section>
  );
};
