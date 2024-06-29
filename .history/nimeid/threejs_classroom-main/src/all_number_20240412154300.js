let time1=0;
function fetchDataAndUpdate3(url, select) {
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
        if (select == "people_in") {
          timeVal = xmlDoc.querySelector('real').getAttribute('val');
          time1 = Number(timeVal);
          const peopleCountElement = document.getElementById("peopleCount");
          // 更新目标元素的内容为获取到的数据
          peopleCountElement.textContent = time1;

        } else {
          // console.log(select);
          // console.log("数据类型错误");
        }
      })
      .catch(error => {
        console.error("请求失败:", error);
        // alert("请求失败，请查看控制台错误信息。");
      });
  }
  
  function sendAndRefresh3() {
    fetchDataAndUpdate3("https://localhost/obix/config/demo/sumpeople/Counter1/out/", "people_in");
  }
  
//   页面加载时立即发送请求并定时刷新
  sendAndRefresh3();
  setInterval(sendAndRefresh3, 2000); 