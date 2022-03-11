if (!window.indexedDB) {
    window.alert("ur browser does not support the stable version of IndexedDB. Such and such functions will not be available");
} //проверка на поддержку IndexedDB браузером
let adultNum = 0;
let childNum = 0;
let orderNumber = 0;
document.querySelector("#submit").onclick = function () {
    adultNum = document.getElementById("adult").value;
    childNum = document.getElementById("child").value;
if (adultNum > 0 || childNum > 0){

console.log("Заказ оформлен");
//кнопка на JS


let openRequest = indexedDB.open("FrogLandDataBase", 1);

openRequest.onupgradeneeded = function () {
    console.log("Database need to update");
    let db = openRequest.result;
    if (!db.objectStoreNames.contains("orders")) { // если хранилище "orders" не существует
        db.createObjectStore("orders", {
            autoIncrement: true
        }); // создаем хранилище
    }
};

openRequest.onerror = function () {
    console.error("Error", openRequest.error);
    console.log("Error", openRequest.error);
};

openRequest.onsuccess = function () {
    let db = openRequest.result;
    console.log(typeof (db));
    console.log("success");
    // продолжить работу с базой данных, используя объект db

    db.onversionchange = function () {
        db.close();
        alert("База данных устарела, пожалуста, перезагрузите страницу.")
    }; // защита от недостатков IndexedDB


    let transaction = db.transaction("orders", "readwrite"); //объявление транзакции с "orders"
    let orders = transaction.objectStore("orders"); //получение orders
    let newOrder = {
        adult: adultNum,
        child: childNum,
        pay: false
    };

    let request = orders.add(newOrder); // запорс на добавление newOrder в orders

    request.onsuccess = function () {
        console.log("The order was successfully added to the database", request.result);
        orderNumber = request.result;
        console.log(orderNumber);
        document.getElementById("orderNumber").textContent = orderNumber+"00"+adultNum+"00"+childNum;
    };

    request.onerror = function () {
        console.log("Error: The order was not added to the database", request.error);
    };
};
};
};

