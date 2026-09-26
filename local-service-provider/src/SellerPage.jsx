import Header from "./components/jsx/header";
import Footer from "./components/jsx/footer";
import More from "./assets/images/logo/more.png";
import Courasel from "./Courasel";
import { useState } from "react";

function SellerPage() {
  const name = "Pc Tech";
  const postedDate = "17 Sep, 2026";
  const postedTime = "20:04";
  const location = "Colombo 07";
  const categories = ["seller", "pc repair", "pc build", "pc assocaries"];
  const [tab, setTab] = useState("false");
  const tabActivity = () => setTab(!tab);

  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="max-w-320">
          <div>
            <Header />
          </div>
          <div className="flex-1 px-6 indicators-carousel">
            <div className="text-sm text-gray-600">
              Categories -{" "}
              {categories.map((category) => (
                <>{category}/</>
              ))}
            </div>
            <div>
              <Courasel />
              <div className="text-xl font-bold lg:text-5xl">{name}</div>
              <div className="text-sm lg:text-xl text-gray-700 ">
                <span>Posted on </span>
                {postedDate}
                <span className="mx-1">{postedTime},</span>
                {location}
              </div>
            </div>
            <div className="lg:text-xl my-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptate, fugiat rem. Pariatur, quasi provident? Rerum
              repudiandae sed sequi praesentium beatae sit eum nostrum libero
              natus officiis mollitia, velit eligendi nobis itaque, sunt culpa
              aspernatur in voluptate rem perspiciatis! Commodi dignissimos
              debitis consequatur quo ipsam mollitia obcaecati hic nobis alias
              sed? Culpa aut cum veritatis assumenda fuga iure, dicta
              consequuntur praesentium laborum accusantium, id odio non quos,
              dolorem natus explicabo commodi. Ipsa animi similique cum est?
              Laudantium sint incidunt quia aut ea suscipit fuga animi
              perferendis! Alias et dolorem aliquid explicabo expedita excepturi
              magni quidem rem repudiandae natus, quia blanditiis amet veniam
              doloribus, cumque rerum sequi asperiores. Soluta beatae sequi
              officiis inventore sed? Est ullam excepturi magni cum velit
              dolorem numquam voluptatem aspernatur, ipsa assumenda dolor qui
              debitis, laudantium magnam sed soluta possimus quasi minus ut
              error amet harum eligendi. Nisi, rem quas. Harum veniam, dicta
              delectus porro nostrum alias optio aliquid repellendus autem
              impedit. Culpa illo ducimus odit debitis magni suscipit et
              tempore, voluptatum ex, excepturi blanditiis at veniam adipisci
              est provident? Sint, voluptatibus iste tenetur totam at, dolorem
              atque voluptas iure pariatur dolorum maiores, ratione itaque amet
              corporis explicabo hic eveniet! Optio voluptatum facilis aliquid
              voluptas, est eveniet vero.
            </div>
          </div>
          <div className="fixed w-screen flex justify-end bottom-5 right-4">
            <div className="bg-black rounded-3xl">
              <div onClick={tabActivity}>
                <img className={`${tab ? "w-10 bg-white rounded-4xl" : "hidden"}`} src={More} />
                <div
                  className={`${tab ? "hidden" : "text-white py-2 pt-3 rounded-lg flex justify-between px-5"}`}
                >
                  <div className="ml-3">
                    <div className="text-xl cursor-pointer">LSF</div>
                  </div>
                  <div className="">
                    <div className="text-center text-2xl hover:bg-gray-500 hover:cursor-pointer rounded-3xl px-2">
                      x
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`${tab ? "hidden" : "rounded-xl  w-50 lg:w-70 text-white px-5 py-2 block"}`}
              >
                <div className="font-bold w-full pb-1">
                  <div className="text-center rounded-lg p-2 bg-white text-black my-2 hover:bg-gray-900 hover:text-white  cursor-pointer ">
                    Call now
                  </div>
                  <div className="text-center rounded-lg p-2 bg-white text-black my-2 hover:bg-gray-900 hover:text-white cursor-pointer ">
                    Whatsapp
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SellerPage;
