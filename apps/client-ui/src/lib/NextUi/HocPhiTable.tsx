import React, { Component } from 'react'

export default function HocPhiTable() {
  return(
  <>
  <div className='p-3 bg-slate-200'>
    <div className='font-[Poppins] text-3xl text-black pt-3 pl-5 border-b-2 border-b-gray-300 '>
      Thông tin học phí học kỳ 2, năm học 2023-2024
    </div>
    <table className='text-left rounded-2xl border-collapse shadow-xl font-[Poppins] border-2 bor-cyan-200 text-2xl pt-5 pl-5 mt-4  bg-white w-full '>
      <thead className='text-black '>
        <tr className=' border-2 mt-6 px-3 py-3  '>
          <div className='pl-3 leading-[3rem]'>
          <th> Số TC học phí đăng ký</th>
          </div>
          <th className='border-l-2 pl-3'></th>      
        </tr>
        <tr className=' border-2 py-3 leading-[2.5rem]'>
          <div className='pl-3 leading-[3rem]'>
          <th>Môn đăng ký</th>
          </div>         
          <th className='border-l-2 pl-3'></th>         
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Học phí</th>
          </div>         
          <th className='border-l-2 pl-3 '>6,898,000(HPHK: 6,898,000)</th>
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th> Số tiền phải đóng</th>
          </div>
          <th className='border-l-2 pl-3'>6,898,000</th>
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Nợ học kỳ trước</th>
          </div>
          <th className='border-l-2 pl-3'>5,907,400</th>
        </tr>
        <tr className='=border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Số tiền đã đóng</th>
          </div>
          <th className='border-l-2 pl-3 '>6,898,000</th>
        </tr>
        <tr className='= border-2 text-orange-500'>
          <div className='pl-3 leading-[3rem]'>
          <th>Còn nợ</th>
          </div>
          <th className='border-l-2 pl-3'>5,907,400</th>
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Tại ngân hàng</th>
          </div>
          <th className='border-l-2 pl-3 '>Vietcombank</th>        
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Thời gian đóng</th>
          </div>
          <th className='border-l-2 pl-3 '>23/03/2024</th>
        </tr>
        <tr>
          <div className='pl-3 leading-[3rem]' >
          <th>Ghi chú</th>
          </div>
          <th className='border-l-2 pl-3'></th>
        </tr>
      </thead>  
  </table>
  </div>
  </>
  )
}