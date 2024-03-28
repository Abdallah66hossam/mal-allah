import Banner from "../components/home/Banner";
import Circles from "../components/home/Circles";
import Newsletter from "../components/home/Newsletter";
import ListProjects from "../layout/project/ListProjects";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <ListProjects/>
      <Circles />
      <Newsletter />
    </main>
  );
};

export default HomePage;
