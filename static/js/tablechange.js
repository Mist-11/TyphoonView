const yearSelect = $("#year");
const typhoonList = $("#typhoon-info");
const typhoonTable = $(".table3");
let url = `http://127.0.0.1:8000/getlist/`;
let urlWay = `http://127.0.0.1:8000/way/2022/`;
var china_map = echarts.init(document.getElementById(
    "china_map"), 'infographic');
var tableElement = typhoonTable.get(0);

// 初始状态下，显示2022年的台风信息
const initialYear = "2022";
yearSelect.val(initialYear);
fetch(url + `2022/`)
    .then((response) => response.json())
    .then((data) => {
        for (let key in data) {
            getLi(data, key);
        }
    });

typhoonList.html("");
yearSelect.on('change', function (event) {
    typhoonList.html("");
    const year = event.target.value;
    const url = `http://127.0.0.1:8000/getlist/${year}/`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            for (let key in data) {
                getLi(data, key);
            }

            // 监听input标签的点击事件

            $("#typhoon-info li input").on('click', function (event) {
                $(".table3").empty();
                // 取消所有 input 的选中状态
                $('#typhoon-info li input').prop('checked', false);

                // 勾选当前的 input
                $(this).prop('checked', true);
                // 检查当前input是否被勾选
                // 获取对应id的台风信息
                const id = $(this).attr('id');
                const url =
                    `http://127.0.0.1:8000/way/${year}/?id=${id}`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        try {
                            // 假设你已经将数据存储在一个名为data的数组中

                            for (const id in data) {
                                for (const key in data[id]) {
                                    const item = data[id][key];
                                    // 对每个item做你需要的操作
                                    getTable(item);


                                }
                                // 清空图表
                                // myChart.clear();
                                generateArray(url)
                                let myData;
                                let promise = generateArray(url);
                                promise.then((array) => {
                                    myData = array;
                                    // 初始化echarts实例

                                    // 配置项
                                    var option = {
                                        title: {
                                            text: '中国地图'
                                        },
                                        tooltip: {
                                            trigger: 'item',
                                            formatter: function (params) {
                                                var res = params.name;
                                                if (params
                                                    .seriesName ===
                                                    '台风24小时警戒线' ||
                                                    params
                                                    .seriesName ===
                                                    '台风48小时警戒线') {
                                                    res += params
                                                        .seriesName +
                                                        '<br/>';
                                                } else {
                                                    res += '当前台风路径' +
                                                        '<br/>';
                                                }
                                                return res;
                                            }
                                        },
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
                                        series: [{
                                                name: '台风24小时警戒线',
                                                type: 'lines',
                                                lineStyle: {
                                                    color: '#ff3333',
                                                    width: 2,
                                                    opacity: 0.5
                                                },
                                                data: [
                                                    [
                                                        [127, 34],
                                                        [127, 22]
                                                    ],
                                                    [
                                                        [127, 22],
                                                        [119, 18]
                                                    ],
                                                    [
                                                        [119, 18],
                                                        [119, 11]
                                                    ],
                                                    [
                                                        [119, 11],
                                                        [113, 4.5]
                                                    ],
                                                    [
                                                        [113, 4.5],
                                                        [105, 0]
                                                    ],
                                                ],
                                                coordinateSystem: 'geo',
                                                large: false,
                                                zlevel: 3,
                                                smooth: true,
                                            },
                                            {
                                                name: '台风48小时警戒线',
                                                type: 'lines',
                                                lineStyle: {
                                                    color: '#ff9933',
                                                    width: 2,
                                                    opacity: 0.5
                                                },
                                                data: [
                                                    [
                                                        [132, 34],
                                                        [132, 15]
                                                    ],
                                                    [
                                                        [132, 15],
                                                        [120, 0]
                                                    ],
                                                    [
                                                        [120, 0],
                                                        [105, 0]
                                                    ],
                                                ],
                                                coordinateSystem: 'geo',
                                                large: false,
                                                zlevel: 4,
                                                smooth: true,
                                            },
                                            {
                                                name: '当前台风路径',
                                                type: 'lines',
                                                lineStyle: {
                                                    color: 'rgb(207, 240, 247)',
                                                    width: 2,
                                                    opacity: 0.5
                                                },
                                                data: myData,
                                                coordinateSystem: 'geo',
                                                large: false,
                                                zlevel: 4,
                                                smooth: true,
                                                symbolSize: 8,
                                                symbol: 'image://' + '/static/images/台风路径.png',
                                                symbolOffset: [0, -10],
                                                effect: {
                                                    show: true,
                                                    period: 4,
                                                    symbol: 'image://'+ '/static/images/台风路径.png',
                                                    symbolSize: 12,
                                                    trailLength: 0.5,
                                                    symbolRotate: 35
                                                }
                                            },
                                        ]
                                    };
                                    // 使用刚指定的配置项和数据显示图表
                                    china_map.setOption(option);
                                });

                            }
                        } catch (error) {
                            console.error(error);
                        }
                    })
                    .catch(error => console.error(error));
            })
        })
})

function generateArray(url) {
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            const result = [];
            let prevItem;
            for (const id in data) {
                for (const key in data[id]) {
                    const item = data[id][key];
                    if (prevItem) {
                        result.push([
                            [prevItem.jindu, prevItem.weidu],
                            [item.jindu, item.weidu]
                        ]);
                    }
                    prevItem = item;
                }
            }

            return result;
        })
        .catch(error => console.error(error));
}

function getLi(data, key) {
    const typhoonItem = $("<li>");
    const checkbox = $("<input>").attr("type", "checkbox");
    typhoonItem.append(checkbox);
    const typhoonLabel = $("<label>").text(
        data[key].Cname + "   " + data[key].Ename
    );
    typhoonItem.append(typhoonLabel);
    checkbox.attr("id", data[key].id); // 添加id属性
    typhoonList.append(typhoonItem);
}

function getTable(item) {
    const row = tableElement.insertRow();
    const pressureCell = row.insertCell();
    pressureCell.textContent = item
        .pressure;
    const speedCell = row
        .insertCell();
    speedCell.textContent = item
        .speed;
    const strengthCell = row
        .insertCell();
    strengthCell.textContent = item
        .strength;
    const timeCell = row
        .insertCell();
    timeCell.textContent = item
        .time;
}