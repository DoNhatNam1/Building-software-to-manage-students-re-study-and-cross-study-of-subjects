
import Image from 'next/image'
import {boots, div, tables } from '../../../Boostrap/boostrap'
import imglg from '../../../public/logo.jpg'
import imgbr from '../../../public/hia.jpg'
import Link from 'next/link'
import SinhVienBotonNav from '@/components/SinhVienBotonNav'


const HomeBody = () => {
  return (
    
    <>
    <link></link>
<div className='basis-1/12'>
<nav className="navbar navbar-expand-sm navbar-light bg-white pl-0 pr-0  ">

  <div className="container-fluid ml-5 py-1">
    <a className="navbar-brand ml-5" href="#">
      <Image
      src={imglg}
      alt="Avatar Logo"  
      className="rounded-pill"
      width={90}
      height={90}
    />
    </a>
  </div>
  <div className="flex justify-content-center w-full .fs-1  "> 
    <div className="d-flex justify-content-center w-100 gap-5">
      <button type="button"
      className={`${boots.buttonSinhVien} text-zinc-600 bg-gray-600` }>
        <Link href="/SinhVien/ThongTin">Sinh viên</Link>
      </button>
      <button type="button" className={`${boots.buttonSinhVien} text-zinc-600 bg-gray-600` }>Học Phần</button>
      <button type="button" className={`${boots.buttonSinhVien} text-zinc-600 bg-gray-600` }>Đăng Ký Học Lại</button>
      <button type="button" className={`${boots.buttonSinhVien} text-zinc-600 bg-gray-600` }>Thông Báo</button>
      <button type="button" className={`${boots.buttonSinhVien} text-zinc-600 bg-gray-600` }>Kết Quả Học Tập</button>
    </div>
  </div>
</nav>
</div>
<div className=' basis-11/12'>
<Image
      src="/hia.jpg"
      width={4000}
      height={50}
      alt="Picture of the author"
    />
</div>

    </>
  )
}


  
export default HomeBody


{/* // rafce (tab) */}