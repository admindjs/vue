<template>
  <div>
    <div ref="ec" style="width:800px;height:500px"></div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  mounted() {


    var myec = echarts.init(this.$refs.ec);

    // var option = ;

    myec.setOption({
      title: {
        text: "用户来源图"
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985"
          }
        }
      },
      legend: {},
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: "1%",
        right: "1%",
        bottom: "1%",
        containLabel: true
      },
      xAxis: [],
      yAxis: [],
      series: []
    });


    this.$http({
        url:'reports/type/1',
    }).then(back=>{
        console.log(back);
    var {data,meta} = back.data;
        data.xAxis[0].boundaryGap = false;
        myec.setOption(data);
    })
  }
};
</script>

<style>
</style>
