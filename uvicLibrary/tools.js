// TODO m: this should be abstracted even more, making a canModules and framework 
// not visible to this file since Private

function messageOne_private(pCanDataArray)
{

	var jsonData = {};

	var engineTemp = pCanDataArray[0];
	var engineTorque = pCanDataArray[1];
	var engineRpm = pCanDataArray[3]*256 + pCanDataArray[2];
	var throttlePercent = pCanDataArray[4] >> 1;
	var fuel = pCanDataArray[5];

	// console.log("Temp: " + engineTemp);
	// console.log("Torque: " + engineTorque);
	// console.log("RPM: " + engineRpm);
	// console.log("throttlePercent: " + throttlePercent);
	// console.log("fuel: " + fuel);

	jsonData = {
		"canId" : 0x100,
		"engineTemp" : engineTemp,
		"engineTorque" : engineTorque,
		"engineRpm" : engineRpm,
		"throttlePercent" : throttlePercent,
		"fuel" : fuel
	}
	
	return jsonData;
}

function messageTwo_private(pCanDataArray)
{
	var jsonData = {};
	// TODO m: Implement all signals

	jsonData = {
		"canId" : 0x200
	}

	return jsonData;
}

function messageThree_private(pCanDataArray)
{
	var jsonData = {};

	var essSoc = pCanDataArray[5] >> 1;
	console.log("ess soc" + essSoc);

	jsonData = {
		"canId" : 0x300,
		"essSoc" : essSoc
	}

	return jsonData;
}

function messageFour_private(pCanDataArray)
{
	// TODO m: implement
	var currentGear = (pCanDataArray[0] >> 2) & 0xF;
	var vehicleSpeed = pCanDataArray[1] >> 1;

	console.log("currentGear: " + currentGear);
	console.log("vehicleSpeed: " + vehicleSpeed);

	jsonData = {
		"canId" : 0x400,
		"currentGear" : currentGear,
		"vehicleSpeed" : vehicleSpeed
	}
}


function messageSelect_private(pCanId, pCanDataArray)
{
	var jsonReturn = {};

	if(pCanId == 0x100)
	{
		jsonReturn = messageOne_private(pCanDataArray);
	}
	else if (pCanId == 0x200)
	{
		jsonReturn = messageTwo_private(pCanDataArray);
	}
	else if (pCanId == 0x300)
	{
		jsonReturn =messageThree_private(pCanDataArray);
	}
	else if (pCanId == 0x400)
	{
		jsonReturn = messageFour_private(pCanDataArray);
	}
	else 
	{
		console.log("wait wut");
		jsonReturn = {};
	}

	return jsonReturn;
}


// Valid Exports below

module.exports = {
	processCanMessage: function (pCanMessage)
	{
		var jsonReturnData = {};

		console.log(pCanMessage);
		var reParseCanString = /([0-9]+)\:([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)/g;
		var match = reParseCanString.exec(pCanMessage);
		var canId;
		var dataArray = []
		if (match)
		{
			canId = match[1];
			dataArray = match.splice(2, 10);
			jsonReturnData = messageSelect_private(canId, dataArray);
		}
		else
		{
			console.log("nada")
		}

		return jsonReturnData;
	},
	foo: function () {
		// whatever
	},
	bar: function () {
		// and amen
	}
};