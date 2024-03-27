import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CharitableOrganizationsContext = createContext();

export const useCharitableOrganizationsContext = () => useContext(CharitableOrganizationsContext);

export const CharitableOrganizationsProvider = ({ children }) => {
  const url = "https://donate-app-n7oe.onrender.com";
  const token = localStorage.getItem("token");
  const [charitableOrganizations, setCharitableOrganizations] = useState(null);

  useEffect(() => {
    if (!token) return;

    axios
      .get(`${url}/api/v1/user/charitable_organizations?locale=ar`, {
        headers: {
          Authorization: ` ${token}`,
        },
      })
      .then((res) => {
        setCharitableOrganizations(res.data.success);
      })
      .catch((error) => {
        console.error("Error fetching charitable organizations:", error);
      });
  }, [token, url]);

  return (
    <CharitableOrganizationsContext.Provider value={{ charitableOrganizations }}>
      {children}
    </CharitableOrganizationsContext.Provider>
  );
};
