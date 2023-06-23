import SearchBar from "../../components/SearchBar";
import Nameplate from "../../components/Nameplate";
import "./styles.scss";

const Home = () => {
  return (
    <div className="home-wrapper">
      <section className="home-wrapper__container">
        <Nameplate />
        <SearchBar orderList={[]} />
      </section>
    </div>
  );
};

export default Home;
