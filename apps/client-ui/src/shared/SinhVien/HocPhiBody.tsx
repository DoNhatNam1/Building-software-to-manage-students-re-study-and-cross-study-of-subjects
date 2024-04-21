import Image from 'next/image'
import {boots, div, tables } from '../../../Boostrap/boostrap'
import imglg from '../../../public/logo.jpg'
import {ThongTinnav,  ThongTinnav11, ThongTinnav15, ThongTinnav2, ThongTinnav3, ThongTinnav5, ThongTinnav6, ThongTinnav7, ThongTinnav8, ThongTinnav9 } from '@/components/ThongTinnav'
import table from '../../components/table'
import HocPhiTable from '@/lib/NextUi/HocPhiTable'

const ThongTinBody = () => {
  return (
<>
{/* Page */}
<div className="flex w-screen h-screen">

{/* NavBar Container */}
  <nav className="flex basis-1/6 navbar navbar-expand-lg navbar-dark bg-white flex-col text-center top-0 l-0 flex-nowrap h-screen container">
      <div className="container-fluid justify-center py-5 ml-28 ">
        <a className="navbar-brand text-center rounded-lg rounded-" href="#">
          <Image
          src={imglg}
          alt="Avatar Logo"  
          className="rounded-pill"
          width={90}
          height={90}
        />
        </a>
          </div>
            <div className='nav flex-column container-fluid justify-center gap-3 py-1 pl-5'>
              <ul className="nav nav-tabs text-2xl ">
                <li className="nav-item py-4 ">
                  <ThongTinnav/>         
                </li>
                <li className="nav-item  py-4">
                <ThongTinnav2/>
                </li>
                <li className="nav-item py-4">
                <ThongTinnav3 />
                </li>
                <li className="nav-item py-4">
                <ThongTinnav5 />
                </li>
                <li className="nav-item py-4">
                <ThongTinnav6 />
                </li>
                <li className="nav-item py-4">
                <ThongTinnav7 />
                </li>
                <li className="nav-item py-4">
                <ThongTinnav8 />
                </li>
              </ul>
            </div>
  </nav>

{/* Body Container */}
<div className="basis-5/6 flex flex-col">

  {/* TopBody */}
  <div className="basis-1/12 bg-gray-100">
    <div className='ml-auto'>
    <ThongTinnav9/>
    </div>
  </div>
  
  <div className='basis-1/12 bg-gray-100'><hr />
    <div className='ml-2'>
      <ThongTinnav15 />
    </div>
  </div>
  {/* BottomBody */}
  <div className="basis-9/12 bg-slate-200">
  <HocPhiTable/>
  </div>
  <div className='basis-1/12 bg-gray-100'><hr />
    <ThongTinnav11 />
  </div>
</div>
</div>
 
</>
  )
}

export default ThongTinBody