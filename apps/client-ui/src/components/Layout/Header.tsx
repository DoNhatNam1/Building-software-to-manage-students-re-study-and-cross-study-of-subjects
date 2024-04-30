'use server'

import styles from "@/utils/style";
import NavItems from "../NavItems";
import ProfileDropDown from "../ProfileDropDown";
import logo from '../../../public/logo.jpg'
import Image from 'next/image'
export default async function Header() {
  return (
    <header className="w-full bg-[#0A0713]">
      <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
      <Image 
      src={logo} 
      alt="Picture of the author" 
      priority 
      width={60}
      height={60}
      />
        <NavItems />
        <ProfileDropDown />
      </div>
    </header>
  );
};


