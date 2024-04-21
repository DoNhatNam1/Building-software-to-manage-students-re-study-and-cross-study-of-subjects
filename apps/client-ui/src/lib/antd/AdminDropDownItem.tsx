"use client";

import React from "react";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import { useRouter } from "next/navigation";

const AdminDropDownItem = () => {
  const router = useRouter();

  const handleNavigate = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Home");
  };

  const handleNavigate1 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Schedule");
  };

  const handleNavigate2 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Student");
  };

  const handleNavigate3 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Lessons");
  };

  const handleNavigate4 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Bill");
  };

  const handleNavigate5 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/TeacherAttendance");
  };

  const handleNavigate6 = (e: any) => {
    e.preventDefault;
    router.push("/Admin/Transcript");
  };


  return (
    <>
        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate}
        >
          <Space>Tổng quan</Space>
        </button>

      <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate1}
        >
          <Space>Lịch học</Space>
        </button>

        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate2}
        >
          <Space>Học viên</Space>
        </button>


        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate3}
        >
          <Space>Các buổi học</Space>
        </button>

        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate4}
        >
          <Space>Hóa đơn</Space>
        </button>

        <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate5}
        >
          <Space>Điểm danh giáo viên</Space>
        </button>

          <button
          className="w-full py-2 rounded-xl hover:bg-blue-600"
          onClick={handleNavigate6}
        >
          <Space>Bảng điểm</Space>
        </button>

    </>
  );
};

export default AdminDropDownItem;
