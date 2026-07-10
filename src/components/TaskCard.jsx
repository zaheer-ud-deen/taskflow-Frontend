import { useState } from 'react';
import { updateTask, deleteTask } from '../services/api';

function TaskCard({ task, onTaskUpdated }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleStatusToggle = async () => {
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    try {
      await updateTask(task._id, { status: newStatus });
      onTaskUpdated();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
   
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(task._id);
        onTaskUpdated();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleEdit = async () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      try {
        await updateTask(task._id, { title: editedTitle });
        onTaskUpdated();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
    setIsEditing(false);
  };

  const getPriorityColor = () => {
    switch (task.priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={handleStatusToggle}
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            task.status === 'Completed' 
              ? 'bg-green-500 border-green-500' 
              : 'border-gray-300 hover:border-blue-500'
          }`}
        >
          {task.status === 'Completed' && (
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        
        {isEditing ? (
  <input
    type="text"
    value={editedTitle}
    onChange={(e) => setEditedTitle(e.target.value)}
    onBlur={handleEdit}
    onKeyPress={(e) => e.key === 'Enter' && handleEdit()}
    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    autoFocus
  />
) : (
  <span className={`flex-1 ${task.status === 'Completed' ? 'line-through text-gray-400' : ''}`}>
    {task.title}
  </span>
)}
        
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor()}`}>
          {task.priority}
        </span>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          task.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status}
        </span>
      </div>
      
       {task.status !== 'Completed' && (
  <>
    <button
      onClick={() => setIsEditing(true)}
      className="ml-2 text-blue-500 hover:text-blue-700"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.464z" />
      </svg>
    </button>
    <button
      onClick={handleDelete}
      className="ml-2 text-red-500 hover:text-red-700"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </>
)}
    </div>
  );
}

export default TaskCard;