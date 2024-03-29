"use server";

import AdminHeader from '@/components/Layout/AdminHeader'
import PdfView from '@/lib/pdf-lib/ProductReport/PdfView';

export default async function ProductReportBody () {
  return (
    <div className="basis-5/6">
    <AdminHeader />
    <div className="h-[90vh] mt-[80px]">
        <PdfView />
    </div>
  </div>
  )
}
