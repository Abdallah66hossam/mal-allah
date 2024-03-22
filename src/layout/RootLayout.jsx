import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";

const RootLayout = () => {
  const location = useLocation();

  const hideNavbarFooterRoutes = ["/login", "/signup", "/create-project"];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <main>
      {/* Conditionally render the NavBar */}
      {!shouldHideNavbarFooter && <NavBar />}
      <Outlet />
      {/* Conditionally render the Footer */}
      {!shouldHideNavbarFooter && <Footer />}
    </main>
  );
};

export default RootLayout;
