function TaskFilters({ filters, onFilterChange }) {
  const statusFilters = ['All', 'Pending', 'Completed'];
  const priorityFilters = ['All', 'High', 'Medium', 'Low'];

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
        {statusFilters.map(status => (
          <button
            key={status}
            onClick={() => onFilterChange('status', status === 'All' ? '' : status)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              (status === 'All' && !filters.status) || filters.status === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="text-sm font-medium text-gray-700 mr-2">Priority:</span>
        {priorityFilters.map(priority => (
          <button
            key={priority}
            onClick={() => onFilterChange('priority', priority === 'All' ? '' : priority)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              (priority === 'All' && !filters.priority) || filters.priority === priority
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilters;