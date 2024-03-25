"use client";
import EChartComponent from "@/app/components/EChartComponent";

export default function Home() {
    const rawData = [
        [100, 302, 301, 334, 390, 330, 320],
        [320, 132, 101, 134, 90, 230, 210],
    ];

    const totalData: number[] = [];
    for (let i = 0; i < rawData[0].length; ++i) {
        let sum = 0;
        for (let j = 0; j < rawData.length; ++j) {
            sum += rawData[j][i];
        }
        totalData.push(sum);
    }

    const grid = {
        left: 40,
        right: 300,
        top: 80,
        bottom: 50,
    };

    const series = ["TCHTHT", "CTGĐ"].map((name, sid) => {
        return {
            name,
            type: "bar",
            stack: "total",
            barWidth: "60%",
            label: {
                show: true,
                formatter: (params: any) => rawData[sid][params.dataIndex],
            },
            data: rawData[sid].map((d, did) =>
                totalData[did] <= 0 ? 0 : d / totalData[did]
            ),
        };
    });

    const option = {
        title: {
            text: "Kết quả học tập của HV theo tháng",
        },
        legend: {
            selectedMode: false,
        },
        grid,
        yAxis: {
            type: "value",
            min: 0,
            max: 1,
            axisLabel: {
                formatter: (value: number) => {
                    if (value === 0) return "0%";
                    else if (value === 0.2) return "25%";
                    else if (value === 0.4) return "40%";
                    else if (value === 0.6) return "60%";
                    else if (value === 0.8) return "80%";
                    else if (value === 1) return "100%";
                    else return ""; // Trường hợp khác, không hiển thị nhãn
                },
            },
        },
        xAxis: {
            type: "category",
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        series,
    };

    return (
        <EChartComponent
            options={option}
            style={{ width: "100%", height: "600px", marginTop: "100px" }}
        />
    );
}
