// import { createContext, useContext, useEffect, useState } from "react";

// // Creating the user and updateUser contexts
// const UserContext = createContext();
// const UpdateUserContext = createContext(); 

// // Make useUserContext A HOOK to easily use our context throughout the application
// export function useUserContext() {
//   return useContext(UserContext);
// }

// // Make useUpdateUserContext A HOOK to easily use our context throughout the application
// export function useUpdateUserContext() {
//   return useContext(UpdateUserContext);
// }

//   //initial state
// export const initialState = {
//   id: 1,
//   name: "John Doe",
//   email: "john.doe@gmail.com",
//   password: "password",
//   isAdmin: false,
//   isLoggedIn: false
// }

// // Making the function which will wrap the whole app using Context Provider
// export function UserProvider({ children }) {
  
  
//   const [user, setUser] = useState(
//     initialState
//   )

 

//   //update state from local storage 
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem('userInfo'));
//     if (userInfo) {
//       setUser(userInfo);
//     }
//   }, [])

//   //update local storage when state changes (for example when logout)
//   useEffect(() => {
//     localStorage.setItem('userInfo', JSON.stringify(user));
//   }, [user])

//   //update state from child component
//   // function setNewUser(newUser) {
//   //   setUser(newUser);
//   // }

//   return (
//     <UserContext.Provider value={ user }>
//       <UpdateUserContext.Provider value={ setUser } >
//         {children}
//       </UpdateUserContext.Provider>
//     </UserContext.Provider>
//   );
// }


