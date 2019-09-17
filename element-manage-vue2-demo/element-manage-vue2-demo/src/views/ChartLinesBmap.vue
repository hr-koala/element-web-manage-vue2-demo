<template>
    <div>
      <header-top></header-top>
      <div class="ChartLinesBmap" id="ChartLinesBmap" style="width: 90%;height: 800px;"></div>
    </div>
</template>

<script>
  import HeaderTop from '@/components/HeaderTop'
  import echarts from 'echarts/lib/echarts'
    export default {
        name: "ChartLinesBmap",
      data(){
          return{

          }
      },
      methods:{
        getData(){
          this.myChart = echarts.init(document.getElementById('ChartLinesBmap'))
          app.title = '杭州热门步行路线 - 百度地图';

          $.get(ROOT_PATH + 'data/asset/data/hangzhou-tracks.json', function(data) {
            var lines = data.map(function (track) {
              return {
                coords: track.map(function (seg, idx) {
                  return seg.coord;
                })
              };
            });
            this.myChart.setOption(option = {
              bmap: {
                center: [120.13066322374, 30.240018034923],
                zoom: 14,
                roam: true,
                mapStyle: {
                  styleJson: [{
                    'featureType': 'water',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#d1d1d1'
                    }
                  }, {
                    'featureType': 'land',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#f3f3f3'
                    }
                  }, {
                    'featureType': 'railway',
                    'elementType': 'all',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'highway',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#fdfdfd'
                    }
                  }, {
                    'featureType': 'highway',
                    'elementType': 'labels',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry',
                    'stylers': {
                      'color': '#fefefe'
                    }
                  }, {
                    'featureType': 'arterial',
                    'elementType': 'geometry.fill',
                    'stylers': {
                      'color': '#fefefe'
                    }
                  }, {
                    'featureType': 'poi',
                    'elementType': 'all',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'green',
                    'elementType': 'all',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'subway',
                    'elementType': 'all',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'manmade',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#d1d1d1'
                    }
                  }, {
                    'featureType': 'local',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#d1d1d1'
                    }
                  }, {
                    'featureType': 'arterial',
                    'elementType': 'labels',
                    'stylers': {
                      'visibility': 'off'
                    }
                  }, {
                    'featureType': 'boundary',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#fefefe'
                    }
                  }, {
                    'featureType': 'building',
                    'elementType': 'all',
                    'stylers': {
                      'color': '#d1d1d1'
                    }
                  }, {
                    'featureType': 'label',
                    'elementType': 'labels.text.fill',
                    'stylers': {
                      'color': '#999999'
                    }
                  }]
                }
              },
              series: [{
                type: 'lines',
                coordinateSystem: 'bmap',
                data: lines,
                polyline: true,
                lineStyle: {
                  normal: {
                    color: 'purple',
                    opacity: 0.6,
                    width: 1
                  }
                }
              }]
            });
          });
        }
      },
      components:{
          HeaderTop
      }
    }
</script>

<style scoped>

</style>
