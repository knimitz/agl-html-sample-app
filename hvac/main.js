var Status = {
	"LEFTCHAIR" : 1 << 0,
	"RIGHTCHAIR" : 1 << 1,
	"AC" : 1 << 2,
	"AUTO" : 1 << 3,
	"CIRCULATION" : 1 << 4
};


function toggleButton()
{
	flags ^= Status.LEFTCHAIR;
	if (flags & Status.LEFTCHAIR) {
		var toggle = "ON";
	}else {
		var toggle = "OFF";
	}
	document.getElementById('LeftChairImg').src =
	 "./app/images/HMI_HVAC_Left_Chair_"+ toggle + ".svg";
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
