import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const dates = [
      "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13",
      "Oct 14", "Oct 15", "Oct 16", "Oct 17", "Oct 18",
      "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23",
      "Oct 24", "Oct 25", "Oct 26", "Oct 27", "Oct 28",
    ];

    const nonViolatedData = dates.map((d) =>
      ["Oct 14", "Oct 28"].includes(d) ? 1 : 0
    );
    const slaViolatedData = dates.map((d) =>
      ["Oct 22", "Oct 23"].includes(d) ? 1 : 0
    );

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const date = params[0].axisValue;
          let tooltip = `<strong>${date}</strong><br/>`;
          params.forEach((p: any) => {
            if (p.value > 0) {
              tooltip += `
                <span style="display:inline-block;margin-right:5px;border-radius:2px;width:10px;height:10px;background-color:${p.color};"></span>
                ${p.seriesName}: ${p.value}<br/>
              `;
            }
          });
          return tooltip;
        },
      },
      grid: {
        left: "10%",
        right: "5%",
        bottom: "20%",
        containLabel: true,
      },
      legend: {
        orient: "horizontal",
        bottom: "5%",
        icon: "square",
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 20,
        textStyle: { fontSize: 11 },
        data: ["Non Violated", "SLA Violated"],
        selectedMode: true, // allow toggling
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
        max: 1,
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
        },
        {
          name: "SLA Violated",
          type: "bar",
          data: slaViolatedData,
          barWidth: "40%",
          itemStyle: { color: "#e33e3e" },
        },
      ],
    };

    chartInstance.setOption(option);

    // ====== Correct legend interaction: highlight selected series, downplay others ======
    chartInstance.on("legendselectchanged", (params: any) => {
      // params.selected is an object mapping seriesName -> boolean (selected or not)
      const selectedMap = params.selected || {};

      // Get series from current option (safe)
      const currentOption = chartInstance.getOption();
      const seriesList = (currentOption.series || []) as any[];

      // For each series in the chart, highlight if selected, otherwise downplay
      seriesList.forEach((s, idx) => {
        const name = s.name as string;
        if (selectedMap[name]) {
          chartInstance.dispatchAction({ type: "highlight", seriesName: name });
        } else {
          chartInstance.dispatchAction({ type: "downplay", seriesName: name });
        }
      });
    });

    // Optional: when legend is clicked to show/hide, ensure visuals reset for visible series
    chartInstance.on("legendselected", () => {
      // restore all to normal first
      chartInstance.dispatchAction({ type: "downplay", seriesIndex: 0 });
      chartInstance.dispatchAction({ type: "downplay", seriesIndex: 1 });
    });

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: "100%", height: "320px" }} />;
};

export default BarChart;
