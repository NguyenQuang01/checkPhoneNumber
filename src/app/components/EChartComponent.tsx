import React, { useRef, useEffect } from "react";
import * as echarts from "echarts";

const EChartComponent = ({ options, style }: any) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const chart = echarts.init(chartRef.current);
        chart.setOption(options);

        return () => {
            chart.dispose();
        };
    }, []); // Dependency là một mảng trống

    return <div ref={chartRef} style={style}></div>;
};

export default EChartComponent;
