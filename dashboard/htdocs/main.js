var token = new URLSearchParams(window.location.search).get('token');

var VAL_ENG_OIL_TEMP_MAX = 100  // Maximum engine oil temperature (100 * 1.00000f)
var VAL_RPM_MAX = 6975.75	   // Maximum RPM (27903 * 0.250000f)
var VAL_FUEL_MAX = 100.000035   // Maximum fuel (255* 0.392157f)

var STR_OPEN = 'OPEN'
var STR_CLOSE = 'CLOSE'

var afb;
var ws;
var bar_eng_oil_temp;
var bar_rpm;
var bar_fuel;

function retWindowDoorState(state) {
	var str;
	if (state) {
		str = STR_OPEN;
	}
	else {
		str = STR_CLOSE;
	}
	return str
}

function switchWindowDoorWarningIcon(id, state) {
	var visibility;
	if (state) {
		visibility = "visible";

	}
	else {
		visibility = "hidden";
	}
	document.getElementById(id).style.visibility = visibility;
}

function switchWindowDoorStatus(state_id, img_id, state) {
	var str;
	var visibility;
	var color;

	if (state) {
		str = STR_OPEN;
		visibility = "visible";
		color = "red";
	}
	else {
		str = STR_CLOSE;
		visibility = "hidden";
		color = "cyan";
	}
	document.getElementById(state_id).innerHTML = str;
	document.getElementById(state_id).style.color = color;
	document.getElementById(img_id).style.visibility = visibility;
}

function eventProc(obj) {
	switch(obj.data.name) {
		/* 0x3D9 */
		case "messages.engine.speed":
			// Update rpm bar
			bar_rpm.animate(obj.data.value / VAL_RPM_MAX);
			break;
		case "messages.fuel.level.low":
			// Switch icon
			if (obj.data.value) {
				document.getElementById("FuelImg").src = "./images/HMI_Dashboard_Fuel_Icon_NG.svg"
			}
			else {
				document.getElementById("FuelImg").src = "./images/HMI_Dashboard_Fuel_Icon.svg"
			}
			break;
		case "messages.fuel.level":
			// Update fuel level bar
			bar_fuel.animate(obj.data.value / VAL_FUEL_MAX);
			break;
		/* 0x3E9 */
		case "messages.vehicle.average.speed":
			document.getElementById("speed").innerHTML = parseInt(obj.data.value);
			break;
		/* 0x4D1 */
		case "messages.engine.oil.temp":
			// Update engine oil temperature bar
			bar_eng_oil_temp.animate(obj.data.value / VAL_ENG_OIL_TEMP_MAX);
			break;
		case "messages.engine.oil.temp.high":
			// Switch icon
			if (obj.data.value) {
				document.getElementById("EngineOilTemperatureImg").src = "./images/HMI_Dashboard_Temperature_Icon_NG.svg"
			}
			else {
				document.getElementById("EngineOilTemperatureImg").src = "./images/HMI_Dashboard_Temperature_Icon.svg"

			}
			break;
		/* 0x620 */
		case "messages.doors.boot.open":
			switchWindowDoorStatus("doors.boot.open", "DoorsBootImg", obj.data.value);
			break;
		case "messages.doors.front_left.open":
			switchWindowDoorStatus("doors.front_left.open", "DoorsFrontLeftImg", obj.data.value);
			break;
		case "messages.doors.front_right.open":
			switchWindowDoorStatus("doors.front_right.open", "DoorsFrontRightImg", obj.data.value);
			break;
		case "messages.doors.rear_left.open":
			switchWindowDoorStatus("doors.rear_left.open", "DoorsRearLeftImg", obj.data.value);
			break;
		case "messages.doors.rear_right.open":
			switchWindowDoorStatus("doors.rear_right.open", "DoorsRearRightImg", obj.data.value);
			break;
		/* 0x799 */
		case "messages.windows.front_left.open":
			switchWindowDoorStatus("windows.front_left.open", "WindowFrontLeftImg", obj.data.value);
			break;
		case "messages.windows.front_right.open":
			switchWindowDoorStatus("windows.front_right.open", "WindowFrontRightImg", obj.data.value);
			break;
		case "messages.windows.rear_left.open":
			switchWindowDoorStatus("windows.rear_left.open", "WindowRearLeftImg", obj.data.value);
			break;
		case "messages.windows.rear_right.open":
			switchWindowDoorStatus("windows.rear_right.open", "WindowRearRightImg", obj.data.value);
			break;
	}
}

function onAbort() {
	alert('onAbort');
}

function onOpen() {
	ws.call("low-can/subscribe", {event:[
		"messages.engine.speed",
		"messages.fuel.*",
		"messages.vehicle.average.speed",
		"messages.engine.oil.*",
		"messages.doors.*",
		"messages.windows.*"]}
	).then(onSubscribed, onAbort);
	ws.onevent("low-can", eventProc);
}

function onClose() {
	ws.call("low-can/unsubscribe", {event:[
		"messages.engine.speed",
		"messages.fuel.*",
		"messages.vehicle.average.speed",
		"messages.engine.oil.*",
		"messages.doors.*",
		"messages.windows.*"]},
		onUnsubscribed, onAbort);
}

function onSubscribed() {
	ws.onevent("low-can/messages", eventProc);
}

function onUnsubscribed() {
	alert('onUnsubscribed');
}

function init() {
	var base = new Object();
	base.host = serverHost + ":" + dashBoardPort;
	//base.token = token;
	afb = new AFB({token:m_token||'HELLO'});
	ws = new afb.ws(onOpen, onAbort);

	// Set progress bar
	//// Engine oil temperature
	bar_eng_oil_temp = new ProgressBar.Line(document.getElementById('EngineOilTemperatureBar'), {
		color: "lime",
		trailColor: "#aaa",
		duration: 100,
		svgStyle: {width: '100%', height: '30%'}
	});

	//// RPM
	bar_rpm = new ProgressBar.Line(document.getElementById('RPMBar'), {
		color: "lime",
		trailColor: "#aaa",
		duration: 100,
		svgStyle: {width: '100%', height: '30%'}
	});

	//// Fuel
	bar_fuel = new ProgressBar.Line(document.getElementById('FuelBar'), {
		color: "lime",
		trailColor: "#aaa",
		duration: 100,
		svgStyle: {width: '100%', height: '30%'}
	});
}

window.onload = function(){
	init();
}
