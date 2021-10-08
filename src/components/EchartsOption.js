import { ref, toRefs } from 'vue'

export default function useEchartsOption(data, left2Tab, currentSelected) {

  // const { data, left2Tab, currentSelected } = toRefs(props);

  const echartSelectSeries = (
    data,
    currentSelected,
    horizontal = false,
    iconSymbolOption = true,
    bgSymbolOption = true
  ) => {
    let selectEchartOptions = [];
    let maxData = 0;
    if (currentSelected) {
      maxData = Math.max(...data.map((item) => item.value));
    }
    selectEchartOptions = [
      {
        data: data.map((item) => ({
          ...item,
          value:
            currentSelected?.code == item.code ||
              currentSelected?.code == item.id
              ? maxData
              : 0,
          itemStyle: {
            color: "rgba(91, 252, 244, 0.2)",
          },
          barWidth: "100%",
          symbol: "rect",
          symbolSize: [
            horizontal ? "200%" : "110%",
            horizontal ? "125%" : "180%",
          ],
          symbolOffset: [horizontal ? "-30%" : 0, horizontal ? 0 : "30%"],
          ...(JSON.stringify(bgSymbolOption).startsWith("{") ? bgSymbolOption : {}),
        })),
        type: "pictorialBar",
        silent: true,
      },
    ];
    let axisData = data.map((item) =>
      currentSelected &&
        (currentSelected?.code == item.code || currentSelected?.code == item.id)
        ? { value: item.name, textStyle: { color: "#5bfcf4" } }
        : item.name
    );
    return {
      axisData,
      selectEchartOptions,
    };
  };
  /* 
  data: { code?: string, name: string, value: number }[], 
  left2Tab: number, 
  currentSelected?: { code?: string, name?: string, value?: number }
  */
  const getIndustryType = (data, left2Tab, currentSelected) => {
    const { axisData, selectEchartOptions } = echartSelectSeries(
      data,
      currentSelected,
      true
    );
    const unit = left2Tab == 0 ? "户" : "万元";
    return {
      grid: {
        left: 110,
        top: 10,
        bottom: 10,
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "none",
          // type: 'shadow', // 鼠标悬浮阴影
        },
        formatter: function (params) {
          return (
            params[0].name +
            ": " +
            (left2Tab == 0
              ? params[0].value
              : (params[0].value / 10000).toFixed(2)) +
            unit
          );
        },
      },
      xAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      yAxis: {
        type: "category",
        data: axisData,
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#000",
          fontFamily: "Adobe Heiti Std",
          margin: 10,
          fontSize: 16,
          inside: false,
        },
        z: 10,
      },
      series: [
        {
          data,
          type: "bar",
          itemStyle: {
            opacity: 0.8,
            color: "#a4cdff",
            borderRadius: 10,
          },
          barWidth: 13,
          label: {
            formatter: "{c}{unit}",
          },
        },
        ...selectEchartOptions,
      ],
      animationDuration: 0,
      animationDurationUpdate: 300,
      animationEasing: "linear",
      animationEasingUpdate: "linear",
    };
  };
  const echartsOption = getIndustryType(data, left2Tab, currentSelected);
  console.log('=echartsOption=', echartsOption);
  return {
    echartsOption,
  };
};