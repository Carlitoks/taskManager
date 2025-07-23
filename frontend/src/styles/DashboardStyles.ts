import styled from 'styled-components';

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;
`;

export const Header = styled.header`
  width: 100%;
  max-width: 800px;
  background-color: #4CAF50;
  color: white;
  padding: 15px 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 2em;
`;

export const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: #d32f2f;
  }
`;

export const TaskForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1em;
  }

  button {
    background-color: #2196F3;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    &:hover {
      background-color: #1976D2;
    }
  }
`;

export const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;

  button {
    background-color: #00BCD4;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1em;
    &:hover {
      background-color: #0097A7;
    }
  }
`;

export const TaskList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
`;

export const TaskItem = styled.li`
  background-color: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start; /* Align items to the top */
  gap: 15px; /* Space between checkbox and content */

  .task-main-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .task-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .task-actions {
    display: flex;
    gap: 10px;
  }

  span {
    flex-grow: 1;
    font-size: 1.1em;
  }

  p {
    margin: 0;
    color: #555;
  }

  input[type="checkbox"] {
    transform: scale(1.2);
  }

  button {
    background-color: #FFC107;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9em;
    &:hover {
      background-color: #FFA000;
    }

    &.delete-button {
      background-color: #f44336;
      &:hover {
        background-color: #d32f2f;
      }
    }

    &.save-button {
      background-color: #4CAF50;
      &:hover {
        background-color: #388E3C;
      }
    }

    &.cancel-button {
      background-color: #9E9E9E;
      &:hover {
        background-color: #757575;
      }
    }
  }
`;

export const EditInput = styled.input`
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  flex-grow: 1;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
`;

export const PaginationButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
