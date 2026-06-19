import Img1 from "../assets/domainImg1.jpg";
import Img2 from "../assets/domainImg2.jpg";
import Img3 from "../assets/domainImg3.jpg";

export default function DomainsContent() {
  return (
    <div className="flex justify-evenly">
      <div className="bg-sky-100 h-[620px] w-[600px] m-auto rounded-xl p-6">
        <div className="flex justify-center mb-25 mt-4">
          <img src={Img1} alt="" className="max-w-xl h-[300px] rounded-md" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">Domains</h2>
          <p className="my-4">
            Get started with the perfect domain, which comes with free domain
            privacy protection forever.
          </p>
          <button className="bg-black rounded-md py-2 px-5 text-white font-bold mb-3">
            Search Domains
          </button>
        </div>
      </div>
      <div className="w-[600px] h-[620px]">hey</div>
    </div>
  );
}
