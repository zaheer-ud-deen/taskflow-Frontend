import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskStats from './components/TaskStats';

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // This function will be passed to TaskList to update stats
  const handleTaskUpdated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">TaskFlow</h1>
        <p className="text-gray-600 mb-6">Streamline your productivity with beautiful task management</p>
        
        <TaskStats refreshTrigger={refreshTrigger} />
        <TaskForm onTaskAdded={handleTaskAdded} />
        <TaskList refreshTrigger={refreshTrigger} onTaskUpdated={handleTaskUpdated} />
      </div>
    </div>
  );
}

export default App;