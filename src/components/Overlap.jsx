import Img1 from "../assets/Overlap1.jpg";
import Img2 from "../assets/Overlap2.jpg";
import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import DesktopIcon from "@mui/icons-material/ScreenSearchDesktopOutlined";
import Email from "@mui/icons-material/EmailOutlined";
import ForumIcon from "@mui/icons-material/ForumOutlined";
import Phone from "@mui/icons-material/StayCurrentPortraitOutlined";

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

          <div className="flex justify-between gap-10">
            <div className="flex flex-col gap-4 font-semibold text-md justify-center content-center">
              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-lg w-8 flex justify-center p-2">
                  <LanguageIcon fontSize="small" />
                </div>
                <p>Domain Name</p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-lg w-8 flex justify-center p-2">
                  <DesktopIcon fontSize="small" />
                </div>
                <p>Online Store</p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-lg w-8 flex justify-center p-2">
                  <Email fontSize="small" />
                </div>
                <p>Business Email</p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-lg w-8 flex justify-center p-2">
                  <ForumIcon fontSize="small" />
                </div>
                <p>Conversations</p>
              </div>

              <div className="flex gap-2 items-center">
                <div className="bg-gray-200 rounded-lg w-8 flex justify-center p-2">
                  <Phone fontSize="small" />
                </div>
                <p>GoDaddy App</p>
              </div>
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
