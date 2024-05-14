
import AdminHeader from "./AdminHeader";

const AdminBodyHome = () => {
  return (
    <>
      <div className="basis-5/6 overflow-y-auto">
        <AdminHeader />
        <div className="grid grid-cols-4 grid-rows-7 gap-x-2 gap-y-3 mx-10 my-32 z-0">
          <div className="bg-white rounded-lg border-gray-400 border-medium border-solid min-h-32 px-2 col-span-3">
            <div className="w-full py-2 border-b-medium">
              <h1 className="font-semibold text-gray-800">
                Tổng số lượng sinh viên
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-lg border-gray-400 border-medium border-solid px-2 row-span-7">
            <div className="w-full py-2 border-b-medium">
              <h1 className="font-semibold text-gray-800">
                Hoạt động thông báo
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-lg border-gray-400 border-medium border-solid px-2 col-span-3 row-span-3">
            <div className="w-full py-2 border-b-medium">
              <h1 className="font-semibold text-gray-800">
                Tổng số bài kiểm tra
              </h1>
            </div>
          </div>

          <div className="bg-white rounded-lg border-gray-400 border-medium border-solid px-2 col-span-3 row-span-3">
            <div className="w-full py-2 border-b-medium">
              <h1 className="font-semibold text-gray-800">
                Hóa đơn
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBodyHome;
