class_data=[0,0,0,0,0];
// 获取数据
function fetchDataAndUpdate2(url, select) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic b2JpeDpPYml4MTIzNDU2");
  myHeaders.append("Cookie", "JSESSIONID=3037ae70cc9dfccea3089d95ecf5078e957a84fbcf1abd0656");
  myHeaders.append("targeturl", String(url));

  const requestOptions = {
    method: "get", // 使用 POST 方法
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://192.168.245.158:8080", requestOptions)
    .then(response => response.text())
    .then(xmlString => {
      // 解析 XML 字符串
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      let timeVal;
      if (select == "temp_class") {
        timeVal = xmlDoc.querySelector('real').getAttribute('val');
        class_data[1] = Number(timeVal);
        data1.push(randomData(class_data[1]));
        if(data1.length>100)
        data1.shift();
      } else if (select == "yw_class") {
        timeVal = xmlDoc.querySelector('real').getAttribute('val');
        class_data[2] = Number(timeVal);
        data2.push(randomData(class_data[2]));
        if(data2.length>100)
        data2.shift();
      } else if (select == "wt_class") {
        timeVal = xmlDoc.querySelector('real').getAttribute('val');
        class_data[3] = Number(timeVal);
        data3.push(randomData(class_data[3]));
        if(data3.length>100)
        data3.shift();
      } else if (select == "zs_class") {
        timeVal = xmlDoc.querySelector('real').getAttribute('val');
        class_data[4] = Number(timeVal);
        data4.push(randomData(class_data[4]));
        if(data4.length>100)
        data4.shift();
      } else {
        console.log(select);
        console.log("数据类型错误");
      }
      // updateChart();
    })
    .catch(error => {
      console.error("请求失败:", error);
      // alert("请求失败，请查看控制台错误信息。");
    });
}

function sendAndRefresh2() {
  fetchDataAndUpdate2("https://localhost/obix/config/demo/F1/F101/environment/NumericWritable/out/", "temp_class");
  fetchDataAndUpdate2("https://localhost/obix/config/demo/F1/F101/environment/NumericWritable3/out/","yw_class");
  fetchDataAndUpdate2("https://localhost/obix/config/demo/F1/F101/environment/NumericWritable1/out/","wt_class");
  fetchDataAndUpdate2("https://localhost/obix/config/demo/F1/F101/environment/NumericWritable4/out/","zs_class");
  // fetchDataAndUpdate("https://localhost/obix/config/demo/F1/F101/light1/BooleanWritable/elapsedActiveTime/", "time");
  
}

// 页面加载时立即发送请求并定时刷新
sendAndRefresh2();
setInterval(sendAndRefresh2, 600); 
console.log(class_data);
var chartDom = document.getElementById('wei');
var myChart = echarts.init(chartDom, 'dark');
var option;

const categories3 = (function () {
  let now = new Date();
  let res = [];
  let len = 10;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 2000);
  }
  return res;
})();
function randomData(value) {
  let now = new Date(); // 获取当前时间
  let category = now.toLocaleTimeString(); // 将当前时间转换为字符串表示
  return {
    name: category, // 使用当前时间的字符串表示作为名称
    value: [category, value] // 使用当前时间的字符串表示作为横坐标
  };

}


let data1 = [];
let data2 = [];
let data3 = [];
let data4 = [];
var class_name="D1235"
let now = new Date(2022, 1, 3);
let oneDay = 24 * 3600 * 1000;
let value1 = Math.random() * 2;
let value2 = Math.random() * 5;
let value3 = Math.random() * 8;
let value4 = Math.random() * 10;

for (var i = 0; i < 50; i++) {
  data1.push(randomData(5));
  data2.push(randomData(15));
  data3.push(randomData(25));
  data4.push(randomData(35));
}

option = {
  title: {
    text: class_name
  },
  legend: {
    data: ['温度', '湿度', '烟雾', '噪声'],
    orient: 'vertical',
    right: 10,
    top: 20
  },  
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      if (params.seriesName === '温度') {
        return (
          params.value[0]+" "+
          params.value[1]+"°C"
        );
      } else if (params.seriesName === '烟雾') {
        return (
          params.value[0]+" "+
          params.value[1]+"ppm"
        );
      } else if (params.seriesName === '湿度') {
        return (
          params.value[0]+" "+
          params.value[1]+"%"
        );
      } else if (params.seriesName === '噪声') {
        return (
          params.value[0]+" "+
          params.value[1]+"dB"
        );
      }
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    type: 'category',
    splitLine: {
      show: false
    }
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, '100%'],
    // max:70,
    splitLine: {
      show: false
    }
  },
  series: [
    {
      name: '温度',
      type: 'line',
      showSymbol: false,
      data: data1
    },
    {
      name: '烟雾',
      type: 'line',
      showSymbol: false,
      data: data2,
      color: "orange"
    },
    {
      name: '湿度',
      type: 'line',
      showSymbol: false,
      data: data3,
      color: "purple"
    },
    {
      name: '噪声',
      type: 'line',
      showSymbol: false,
      data: data4,
      color: "green"
    }
  ]
};

setInterval(function () {
  // 更新数据
  sendAndRefresh2();

  // 更新图表的横坐标轴
  myChart.setOption({
    xAxis: {
      data: data1.map(item => item.name) // 更新横坐标数据
    },
    series: [
      { name: "温度", data: data1 },
      { name: "湿度", data: data2 },
      { name: "烟雾", data: data3 },
      { name: "噪声", data: data4 }
    ]
  });
}, 1000);


option && myChart.setOption(option);

