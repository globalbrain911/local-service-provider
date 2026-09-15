import Header from "./components/jsx/header.jsx";
import ServicesBar from "./components/jsx/service_search_bar.jsx";
import ExploreServices from "./components/jsx/explore_services.jsx";
import Footer from "./footer.jsx";
import ContactUsForm from "./components/jsx/contact_us_form.jsx";

function App() {
  return (
    <>
      <Header />
      <ServicesBar />
      <ExploreServices />
      <ContactUsForm />
      <Footer />
    </>
  );
}

export default App;
