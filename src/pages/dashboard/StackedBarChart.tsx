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
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const dates = [
      "Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26",
      "Oct 27", "Oct 28", "Oct 29", "Oct 30", "Oct 31",
      "Nov 1", "Nov 2", "Nov 3", "Nov 4", "Nov 5",
      "Nov 6", "Nov 7", "Nov 8", "Nov 9", "Nov 10", "Nov 11"
    ];

    const nonViolatedData = dates.map((d) => {
      if (d === "Nov 10") return 2;
      if (["Oct 29", "Oct 30"].includes(d)) return 1;
      return 0;
    });

    const slaViolatedData = dates.map((d) =>
      ["Oct 30", "Oct 31"].includes(d) ? 1 : 0
    );

    // Improved striped pattern with thinner, cleaner lines
    const getStripedPattern = (baseColor: string) =>
      new echarts.graphic.LinearGradient(0, 0, 1, 1, [
        { offset: 0, color: baseColor },
        { offset: 0.04, color: "rgba(255,255,255,0.8)" },
        { offset: 0.08, color: baseColor },
        { offset: 0.12, color: "rgba(255,255,255,0.8)" },
        { offset: 0.16, color: baseColor },
        { offset: 0.2, color: "rgba(255,255,255,0.8)" },
        { offset: 0.24, color: baseColor },
        { offset: 0.28, color: "rgba(255,255,255,0.8)" },
        { offset: 0.32, color: baseColor },
        { offset: 0.36, color: "rgba(255,255,255,0.8)" },
        { offset: 0.4, color: baseColor },
        { offset: 0.44, color: "rgba(255,255,255,0.8)" },
        { offset: 0.48, color: baseColor },
        { offset: 0.52, color: "rgba(255,255,255,0.8)" },
        { offset: 0.56, color: baseColor },
        { offset: 0.6, color: "rgba(255,255,255,0.8)" },
        { offset: 0.64, color: baseColor },
        { offset: 0.68, color: "rgba(255,255,255,0.8)" },
        { offset: 0.72, color: baseColor },
        { offset: 0.76, color: "rgba(255,255,255,0.8)" },
        { offset: 0.8, color: baseColor },
        { offset: 0.84, color: "rgba(255,255,255,0.8)" },
        { offset: 0.88, color: baseColor },
        { offset: 0.92, color: "rgba(255,255,255,0.8)" },
        { offset: 0.96, color: baseColor },
        { offset: 1, color: "rgba(255,255,255,0.8)" },
      ]);

    const option: echarts.EChartsOption = {
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
          const seriesName = params.seriesName;
          const isSLAViolated = seriesName === "SLA Violated";
          const title = isSLAViolated ? "SLA Violated" : "Non Violated";

          return `
            <div style="
              position: relative;
              background: rgba(255, 255, 255, 0.5);
               backdrop-filter: blur(-10px);
              border-radius: 8px;
              font-size: 12px;
              // color: gray;
              display: inline-block;
              padding: 8px 12px;
              line-height: 1.4;
              border: 1.5px solid ${color};
              box-shadow: 0 3px 8px rgba(0,0,0,0.2);
              max-width: 200px;
            ">
              <div style="margin-bottom: 4px; color: #333; font-size: 13px; padding-bottom: 3px; text-decoration: underline;">${title}</div>
              <div style="color: #333; font-size: 12px;">${params.name} : ${params.value}</div>
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
      grid: {
        left: "10%",
        right: "5%",
        bottom: "20%",
        containLabel: true,
      },
      label: {
        show: true,
        position: "top",
        color: "#333",
        fontSize: 10,
        fontWeight: 500,
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
        data: dates,
        axisLabel: { rotate: 45, fontSize: 10 },
        axisTick: { alignWithLabel: true },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 2,
        interval: 1,
        axisLabel: { fontSize: 10 },
        name: "Request Count",
        nameLocation: "middle",
        nameGap: 40,
        nameTextStyle: { fontSize: 13, color: "black" },
        splitLine: { show: true, lineStyle: { color: "#e5e7eb" } },
        axisLine: { show: true, lineStyle: { color: "#9ca3af" } },
      },
      series: [
        {
          name: "Non Violated",
          type: "bar",
          data: nonViolatedData,
          barWidth: "45%",
          itemStyle: { color: "#14b474" },
          emphasis: {
            itemStyle: {
              color: getStripedPattern("#14b474"),
            },
          },
          label: {
            show: true,
            position: "top",
            color: "#333",
            fontSize: 10,
            fontWeight: 500,
            formatter: (params: any) => (params.value > 0 ? params.value : ""),
          },
        },
        {
          name: "SLA Violated",
          type: "bar",
          data: slaViolatedData,
          barWidth: "40%",
          itemStyle: { color: "#e33e3e" },
          emphasis: {
            itemStyle: {
              color: getStripedPattern("#e33e3e"),
            },
          },
          label: {
            show: true,
            position: "top",
            color: "#333",
            fontSize: 10,
            fontWeight: 500,
            formatter: (params: any) => (params.value > 0 ? params.value : ""),
          },
        },
      ],
    };

    chartInstance.setOption(option);

    // Apply same hover effect when hovering legend
    chartInstance.on("mouseover", (params: any) => {
      if (params.componentType === "legend") {
        const name = params.name;
        const updatedOption = chartInstance.getOption();
        const seriesList = (updatedOption.series || []) as echarts.SeriesOption[];

        seriesList.forEach((s: any) => {
          if (s.name === name) {
            s.emphasis = {
              itemStyle: {
                color:
                  name === "SLA Violated"
                    ? getStripedPattern("#e33e3e")
                    : getStripedPattern("#14b474"),
              },
            };
          }
        });

        chartInstance.setOption({ series: seriesList });
        chartInstance.dispatchAction({
          type: "highlight",
          seriesName: name,
        });
      }
    });

    chartInstance.on("mouseout", (params: any) => {
      if (params.componentType === "legend") {
        chartInstance.dispatchAction({
          type: "downplay",
          seriesName: params.name,
        });
        chartInstance.setOption(option);
      }
    });

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, [maximizedCard, isFullscreen]); // Added dependencies

  return <div ref={chartRef} style={{ width: "100%", height: "320px" }} />;
};

export default BarChart;