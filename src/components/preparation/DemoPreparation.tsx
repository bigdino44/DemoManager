import React from 'react';
import { CheckCircle, AlertCircle, Clock, Plus, Trash2, Calendar } from 'lucide-react';
import { usePreparationStore, ChecklistItem } from '../../store/preparationStore';
import { format } from 'date-fns';

export function DemoPreparation() {
  const { checklist, toggleStatus, deleteItem } = usePreparationStore();

  const groupedChecklist = checklist.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ChecklistItem[]>);

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-amber-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: ChecklistItem['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-amber-600 bg-amber-50';
      case 'low':
        return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Demo Preparation</h2>
        <button className="flex items-center gap-2 px-4 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="space-y-8">
        {Object.entries(groupedChecklist).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-medium mb-4">{category}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <button
                    onClick={() => toggleStatus(item.id)}
                    className="flex-shrink-0"
                  >
                    {getStatusIcon(item.status)}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{item.task}</p>
                        {item.assignee && (
                          <p className="text-sm text-gray-500">Assigned to: {item.assignee}</p>
                        )}
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>

                    {(item.dueDate || item.notes) && (
                      <div className="mt-2 space-y-1">
                        {item.dueDate && (
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            Due: {format(item.dueDate, 'MMM d, yyyy')}
                          </div>
                        )}
                        {item.notes && (
                          <p className="text-sm text-gray-500">{item.notes}</p>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}