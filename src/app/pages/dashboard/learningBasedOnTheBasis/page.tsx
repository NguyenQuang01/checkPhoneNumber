"use client";
import EChartComponent from "@/app/components/EChartComponent";
const rawData = [
    [100, 320, 30, 20, 50, 95, 320, 30],
    [302, 132, 80, 90, 20, 40, 302, 132],
];

const grid = {
    left: 40,
    right: 300,
    top: 80,
    bottom: 50,
};
const series = ["TCHTHT", "CTGĐ"].map((name, index) => {
    return {
        name,
        type: "bar",
        stack: "total",
        emphasis: {
            focus: "series",
        },
        label: {
            show: true,
        },
        data: rawData[index],
    };
});
const option = {
    title: {
        text: " Kết quả học tập theo cơ sở",
    },
    color: ["#006600", "#c23531"],
    legend: {
        selectedMode: false,
    },
    grid,
    yAxis: {
        type: "value",
    },
    xAxis: {
        type: "category",
        data: ["TQH", "CT", "BM", "PV", "Online", "SVH", "PN", "GV"],
    },
    series,
};
export default function Home() {
    return (
        <EChartComponent
            options={option}
            style={{ width: "100%", height: "600px", marginTop: "100px" }}
        />
    );
}
