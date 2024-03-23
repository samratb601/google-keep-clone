import { IconWrapper } from "@/components/ui/icon-wrapper";
import { cn } from '@/lib/utils';
import { FiEdit2 } from "react-icons/fi";
import {
    IoNotificationsOutline,
    IoTrashOutline
} from "react-icons/io5";
import {
    MdLabelOutline,
    MdLightbulbOutline
} from "react-icons/md";
import { PiArchiveBox } from "react-icons/pi";



const Sidebar = () => {
    const activeIndex = 1;

    const menu = [
      {
        label: "Notes",
        icon: <MdLightbulbOutline size={22} className="inline" />,
      },
      {
        label: "Reminders",
        icon: <IoNotificationsOutline size={22} className="inline" />,
      },
      {
        label: "Label 1",
        icon: <MdLabelOutline size={22} className="inline" />,
      },
      {
        label: "Edit labels",
        icon: <FiEdit2 size={22} className="inline" />,
      },
      {
        label: "Archive",
        icon: <PiArchiveBox size={22} className="inline" />,
      },
      {
        label: "Trash",
        icon: <IoTrashOutline size={22} className="inline" />,
      },
    ];
  return (
    <div
    className={cn(
      `absolute bg-primary h-full pt-2 flex flex-col justify-start group sidemenu`
    )}
    // onMouseEnter={() => {
    //   debounce(() => setSidemenuOpen(true), 170)();
    // }}
    // onMouseLeave={() => {
    //   debounce(() => setSidemenuOpen(false), 170)();
    // }}
  >
    {menu.map((item, i) => {
      const isActive = activeIndex - 1 === i;
      return (
        <div
        key={`side-bar-item-${i+1}`}
          className={cn(
            ` ${
              isActive
                ? "px-3 flex place-content-center mx-auto bg-yellow-800/40 rounded-full w-12 h-12 group-hover:bg-yellow-800/40 group-hover:rounded-none group-hover:rounded-r-full group-hover:w-auto group-hover:h-auto  group-hover:place-content-start group-hover:mx-0"
                : "px-3 hover:bg-gray-700/40 hover:rounded-r-full"
            }`
          )}
        >
          <IconWrapper
            className={cn(
              `transition ease-linear hover:bg-transparent group-hover:bg-transparenttext-gray-400 text-gray-400`,
              `${isActive ? "text-gray-200" : ""}`
            )}
          >
            {item.icon}

            <span className="ml-8 font-semibold text-[0.9rem] hidden group-hover:inline">
              {item.label}
            </span>
          </IconWrapper>
        </div>
      );
    })}
  </div>
  )
}

export default Sidebar