var comfort;
var con;

function Weather(data)
{
	var temperature=(data.result.realtime.temperature).toFixed(0);
	var skycon=data.result.realtime.skycon;
	var rainfall=data.result.realtime.precipitation.local.intensity;
	var condition;
	var aqi=data.result.realtime.aqi;
	var aqi_color;
	var aqi_description;
	var wind_direction=data.result.realtime.wind.direction;
	var wind_speed=(data.result.realtime.wind.speed).toFixed(2);
	var humidity=(data.result.realtime.humidity*100).toFixed(0);
	var pressure=(data.result.realtime.pres/100).toFixed(2);
	comfort=data.result.daily.comfort[0].index;
	con=data.result.daily.skycon[0].value;
	var Max_temperature=(data.result.daily.temperature[0].max).toFixed(1);
	var Min_temperature=(data.result.daily.temperature[0].min).toFixed(1);

	if (skycon=="RAIN" || skycon=="SNOW")
		if (rainfall<=0.25)
			condition=skycon=="RAIN"?"小雨":"小雪";
		else if (rainfall<=0.35)
			condition=skycon=="RAIN"?"中雨":"中雪";
		else if (rainfall<=0.48)
			condition=skycon=="RAIN"?"大雨":"大雪";
		else 
			condition=skycon=="RAIN"?"暴雨":"暴雪";
	else if (skycon=="CLEAR_DAY" || skycon=="CLEAR_NIGHT")
		condition="晴";
	else if (skycon=="PARTLY_CLOUDY_DAY" || skycon=="PARTLY_CLOUDY_NIGHT")
		condition="多云";
	else if (skycon=="CLOUDY")
		condition="阴";
	else if (skycon=="HAZE")
		condition="霾";

	if (aqi<=50)
		{aqi_color="#80FF80";aqi_description="优";}
	else if (aqi<=100)
		{aqi_color="#FFFF80";aqi_description="良";}
	else if (aqi<=150)
		{aqi_color="#FFC080";aqi_description="轻度污染";}
	else if (aqi<=200)
		{aqi_color="#FF8080";aqi_description="中度污染";}
	else if (aqi<=300)
		{aqi_color="#994D73";aqi_description="重度污染";}
	else
		{aqi_color="#7E3D4F";aqi_description="严重污染";}

	var text=	"<p align='left'>"+
				"<font style='color: #FFFFFF ;font-size: 120px'>"+
				temperature+
				"</font>"+
				"<font style='color: #FFFFFF ;font-size: 60px'>"+
				"℃"+
				"</font>"+
				"<img src='./icon/"+skycon+".png' align='left' height=180px width=180px><br>"+
				"<font style='color: #FFFFFF ;font-size: 20px'>"+
				"&nbsp;"+condition+"&nbsp;|&nbsp;"+Max_temperature+"℃/"+Min_temperature+"℃"+
				"<br><table style='color: #FFFFFF ;font-size: 20px'><tr>"+
				"<td><img src='./icon/WIND.png' align='centre' height=40px width=40px></td>"+
				"<td>&nbsp;"+wind_speed+"&nbsp;km/h&nbsp;&nbsp;"+wind_direction+"°</td>"+
				"</tr><tr>"+
				"<td><img src='./icon/PRESSURE.png' align='centre' height=40px width=40px></td>"+
				"<td>&nbsp;"+pressure+"&nbsp;hPa</td>"+
				"</tr><tr>"+
				"<td><img src='./icon/HUMIDITY.png' align='centre' height=40px width=40px></td>"+
				"<td>&nbsp;"+humidity+"&nbsp;%</td>"+
				"</tr><tr>"+
				"<td><img src='./icon/AQI.png' align='centre' height=40px width=40px></td>"+
				"<td style='color:"+aqi_color+"'>&nbsp;"+aqi+"&nbsp&nbsp&nbsp"+aqi_description+"</td>"+
				"</tr></font></p>";
	document.getElementById("weather").innerHTML=text;
}
	
function Data()
{
	$.getJSON("https://api.caiyunapp.com/v2/2Nz1KiLTJ1CUH82o/117.25,31.83/weather.jsonp?callback=?",
		function(data){Weather(data);});
}

$(function(){setInterval(Data,600000);});
$(function(){Data();});