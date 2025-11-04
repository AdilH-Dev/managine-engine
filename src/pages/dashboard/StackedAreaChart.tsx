import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

const BarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartInstance, setChartInstance] = useState<echarts.EChartsType | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);
    setChartInstance(chart);

    // ✅ Dates from Oct 9 to Oct 28
    const dates = [
      "Oct 9", "Oct 10", "Oct 11", "Oct 12", "Oct 13",
      "Oct 14", "Oct 15", "Oct 16", "Oct 17", "Oct 18",
      "Oct 19", "Oct 20", "Oct 21", "Oct 22", "Oct 23",
      "Oct 24", "Oct 25", "Oct 26", "Oct 27", "Oct 28",
    ];

    // ✅ Only one visible green bar on Oct 14
    const data = dates.map((date) => {
      if (date === "Oct 14")
        return { value: 1, itemStyle: { color: "#14b474" }, type: "Success" };
      else return { value: 0, itemStyle: { color: "transparent" } }; // hide all others
    });

    const option: echarts.EChartsOption = {
      tooltip: {
        trigger: "axis",
        formatter: (params: any) => {
          const item = params[0];
          if (item.data.value === 0) return `${item.axisValue}<br/>No Data`;
          return `${item.axisValue}<br/>🟩 Non Violated<br/>Value: ${item.data.value}`;
        },
      },
      grid: {
        left: "10%",
        right: "5%",
        bottom: "10%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLabel: {
          rotate: 45,
          fontSize: 10,
        },
        axisTick: {
          alignWithLabel: true,
        },
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
        nameTextStyle: {
          fontSize: 13,
          color: "black",
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: "#e5e7eb",
            type: "solid",
          },
        },
        axisLine: {
          show: true,
          lineStyle: { color: "#9ca3af" },
        },
      },
      series: [
        {
          name: "Request Count",
          type: "bar",
          data: data,
          barWidth: "45%",
        },
      ],
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  // ✅ Legend hover highlight effect
  const handleLegendHover = (type: "Success" | "Failure" | "Reset") => {
    if (!chartInstance) return;
    chartInstance.dispatchAction({ type: "downplay", seriesIndex: 0 });

    if (type === "Success") {
      chartInstance.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
      });
    }
  };

  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <div
        ref={chartRef}
        id="main"
        style={{ width: "100%", height: "300px" }}
      />

      {/* ✅ Custom Legends */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          // marginTop: "2px",
          fontSize: "13px",
          alignItems: "center",
        }}
      >
        {/* Green Legend */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onMouseEnter={() => handleLegendHover("Success")}
          onMouseLeave={() => handleLegendHover("Reset")}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#14b474",
              display: "inline-block",
              marginRight: "6px",
              borderRadius: "2px",
            }}
          ></span>
          Non Violated
        </div>

        {/* Red Legend (no bars shown, just legend) */}
        <div
          style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          onMouseEnter={() => handleLegendHover("Failure")}
          onMouseLeave={() => handleLegendHover("Reset")}
        >
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#e33e3e",
              display: "inline-block",
              marginRight: "6px",
              borderRadius: "2px",
            }}
          ></span>
          SLA Violated
        </div>
      </div>
    </div>
  );
};

export default BarChart;
