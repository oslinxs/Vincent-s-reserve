var app = {};
let person = 0;
function fetchDataAndUpdate1(url, select) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", "Basic b2JpeDpPYml4MTIzNDU2");
  myHeaders.append("Cookie", "JSESSIONID=3037ae70cc9dfccea3089d95ecf5078e957a84fbcf1abd0656");
  myHeaders.append("targeturl", String(url));

  const requestOptions = {
    method: "get",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://192.168.233.158:8080", requestOptions)
    .then(response => response.text())
    .then(xmlString => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");
      let timeVal;
      if (select == "people_now") {
        timeVal = xmlDoc.querySelector('real').getAttribute('val');
        person = Number(timeVal);
        updateChart(); // 更新图表数据
      } else {
        // 数据类型错误处理
      }
    })
    .catch(error => {
      console.error("请求失败:", error);
    });
}

function sendAndRefresh1() {
  fetchDataAndUpdate1("https://localhost/obix/config/demo/sumpeople/NumericWritable/out/", "people_now");
}

// 页面加载时立即发送请求并定时刷新
sendAndRefresh1();
setInterval(sendAndRefresh1, 60000);
var chartDom = document.getElementById('main');
var myChart1 = echarts.init(chartDom, 'dark');
var option;

const categories = (function () {
  let now = new Date();
  let res = [];
  let len = 24;
  while (len--) {
    res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
    now = new Date(+now - 3600 * 1000); // 减去一小时的毫秒数
  }
  return res;
})();

const data = (function () {
  let res = [];
  let len = 24;
  while (len--) {
    res.push(Math.round(Math.random() * 1000));
  }
  return res;
})();

option = {
  title: {},
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#283b56'
      }
    }
  },
  legend: {},
  toolbox: {
    show: true,
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: {
    show: false,
    start: 0,
    end: 100
  },
  xAxis: {
    type: 'category',
    boundaryGap: true,
    data: categories
  },
  yAxis: {
    type: 'value',
    scale: true,
    name: '人数',
    max: 1000,
    min: 0,
    boundaryGap: [0.2, 0.2]
  },
  series: [
    {
      name: '柱状图人流量',
      type: 'bar',
      data: data
    },
    {
      name: '折线图人流量',
      type: 'line',
      data: data
    }
  ]
};

app.count = 1;

function updateChart() {
  let axisData = new Date().toLocaleTimeString().replace(/^\D*/, '');
  data.shift();
  data.push(person); // 使用获取的 person 数据更新柱状图数据
  categories.shift();
  categories.push(axisData);
  myChart1.setOption({
    xAxis: {
      data: categories
    },
    series: [
      {
        data: data
      },
      {
        data: data
      }
    ]
  });
}

option && myChart1.setOption(option);
