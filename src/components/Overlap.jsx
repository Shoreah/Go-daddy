import Img1 from "../assets/Overlap1.jpg";
import Img2 from "../assets/Overlap2.jpg";

export default function Overlap() {
  return (
    <div className="my-10">
      <h1 className="text-5xl font-bold mx-5 my-5">
        Airo every day, all the way
      </h1>
      <div className="w-full max-w-7xl mx-5 position relative">
        <img
          src={Img1}
          alt=""
          className="object-cover h-[550px] w-full rounded-3xl"
        />

        <div className="absolute bg-white h-[500px] w-[750px] top-6 right-5 rounded-lg p-10">
          <p className="text-2xl font-semibold mb-15">
            “It's my job to make you believe I can do anything. But when it came
            to building my website, GoDaddy Airo™ stepped in and turned my
            vision into reality.”
          </p>

          <div className="flex justify-evenly gap-10">
            <div className="flex flex-col gap-4 font-semibold text-lg justify-center content-center">
              <p>Domain Name</p>
              <p>Online Store</p>
              <p>Business Email</p>
              <p>Conversations</p>
              <p>GoDaddy App</p>
            </div>
            <div>
              <img
                src={Img2}
                alt=""
                className="object-cover w-96 shrink-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
