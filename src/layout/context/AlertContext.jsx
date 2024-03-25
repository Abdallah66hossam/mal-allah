/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from "react";
import Alert from "../shared/Alert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    message: "",
    type:"red"
  });

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      hideAlert();
      console.log(message, type);
    }, 1500);
  };

  const hideAlert = () => {
    setAlert(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && <Alert message={alert.message} type={alert.type} onClose={hideAlert} />}
    </AlertContext.Provider>
  );
};
