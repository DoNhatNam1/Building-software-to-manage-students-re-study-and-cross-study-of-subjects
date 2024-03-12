'use server'

import AdminCashBookBodyContentComponents from "@/components/AdminCashBookBodyContentComponents";
import AdminHeader from "@/components/Layout/AdminHeader"


export default async function CashBookBody () {
  return (
    <div className="basis-5/6 bg-gray-200">
    <AdminHeader />
    <div className="h-auto">
      <AdminCashBookBodyContentComponents/>
    </div>
  </div>
  )
}
