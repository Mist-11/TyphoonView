function fnW(str) {
    var num;
    str >= 10 ? num = str : num = "0" + str;
    return num;
}

$(".weather").click(function(){
    window.location="/dacause/"
})
$(".know").click(function(){
    window.location="/knowledge/"
})

// //中国地图开始
var china_map = echarts.init(document.getElementById("china_map"), 'infographic');
// var mydata = [{
//         name: '北京',
//         value: 0
//     }, {
//         name: '天津',
//         value: 0
//     },
//     {
//         name: '上海',
//         value: 2
//     }, {
//         name: '重庆',
//         value: 0
//     },
//     {
//         name: '河北',
//         value: 0
//     }, {
//         name: '河南',
//         value: 0
//     },
//     {
//         name: '云南',
//         value: 0
//     }, {
//         name: '辽宁',
//         value: 1
//     },
//     {
//         name: '黑龙江',
//         value: 0
//     }, {
//         name: '湖南',
//         value: 0
//     },
//     {
//         name: '安徽',
//         value: 0
//     }, {
//         name: '山东',
//         value: 3
//     },
//     {
//         name: '新疆',
//         value: 0
//     }, {
//         name: '江苏',
//         value: 1
//     },
//     {
//         name: '浙江',
//         value: 5
//     }, {
//         name: '江西',
//         value: 0
//     },
//     {
//         name: '湖北',
//         value: 0
//     }, {
//         name: '广西',
//         value: 2
//     },
//     {
//         name: '甘肃',
//         value: 0
//     }, {
//         name: '山西',
//         value: 0
//     },
//     {
//         name: '内蒙古',
//         value: 0
//     }, {
//         name: '陕西',
//         value: 0
//     },
//     {
//         name: '吉林',
//         value: 0
//     }, {
//         name: '福建',
//         value: 18
//     },
//     {
//         name: '贵州',
//         value: 0
//     }, {
//         name: '广东',
//         value: 26
//     },
//     {
//         name: '青海',
//         value: 0
//     }, {
//         name: '西藏',
//         value: 0
//     },
//     {
//         name: '四川',
//         value: 0
//     }, {
//         name: '宁夏',
//         value: 0
//     },
//     {
//         name: '海南',
//         value: 11
//     }, {
//         name: '台湾',
//         value: 12
//     },
//     {
//         name: '香港',
//         value: 0
//     }, {
//         name: '澳门',
//         value: 0
//     }
// ];

   // 配置项
   var option = {

    title: {
      text: '中国地图'
    },
    tooltip: {
        trigger: 'item',
        
    },
    // 添加地图
    geo: {
      map: 'china',
      roam: true,
      label: {
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#d4d4d4',
          borderColor: '#111'
        },
        emphasis: {
          areaColor: '#f2d643'
        }
      }
    },
    series: [
      {
        name: '台风24小时警戒线',
        type: 'lines',
        // 设置警戒线的样式
        lineStyle: {
          color: '#ff3333',
          width: 2,
          opacity: 0.5
        },
        data: [
          [[127, 34], [127, 22]],
          [[127, 22], [119, 18]],
          [[119, 18], [119, 11]],
          [[119, 11], [113, 4.5]],
          [[113, 4.5], [105, 0]],
        ],
        coordinateSystem: 'geo',
        large: false,
        zlevel: 3,
        // 折线平滑显示
        smooth: true,
      },
      {
        name: '台风48小时警戒线',
        type: 'lines',
        // 设置警戒线的样式
        lineStyle: {
          color: '#ff9933',
          width: 2,
          opacity: 0.5
        },
        data: [
          [[132, 34], [132, 15]],
          [[132, 15], [120, 0]],
          [[120, 0], [105, 0]],
        ],
        coordinateSystem: 'geo',
        large: false,
        zlevel: 4,
        // 折线平滑显示
        smooth: true,
      },
      
    ]
  };

  // 使用刚指定的配置项和数据显示图表
  china_map.setOption(option);


// var option = {
//     //backgroundColor: '#FFFFFF',

//     title: {
//         text: '全国地区遭害台风情况',
//         textStyle: {
//             color: '#fff'
//         },
//         //subtext: '纯属虚构',
//         x: 'center'
//     },
//     tooltip: {
//         trigger: 'item'
//     },
//     visualMap: {
//         show: false,
//         x: 'left',
//         y: 'bottom',
//         //layoutCenter:['30%','30%'],
//         splitList: [{
//                 start: 20,
//                 end: 30
//             }, {
//                 start: 10,
//                 end: 20
//             },
//             {
//                 start: 5,
//                 end: 10
//             }, {
//                 start: 1,
//                 end: 5
//             },
//             {
//                 start: 0,
//                 end: 1
//             }, {
//                 start: -1,
//                 end: 0
//             },
//         ],
//         color: ['#CED3E5', '#ffff00', '#0E94EB', '#6FBCF0', '#F0F06F', '#00CC00']
//     },
//     series: [{
//         name: '台风个数',
//         type: 'map',
//         mapType: 'china',
//         roam: true,
//         label: {
//             normal: {
//                 show: false
//             },
//             emphasis: {
//                 show: false
//             }
//         },
//         data: mydata
//     }], 
        
    
// };

// china_map.setOption(option);
//中国地图结束







//获取当前时间
var timer = setInterval(function () {
    var date = new Date();
    var year = date.getFullYear(); //当前年份
    var month = date.getMonth(); //当前月份
    var data = date.getDate(); //天
    var hours = date.getHours(); //小时
    var minute = date.getMinutes(); //分
    var second = date.getSeconds(); //秒
    var day = date.getDay(); //获取当前星期几 
    var ampm = hours < 12 ? 'am' : 'pm';
    $('#time').html(fnW(hours) + ":" + fnW(minute) + ":" + fnW(second));
    $('#date').html('<span>' + year + '/' + (month + 1) + '/' + data + '</span><span>' + ampm + '</span><span>周' + day + '</span>')

}, 1000)


//带边框效果的饼图
//var pie_fanzui =echarts.init(document.getElementById("pie_fanzui"),'macarons'); 
var pie_fanzui = echarts.init(document.getElementById("pie_fanzui"), 'infographic');
option = {
    title: {
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['台风一号', '台风二号', '台风三号', '台风四号', '台风五号'],
        textStyle: {
            color: '#fff'
        }
    },

    label: {
        normal: {
            textStyle: {
                color: 'red' // 改变标示文字的颜色
            }
        }
    },
    series: [{
        name: '台风分析',
        type: 'pie',
        radius: '55%',
        center: ['50%', '60%'],
        data: [{
                value: 335,
                name: '台风一号'
            },
            {
                value: 310,
                name: '台风二号'
            },
            {
                value: 234,
                name: '台风三号'
            },
            {
                value: 135,
                name: '台风四号'
            },
            {
                value: 1548,
                name: '台风五号'
            }
        ],

        itemStyle: {
            emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,

                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }

    }]
};
pie_fanzui.setOption(option);
//----------------------台风分析占比end---------------



//带边框效果的饼图
//var pie_age =echarts.init(document.getElementById("pie_age"),'macarons'); 
var pie_age = echarts.init(document.getElementById("pie_age"), 'infographic');
//var pie_age =echarts.init(document.getElementById("pie_age"),'shine'); 
option = {
    textStyle: {
        fontSize: 11 // 设置默认字体大小
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}:{c} ({d}%)",
        textStyle: {
            fontSize: 11, // 设置字体大小

        }
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data: ['超强台风', '强台风', '台风', '强热带风暴', '热带风暴', '热带低压'],
        textStyle: {
            fontSize: '11',
            color: '#fff'
        }
    },
    color: ['#FE0000', '#FE00FE', '#FE9C45', '#0F8000', '#0000FF', '#EED139'],
    series: [{
        name: '不同强度台风占比',
        type: 'pie',
        radius: ['25%', '50%'],
        avoidLabelOverlap: false,
        label: {
            normal: {
                show: false,
                position: 'center'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '11',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data: [{
                value: 16,
                name: '超强台风'
            },
            {
                value: 18,
                name: '强台风'
            },
            {
                value: 31,
                name: '台风'
            },
            {
                value: 22,
                name: '强热带风暴'
            },
            {
                value: 96,
                name: '热带风暴'
            },
            {
                value: 162,
                name: '热带低压'
            },

        ]
    }]
};
pie_age.setOption(option);
//----------------------占比end---------------



//==========================================
//var line_time =echarts.init(document.getElementById("line_time"),'shine'); 
var line_time = echarts.init(document.getElementById("line_time"), 'macarons');
//var line_time =echarts.init(document.getElementById("line_time"),'infographic'); 
var option = {
    // 给echarts图设置背景色
    //backgroundColor: '#FBFBFB',  // -----------> // 给echarts图设置背景色
    color: ['#7FFF00'],
    tooltip: {
        trigger: 'axis'
    },

    grid: {
        x: 40,
        y: 30,
        x2: 5,
        y2: 20

    },
    calculable: true,


    xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月','4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLabel: {
            color: "#7FFF00" //刻度线标签颜色
        }
    }],
    yAxis: [{

        type: 'value',
        axisLabel: {
            color: "#7FFF00" //刻度线标签颜色
        }
    }],
    series: [{
        name: '个数',
        type: 'line',
        data: [4,7,6,9,8,25,52,76,65,54,27,16],

    }]
};


line_time.setOption(option);


//=========台风地区分布开始=======================


var qufenbu_data = echarts.init(document.getElementById("qufenbu_data"), 'infographic');
option = {
    color: ['#FADB71'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        x: 30,
        y: 10,
        x2: 15,
        y2: 20
    },
    xAxis: [{
        type: 'category',
        data: ['广东', '福建', '台湾', '海南', '浙江', '山东', '其它'],
        axisTick: {
            alignWithLabel: true
        },
        axisLabel: {
            interval: 0, // 强制显示所有标签
            color: "#FADB71" //刻度线标签颜色
        }
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            color: "#FADB71" //刻度线标签颜色
        }
    }],
    series: [{
        name: '地区分布',
        type: 'bar',
        barWidth: '60%',
        data: [26, 18, 12, 11, 5, 3, 6]
    }]
};

qufenbu_data.setOption(option);
//=========违法犯罪人员地区分布结束=======================


//时间选择器
var startV = '';
var endV = '';
laydate.skin('danlan');
var startTime = {
    elem: '#startTime',
    format: 'YYYY-MM-DD',
    min: '1997-01-01', //设定最小日期为当前日期
    max: laydate.now(), //最大日期
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        startV = datas;
        endTime.min = datas; //开始日选好后，重置结束日的最小日期
    }
};
var endTime = {
    elem: '#endTime',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now(),
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        endV = datas;
    }
};

laydate(startTime);
laydate(endTime);

//时间选择器
var startVs = '';
var endVs = '';
laydate.skin('danlan');
var startTimes = {
    elem: '#startTimes',
    format: 'YYYY-MM-DD',
    min: '1997-01-01', //设定最小日期为当前日期
    max: '2099-06-16', //最大日期
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        startVs = datas;
        endTimes.min = datas; //开始日选好后，重置结束日的最小日期
        setQgData($('#barTypes').parent().parent(), 1);
    }
};
var endTimes = {
    elem: '#endTimes',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now(),
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        endVs = datas;
        setQgData($('#barTypes').parent().parent(), 1);
    }
};

laydate(startTimes);
laydate(endTimes);




//更改日期插件的样式
function dateCss() {
    var arr = $('#laydate_box').attr('style').split(';');
    var cssStr =
        'position:absolute;right:0;';
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf('top') != -1) {
            cssStr += arr[i];
        }
    }

    $('#laydate_box').attr('style', cssStr);
}


var workDate;
var time = {
    elem: '#times',
    format: 'YYYY-MM-DD',
    min: laydate.now(),
    max: laydate.now() + 30,
    istime: true,
    istoday: true,
    fixed: false,
    choose: function (datas) {
        //        startTime.max = datas; //结束日选好后，重置开始日的最大日期
        workDate = datas;
    }
};

laydate(time);