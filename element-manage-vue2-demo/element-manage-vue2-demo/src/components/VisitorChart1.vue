<template>
  <div class="visitorpie1">
    <div id="visitorpie1" class="" style="width: 90%;height:400px;"></div>
  </div>
</template>

<script>
  import echarts from 'echarts/lib/echarts'

    export default {
        name: "VisitorChart1",
      data(){
          return{

          }
      },
      props:['pieData'],
      created() {
      },
      methods:{
        getData(){
          this.myChart = echarts.init(document.getElementById('visitorpie1'));
          const option = {
            backgroundColor: '#2c343c',

            title: {
              text: 'Customized Pie',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#ccc'
              }
            },

            tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1]
              }
            },
            series : [
              {
                name:'访问来源',
                type:'pie',
                radius : '55%',
                center: ['50%', '50%'],
                data:[
                  {value:this.pieData.beijing, name:'北京'},
                  {value:this.pieData.shanghai, name:'上海'},
                  {value:this.pieData.shenzhen, name:'深圳'},
                  {value:this.pieData.hangzhou, name:'杭州'},
                  {value:this.pieData.qita, name:'其他'},
                ].sort(function (a, b) { return a.value - b.value; }),
                roseType: 'radius',
                label: {
                  normal: {
                    textStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    }
                  }
                },
                labelLine: {
                  normal: {
                    lineStyle: {
                      color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                  }
                },
                itemStyle: {
                  normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                },

                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200;
                }
              }
            ]
          };
          this.myChart.setOption(option)
        }
      },
      watch:{
          'pieData':{
            handler:function () {
              this.getData()

            }
          }
      }
    }
</script>

<style scoped>
  .visitorpie1{
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
</style>
