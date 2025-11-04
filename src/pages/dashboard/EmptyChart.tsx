import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EmptyHorizontalBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      grid: {
        top: 10,
        bottom: 40,
        left: 5,
        right: 60,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        min: 0,
        max: 1,
        splitNumber: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: "gray", // ✅ visible x-axis line
            width: 1,
          },
        },
        axisTick: {
          show: false, // no small ticks
        },
        axisLabel: {
          formatter: (value: number) => (value === 0 ? "0" : ""), // ✅ only "0"
          fontSize: 12,
          color: "gray",
        },
        name: "Request Count",
        nameLocation: "middle",
        nameGap: 20,
        nameTextStyle: {
         fontSize: 10,
          color: "black",
        },
        splitLine: {
          show: false, // no vertical grid lines
        },
      },
      yAxis: {
        type: "category",
        data: ["60 mins", "120 mins", "180 mins"],
        inverse: true,
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: "gray",
            width: 1,
          },
        },
        axisLabel: {
          fontSize: 13,
          color: "#333",
          fontWeight: 500,
        },
      },
      series: [], // ✅ empty chart
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "200px",
        }}
      />
    </div>
  );
};

export default EmptyHorizontalBarChart;
