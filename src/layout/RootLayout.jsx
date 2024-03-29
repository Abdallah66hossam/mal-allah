import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./shared/NavBar";
import Footer from "./shared/Footer";
import { useEffect } from "react";
import { useCharitableOrganizationsContext } from "./context/CharitableOrganizationsProvider";
import { useLoadingContext } from "./context/LoadingContext";
import Loading from "./shared/Loading";

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loading } = useLoadingContext();
  
  const { charitableOrganizations } = useCharitableOrganizationsContext();

  const hideNavbarFooterRoutes = ["/login", "/signup"];
  const hideCreateProjectRoutes = ["/create-project", "/charitable-details"];
  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(
    location.pathname
  );
  const shouldHideCreateProject =
    !charitableOrganizations &&
    hideCreateProjectRoutes.includes(location.pathname);

  // Redirect to home page if user doesn't have charity and is trying to access a restricted route
  useEffect(() => {
    if (
      !charitableOrganizations &&
      hideCreateProjectRoutes.includes(location.pathname)
    ) {
      navigate("/");
    }
  }, [
    charitableOrganizations,
    hideCreateProjectRoutes,
    location.pathname,
    navigate,
  ]);

  return (
    <main>
      {/* Conditionally render the NavBar */}
      {!shouldHideNavbarFooter && !loading && <NavBar />}

      {loading && <Loading />}
      {!shouldHideCreateProject  && <Outlet />}

      {/* Conditionally render the Footer */}
      {!shouldHideNavbarFooter && !loading && <Footer />}
    </main>
  );
};

export default RootLayout;
