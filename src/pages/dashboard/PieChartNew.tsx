import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const PieChartNew: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        color: ["#207FFB","#d7d7d7", "#7fdf00", "#904ec2"],
        tooltip: { trigger: "item", formatter: "{b}: {c}" },
        legend: {
          orient: "horizontal",
          bottom: "5%",
          icon: "square",
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 20,
          textStyle: { fontSize: 10 },
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            center: ["50%", "38%"],
            minShowLabelAngle:0,
            data: [
              { value: 10, name: "Email" },
              { value: 9, name: "Not Assigned" },
              { value: 5, name: "Phone Call" },
              { value: 3, name: "Web Form" },
            ],
            label: {
              show: true,
              position: "outside", // correct position
              distance: 2, // very close to pie boundary
              formatter: "{c}",
              fontSize: 11,
              fontWeight: 300,
            },
            labelLine: {
                 show: true,
                 length: 0,        // remove the connecting line length
                 length2: 0,
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

      const handleResize = () => chartInstance && chartInstance.resize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        chartInstance?.dispose();
      };
    }
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "320px" }} id="main" />;
};

export default PieChartNew;
