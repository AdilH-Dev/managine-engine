import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

interface BarChartProps {
  maximizedCard?: string;
  isFullscreen?: string;
}

const BarChart = ({ maximizedCard = "false", isFullscreen = "false" }: BarChartProps) => {
  console.log(maximizedCard, "maximizedCardmaximizedCard");
  console.log(isFullscreen, "isFullscreen");

  const chartRef = useRef<HTMLDivElement>(null);
  let chartInstance: echarts.ECharts | null = null;

  useEffect(() => {
    const chartDom = chartRef.current;
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    
    const getStripedPattern = (baseColor: string) =>
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [ // Diagonal stripes
        { offset: 0, color: baseColor },
        { offset: 0.08, color: baseColor },
        { offset: 0.08, color: "rgba(255,255,255,0.7)" },
        { offset: 0.1, color: "rgba(255,255,255,0.7)" },
        { offset: 0.1, color: baseColor },
        { offset: 0.18, color: baseColor },
        { offset: 0.18, color: "rgba(255,255,255,0.7)" },
        { offset: 0.2, color: "rgba(255,255,255,0.7)" },
        { offset: 0.2, color: baseColor },
        { offset: 0.28, color: baseColor },
        { offset: 0.28, color: "rgba(255,255,255,0.7)" },
        { offset: 0.3, color: "rgba(255,255,255,0.7)" },
        { offset: 0.3, color: baseColor },
        { offset: 0.38, color: baseColor },
        { offset: 0.38, color: "rgba(255,255,255,0.7)" },
        { offset: 0.4, color: "rgba(255,255,255,0.7)" },
        { offset: 0.4, color: baseColor },
        { offset: 0.48, color: baseColor },
        { offset: 0.48, color: "rgba(255,255,255,0.7)" },
        { offset: 0.5, color: "rgba(255,255,255,0.7)" },
        { offset: 0.5, color: baseColor },
        { offset: 0.58, color: baseColor },
        { offset: 0.58, color: "rgba(255,255,255,0.7)" },
        { offset: 0.6, color: "rgba(255,255,255,0.7)" },
        { offset: 0.6, color: baseColor },
        { offset: 0.68, color: baseColor },
        { offset: 0.68, color: "rgba(255,255,255,0.7)" },
        { offset: 0.7, color: "rgba(255,255,255,0.7)" },
        { offset: 0.7, color: baseColor },
        { offset: 0.78, color: baseColor },
        { offset: 0.78, color: "rgba(255,255,255,0.7)" },
        { offset: 0.8, color: "rgba(255,255,255,0.7)" },
        { offset: 0.8, color: baseColor },
        { offset: 0.88, color: baseColor },
        { offset: 0.88, color: "rgba(255,255,255,0.7)" },
        { offset: 0.9, color: "rgba(255,255,255,0.7)" },
        { offset: 0.9, color: baseColor },
        { offset: 0.98, color: baseColor },
        { offset: 0.98, color: "rgba(255,255,255,0.7)" },
        { offset: 1, color: "rgba(255,255,255,0.7)" },
      ]);

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
        renderMode: "html",
        extraCssText: `
          padding: 0 !important;
          border: none !important;
          background: transparent !important;
          overflow: visible !important;
          box-shadow: none !important;
        `,
        formatter: function (params: any) {
          const color = params.color;
          return `
            <div style="
              position: relative;
              background: rgba(255, 255, 255, 0.5);
              backdrop-filter: blur(-10px);
              border-radius: 8px;
              font-size: 12px;
              color: #000;
              display: inline-block;
              padding: 8px 12px;
              line-height: 1.4;
              border: 1.5px solid ${color};
              box-shadow: 0 3px 8px rgba(0,0,0,0.2);
              max-width: 200px;
              
            ">
              <div style="margin-bottom: 4px; color: black; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 3px; text-decoration: underline;">SLA Violated</div>
              <div style="color: #333; font-size: 12px;">${params.name} : ${params.value}</div>
              
              <!-- chat bubble arrow -->
              <div style="
                position: absolute;
                bottom: -8px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 8px solid transparent;
                border-right: 8px solid transparent;
                border-top: 8px solid ${color};
              "></div>
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
      xAxis: {
        type: "category",
        data: [
          "Not Assigned",
          "Hira",
          "Shawn Adams",
          "John Roberts",
          "Howard Stern",
          "Jennifer Doe",
          "Bella Mark",
          "Bilal Chohan",
        ],
        axisLabel: {
          color: "#333",
          interval: 0,
          rotate: 45,
          fontSize: 9,
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#333" },
        },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 6,
        interval: 2,
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
          data: [2, 1, 2, 3, 5, 4, 1, 1],
          type: "bar",
          barWidth: "20%",
          barGap: "40%",
          itemStyle: {
            color: "#E42527", // red bars
          },
          emphasis: {
            itemStyle: {
              color: getStripedPattern("#E42527"),
            },
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

    // Add legend hover effect
    myChart.on("mouseover", (params: any) => {
      if (params.componentType === "legend") {
        const name = params.name;
        const updatedOption = myChart.getOption();
        const seriesList = (updatedOption.series || []) as echarts.SeriesOption[];

        seriesList.forEach((s: any) => {
          if (s.name === name) {
            s.emphasis = {
              itemStyle: {
                color: getStripedPattern("#E42527"),
              },
            };
          }
        });

        myChart.setOption({ series: seriesList });
        myChart.dispatchAction({
          type: "highlight",
          seriesName: name,
        });
      }
    });

    myChart.on("mouseout", (params: any) => {
      if (params.componentType === "legend") {
        myChart.dispatchAction({
          type: "downplay",
          seriesName: params.name,
        });
        myChart.setOption(option);
      }
    });

    const handleResize = () => myChart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      myChart.dispose();
    };
  }, [maximizedCard, isFullscreen]); // Added dependencies

  return <div ref={chartRef} style={{ width: "100%", height: "300px" }} id="main" />;
};

export default BarChart;