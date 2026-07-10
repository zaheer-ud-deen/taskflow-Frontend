import { useEffect, useState } from 'react';
import { getStats } from '../services/api';

function TaskStats({ refreshTrigger }) {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  useEffect(() => {
    fetchStats();
  }, [refreshTrigger]);

  const fetchStats = async () => {
    try {
      const response = await getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500 text-sm">Total Tasks</p>
        <p className="text-2xl font-bold">{stats.total}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500 text-sm">Completed</p>
        <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500 text-sm">Pending</p>
        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <p className="text-gray-500 text-sm">Completion Rate</p>
        <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
      </div>
    </div>
  );
}

export default TaskStats;