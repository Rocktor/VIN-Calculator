function CalcVIN()
{
	var STRICT_CHECK_DIGIT = true;
	var SUCCESS = "#00C000";
	var ERROR = "Red";
	var NORMAL = "Black";
	var DMC_Logic = document.getElementById("chkDMC").checked;
	var input = document.getElementById("vinCalcInput").value;
	var output = input;
	var isDMCSuffix = /^\d{3,6}$/.test(output);

	if (output.length == 0)
	{
		document.getElementById("vinCalcOutput").innerHTML = "";
		return;
	}

	if (DMC_Logic && isDMCSuffix)
	{//3-6 numbers, so assume DeLorean VIN
		var number = parseInt(output) % 1000000; //Ignore additional characters

		output = "SCEDT26TX";

		if (number < 10000)
		{//1981 VIN's
			output += "BD";
		}
		else if (number < 15000)
		{//1982 VIN's
			output += "CD";
		}
		else
		{//1983 VIN's
			output += "DD";
		}

		var strNumber = '' + number;

		while (strNumber.length < 6)
		{
			strNumber = '0' + strNumber;
		}

		output += strNumber;
	}

	if (output.length == 17)
	{
		if (STRICT_CHECK_DIGIT && !/^[\dA-HJ-NPR-Z]{8}[\dX][\dA-HJ-NPR-Z]{8}$/i.test(output))
		{
			document.getElementById("vinCalcOutput").innerHTML = "Invalid characters in VIN!";
			document.getElementById("vinCalcOutput").style.color = ERROR;
			return;
		}

		if (/^[\dA-HJ-NPR-Z]{8}.[\dA-HJ-NPR-Z]{8}$/i.test(output))
		{
			var vinChars = output.toUpperCase().split("");
			var currChecksum = 0;
			var checksumTotal = 0;

			for (var i = 1; i <= vinChars.length; i++)
			{
				switch (vinChars[i - 1])
				{
					case "1":
					case "A":
					case "J":
						currChecksum = 1;
						break;
					case "2":
					case "B":
					case "K":
					case "S":
						currChecksum = 2;
						break;
					case "3":
					case "C":
					case "L":
					case "T":
						currChecksum = 3;
						break;
					case "4":
					case "D":
					case "M":
					case "U":
						currChecksum = 4;
						break;
					case "5":
					case "E":
					case "N":
					case "V":
						currChecksum = 5;
						break;
					case "6":
					case "F":
					case "W":
						currChecksum = 6;
						break;
					case "7":
					case "G":
					case "P":
					case "X":
						currChecksum = 7;
						break;
					case "8":
					case "H":
					case "Y":
						currChecksum = 8;
						break;
					case "9":
					case "R":
					case "Z":
						currChecksum = 9;
						break;
					case "0":
					default:
						currChecksum = 0;
						break;
				}

				checksumTotal += currChecksum * (i % 10 == 8 ? 10 : 9 - (i % 10));
			}

			checksumTotal %= 11;
			output = output.substring(0, 8) + (checksumTotal == 10 ? "X" : checksumTotal) + output.substring(9, 17);
		}
		else
		{
			document.getElementById("vinCalcOutput").innerHTML = "Invalid characters in VIN!";
			document.getElementById("vinCalcOutput").style.color = ERROR;
			return;
		}
	}
	else
	{
		document.getElementById("vinCalcOutput").innerHTML = "VIN too short" + (DMC_Logic ? " and not numeric!" : "!");
		document.getElementById("vinCalcOutput").style.color = ERROR;
		return;
	}

	if (isDMCSuffix)
	{
		document.getElementById("vinCalcOutput").innerHTML = output;
		document.getElementById("vinCalcOutput").style.color = NORMAL;
	}
	else if (input == output)
	{
		document.getElementById("vinCalcOutput").innerHTML = "Check Digit Valid!";
		document.getElementById("vinCalcOutput").style.color = SUCCESS;
	}
	else
	{
		document.getElementById("vinCalcOutput").innerHTML = "Check Digit Invalid!<br /><br />Corrected VIN:<br />" + output;
		document.getElementById("vinCalcOutput").style.color = ERROR;
	}
}
