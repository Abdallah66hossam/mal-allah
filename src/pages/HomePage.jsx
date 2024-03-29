import Banner from "../components/home/Banner";
import Circles from "../components/home/Circles";
import ListProjects from "../layout/project/ListProjects";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <ListProjects />
      <Circles />
    </main>
  );
};

export default HomePage;
