import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const CharitableOrganizationsContext = createContext();

export const useCharitableOrganizationsContext = () =>
  useContext(CharitableOrganizationsContext);

export const CharitableOrganizationsProvider = ({ children }) => {
  const url = "https://donate-app-n7oe.onrender.com";
  const token = localStorage.getItem("token");
  // Initialize charitableOrganizations as an empty array if you expect an array from the API
  const [charitableOrganizations, setCharitableOrganizations] = useState();

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${url}/api/v1/user/charitable_organizations?locale=ar`, {
        headers: {
          Authorization: `${token}`, 
        },
      })
      .then((res) => {
        setCharitableOrganizations(res.data.success);
      })
      .catch((error) => {
        console.error("Error fetching charitable organizations:", error);
      });
  }, [token, url, charitableOrganizations]);

  return (
    <CharitableOrganizationsContext.Provider
      value={{ charitableOrganizations }}
    >
      {children}
    </CharitableOrganizationsContext.Provider>
  );
};
