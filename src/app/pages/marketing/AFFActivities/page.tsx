"use client";
import { Table, Upload, Button, message } from "antd";
import { useEffect, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
    funDuplicatePhoneNumbers,
    funCheckOnlyPhoneNumber,
} from "@/app/services/apiCheckPhone";
import { downloadFileExcel } from "@/app/utils/utils";
import { Input } from "antd";
const { Search } = Input;

interface ResponseData {
    status: number;
    data: any; // Adjust this according to the actual structure of your response data
    // Add other properties if necessary
}
const columns = [
    {
        title: "NO.",
        dataIndex: "id",
        key: "index",
        width: 60,
    },
    {
        title: "Phone number",
        dataIndex: "phone",
        key: "phone",
    },
    {
        title: "Số lượng",
        dataIndex: "count",
        key: "count",
    },
];

const AffActivities = () => {
    const [dataSource, setDataSource] = useState([]);
    const [excel, setExcel] = useState();
    const [isSuccess, setIsSuccess] = useState(false);
    const [code, setCode] = useState("");
    const fetchData = async (param: any) => {
        const res: any = await funDuplicatePhoneNumbers(param, code);
        if (res && res.status === 200) {
            const responseData = res as ResponseData; // Type assertion
            setDataSource(responseData.data.data.duplicateCount);
            setExcel(responseData.data.excelBuffer);
            setIsSuccess(true);
            message.success(`file uploaded successfully`);

            return;
        }
        setIsSuccess(false);
        message.error(`Hết hạn code`);
    };

    const exportExcel = () => {
        if (excel) downloadFileExcel(excel, "nguyễn trung quang");
    };
    const changeCode = (e: string | any) => {
        setCode(e.target.value);
    };
    const onSearch = async (value: string | any) => {
        if (code) {
            const param = {
                phone: value,
                token: code,
            };
            try {
                const res: ResponseData = await funCheckOnlyPhoneNumber(param);

                if (res && res.status === 200) {
                    setDataSource(res.data.data);
                }
                if (res && res.status === 201) {
                    setDataSource(res.data.data);
                }
                if (res && res.status === 400) {
                    message.error(`Mã code không có quyền truy cập`);
                }
                return;
            } catch (error) {}
        }
        message.error(`vui lòng điền mã code`);
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (code) {
            if (e.target.files) {
                fetchData(e.target.files[0]);
                return;
            }
        }
        message.error(`vui lòng điền mã code`);
        const fileInput = document.getElementById(
            "file"
        ) as HTMLInputElement | null;
        if (fileInput !== null) {
            fileInput.value = "";
            setIsSuccess(false);
            setDataSource([]); // Xóa giá trị của input file
        }
    };
    const clearFileInputValue = () => {
        const fileInput = document.getElementById(
            "file"
        ) as HTMLInputElement | null;
        if (fileInput !== null) {
            fileInput.value = "";
            setIsSuccess(false);
            setDataSource([]); // Xóa giá trị của input file
        }
    };
    return (
        <div className="pt-10 pr-10 ">
            <div className="my-5  ">
                <div className="flex justify-between">
                    {" "}
                    <div>
                        <Input
                            placeholder="Nhập mã code"
                            className="mr-2 w-40"
                            onChange={changeCode}
                        />

                        <div className=" mt-2">
                            <input
                                id="file"
                                type="file"
                                onChange={handleFileChange}
                            />
                            <Button onClick={clearFileInputValue}>Reset</Button>
                        </div>
                    </div>
                    <Search
                        placeholder="Tìm số điện thoại trùng"
                        onSearch={onSearch}
                        style={{ width: 300 }}
                    />
                </div>

                {isSuccess && (
                    <div>
                        Check số điện thoại đã xong, bấm vào Export excel để lấy
                        kết quả
                        <Button
                            onClick={exportExcel}
                            className="custom-button ml-5"
                        >
                            Export excel
                        </Button>
                    </div>
                )}
            </div>
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ y: 600 }}
                rowKey="id" // Specify the key for each row
            />
        </div>
    );
};

export default AffActivities;
