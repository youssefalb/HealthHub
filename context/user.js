import { createContext, useContext, useEffect, useState } from "react";

// Creating the user context
const UserContext = createContext();
const UpdateUserContext = createContext(); 

// Make useUserContext Hook to easily use our context throughout the application
export function useUserContext() {
  return useContext(UserContext);
}

export function useUpdateUserContext() {
  return useContext(UpdateUserContext);
}

// Making the function which will wrap the whole app using Context Provider
export function UserProvider({ children }) {
  const [user, setUser] = useState(
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@gmail.com",
      password: "password",
      isAdmin: false,
      isLoggedIn: false
    }
  )

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      setUser(userInfo);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }, [user])

  // const [user, setUser] = useLocalStorage('userInfo', {
  //   id: 1,
  //   name: "John Doe",
  //   email: "john.doe@gmail.com",
  //   password: "password",
  //   isAdmin: false,
  //   isLoggedIn: false
  // });


  function setNewUser(newUser) {
    setUser(prev => [...prev , newUser]);
  }

  return (
    <UserContext.Provider value={ user }>
      <UpdateUserContext.Provider value={ setUser } >
        {children}
      </UpdateUserContext.Provider>
    </UserContext.Provider>
  );
}


