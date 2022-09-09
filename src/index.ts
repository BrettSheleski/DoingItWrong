
let img = <HTMLImageElement>document.getElementById("failImage");
let totalImagesSpan = document.getElementById("totalImages");
let sessionImageCountSpan = document.getElementById("sessionImages");

let images: Array<string>;

function saveSession(index: number, count: number) {
    if (typeof (Storage) !== "undefined") {
        sessionStorage.setItem("count", count.toString());
        sessionStorage.setItem("index", index.toString())
    }
}

function onJsonLoadedSuccess() {



    let imageIndex: number;
    let sessionImagesCount: number;


    let p = new URLSearchParams(window.location.search);

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

        sessionImagesCount = parseInt(sessionStorage.getItem("count")) ?? 0;
        imageIndex = parseInt(sessionStorage.getItem("index")) ?? 0;

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

    } else {
        imageIndex = Math.floor(Math.random() * images.length);
    }

    img.src = "images/" + images[imageIndex];
    totalImagesSpan.innerText = images.length.toString();
    sessionImageCountSpan.innerText = sessionImagesCount == 1 ? "1 image" : `${sessionImagesCount} images`;

}



var xhr = new XMLHttpRequest();
xhr.open('GET', "images.json", true);
xhr.responseType = 'json';
xhr.onload = function () {
    if (xhr.status === 200) {
        images = xhr.response;
        onJsonLoadedSuccess();
    } else {

    }
};
xhr.send();
