let btnEmpezar = document.getElementById('empezar');
let btnTerminar = document.getElementById('terminar');
let video = document.getElementById('video');
let mostrarGif = document.getElementById('mostrarGif');
let recorder = null;
let form = new FormData();
let myGifs = [];

window.onload = function () {
    let gifs = JSON.parse(localStorage.getItem('myGifs'));
    if (gifs) {
        myGifs = gifs;
    }
    console.log('Mis gifs cargados', myGifs);
}

btnEmpezar.addEventListener('click', () => {
    getStreamAndRecord();
});

btnTerminar.addEventListener('click', () => {
    recorder.stopRecording(async() => {
        let blob = recorder.getBlob();
        var uri = URL.createObjectURL(blob);
        mostrarGif.src = uri;
        form.append('file', blob, 'myGif.gif');
        console.log(form.get('file'));
        let idCreated = await createGif(form);
        myGifs.push(idCreated);
        localStorage.setItem('myGifs', JSON.stringify(myGifs));
        console.log('Mis gifs guardados', myGifs);
    });
})

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia(
        {
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
            recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                },
            });
            recorder.startRecording();
        })
        .catch(function (err) {
            console.log('error', err);
        });
}

const apikey = 'VGV16gAxmvVNiaQDsAlPqSFtInXbLyqA';
const pathTendencias = `https://upload.giphy.com/v1/gifs?api_key=${apikey}`;

async function createGif(formData) {
    const response = await fetch(pathTendencias, {
        method: 'POST',
        body: formData
    });
    const result = await response.json();
    console.log(result.data.id);
    return result.data.id;
}