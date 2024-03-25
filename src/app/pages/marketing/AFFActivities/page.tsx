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
    const props: UploadProps = {
        name: "file",
        action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
        headers: {
            authorization: "authorization-text",
        },
        onChange(info) {
            if (code) {
                if (info.file.status === "done") {
                    fetchData(info.file.originFileObj);
                } else if (info.file.status === "error") {
                    message.error(`${info.file.name} file upload failed.`);
                }
            } else {
                message.error(`vui lòng điền mã code`);
            }
        },
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
                        <Upload {...props} className="list-excel">
                            <Button icon={<UploadOutlined />}>
                                Import file excel
                            </Button>
                        </Upload>
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
