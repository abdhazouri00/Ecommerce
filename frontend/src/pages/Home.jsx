import LatestCollection from "../components/LatestCollection";
import Hero from "./../components/Hero";
import BestSeller from "./../components/BestSeller";
import Policy from "./../components/Policy";
import Subscribe from "./../components/Subscribe";
import Footer from './../components/Footer';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policy />
      <Subscribe />
    </div>
  );
};

export default Home;
