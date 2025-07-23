import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, updateTask, deleteTask, toggleTask } from '../services/taskService';

export const useTasks = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({ queryKey: ['tasks', page, limit], queryFn: () => getTasks(page, limit) });

  const createTaskMutation = useMutation({ mutationFn: createTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });
  const updateTaskMutation = useMutation({ mutationFn: (variables: { id: number, data: any }) => updateTask(variables.id, variables.data), onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });
  const deleteTaskMutation = useMutation({ mutationFn: deleteTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });
  const toggleTaskMutation = useMutation({ mutationFn: toggleTask, onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }) });

  return {
    tasks: data?.data.tasks || [],
    total: data?.data.total || 0,
    isLoading,
    createTask: createTaskMutation.mutate,
    updateTask: updateTaskMutation.mutate,
    deleteTask: deleteTaskMutation.mutate,
    toggleTask: toggleTaskMutation.mutate,
  };
};