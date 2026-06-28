import AdsSection from "../components/AdsSection.jsx";
import DayOfTheDeal from "../components/DayOfTheDeal.jsx";
import Hero from "../components/Hero.jsx";
import { HOME_ADS } from "../data/adsData.js";

const Home = () => {
  return (
    <>
      <Hero />
      <DayOfTheDeal />
      <AdsSection ads={HOME_ADS} columns={1} />
    </>
  );
};

export default Home;
