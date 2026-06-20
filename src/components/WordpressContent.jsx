import Img1 from "../assets/wordImg1.jpg";
import Img2 from "../assets/wordImg2.jpg";

export default function WordpressContent() {
  return (
    <div className="flex justify-evenly mx-auto mb-18 px-10 pb-10 pt-6">
      <div className="bg-[#DCE0DC] h-[590px] w-[590px] rounded-xl p-6 hover:shadow-xl cursor-pointer transition duration-300">
        <div className="flex justify-center mb-19 mt-4">
          <img
            src={Img1}
            alt=""
            className="h-[300px] rounded-md object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold">
            Hosting for WordPress $6.99/mo
          </h2>
          <p className="mt-4 mb-2">
            Let AI quickly build a fully-managed website that's always up to
            date, with no worries.
          </p>
          <button className="bg-black rounded-md py-2 px-4 text-white font-semibold mb-3 hover:scale-102 transition duration-300">
            Explore Plans and Pricing
          </button>
        </div>
      </div>

      <div className="bg-[#DCE0DC] h-[590px] w-[590px] rounded-xl p-6 hover:shadow-xl cursor-pointer transition duration-300">
        <div className="flex justify-center mb-10 mt-4">
          <img
            src={Img2}
            alt=""
            className="h-[300px] rounded-md object-cover"
          />
        </div>

        <p className="bg-sky-200 rounded-md w-29 p-1 text-sm my-2 font-bold">
          RECOMMENDED
        </p>

        <div>
          <h2 className="text-3xl font-semibold">SSL Certificates $71.88/yr</h2>
          <p className="mt-4 mb-2">
            Help keep sensitive data secure on your site and boost search
            ranking with an SSL Certificate.
          </p>
          <button className="bg-black rounded-md py-2 px-4 text-white font-semibold mb-3 hover:scale-102 transition duration-300">
            Secure Your Data
          </button>
        </div>
      </div>
    </div>
  );
}
