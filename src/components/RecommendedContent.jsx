import Img1 from "../assets/recommendimg1.jpg";
import Img2 from "../assets/recommendImg2.jpg";
import Img3 from "../assets/recommendImg3.jpg";

export default function RecommendedContent() {
  return (
    <div className="flex justify-evenly mx-auto mb-18 px-10 pb-10 pt-6">
      <div className="bg-[#EAE0DA] h-[590px] w-[590px] rounded-xl p-6 hover:shadow-xl cursor-pointer transition duration-300">
        <div className="flex justify-center mb-19 mt-4">
          <img
            src={Img1}
            alt=""
            className="h-[300px] rounded-md object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl font-semibold">
            Professional Email $1.99 per user/mo
          </h2>
          <p className="mt-4 mb-2">
            Earn trust from your customers with an email address that matches
            your domain.
          </p>
          <button className="bg-black rounded-md py-2 px-4 text-white font-semibold mb-3 hover:scale-102 transition duration-300">
            Get Started
          </button>
        </div>
      </div>

      <div className="w-[600px] h-[590px] flex flex-col gap-6">
        <div className="bg-[#C9D9E3] h-[300px] rounded-xl px-5 pb-1 pt-15 flex justify-between gap-5 hover:shadow-xl cursor-pointer transition duration-300">
          <div className="mt-14">
            <h2 className="text-xl font-bold">Websites $9.99/mo</h2>
            <p className="my-2 text-md leading-relaxed">
              Start for free and quickly design a beautiful, mobile-friendly
              site.
            </p>
            <button className="bg-black rounded-md py-2 px-4 text-white font-bold hover:scale-102 transition duration-300">
              Create Your Site
            </button>
          </div>
          <div className="shrink-0 w-64">
            <img
              src={Img2}
              alt=""
              className="h-40 w-full object-cover rounded-lg"
            />
          </div>
        </div>

        <div className="bg-[#DCE0DC] h-[300px] rounded-xl px-5 pb-1 pt-15 flex justify-between gap-5 hover:shadow-xl cursor-pointer transition duration-300">
          <div className="mt-14">
            <h2 className="text-xl font-bold">Web Hosting $5.99/mo</h2>
            <p className="my-2 text-md leading-relaxed">
              Boost your local impact with our localized top-level domains.
            </p>
            <button className="bg-black rounded-md py-2 px-4 text-white font-bold hover:scale-102 transition duration-300">
              View Plans and Pricing
            </button>
          </div>
          <div className="shrink-0 w-64">
            <img
              src={Img3}
              alt=""
              className="h-40 w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
