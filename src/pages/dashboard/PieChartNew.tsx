import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface PieChartNewProps {
  maximizedCard?: string;
  isFullscreen?: string;
}

const PieChartNew = ({ maximizedCard = "false", isFullscreen = "false" }: PieChartNewProps) => {
  console.log(maximizedCard, "maximizedCardmaximizedCard");
  console.log(isFullscreen, "is full screen");

  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    if (chartRef.current) {
      chartInstance = echarts.init(chartRef.current);

      const option: echarts.EChartsOption = {
        color: ["#207FFB", "#7fdf00", "#d7d7d7", "#904ec2", "#f00","#0663ddff"],
        tooltip: {
          trigger: "item",
          renderMode: "html",
          extraCssText: `
            padding: 0 !important;
            border: none !important;
            background: transparent !important;
            overflow: visible !important;
          `,
          formatter: function (params: any) {
            const color = params.color; // slice color
            return `
              <div style="
                position: relative;
                background: rgba(255, 255, 255, 0.5);
                backdrop-filter: blur(-10px);
                border-radius: 6px;
                font-size: 11px;
                color: #000;
                display: inline-block;
                padding: 6px 10px;
                line-height: 1.2;
                border: 2px solid ${color};
                box-shadow: 0 2px 5px rgba(0,0,0,0.15);
              ">
                ${params.name}: ${params.value}

                <!-- attached bottom arrow -->
                <div style="
                  position: absolute;
                  bottom: -6px; 
                  left: 50%;
                  transform: translateX(-50%);
                  width: 0;
                  height: 0;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 6px solid #ffffff;
                "></div>
              </div>
            `;
          },
        },
        legend:
          maximizedCard === "false" && isFullscreen === "false"
            ? {
                orient: "vertical",
                right: 120,
                top: 0,
                icon: "rect",
                itemWidth: 12,
                itemHeight: 12,
                itemGap: 20,
                textStyle: { fontSize: 10 },
                itemStyle: {
                  borderWidth: 1,
                  borderColor: "auto",
                  color: "transparent",
                },
              }
            : {
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
            minShowLabelAngle: 0,
            data: [
              { value: 9, name: "Email" },
              { value: 7, name: "Web Form" },
              { value: 4, name: "Not Assigned" },
              { value: 1, name: "Mobile Application" },
              { value: 1, name: "Live Chat"},
              { value: 1, name: "Phone Call" },
            ],
            label: {
              show: true,
              position: "outside",
              distance: 15,
              formatter: "{c}",
              fontSize: 11,
              fontWeight: 300,
            },
            labelLine: {
              show: false,
              length: 12,
              length2: 5,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            labelLayout: {
              hideOverlap: true,
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
  }, [maximizedCard, isFullscreen]); // Added dependencies

  return (
    <div ref={chartRef} style={{ width: "100%", height: "320px" }} id="main" />
  );
};

export default PieChartNew;