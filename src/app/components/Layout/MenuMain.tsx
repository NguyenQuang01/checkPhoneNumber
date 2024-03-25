"use client";
import React from "react";
import type { MenuProps } from "antd";
import logo from "@/app/assets/img/logo-Jaxtina.png";
import {
    BarChartOutlined,
    LineChartOutlined,
    AreaChartOutlined,
    TableOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "antd";
import dynamic from "next/dynamic";
const items: MenuProps["items"] = [
    {
        label: "Dashboard Học Thuật",
        key: "1",
        icon: <AreaChartOutlined />,
        children: [
            {
                label: "Kết quả học tập",
                key: "11",
                children: [
                    {
                        label: (
                            <Link href="/pages/dashboard/learningBasedOnTheBasis">
                                Cơ sở
                            </Link>
                        ),
                        key: "111",
                    },
                    {
                        label: (
                            <Link href="/pages/dashboard/studentsLearningByMonth">
                                HV theo tháng
                            </Link>
                        ),
                        key: "112",
                    },
                ],
            },
            {
                label: "Giáo viên",
                key: "22",
                children: [
                    {
                        label: "Năng lực GV ",
                        key: "221",
                    },
                    {
                        label: "Số lượng GV từng cs",
                        key: "222",
                    },
                ],
            },
            {
                label: "Học viên",
                key: "33",
                children: [
                    {
                        label: "SL HV theo khóa",
                        key: "331",
                    },
                    {
                        label: "SL HV theo cs",
                        key: "332",
                    },
                    {
                        label: "SL HV chú ý theo cs",
                        key: "333",
                    },
                ],
            },
            {
                label: " Sự hài lòng của hv",

                key: "44",
                children: [
                    {
                        label: (
                            <Link href="/pages/dashboard/learningBasedOnTheBasis">
                                Sự vụ theo tháng
                            </Link>
                        ),
                        key: "441",
                    },
                    {
                        label: (
                            <Link href="/pages/dashboard/GV">
                                Khảo sát độ hài lòng
                            </Link>
                        ),
                        key: "442",
                    },
                ],
            },
        ],
    },
    {
        label: "Dashboard Marketing",
        key: "2",
        icon: <TableOutlined />,
        children: [
            {
                label: (
                    <Link href="/pages/marketing/AFFActivities">
                        Hoạt động AFF
                    </Link>
                ),
                key: "21",
            },
        ],
    },
];
const MenuMain = () => {
    return (
        <div>
            <div className="flex justify-center bg-white py-5">
                <Link href="/">
                    <Image
                        src={logo}
                        height={100}
                        alt="Picture of the author"
                        priority={true}
                    />
                </Link>
            </div>

            <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["1"]}
                mode="inline"
                items={items}
                className="h-full"
            />
        </div>
    );
};

export default dynamic(() => Promise.resolve(MenuMain), { ssr: false });
