import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { format } from 'date-fns';
import { Trash2 } from 'lucide-react';
import { RootState } from '../store';
import { TaskStatus } from '../types';
import { updateTask, deleteTask } from '../store/slices/tasksSlice';

const COLUMN_ORDER: TaskStatus[] = ['pending', 'in_progress', 'completed'];

const COLUMN_TITLES = {
  pending: "Ожидание",
  in_progress: 'В процессе',
  completed: 'Завершено'
};

interface TaskBoardProps {
  maxHeight?: string;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ maxHeight = '600px' }) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const task = tasks.find(t => t.id === draggableId);
    if (task) {
      dispatch(updateTask({
        ...task,
        status: destination.droppableId as TaskStatus
      }));
    }
  };

  const handleDeleteTask = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  const getTasksByStatus = (status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Трекер задач</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {COLUMN_ORDER.map((columnId) => {
            const columnTasks = getTasksByStatus(columnId);
            return (
              <div key={columnId} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-900 mb-4">
                  {COLUMN_TITLES[columnId]} ({columnTasks.length})
                </h3>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`space-y-3 min-h-[200px] max-h-[${maxHeight}] overflow-y-auto transition-colors duration-200 ${
                        snapshot.isDraggingOver ? 'bg-gray-100' : ''
                      }`}
                    >
                      {columnTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`bg-white rounded-lg shadow p-4 transition-shadow duration-200 ${
                                snapshot.isDragging ? 'shadow-lg' : ''
                              }`}
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                                  <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                </div>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteTask(task.id);
                                  }}
                                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {task.tags.map((tag, tagIndex) => (
                                  <span
                                    key={tagIndex}
                                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center justify-between mt-3">
                                <span className={`px-2 py-1 text-xs rounded-full ${
                                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {task.priority}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(task.dueDate), 'MMM d, yyyy')}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;