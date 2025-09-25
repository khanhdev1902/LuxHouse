import React from "react";
import { VscAccount } from "react-icons/vsc";

export default function Account() {
  const [user, setUser] = React.useState(false);
  return (
    <div
      className="flex flex-col items-center justify-end group text-col-hover cursor-pointer"
      onClick={() => setUser(!user)}
    >
      {user ? (
        <div>
          <VscAccount className="size-6 group-hover:text-cyan-500" />
          <span className="hidden lg:inline">Tài khoản</span>
        </div>
      ) : (
        <div className="relative inline-block group bg-cyan-0 w-12 h-12">
          <img src="/avt.jpg" alt="" className=" rounded-full" />
          <span
            className="absolute top-full mt-3
            whitespace-nowrap"
          >
            <span>Khanh deddo</span>
          </span>
        </div>
      )}
    </div>
  );
}
