import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const GaugeChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);
    const value = 6; // current needle value

    const option: echarts.EChartsOption = {
      series: [
        {
          type: "gauge",
          min: 0,
          max: 28,
          splitNumber: 14,
          axisLine: {
            lineStyle: {
              width: 12,
              color: [
                [value / 28, "#E42527"], // red progress till value
                [1, "#d3d3d3ff"],           // grey remaining
              ],
            },
          },
          progress: { show: false },
           pointer: {
            length: "65%",
            width: 8,
            itemStyle: {
              color: "gray",
              borderColor: "#000000",
              borderWidth: 2,
            },
          },
          axisTick: { distance: -20, length: 6, lineStyle: { color: "#A9A9A9", width: 2 } },
          splitLine: { distance: -25, length: 12, lineStyle: { color: "#A9A9A9", width: 2 } },
          axisLabel: {
            distance: -15,
            fontSize: 12,
            color: "#666",
            formatter: (val: number) => (val % 2 === 0 && val <= 28 ? val.toString() : ""),
          },
          detail: { valueAnimation: true, formatter: "{value}", color: "#E42527", fontSize: 13 },
          data: [{ value }],
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center p-3">
      {/* Chart */}
      <div
        ref={chartRef}
        style={{ width: "100%", height: "230px" }}
      />

      {/* Legends below the chart */}
      <div className="flex gap-4 mt-3">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 " style={{ backgroundColor: "#E42527" }}></span>
          <span className="text-[12px] text-gray-700">Unassigned (6)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 " style={{ backgroundColor: "#D3D3D3" }}></span>
          <span className="text-[12px] text-gray-700">Open (28)</span>
        </div>
      </div>
    </div>
  );
};

export default GaugeChart;
