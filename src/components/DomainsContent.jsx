import Img1 from "../assets/domainImg1.jpg";
import Img2 from "../assets/domainImg2.jpg";
import Img3 from "../assets/domainImg3.jpg";

export default function DomainsContent() {
  return (
    <div className="flex justify-evenly mx-auto mb-18 px-10 pb-10 pt-6">
      <div className="bg-sky-100 h-[590px] w-[590px] rounded-xl p-6 hover:shadow-xl cursor-pointer transition duration-300">
        <div className="flex justify-center mb-19 mt-4">
          <img
            src={Img3}
            alt=""
            className="h-[300px] rounded-md object-cover"
          />
        </div>

        <div>
          <h2 className="text-2xl font-semibold">Domains</h2>
          <p className="mt-4 mb-2">
            Get started with the perfect domain, which comes with free domain
            privacy protection forever.
          </p>
          <button className="bg-black rounded-md py-2 px-4 text-white font-semibold mb-3 hover:scale-102 transition duration-300">
            Search Domains
          </button>
        </div>
      </div>

      <div className="w-[600px] h-[590px] flex flex-col gap-6">
        <div className="bg-[#EFEDE7] h-[300px] rounded-xl px-5 pb-1 pt-15 flex justify-between gap-5 hover:shadow-xl cursor-pointer transition duration-300">
          <div>
            <h2 className="text-xl font-bold">.co for $0.01/1st year</h2>
            <p className="my-3 text-md">
              Ensure your company and website stand out with a .co domain.
              3-year purchase required. Additional year(s) $51.99.
            </p>
            <button className="bg-black rounded-md py-2 px-4 text-white font-bold hover:scale-102 transition duration-300">
              Find Your Domain
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

        <div className="bg-[#F3E2D7] h-[300px] rounded-xl px-5 pb-1 pt-15 flex justify-between gap-5 hover:shadow-xl cursor-pointer transition duration-300">
          <div className="mt-14">
            <h2 className="text-xl font-bold">.ph $109.99/1st yr</h2>
            <p className="my-2 text-md leading-relaxed">
              Boost your local impact with our localized top-level domains.
            </p>
            <button className="bg-black rounded-md py-2 px-4 text-white font-bold hover:scale-102 transition duration-300">
              Get Started
            </button>
          </div>
          <div className="shrink-0 w-64">
            <img
              src={Img1}
              alt=""
              className="h-40 w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
