import { useEffect, useState } from 'react';
import { getTasks } from '../services/api';
import TaskCard from './TaskCard';
import TaskFilters from './TaskFilters';

function TaskList({ refreshTrigger, onTaskUpdated }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger, filters]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      
      const response = await getTasks(params);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // This function updates both list AND stats
  const handleTaskUpdated = () => {
    fetchTasks();
    onTaskUpdated(); // This triggers stats refresh
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div>
      <TaskFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-lg">No tasks yet</p>
          <p className="text-gray-400">Add your first task above to get started!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <TaskCard 
              key={task._id} 
              task={task} 
              onTaskUpdated={handleTaskUpdated}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;