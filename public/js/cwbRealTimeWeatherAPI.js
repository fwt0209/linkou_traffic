class RealTimeWeather {
    constructor(parentElement, distritsTarget, aipKey) {
        this.aipKey = aipKey;
        this.distritsTarget = distritsTarget;
        this.parentElement = parentElement;
        this.weatherData = this.createWeaterDataTree(this.distritsTarget);
        this.getWeather(this.distritsTarget);
    }

    createWeaterDataTree(items) {
        if (0 == items.length) return [];
        let tempArray = [];
        items.reduce((currentItem, item) => {
            tempArray.push({
                dist: item,
                msg: "目前沒有天氣資料。",
                data: {}
            });
        }, "");
        return tempArray;
    }


    getWeather(dist, apiNo = "O-A0001-001", apiKey = this.aipKey) {
        fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/${apiNo}?Authorization=${apiKey}&locationName=${dist}`)                  // 向 requestURL 發送請求
            .then((response) => response.json()) // 取得伺服器回傳的資料並以 JSON 解析
            .then((data) => {
                console.log("即時天氣資料", data);
                if (0 == data.records.location.length) return

                this.getObsData(data, this.weatherData);
                this.render();
            }); // 取得解析後的 JSON 資料
    }
    getObsData(data, distItem) {
        distItem.reduce((currentItem, item) => {
            let tempData = data.records.location.find(x => x.locationName == item.dist);
            if (undefined == tempData) return;

            item.msg = "ok";
            item.data.obsTime = tempData.time.obsTime;
            item.data.obsTempture = tempData.weatherElement.find(x => x.elementName == "TEMP").elementValue;
        }, "");

    }


    render() {
        this.weatherData.reduce((currentData, data) => {
            this.renderDate(data, this.parentElement);
        }, "");
    }
    renderDate(data, parent) {
        let childDivElement = document.createElement("div");
        let childSmallElement = document.createElement("small");
        if ("ok" != data.msg) {
            childDivElement.textContent = `${data.dist}區: ${data.msg}`;
            parent.appendChild(childDivElement);
            return;
        }
        childDivElement.textContent = `${data.dist}區: ${data.data.obsTempture} 度。`;
        childDivElement.className = "realTime-weather-msg";
        childSmallElement.textContent = `(觀測時間: ${data.data.obsTime})`;
        parent.appendChild(childDivElement);
        childDivElement.appendChild(childSmallElement);
    }
}