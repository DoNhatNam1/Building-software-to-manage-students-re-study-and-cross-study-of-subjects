
import Image from "next/image";
import Logo from "../../public/logo.jpg";
import Link from "next/link";
import AdminDropDownItemComponent from "./AdminDropDownItemComponent";

const AdminNavItems = () => {
  return (
    <nav className="h-full basis-1/6 bg-blue-300">
      <div className="h-full flex flex-col">
        <div className="fixed pt-5 pl-20 z-20">
          <Link href="/">
            <Image 
              src={Logo} 
              width={80} 
              height={80} 
              alt="Logo Photo" 
            />
          </Link>
        </div>

        {/* NavGroup */}
        <div>
          {/* Avartagroup */}
          <div>
            {/* Avarta Icon */}
            <div></div>

            {/* Name */}
            <div></div>

            {/* Email */}
            <div></div>
          </div>

          {/* NavItemList */}
          <div className="mt-32 w-full h-full p-5">       
            <AdminDropDownItemComponent/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavItems;
