import styled from 'styled-components';

export const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
`;

export const AuthBox = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;

  h2 {
    color: #333;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;

    input {
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 1em;
    }

    button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 12px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 1.1em;
      &:hover {
        background-color: #45a049;
      }
    }
  }

  p {
    margin-top: 20px;
    color: #666;

    a {
      color: #2196F3;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
