'use client'

import {boots, div } from '@/utils/boostrap'
const HomeBody = () => {
  return (
    <>
      <h1 className="bg-red-700">Sinh Vien Page 2</h1>
      <div className={div.DivCol8}>
        <button className={boots.buttonDanger}>Primary Button</button>
      </div>
    </>
  )
}

export default HomeBody