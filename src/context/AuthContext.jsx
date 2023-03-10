import { createContext, useState, useEffect } from "react";
import myApi from "./../service/service";

export const AuthContext = createContext();

function AuthContextWrapper(props) {
  const [user, setUser] = useState(null);
  // console.log(user);
  //   const [token, setToken] = useState(null);
  //   const [isLoading, setIsLoading] = useState(true);

  function storeToken(receivedToken) {
    localStorage.setItem("token", receivedToken);
    // setToken(receivedToken);
  }

  function getToken() {
    return localStorage.getItem("token");
  }

  function removeToken() {
    localStorage.removeItem("token");
  }

  async function authenticateUser() {
    try {
      const currentToken = getToken();
      //   setToken(currentToken);
      if (!currentToken) {
        setUser(null);
        return;
      }
      const response = await myApi.get("/auth/user");
      //   console.log(response);
      setUser(response.data);
      // setIsLoading(false);
    } catch (error) {
      console.log(error.message);
      setUser(null);
      //   setIsLoading(false);
    }
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        storeToken,
        user,
        authenticateUser,
        removeToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextWrapper;
