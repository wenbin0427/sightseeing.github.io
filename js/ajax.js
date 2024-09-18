document.addEventListener('DOMContentLoaded', function() {
    fetch('https://www.iotsvm.shop/sightseeing/areas.json')
        .then(response => response.json())
        .then(data => {
            const selectElement = document.getElementById('areaSelect');
            data.縣市.forEach(function(area) {
                const option = document.createElement('option');
                option.value = area;
                option.textContent = area;
                selectElement.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading JSON data:', error));
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var selectedValue = $('#areaSelect').val();
var selectinput = $('#factoryname').val();
console.log('選擇的區域:' + selectedValue);
console.log('輸入的是:' + selectinput);

// 顯示所有觀光工廠
var openUrl = "https://www.iotsvm.shop/sightseeing/sightseeingdata.json";
var xhr = new XMLHttpRequest();
xhr.open('GET', openUrl, true);
xhr.send();
xhr.onreadystatechange = function() {
if (this.readyState === 4 && this.status === 200) {
    var data = JSON.parse(this.responseText);
    var container = $('#viewfactory');
    var modalview_container = $('#modalview');

    container.empty(); // 清空容器
    modalview_container.empty();

    var found = false; // 用於檢查是否找到一樣的工廠
    data.forEach(function(factory, index) {
        var name = factory['觀光工廠名稱'];
        var address = factory['地址'];
        var url = factory['網址'];
        var area = factory['地區別'];
        var city=factory['縣市'];
        var phone=factory['觀光工廠預約電話'];

        if(name!=""){
            // 根據使用者的輸入進行篩選
            var matchesName = !selectinput || name.includes(selectinput);
            var matchesArea = !selectedValue || address.includes(selectedValue);
        
            // 如果工廠名稱或區域有一樣，則顯示該工廠
            if (matchesName && matchesArea) {
                found = true; // 找到一樣的工廠
                var modalId = `introduce${index}`; // 每個工廠生成唯一的彈窗ID
                let randomInt = getRandomInt(100, 500); //隨機產生圖片ID
                var card = `
                    <div class="col-6 col-sm-3 mt-2">
                        <div class="card shadow">
                            <img class="img-fluid" src="https://picsum.photos/id/${randomInt}/600/400" alt="">                            
                            <div class="card-body">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">${address}</p>
                                <div class="row">
                                    <div class="col">
                                        <button class="btn btn-warning w-100 introducebt" data-bs-toggle="modal" data-bs-target="#${modalId}">工廠介紹</button>
                                    </div>
                                    <div class="col">
                                        <a href="${url}" class="btn btn-primary w-100" target="_blank">工廠網站</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                container.append(card);

                var modal = `
                    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel${index}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel${index}">${name}工廠介紹</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body row">
                                    <div class="col-12 col-sm-4 d-flex align-items-center">
                                        <div class="list-group">
                                          <p>工廠名稱：${name}</p>
                                          <p>工廠所在地區：${area}</p>
                                          <p>工廠所在縣市：${city}</p>
                                          <p>工廠電話：${phone}</p>
                                          <p>工廠地址：${address}</p>
                                        </div>                                    
                                    </div>
                                    <div class="col-12 col-sm-8 mt-sm-0 mt-5 map-container">
                                        <iframe class="img-fluid w-100 h-100" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com.tw/maps?f=q&hl=zh-TW&geocode=&q=${name}(${address})&z=16&output=embed&t="></iframe>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                                    <a href="${url}" class="btn btn-primary" target="_blank">工廠網站</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                modalview_container.append(modal);
            }
        }
    });
}
}



