import HeaderDesktop from "./HeaderDesktop";
import HeaderMobile from "./HeaderMobile";
interface HeaderProps {
  className?: string;
  onHandleResize: (value: number) => void;
}
export default function Header({ className, onHandleResize }: HeaderProps) {
  return (
    <div className={className}>
      <HeaderMobile className="lg:hidden" />
      <HeaderDesktop
        onHandleResize={onHandleResize}
        className=" hidden lg:block"
      />
    </div>
  );
}
