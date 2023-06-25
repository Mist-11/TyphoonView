$(".weather").click(function(){
    console.log(111);
    window.location="test.html"
})

const yearDropdown = document.getElementById("year");
        const typhoonInfoList = document.getElementById("typhoon-info");
      
        // 台风信息
        const typhoonInfo = {
          "2022": ["马勒卡", "鲇鱼", "暹芭","艾利", "鲇鱼", "桑达","翠丝", 
          "木兰", "米雷","马鞍", "蝎虎", "轩岚诺","梅花", "苗柏", "南玛都"],
          "2021": ["台风A号", "台风B号", "台风C号"],
          "2020": ["台风X号", "台风Y号", "台风Z号"]
        };
      
 // 下拉框值更改事件监听器
 yearDropdown.addEventListener("change", function() {
    // 获取下拉框选中值
    const selectedYear = yearDropdown.value;

    // 清空台风信息列表
    typhoonInfoList.innerHTML = "";

    // 更新台风信息列表
    typhoonInfo[selectedYear].forEach(function(typhoon) {
      const typhoonItem = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      typhoonItem.appendChild(checkbox);
      const typhoonLabel = document.createElement("label");
      typhoonLabel.textContent = typhoon;
      typhoonItem.appendChild(typhoonLabel);
      typhoonInfoList.appendChild(typhoonItem);
    });
  });

  // 初始状态下，显示2022年的台风信息
  const initialYear = "2022";
  yearDropdown.value = initialYear;
  typhoonInfo[initialYear].forEach(function(typhoon) {
    const typhoonItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    typhoonItem.appendChild(checkbox);
    const typhoonLabel = document.createElement("label");
    typhoonLabel.textContent = typhoon;
    typhoonItem.appendChild(typhoonLabel);
    typhoonInfoList.appendChild(typhoonItem);
  });