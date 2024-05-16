var Main = {
  data() {
    return {
      input_data1: "",
      input_data2: "",
      selectModel: "bar",
      a: [],
      b: [],
      data1: [],
      columns1: [
        { title: "项目", key: "name", align: "center" },
        { title: "数据", key: "value", align: "center" },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            //   console.log(params)
            return h(
              "i-button",
              {
                on: {
                  click: () => {
                    this.dele(params);
                  }
                }
              },
              "删除"
            );
          }
        }
      ]
    };
  },
  // 实例创建完成后立即调用
  created: function() {
    $("#main").hide();
    $("#main1").hide();
  },
  methods: {
    dele: function(params) {
      this.data1.splice(params.index, 1);
      this.a.splice(0);
      this.b.splice(0);
      for (let i = 0; i < this.data1.length; i++) {
        this.a.push(this.data1[i].name);
        this.b.push(this.data1[i].value);
      }
      //   console.log(this.data1)
      // console.log(this.a);
      // console.log(this.b);
      if (this.selectModel == "line" || this.selectModel == "bar") {
        this.picture(this.selectModel);
      } else {
        this.picture1(this.selectModel);
      }
      if (this.data1.length == 0) {
        $("#main").hide();
        $("#main1").hide();
      }
    },
    select_change: function(val) {
      // 清除div内容
      // $("#main").empty();
      this.selectModel = val;
      if (this.data1.length > 0) {
        if (this.selectModel == "line" || this.selectModel == "bar") {
          this.picture(this.selectModel);
        } else {
          this.picture1(this.selectModel);
        }
      }
    },
    picture1: function(val) {
      $("#main1").show();
      $("#main").hide();
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main1"));
      // 指定图表的配置项和数据
      var option1 = {
        // 标题
        title: {
          // x轴方向的位置
          x: "center",
          // 文字
          text: "Just a test"
        },
        // 设置全局的文字风格
        textStyle: {
          // color: '#fff',
        },
        // 提示文本
        tooltip: {
          // 触发器
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 图片的保存，刷新，和数据
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // 数据视图
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            // 刷新
            restore: { show: true },
            // 保存图片
            saveAsImage: { show: true }
          }
        },
        // 全局背景色
        backgroundColor: "#ff0",
        // 图例说明
        legend: {
          // 图例数据名
          data: this.a,
          // data:['交通','生活','电子产品','吃饭','学习',],
          // 显示方向
          orient: "vertical",
          // x轴方向的位置
          x: "right "
        },
        // 图表数据信息
        series: [
          {
            // 提示框标题
            name: "消费",
            // 图表类型
            type: val, // ：饼图
            // 图表的中心坐标
            center: ["50%", "50%"],
            // 通过配置roseType属性显示为南丁格尔图
            roseType: "angle",
            // roseType:'radius',
            // 图表的数据
            data: this.data1,
            // 也可以每个系列分别设置，每个系列的文本设置在 label.textStyle。
            label: {
              normal: {
                textStyle: {
                  color: "#000"
                }
              }
            },
            // 标签的视觉引导线设置颜色
            labelLine: {
              normal: {
                lineStyle: {
                  // color: '#0f0'
                }
              }
            },

            // itemStyle的emphasis是鼠标 hover 时候的高亮样式
            itemStyle: {
              emphasis: {
                // 设置鼠标移动上面扇形的颜色
                // color: '#c23531',
                // 陰影的模糊範圍
                shadowBlur: 100,
                // 陰影的橫向偏移
                shadowOffsetX: 0,
                // 阴影颜色
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },
            // 动画效果
            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option1);
    },

    picture: function(val) {
      $("#main").show();
      $("#main1").hide();
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById("main"));
      // 指定图表的配置项和数据
      var option1 = {
        title: {
          text: "ECharts 示例"
        },
        tooltip: {},
        // 图片的保存，刷新，和数据
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            // 数据视图
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"]
            },
            // 刷新
            restore: { show: true },
            // 保存图片
            saveAsImage: { show: true }
          }
        },
        itemStyle: {
          // 阴影的大小
          shadowBlur: 200,
          // 阴影水平方向上的偏移
          shadowOffsetX: 0,
          // 阴影垂直方向上的偏移
          shadowOffsetY: 0,
          // 阴影颜色
          shadowColor: "rgba(0, 0, 0, 0.5)"
        },
        legend: {
          // data:this.b,
          data: ["数据"]
        },
        xAxis: {
          data: this.a
        },
        yAxis: {},
        series: [
          {
            name: "数据",
            type: val,
            data: this.b
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option1);
    },
    enter: function() {
      let name = this.input_data1;
      let value = this.input_data2;
      //    console.log(name,value)
      //    console.log(this.input_data1)
      //    console.log(this.input_data2)
      if (this.input_data1.length != 0 && this.input_data2.length != 0) {
        this.data1.push({ name, value });
        this.a.push(this.input_data1);
        this.b.push(this.input_data2);
        this.input_data1 = "";
        this.input_data2 = "";
        if (this.selectModel == "line" || this.selectModel == "bar") {
          this.picture(this.selectModel);
        } else {
          this.picture1(this.selectModel);
        }
      } else {
        this.$Modal.warning({
          title: "提示",
          content: "输入内容不能为空!"
        });
      }
    }
  }
};
var Component = Vue.extend(Main);
new Component().$mount("#hardy");
