var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
function onDeviceReady() {
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;

}

function capturePhoto() {
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
}

function onFail(message) {
    alert('Failed because: ' + message);
}