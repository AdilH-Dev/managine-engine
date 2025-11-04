import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      grid: {
        top: 20,
        bottom: 60, // increased space for legend
        left: 40,
        right: 20,
        containLabel: true,
      },
      tooltip: {
        trigger: "item",
        formatter: "{b}: {c}",
      },

      legend: {
        bottom: 10,
        left: "center",
        icon: "square",
        data: [{ name: "SLA Violated", itemStyle: { color: "#E42527" } }],
        textStyle: {
          color: "#000", // black text
          fontSize: 10, // small font
        },
      },

      xAxis: {
        type: "category",
        data: [
          "Not Assigned",
          "Faisal",
          "Shawn Adams",
          "John Roberts",
          "Howard Stern",
          "Jennifer Doe",
          "Bella Mark",
        ],
        axisLabel: {
          color: "#333",
          interval: 0,
          rotate: 360,
          fontSize: 9,
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#333" },
        },
      },

      yAxis: {
        type: "value",
        name: "Request Count",
        nameLocation: "middle",
        nameGap: 35,
        nameTextStyle: {
          color: "#333",
          fontSize: 13,
        },
        axisLabel: { color: "#555" },
        splitLine: { lineStyle: { color: "#eee" } },
        axisLine: {
          show: true,
          lineStyle: { color: "#333" },
        },
      },

      series: [
        {
          name: "SLA Violated", // match legend name
          data: [4, 1, 4, 3, 1, 3, 2],
          type: "bar",
          barWidth: "25%",
          barGap: "40%",
          itemStyle: {
            color: "#E42527", // red bars
          },
          label: {
            show: true,
            position: "top",
            color: "#333",
            fontSize: 10,
            fontWeight: 500,
          },
        },
      ],
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} id="main" />;
};

export default BarChart;
