'use client'
import React from "react";
import Image from 'next/image'
import imagemap from '../../../public/imagemap.png'

export default function Lienlac(){
    return(
    <>
    <div className="text-black py-5 pl-5 text-xl leading-loose">
        <h2 className="text-3xl font-medium ">Thông Tin Liên Hệ</h2>
        <div className="text-red-700 ">
            * Liên Hệ Đào tạo
        </div>
        <p>
            <div className="font-medium">
            Trường Đại học Tài Nguyên và Môi Trường thành phố Hồ Chí Minh (HCMUNRE)
            </div>
            <div>
            Địa chỉ : 236 Đ. Lê Văn Sỹ, Phường 1, Tân Bình, Thành phố Hồ Chí Minh
            </div>
            <div>
            Điện thoại: (028) 5553 2221
            </div>
            <div>
            Email: Hc@hcmunre.edu.vn 
            </div>
            <div>
            Giờ làm việc: Thứ Hai - Thứ sáu, từ 7h30 đến 17h30
            </div>
        </p>
    </div>
    <div className='text-center pl-5 pb-5 right-4 '>
        <Image
            src="/imagemap.png"
            width={350}
            height={1000}
            alt="Picture of the author"
            />
    </div>
    </>
)   

}