var img = document.getElementById("failImage");
var totalImagesSpan = document.getElementById("totalImages");
var sessionImageCountSpan = document.getElementById("sessionImages");
var images;
function saveSession(index, count) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("count", count.toString());
        sessionStorage.setItem("index", index.toString());
    }
}
function onJsonLoadedSuccess() {
    var _a, _b;
    var imageIndex;
    var sessionImagesCount;
    var p = new URLSearchParams(window.location.search);
    if (p.get("restart") == "yes") {
        imageIndex = 0;
        sessionImagesCount = 1;
        saveSession(imageIndex, sessionImagesCount);
    }
    else if (p.get("shuffle") == "yes") {
        imageIndex = Math.floor(Math.random() * images.length);
        sessionImagesCount = 1;
        saveSession(imageIndex, sessionImagesCount);
    }
    else if (typeof (Storage) !== "undefined") {
        sessionImagesCount = (_a = parseInt(sessionStorage.getItem("count"))) !== null && _a !== void 0 ? _a : 0;
        imageIndex = (_b = parseInt(sessionStorage.getItem("index"))) !== null && _b !== void 0 ? _b : 0;
        if (isNaN(sessionImagesCount)) {
            sessionImagesCount = 0;
        }
        if (isNaN(imageIndex)) {
            imageIndex = Math.floor(Math.random() * images.length);
        }
        else {
            imageIndex = (imageIndex + 1) % images.length;
        }
        ++sessionImagesCount;
        saveSession(imageIndex, sessionImagesCount);
    }
    else {
        imageIndex = Math.floor(Math.random() * images.length);
    }
    img.src = "images/" + images[imageIndex];
    totalImagesSpan.innerText = images.length.toString();
    sessionImageCountSpan.innerText = sessionImagesCount == 1 ? "1 image" : "".concat(sessionImagesCount, " images");
}
var xhr = new XMLHttpRequest();
xhr.open('GET', "images.json", true);
xhr.responseType = 'json';
xhr.onload = function () {
    if (xhr.status === 200) {
        images = xhr.response;
        onJsonLoadedSuccess();
    }
    else {
    }
};
xhr.send();
//# sourceMappingURL=index.js.map