var video = document.getElementById('video');
video.autoplay = true;
video.loop = true;

video.addEventListener('play', function() {
});
video.addEventListener('pause', function() {
});

var progressTime = document.getElementById('progressTime');

var currentTime = document.getElementById('currentTime');
video.addEventListener('timeupdate', function() {
    progressTime.textContent = (Math.floor(video.currentTime)/Math.floor(video.duration)).toFixed(1);
    currentTime.textContent = Math.floor(video.currentTime);
});

var totalTime = document.getElementById('totalTime');
video.addEventListener('loadedmetadata', function() {
    totalTime.textContent = Math.floor(video.duration);
});

var play = document.getElementById('play');
play.addEventListener('click', function () {
    video.play();
});

var stop = document.getElementById('stop');
stop.addEventListener('click', function () {
    video.pause();
    video.currentTime = 0;
});

var pause = document.getElementById('pause');
pause.addEventListener('click', function () {
    video.pause();
});

var Looping = document.getElementById('Looping');
Looping.addEventListener('click', function () {
    if(video.loop){
    	video.loop = false;
	Looping.textContent = "Loop Off"
        console.log('loop off');
    }else{
    	video.loop = true;
	Looping.textContent = "Loop On"
        console.log('loop on');
    }
});


var mp4_name = [2];
mp4_name[0] = "./test.mp4"
mp4_name[1] = "./testB.mp4"
var index = 0;

var next  = document.getElementById('next');
next.addEventListener('click', function () {

  if (index == 0 ){
    video.src = mp4_name[1];
    index = 1;
  } else {
    video.src = mp4_name[0];
    index = 0;
  }
    video.load();
    video.play();

});

//<meta name="viewport" content="width=device-width,initial-scale=1">
