import Header from "./components/jsx/header.jsx";
import ServicesBar from "./components/jsx/service_search_bar.jsx";
import Location from "./components/jsx/location.jsx";
import ExploreServices from "./components/jsx/explore_services.jsx";

function App() {
  return (
    <>
      <Header />
      <Location />
      <ServicesBar />
      <ExploreServices />
    </>
  );
}

export default App;
