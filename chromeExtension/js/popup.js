async function drawerToday(){
  var myChart = echarts.init(document.getElementById('today'),'macarons');
  let date = getDateString()
  let data = []
  await new Promise(r=>{
    chrome.storage.local.get(date,res=>{
      if(res[date]){ 
        Object.keys(res[date]).forEach(key=>{
          data.push({name:key, value:res[date][key]})
        })
      }
      r()
    })
  })
  // data.push({name:"test",value:1})
  data.sort((a,b)=>b.value-a.value)
  data = data.slice(0,11)
  let total = data.reduce((p,c)=>{
    return p+c.value
  },0)
  total = secondsToTimeStr(total)
  // 指定图表的配置项和数据
  var option = {
    title: {
      text: `今日:${total}`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        var tip = echarts.format.truncateText(params.name, 200) + "<br/>" + secondsToTimeStr(params.value) + "(" + params.percent + "%)";
        return tip;
    }
    },
    legend: {
      height: '400px',
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      data: data,
      formatter: function (name) {
        return echarts.format.truncateText(name, 200);
    }
    },
    series: [
      {
        name: '时间',
        type: 'pie',
        radius: [0, 110],
        center: [350, '50%'],
        label: {
          normal: {
            show: false
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data:data
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

  // 点击跳转到目标网站
  myChart.on("click", function(e) {
      window.open("https://"+e.data.name);
  });
}

async function drawerWeek(){
  //删除查看本周按钮
  var parent = document.getElementById('body');
  parent.removeChild(parent.children[1]);
  //todo获取本周数据
  let dates = getMondayToToday()
  let weekData = []
  await new Promise(r=>{
    chrome.storage.local.get(dates,res=>{
      weekData = res
      r()
    })
  })
  //todo绘制柱状图
  drawerWeekPillar(dates,weekData)
  //绘制饼图
  drawerWeekPie(weekData)
}

async function drawerWeekPillar(dates,weekData){
  let Days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].slice(0,dates.length)
  let timeData = []
  dates.forEach(date=>{
    timeData.push(Object.values(weekData[date]||{})?.reduce((p,c)=>p+c,0) || 0)
  })
  let total = timeData.reduce((p,c)=>p+c,0)
  let totalStr =  secondsToTimeStr(total)
  let averageStr = secondsToTimeStr(~~(total/timeData.length))
  let weekDom = document.getElementById('week1')
  weekDom.style.height= 300+'px'; weekDom.style.width = 500+'px';
  let myChart = echarts.init(weekDom,'macarons')
  option = {
    title: {
      text: `本周总时间:${totalStr}`,
      subtext: `日均${averageStr}`,
      left: 'center'
    },
    xAxis: {
      type: 'category',
      data: Days
    },
    yAxis: {
      type: 'value'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        var tar = params[0];
        return echarts.format.truncateText(tar.name, 200) + "<br/>" + secondsToTimeStr(tar.value);
      }
    },
    series: [
      {
        data: timeData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  myChart.setOption(option);

}
async function drawerWeekPie(weekData){
  console.log(weekData)
  let data=[]
  let map = new Map()
  Object.values(weekData||{}).forEach(obj=>{
    Object.keys(obj||{}).forEach(key=>{
      map.set(key, (map.get(key)||0) + obj[key])
    })
  })
  console.log(map)
  for(let key of map.keys()){
    data.push({name:key,value:map.get(key)})
  }
  console.log(data)
  data.sort((a,b)=>b.value-a.value)
  data = data.slice(0,21)
  let total = data.reduce((p,c)=>p+c.value,0)
  total = secondsToTimeStr(total)

  let weekDom = document.getElementById('week2')
  weekDom.style.height= 500+'px'; weekDom.style.width = 500+'px';
  let myChart = echarts.init(weekDom,'macarons')
  var option = {
    title: {
      text:'Top20',
      left: 'center'
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params) {
        var tip = echarts.format.truncateText(params.name, 200) + "<br/>" + secondsToTimeStr(params.value) + "(" + params.percent + "%)";
        return tip;
    }
    },
    legend: {
      height: '400px',
      orient: 'vertical',
      left: 'left',
      top: 'middle',
      data: data,
      formatter: function (name) {
        return echarts.format.truncateText(name, 200);
    }
    },
    series: [
      {
        name: '时间',
        type: 'pie',
        radius: [0, 110],
        center: [350, '50%'],
        label: {
          normal: {
            show: false
          }
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data:data
      }
    ]
  };
  myChart.setOption(option);
    // 点击跳转到目标网站
    myChart.on("click", function(e) {
      window.open("https://"+e.data.name);
  });
}

function getMondayToToday(){
  return getDatesBetweenDates(getFirstDayOfWeek(new Date()),new Date()).map(item=>getDateString(item))
}
function getFirstDayOfWeek (date) {
  var day = date.getDay() || 7;
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1 - day);
};
function getDatesBetweenDates(startDate, endDate){
  let dates = []
  //to avoid modifying the original date
  const theDate = new Date(startDate)
  while (theDate < endDate) {
    dates = [...dates, new Date(theDate)]
    theDate.setDate(theDate.getDate() + 1)
  }
  return dates
}
function getDateString(millis) {
  if (millis != null) {
      return new Date(millis).toLocaleDateString("zh-Hans-CN");
  } else {
      return new Date().toLocaleDateString("zh-Hans-CN");
  }
}
function secondsToTimeStr(seconds) {
  var days = 0;
  var hours = 0;
  var minutes = 0;

  if (seconds >= 86400) {
      days = parseInt(seconds / 86400);
      seconds -= 86400 * days;
  }

  if (seconds >= 3600) {
      hours = parseInt(seconds / 3600);
      seconds -= 3600 * hours;
  }

  if (seconds >= 60) {
      minutes = parseInt(seconds / 60);
      seconds -= 60 * minutes;
  }

  var timeStr = "";
  if (days != 0) {
      return days + "天" + hours + "时" + minutes + "分" + seconds + "秒";
  } else if (hours != 0) {
      return hours + "时" + minutes + "分" + seconds + "秒";
  } else if (minutes != 0) {
      return minutes + "分" + seconds + "秒";
  } else {
      return seconds + "秒";
  }
}

function start(){
  drawerToday()
  document.getElementById('weekBtn').addEventListener('click',drawerWeek)
}
window.addEventListener("load", start, false);

