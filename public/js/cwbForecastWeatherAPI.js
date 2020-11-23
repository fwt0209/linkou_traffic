class DateTime extends Date {
    constructor() {
        super();
        this.period = function (date, addDate = 0) {
            return {
                startTime: `${date.getUTCFullYear()}-${paddingLeft((date.getMonth() + 1).toString(), 2)}-${paddingLeft((date.getDate() + addDate).toString(), 2)} 06:00:00`,
                endTime: `${date.getUTCFullYear()}-${paddingLeft((date.getMonth() + 1).toString(), 2)}-${paddingLeft((date.getDate() + addDate).toString(), 2)} 09:00:00`,
                msg: (0 == addDate) ? "今日" : "明日"
            }
        }
    }
}

const APIKey = "CWB-3368DCAB-74F5-4D48-82F3-DA9B5699CE79";
const distritsTarget = [{
    dist: "林口區",
    API: { forecastWeather: "F-D0047-069" }
}, {
    dist: "龜山區",
    API: { forecastWeather: "F-D0047-005" }
}];

const peakTimePeriod = setPeakTime();

let weatherData = createWeaterDataTree(distritsTarget);



function createWeaterDataTree(items) {
    if (0 == items.length) return [];
    let tempArray = [];
    items.reduce((currentItem, item) => {
        tempArray.push({
            dist: item.dist,
            msg: "沒有天氣資料。",
            data: {}
        });
    }, "");
    return tempArray;
}
function setPeakTime() {
    let t = new Date();
    if (9 >= t.getHours()) return new DateTime().period(t, 0);
    return new DateTime().period(t, 1);
}
function paddingLeft(str, lenght) {
    if (str.length >= lenght)
        return str;
    else
        return paddingLeft("0" + str, lenght);
}


let p = new Promise((resolve, reject) => {
    getWeather(distritsTarget);
    //林口、龜山氣象預報 

    function getWeather(dists, apiKey = APIKey) {
        if (0 == dists.length) return;
        fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/${dists[0].API.forecastWeather}?Authorization=${apiKey}&locationName=${dists[0].dist}`)                  // 向 requestURL 發送請求
            .then((response) => response.json()) // 取得伺服器回傳的資料並以 JSON 解析
            .then((data) => {
                console.log(`${dists[0].dist}未來3天天氣預報`, data);
                if (0 == data.records.locations.length) return

                getData(data, weatherData.find(x => x.dist == dists[0].dist));

                dists.shift();
                if (0 == dists.length) return (resolve(weatherData));

                getWeather(dists, apiKey = APIKey)
            }); // 取得解析後的 JSON 資料
    }
});
p.then((result) => {
    render();
});




function getData(data, distItem) {
    let tempData = data.records.locations[0].location.find(x => x.locationName == `${distItem.dist}`);
    if (undefined == tempData) return;
    distItem.msg = "ok";
    distItem.data.closelyObsTime = tempData.weatherElement[1].time[0].startTime;
    distItem.data.closelyWeather = tempData.weatherElement[1].time[0].elementValue[0].value;
    distItem.data.closelyRainningRate = tempData.weatherElement[7].time[0].elementValue[0].value;
    distItem.data.forecastWeather = tempData.weatherElement[1].time.find(x => x.startTime == peakTimePeriod.startTime).elementValue[0].value;
    distItem.data.forecastRainningRate = tempData.weatherElement[7].time.find(x => x.startTime == peakTimePeriod.startTime).elementValue[0].value;
    distItem.data.forecastTemperture = tempData.weatherElement[3].time.find(x => x.dataTime == peakTimePeriod.startTime).elementValue[0].value;
}

function render() {
    weatherData.reduce((currentData, data) => {
        renderData(data, document.querySelector("#forecast-weather"));
    }, "");
}
function renderData(data, parent) {
    let childDivElement = document.createElement("div");
    let childSmallElement = document.createElement("small");
    if ("ok" != data.msg) {
        childDivElement.textContent = `${data.dist}: ${data.msg}`;
        parent.appendChild(childDivElement);
        return;
    }
    childDivElement.textContent = `${data.dist}: 預測 ${peakTimePeriod.msg} 6 AM ~ 9AM 天氣${data.data.forecastTemperture}度，降雨機率${data.data.forecastRainningRate}。`;
    childDivElement.className = "forecast-weather-msg";
    childSmallElement.textContent = `(觀測時間: ${data.data.closelyObsTime})`;
    parent.appendChild(childDivElement);
    childDivElement.appendChild(childSmallElement);
}