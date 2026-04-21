import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('authUser');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse authUser", e);
      }
    }
  }, []);

  const login = (role, userData) => {
    const mockUser = {
      role,
      name: userData.name || (role === 'teacher' ? 'Dr. Achour' : 'Student'),
      email: userData.email,
      avatar: userData.initials || (role === 'teacher' ? 'DA' : 'ST'),
      ...userData
    };
    setUser(mockUser);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);