import Banner from "../components/home/Banner";
import Circles from "../components/home/Circles";
import Newsletter from "../components/home/Newsletter";
import Statistics from "../components/home/Statistics";

const HomePage = () => {
  return (
    <main>
      <Banner />
      <Statistics />
      <Circles />
      <Newsletter />
    </main>
  );
};

export default HomePage;
