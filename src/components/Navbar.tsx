import { IconWrapper } from "@/components/IconWrapper";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdMenu, IoMdSearch } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { TbLayoutList } from "react-icons/tb";

const Navbar = () => {
  return (
    <nav className="select-none bg-primary fixed top-0 w-full h-[65px] flex justify-between py-2 px-3 z-[10] shadow-md">
      <div className="flex items-center gap-x-2">
        <div className="">
          <IconWrapper>
            <IoMdMenu size={24} />
          </IconWrapper>
        </div>
        <div className="flex items-center">
          <Image
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="keep logo"
            width={40}
            height={40}
            className="inline"
          />
          <span className="ml-2 text-white text-xl">Keep</span>
        </div>
      </div>

      <div className="items-center relative hidden md:flex">
        <Input
          className="border-none w-[40vw] bg-stone-700 placeholder:text-white accent-white text-white focus:outline-none focus:border-none focus:ring-0
            focus-visible:ring-0 focus-visible:ring-offset-0 
              h-[95%] px-4 pl-14 text-[1rem]"
          placeholder="Search"
        />

        <IconWrapper className="absolute p-2 left-3">
          <IoMdSearch size={22} />
        </IconWrapper>
      </div>

      <div className="flex items-center">
        <IconWrapper className="text-gray-300 block md:hidden">
          <IoMdSearch size={22} />
        </IconWrapper>
        <IconWrapper className="text-gray-400">
          <MdRefresh size={22} />
        </IconWrapper>
        <IconWrapper className="text-gray-400">
          <TbLayoutList size={22} />
        </IconWrapper>
        <IconWrapper className="text-gray-400">
          <IoSettingsOutline size={22} />
        </IconWrapper>
        <IconWrapper className="text-gray-400">
          <FaRegUserCircle size={22} />
        </IconWrapper>
      </div>
    </nav>
  );
};

export default Navbar;
