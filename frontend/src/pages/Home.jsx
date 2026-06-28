import AdsSection from "../components/AdsSection.jsx";
import DayOfTheDeal from "../components/DayOfTheDeal.jsx";
import Hero from "../components/Hero.jsx";
import LatestBlog from "../components/LatestBlog.jsx";
import NewArrivals from "../components/NewArrivals.jsx";
import { HOME_ADS, PROMO_ADS } from "../data/adsData.js";

const Home = () => {
  return (
    <>
      <Hero />
      <DayOfTheDeal />
      <AdsSection ads={HOME_ADS} columns={1} />
      <NewArrivals />
      <AdsSection ads={PROMO_ADS} columns={2} />
      <LatestBlog />
    </>
  );
};

export default Home;
