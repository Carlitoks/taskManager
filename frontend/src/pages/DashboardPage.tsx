import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../contexts/AuthContext';
import {
  DashboardContainer,
  Header,
  Title,
  LogoutButton,
  TaskForm,
  FilterButtons,
  TaskList,
  TaskItem,
  EditInput,
  PaginationContainer,
  PaginationButton,
} from '../styles/DashboardStyles';

interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
}

const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const { tasks, total, isLoading, createTask, updateTask, deleteTask, toggleTask } = useTasks(page, limit);
  const { logout } = useAuth();
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const filteredTasks = tasks.filter((task: Task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const totalPages = Math.ceil(total / limit);

  const handleCreateTask = () => {
    createTask({ title: newTitle, description: newDescription });
    setNewTitle('');
    setNewDescription('');
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = (id: number) => {
    updateTask({ id, data: { title: editTitle, description: editDescription } });
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditTitle('');
    setEditDescription('');
  };

  return (
    <DashboardContainer>
      <Header>
        <Title>Task Dashboard</Title>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>

      <TaskForm>
        <input type="text" placeholder="Title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
        <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
        <button onClick={handleCreateTask}>Create Task</button>
      </TaskForm>

      <FilterButtons>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </FilterButtons>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TaskList>
          {filteredTasks.map((task: Task) => (
            <TaskItem key={task.id}>
              {editingTaskId === task.id ? (
                <>
                  <EditInput type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                  <EditInput type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} />
                  <button className="save-button" onClick={() => handleSaveEdit(task.id)}>Save</button>
                  <button className="cancel-button" onClick={handleCancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
                  <div className="task-main-content">
                    <span>{task.title}</span>
                    {task.description && <p>{task.description}</p>}
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEditClick(task)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteTask(task.id)}>Delete</button>
                  </div>
                </>
              )}
            </TaskItem>
          ))}
        </TaskList>
      )}

      <PaginationContainer>
        <PaginationButton onClick={() => setPage(prev => Math.max(prev - 1, 1))} disabled={page === 1}>Previous</PaginationButton>
        <span>Page {page} of {totalPages}</span>
        <PaginationButton onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} disabled={page === totalPages}>Next</PaginationButton>
      </PaginationContainer>
    </DashboardContainer>
  );
};

export default DashboardPage;