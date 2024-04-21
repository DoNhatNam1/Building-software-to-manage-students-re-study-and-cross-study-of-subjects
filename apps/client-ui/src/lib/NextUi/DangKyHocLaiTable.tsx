import React, { Component } from 'react'

export default function DangKyHocLaiTable() {
  const options = [
    {label: "toán cao cấp", value: 1},
    {label: "toán rời rạc", value: 2},
    {label: "anh văn 1", value: 3},
    {label: "Anh văn 2", value: 4},
    {label: "Cơ sở dữ liệu", value: 5},
    {label1: "ca 1 (6:30 - 9:00", value: 1},
    {label1: "ca 2 (9:00 - 11:30", value: 2},
    {label1: "ca 3 (12:30 - 15:00", value: 3},
    {label1: "ca 4 (15:00 - 17:30", value: 4},
  ]
  const data = [
    

  ]
  return(
  <>
  <form className='p-3 bg-white'>
    <div className='font-[Poppins] text-3xl text-red-600 pt-3 pl-5 border-b-2 border-b-gray-300 '>
      Thời gian đăng ký học lại, học ghép:
      <div>
      Các đơn đăg ký online từ ngày 19/4 sẽ được trừ tự động nếu có số dư trong ví
      </div>
      <div className='text-cyan-600'>
        Thông tin sinh viên:
      </div>
    </div>
    <table className='text-left rounded-2xl border-collapse shadow-xl font-[Poppins] border-2 bor-cyan-200 text-2xl pt-5 pl-5 mt-4 bg-white w-full '>
      <thead className='text-gray-800 '>
        <tr className=' border-2 mt-6 px-3 py-3  '>
          <div className='pl-3 leading-[3rem] '>
          <th> Họ và tên</th>
          </div>
          <th className='border-l-2 pl-3 '>Nguyễn Tấn Đạt</th>      
        </tr>
        <tr className=' border-2 py-3'>
          <div className='pl-3 leading-[3rem]'>
          <th>Mã Sinh Viên</th>
          </div>         
          <th className='border-l-2 pl-3'>105008060</th>         
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Kỳ thứ</th>
          </div>         
          <th className='border-l-2 pl-3'>2</th>
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th> Trạng thái</th>
          </div>
          <th className='border-l-2 pl-3'>HDI(Học đi)</th>
        </tr>
        <tr className=' border-2 '>
          <div className='pl-3 leading-[3rem]'>
          <th>Loại dịch vụ</th>
          </div>
          <th className='border-l-2 pl-3'>Đăng ký học lại, học ghép</th>
        </tr>
        <tr className='border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Chọn môn</th>
          </div>
          <th className='border-l-2 pl-3 '>
          <div>
            <select className='w-full border-2 border-b-gray-300 '>
              {
                options.map(option =>(
                  <option value={option.value}>{option.label}</option>
                ))
              }
            </select>
          </div>
        </th>

        </tr>
        <tr className=' border-2 '>
          <div className='pl-3 leading-[3rem]'>
          <th>Chọn ca dự kiến</th>
          </div>
          <th className='border-l-2 pl-3'><select className=' w-full border-2 border-b-gray-300 '>
            {
              options.map(option =>(
                <option value={option.value}>{option.label1}</option>
              ))
            }
            </select> </th>
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[3rem]'>
          <th>Số tiền</th>
          </div>
          <th className='border-l-2 pl-3'>1 triệu đồng</th>        
        </tr>
        <tr className=' border-2'>
          <div className='pl-3 leading-[6rem]'>
            <th>Đánh giá</th>
          </div>
          <th className='border-l-2 pl-3'>
            <div>
              <button className=' w-full border-2 border-b-gray-300 bg-green-600'>
                Hoàn tất đăng ký
              </button>
            </div>
            <div>
            Lưu ý: Khi thực hiện thanh toán qua DNG Mã sinh viên của bạn là andvps11874 
            </div>
          </th>
        </tr>
        
      </thead>  
  </table>
  </form>
  </>
  )
}