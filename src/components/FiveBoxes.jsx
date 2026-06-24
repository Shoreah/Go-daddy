import LanguageIcon from "@mui/icons-material/LanguageOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";
import Five1 from "../assets/Fivebox1.jpg";
import Five2 from "../assets/Fivebox2.jpg";
import Five3 from "../assets/Fivebox3.jpg";

export default function FiveBoxes() {
  return (
    <div className="w-full mb-6 px-1 sm:px-2 lg:px-3">
      <div className="mb-8 text-center sm:mb-10">
        <h1 className="mb-4 text-3xl font-bold sm:mb-5 sm:text-4xl lg:text-5xl">
          Why work with GoDaddy?
        </h1>
        <p className="text-sm sm:text-base lg:text-lg">
          82+ million domains, 20+ million customers, millions of websites,{" "}
          <br />
          email and security — we help grow businesses.
        </p>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:gap-5 lg:gap-6">
        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          <div className="h-[220px] flex flex-col justify-between rounded-xl bg-[#EEECE8] px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[420px] lg:px-10 lg:py-5">
            <p className="text-base font-semibold sm:text-xl lg:text-3xl">
              We offer a huge selection of domains, .com to .xyz
            </p>
            <img src={Five1} alt="" className="rounded-md" />
          </div>
          <div className="h-[220px] flex flex-col justify-between rounded-xl bg-[#EEECE8] px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[420px] lg:px-10 lg:py-5">
            <p className="text-base font-semibold sm:text-xl lg:text-3xl">
              Zzzz... security to help you sleep easy every night
            </p>
            <img src={Five2} alt="" className="rounded-md" />
          </div>
          <div className="h-[220px] rounded-xl bg-[#F5F5F5] px-4 py-4 flex flex-col justify-center sm:h-[280px] sm:px-6 sm:py-5 lg:h-[420px] lg:px-10 lg:py-5">
            <LanguageIcon sx={{ fontSize: 50, color: "#39e0e0" }} />
            <p className="font-semibold sm:text-xl lg:text-3xl">
              More than URLs. 20+ million trust us for their domains and more
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-5">
          <div className="h-[220px] rounded-xl bg-[#F5F5F5] px-4 py-4 flex flex-col justify-center sm:h-[280px] sm:px-6 sm:py-5 lg:h-[420px] lg:px-10 lg:py-5">
            <WidgetsIcon sx={{ fontSize: 50, color: "#39e0e0" }} />
            <p className="font-semibold sm:text-xl lg:text-3xl">
              Smart technology that expands from local to global markets
            </p>
          </div>
          <div className="flex items-center col-span-2 h-[220px] rounded-xl bg-[#EEECE8] px-4 py-4 sm:h-[280px] sm:px-6 sm:py-5 lg:h-[420px] lg:px-10 lg:py-5">
            <p className="text-base font-semibold sm:text-xl lg:text-3xl">
              Tools for every small business first — websites, email, marketing,
              and <br /> more
            </p>
            <img src={Five3} alt="" className="w-96 shrink-0 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
}
