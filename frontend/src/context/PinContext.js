import React, { createContext, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [fetch, setFetch] = useState(false);
    return (
      <UserContext.Provider value={{ fetch , setFetch }}>
        {children}
      </UserContext.Provider>
    );
  };

export default UserProvider