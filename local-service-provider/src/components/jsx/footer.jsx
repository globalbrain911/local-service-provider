import { Link } from "react-router-dom";
import insta from "../../assets/images/logo/insta.png";
import fb from "../../assets/images/logo/fb.png";
import x from "../../assets/images/logo/x.png";
import linkedin from "../../assets/images/logo/linkedin.png";
import language from "../../assets/images/logo/language.png";
import location from "../../assets/images/logo/location.png";

function Footer() {
  const socialMediaLogos = [insta, linkedin, x, fb];
  const aboutUs = ["About us", "Donate", "Join", "Invest"];
  const services = [
    "Plumbers",
    "Carpenters",
    "Beauty Saloons",
    "Beauty Saloons",
    "Saloons",
  ];
  const shops = ["Food cities", "Super markets", "Bakers"];
  return (
    <>
      <footer>
        <div className="flex justify-center text-white font-[Satoshi-Regular] bg-black">
          <div className="w-screen p-4 px-6 lg:px-15 md:px-15 lg:py-15 md:py-15 max-w-350">
            <div className="text-2xl my-3">LSF</div>
            <div className="my-5 hover:underline">
              <Link to="">Visit Help Center</Link>
            </div>
            <div className="sm:grid sm:grid-cols-3 grid grid-cols-2">
              <div className="my-3">
                {aboutUs.map((e) => (
                  <div className="my-2">
                    <Link to="" className="text-[15px] hover:text-gray-400">
                      {e}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="my-3">
                <div className="text-[18px] font-bold">Services</div>
                {services.map((service) => (
                  <div className="my-2">
                    <Link to="" className="text-[15px] hover:text-gray-400">
                      {service}
                    </Link>
                  </div>
                ))}
              </div>
              <div className="my-3">
                <div className="text-[18px] font-bold">Shops</div>
                {shops.map((shop) => (
                  <div className="my-2">
                    <Link to="" className="text-[15px] hover:text-gray-400">
                      {shop}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:flex justify-between my-4">
              <div className="flex my-4">
                {socialMediaLogos.map((logo) => (
                  <div className="bg-white rounded-3xl w-6 mr-4 my-4">
                    <img src={logo} alt="" />
                  </div>
                ))}{" "}
              </div>
              <div className="flex items-center justify-end my-4">
                <div className="flex items-center mx-3">
                  <div className="w-4 h-4 bg-white rounded-4xl">
                    <img src={language} alt="" />
                  </div>
                  <div className="ml-3">English</div>
                </div>
                <div className="flex items-center mx-3">
                  <div className="w-5 h-5">
                    <img
                      src={location}
                      className="bg-white rounded-4xl"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">Colombo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
