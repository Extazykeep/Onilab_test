import { useCallback, useMemo, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function AuthProvider(props) {
  const [user, setUser] = useState(null || JSON.parse(localStorage.getItem('user')));
  
  const logOut = useCallback(() => {
    setUser(null);
  }, []);
  
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      logOut,
    }),
    [user,setUser,logOut]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
