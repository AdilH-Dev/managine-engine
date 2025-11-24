import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const EmptyHorizontalBarChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const option: echarts.EChartsOption = {
      grid: {
        top: 10,
        bottom: 40,
        left: 5,
        right: 60,
        containLabel: true,
      },
      xAxis: {
        type: "value",
        min: 0,
        max: 1,
        splitNumber: 1,
        axisLine: {
          show: true,
          lineStyle: {
            color: "silver",
            width: 1,
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: (value: number) => (value === 0 ? "0" : ""),
          fontSize: 10,
          color: "gray",
        },
        name: "Request Count",
        nameLocation: "middle",
        nameGap: 20,
        nameTextStyle: {
          fontSize: 10,
          color: "black",
        },
        splitLine: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: ["180 mins", "120 mins", "60 mins"],
        inverse: true,
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: "silver",
            width: 1,
          },
        },
        axisLabel: {
          fontSize: 10,
          color: "#333",
          fontWeight: 500,
        },
      },
      series: [
        {
          name: "Requests",
          type: "bar",
          data: [
            // {
            //   value: 1,
            //   itemStyle: {
            //     color: "#FFC6C6", 
            //     borderRadius: [0, 4, 4, 0], // Rounded right edges
            //   }
            // },
            {
              value: 0,
              itemStyle: {
                color: "transparent"
              }
            },
            {
              value: 0,
              itemStyle: {
                color: "transparent"
              }
            }
          ],
          barWidth: "40%",
          label: {
            show: true,
            position: "right",
            formatter: (params: any) => {
              if (params.dataIndex === 0 && params.value > 0) {
                return params.value.toString();
              }
              return "";
            },
            fontSize: 12,
            // fontWeight: "bold",
            color: "#333",
            offset: [5, 0] // Offset the label slightly to the right
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: "rgba(228, 37, 39, 0.5)"
            }
          }
        }
      ],
      // tooltip: {
      //   trigger: "item",
      //   formatter: (params: any) => {
      //     if (params.dataIndex === 0) {
      //       return `
      //         <div style="font-weight: bold; margin-bottom: 5px;">180 mins</div>
      //         <div>Request Count: <b>1</b></div>
      //       `;
      //     }
      //     return "";
      //   }
      // },
            tooltip: {
  trigger: "item",
  renderMode: "html",
  extraCssText: `
    padding: 0 !important;
    border: none !important;
    background: transparent !important;
    overflow: visible !important;
  `,
  formatter: function (params) {
    const color = params.color; // slice color
    return `
      <div style="
        position: relative;
        background: #ffffff;
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
      animation: true,
      animationDuration: 1000,
      animationEasing: "cubicOut"
    };

    chart.setOption(option);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "200px",
        }}
      />
    </div>
  );
};

export default EmptyHorizontalBarChart;