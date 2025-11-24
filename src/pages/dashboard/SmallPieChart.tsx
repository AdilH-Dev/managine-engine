import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";

interface PieChartNewProps {
  maximizedCard?: string;
  isFullscreen?: string;
}

const PieChartNew = ({ maximizedCard = "false", isFullscreen = "false" }: PieChartNewProps) => {
  console.log(maximizedCard, "maximizedCardmaximizedCard");
  console.log(isFullscreen, "is full screen");

  const chartRef = useRef<HTMLDivElement>(null);
  const [showAllLegends, setShowAllLegends] = useState(false);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const allData = [
      { value: 9, name: "Not Assigned" },
      { value: 5, name: "Low" },
      { value: 4, name: "High" },
      { value: 3, name: "Medium" },
      { value: 2, name: "Critical" },
      { value: 2, name: "Normal" },
    ];

    const visibleData = showAllLegends ? allData : allData.slice(0, 4);

    const option: echarts.EChartsOption = {
      color: ["#d7d7d7", "#666", "#f00", "#ec6b01", "#a50000", "#39630b"],
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
          const color = params.color;
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
      legend: maximizedCard === "false" ?{
              
                orient: "vertical",
                right: 120,
                top: 0, // Use 0 instead of "top" for precise positioning
                icon: "rect",
                itemWidth: 12,
                itemHeight: 12,
                itemGap: 20,
                textStyle: { fontSize: 10 },
                // For empty center with border
                itemStyle: {
                  borderWidth: 1,
                  borderColor: "auto",
                  color: "transparent", // Empty center
                },
              } : {
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
          center: ["50%", "40%"],
          data: allData,
          label: {
            show: true,
            position: "outside",
            formatter: "{c}",
            fontSize: 10,
            fontWeight: 300,
            distance: 5,
          },
          labelLine: {
            show: false,
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
  }, [showAllLegends, maximizedCard]);

  const hiddenItemsCount = 2; // 6 total items - 4 visible = 2 hidden
  

  return (
    <div style={{ position: "relative", width: "100%", height: "280px" }}>
      <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          bottom: "5px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "9px",
          color: "#008000",
          cursor: "pointer",
          background: "white",
          padding: "2px 6px",
          borderRadius: "3px",
          border: "1px solid #ddd",
          zIndex: 10,
        }}
        onClick={() => setShowAllLegends(!showAllLegends)}
      >
        {showAllLegends ? 'Show Less' : `${hiddenItemsCount} More...`}
      </div>
    </div>
  );
};

export default PieChartNew;