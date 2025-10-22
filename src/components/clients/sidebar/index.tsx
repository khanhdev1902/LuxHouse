import { user } from "@/constant/const-home";
import { FaEdit} from "react-icons/fa";

export default function SideBar() {
  return (
    <aside className="border-r pr-5">
      <header className="flex gap-2 items-center text-sm border-b pb-3">
        <img src={user.avata} alt="avata" className=" rounded-full size-12" />
        <div className="flex flex-col font-semibold text-gray-800">
          <span>{`${user.firstName} ${user.lastName}`}</span>
          <span className="flex gap-2 items-center text-gray-600">
            <FaEdit className="size-4" />
            Sửa hồ sơ
          </span>
        </div>
      </header>
      <main>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
        <div>aaaaaaaaaaaaaaaa</div>
      </main>
    </aside>
  );
}
