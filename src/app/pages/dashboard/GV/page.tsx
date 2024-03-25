"use client";
import React from "react";
import EChartComponent from "@/app/components/EChartComponent";
const dashboard = () => {
    const option = {
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "abc"],
        },
        yAxis: {
            type: "value",
        },
        series: [
            {
                data: [20, 882, 101, 834, 1290, 530, 2320, 222],
                type: "line",
                smooth: true,
            },
        ],
    };
    return (
        <EChartComponent
            options={option}
            style={{ width: "100%", height: "600px", marginTop: "100px" }}
        />
    );
};
export default dashboard;
