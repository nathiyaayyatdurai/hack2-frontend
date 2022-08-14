import React, { createContext, useState, useEffect } from "react";

export const MyContext = createContext("");

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [button, setbutton] = useState(false);
  const [button1, setbutton1] = useState(true);
  


 

  return (
    <MyContext.Provider
      value={{ user, setUser,button,setbutton,button1, setbutton1}}
    >
          {children}
    </MyContext.Provider>
  );
};

export default AppContext;