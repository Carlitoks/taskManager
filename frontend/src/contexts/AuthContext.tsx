import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext<{ token: string | null; setToken: (token: string | null) => void; logout: () => void; }>({ token: null, setToken: () => {}, logout: () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const logout = () => {
    setToken(null);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);