var Status = {
	"LEFTCHAIR" : 1 << 0,
	"RIGHTCHAIR" : 1 << 1,
	"AC" : 1 << 2,
	"AUTO" : 1 << 3,
	"CIRCULATION" : 1 << 4
};

var AirBtnStatus = {
	"FANIMG"   : 1 << 0,
	"AIRDOWN"  : 1 << 1,
	"AIRUP"    : 1 << 2,
	"AIRRIGHT" : 1 << 3,
	"REAR"     : 1 << 4,
	"FRONT"    : 1 << 5,
};

function setChairButtonImage (ChairImg, leftright, toggle)
{
	ChairImg.src = "./app/images/HMI_HVAC_"+ leftright + "_Chair_"+ toggle + ".svg";
}

function toggleButton( leftright)
{
	var toggle ="ON";
	if ( leftright == "Left") {
		var ChairImg = document.getElementById('LeftChairImg')
		flags ^= Status.LEFTCHAIR;
		if (flags & Status.LEFTCHAIR) {
			toggle = "ON";
		}else {
			toggle = "OFF";
		}
	}
	if ( leftright == "Right") {
		var ChairImg = document.getElementById('RightChairImg')
		flags ^= Status.RIGHTCHAIR;
		if (flags & Status.RIGHTCHAIR) {
			toggle = "ON";
		}else {
			toggle = "OFF";
		}
	}
	setChairButtonImage(ChairImg, leftright,toggle);
	console.log("value=", flags);
}

var flags = 0;
var btn = document.getElementById('ACbtn');
btn.addEventListener('click', function () {
	console.log("before value=", flags);
	flags ^= Status.AC;
	if (flags & Status.AC){
		btn.style.color='#00ADDC';
	}
	else {
		btn.style.color='#848286';
	}
	console.log("value=", flags);
});

var autobtn = document.getElementById('AutoBox');
autobtn.addEventListener('click', function () {
	console.log("before value=", flags);
	flags ^= Status.AUTO;
	if (flags & Status.AUTO){
		autobtn.style.color='#00ADDC';
	}
	else {
		autobtn.style.color='#848286';
	}
	console.log("value=", flags);
});

var AirCon= document.getElementById('AirController');
function toggleCirculate(){
	flags ^= Status.CIRCULATION;
	if ( flags & Status.CIRCULATION){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(AirCon, 'Circulation', toggle);
};

function setAirButtonImg (Img, btnname, active) {
	Img.src = "./app/images/HMI_HVAC_"+ btnname + "_" + active + ".svg";
}

var flg_airbtn = 0;
var FanImg = document.getElementById('Fan-img');
function toggleFanImg(){
	flg_airbtn ^= AirBtnStatus.FANIMG;
	if ( flg_airbtn & AirBtnStatus.FANIMG){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(FanImg, 'Fan', toggle);
};

var AirDwon = document.getElementById('AirDown');
function toggleAirDown(){
	flg_airbtn ^= AirBtnStatus.AIRDOWN;
	if ( flg_airbtn & AirBtnStatus.AIRDOWN ){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(AirDown, 'AirDown', toggle);
};

var AirUp = document.getElementById('AirUp');
function toggleAirUp(){
	flg_airbtn ^= AirBtnStatus.AIRUP;
	if ( flg_airbtn & AirBtnStatus.AIRUP){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(AirUp, 'AirUp', toggle);
};

var AirRight = document.getElementById('AirRight');
function toggleAirRight(){
	flg_airbtn ^= AirBtnStatus.AIRRIGHT;
	if ( flg_airbtn & AirBtnStatus.AIRRIGHT){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(AirRight, 'AirRight', toggle);
};

var Rear = document.getElementById('Rear');
function toggleRear(){
	flg_airbtn ^= AirBtnStatus.REAR;
	if ( flg_airbtn & AirBtnStatus.REAR){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(Rear, 'Rear', toggle);
};

var Front = document.getElementById('Front');
function toggleFront(){
	flg_airbtn ^= AirBtnStatus.FRONT;
	if ( flg_airbtn & AirBtnStatus.FRONT){
		var toggle = "Active";
	} else {
		var toggle = "Inactive";
	}
	setAirButtonImg(Front, 'Front', toggle);
};

