// TODO m: this should be abstracted even more, making a canModules and framework 
// not visible to this file since Private

//Currently not in infotainment CAN messages:
//"engineTorque" : engineTorque,

function messageFast_private(pCanDataArray)
{

	var jsonData = {};
	var engineThrottlePercent = pCanDataArray[0]>>1;
	var motorThrottlePercent = pCanDataArray[1]>>1;
	var engineRpm = pCanDataArray[3]*256+pCanDataArray[2];
	var vehicleSpeed = pCanDataArray[4]>>1;
	var essSoc = pCanDataArray[5]>>1;
	var currentGear = pCanDataArray[6]&0xF;


	jsonData = {
		canId : 0x101,
		"engineRpm" : parseInt(engineRpm),
		"vehicleSpeed" : vehicleSpeed,
		"essSoc" : essSoc,
		"currentGear" : currentGear
	}
	return jsonData;
}

function messageSlow_private(pCanDataArray)
{
	var jsonData = {};
	var vehicleDistance = pCanDataArray[1]*256+pCanDataArray[0];
	var throttlePercent = pCanDataArray[2]>>1;
	var brakePercent = pCanDataArray[3]>>1;
	var fuel = pCanDataArray[4]>>1;
	var GLV_cockpit_BRB = pCanDataArray[5]&0x1;
	var GLV_TSMS = (pCanDataArray[5]>>1)&0x1;
	var Control_Mode = (pCanDataArray[5]>>2)&0x3;
	var engineTemp = pCanDataArray[6];
	jsonData = {
		canId : 0x102,
		"throttlePercent" : throttlePercent,
		"fuel" : fuel,
		"engineTemp" : parseInt(engineTemp)
	}
	return jsonData;

}

function messageWarnings_private(pCanDataArray)
{
	var fuel_level_low = (pCanDataArray[0]>>1)&0x1;
	var glv_soc_low = (pCanDataArray[0]>>3)&0x1;
	var ess_over_temp = (pCanDataArray[0]>>4)&0x1;
	var transmission_failure = (pCanDataArray[0]>>5)&0x1;
	jsonData = {
		canId : 0x200,
		"fuel_level_low" : fuel_level_low,
		"glv_soc_low" : glv_soc_low,
		"ess_over_temp" : ess_over_temp,
		"transmission_failure" : transmission_failure

	}
	return jsonData;
}


/*
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

	jsonData = {
		"canId" : 0x400,
		"currentGear" : currentGear,
		"vehicleSpeed" : vehicleSpeed
	}
}
*/

function messageSelect_private(pCanId, pCanDataArray)
{
	var jsonReturn = {};
/*
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
*/
	if(pCanId == 0x101){
		jsonReturn = messageFast_private(pCanDataArray);

	}else if (pCanId == 0x102){
		jsonReturn = messageSlow_private(pCanDataArray);

	}else if (pCanId == 0x200){
		jsonReturn = messageWarnings_private(pCanDataArray);

	}

	return jsonReturn;
}


// Valid Exports below

module.exports = {
	processCanMessage: function (pCanMessage)
	{
		var jsonReturnData = {};

		var reParseCanString = /([0-9]+)\:([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,([0-9]+)\,?([0-9]+)?/g;
		var match = reParseCanString.exec(pCanMessage);
		var canId;
		var dataArray = []
		if (match)
		{
			canId = match[1];

			if (isNaN(match[10]))
			{
				//console.log("nan ayy")
				dataArray = match.splice(2, 9);
				dataArray[7] = 0;
			}
			else
			{
				//console.log("is a n")
				dataArray = match.splice(2, 10);
			}

			jsonReturnData = messageSelect_private(canId, dataArray);
		}
		else
		{
			// console.log("nada")
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