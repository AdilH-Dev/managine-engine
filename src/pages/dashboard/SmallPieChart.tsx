import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChartNew: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      color: ["#d7d7d7", "#666", "#f00", "#39630b", "#ca4100"],
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },
      legend: {
        orient: "horizontal",
        bottom: 0,
        icon: "square",
        itemWidth: 7,
        itemHeight: 7,
        itemGap: 8,
        textStyle: { fontSize: 9, color: "#333" },
        type: "scroll", // allows all items in one row without wrapping
      },
      series: [
        {
          name: "",
          type: "pie",
          radius: "50%",
          center: ["50%", "40%"],
          data: [
            { value: 11, name: "Not Assigned" },
            { value: 8, name: "Low" },
            { value: 3, name: "High" },
            { value: 3, name: "Normal" },
            { value: 2, name: "Critical" },
          ],
          label: {
            show: true,
            position: "outside",
            formatter: "{c}",
            fontSize: 10,
            fontWeight: 300,
            distance: 5, // closer to pie
          },
          labelLine: {
            show: false, // show connecting lines
            length: 5,
            length2: 5,
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
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

  return <div ref={chartRef} style={{ width: "100%", height: "280px" }} />;
};

export default PieChartNew;
