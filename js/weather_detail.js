var page;
var hour;
var hourly_skycon;
var hourly_temperature;

function Weather_Detail(data)
{
	var tag=0;
	var temperature=(data.result.realtime.temperature).toFixed(0);
	var skycon=data.result.realtime.skycon;
	var rainfall=data.result.realtime.precipitation.local.intensity;
	var condition;
	var Max_temperature=(data.result.daily.temperature[0].max).toFixed(1);
	var Min_temperature=(data.result.daily.temperature[0].min).toFixed(1);
	var forecast_keypoint=data.result.forecast_keypoint;
	var hourly_description=data.result.hourly.description;
	var date=  [data.result.daily.temperature[0].date.split("-"),
				data.result.daily.temperature[1].date.split("-"),
				data.result.daily.temperature[2].date.split("-"),
				data.result.daily.temperature[3].date.split("-"),
				data.result.daily.temperature[4].date.split("-")];
	var daily_skycon=  [data.result.daily.skycon[0].value,
						data.result.daily.skycon[1].value,
						data.result.daily.skycon[2].value,
						data.result.daily.skycon[3].value,
						data.result.daily.skycon[4].value];
	var daily_Max_temperature= [data.result.daily.temperature[0].max.toFixed(0),
								data.result.daily.temperature[1].max.toFixed(0),
								data.result.daily.temperature[2].max.toFixed(0),
								data.result.daily.temperature[3].max.toFixed(0),
								data.result.daily.temperature[4].max.toFixed(0)];
	var daily_Min_temperature= [data.result.daily.temperature[0].min.toFixed(0),
								data.result.daily.temperature[1].min.toFixed(0),
								data.result.daily.temperature[2].min.toFixed(0),
								data.result.daily.temperature[3].min.toFixed(0),
								data.result.daily.temperature[4].min.toFixed(0)];
	hour=      [data.result.hourly.skycon[0].datetime.split("\x20")[1]+"<font style='font-size: 12px; color: rgba(255,255,255,0.625)'>现在</font>",
				data.result.hourly.skycon[1].datetime.split("\x20")[1],
				data.result.hourly.skycon[2].datetime.split("\x20")[1],
				data.result.hourly.skycon[3].datetime.split("\x20")[1],
				data.result.hourly.skycon[4].datetime.split("\x20")[1],
				data.result.hourly.skycon[5].datetime.split("\x20")[1],
				data.result.hourly.skycon[6].datetime.split("\x20")[1],
				data.result.hourly.skycon[7].datetime.split("\x20")[1],
				data.result.hourly.skycon[8].datetime.split("\x20")[1],
				data.result.hourly.skycon[9].datetime.split("\x20")[1],
				data.result.hourly.skycon[10].datetime.split("\x20")[1],
				data.result.hourly.skycon[11].datetime.split("\x20")[1],
				data.result.hourly.skycon[12].datetime.split("\x20")[1],
				data.result.hourly.skycon[13].datetime.split("\x20")[1],
				data.result.hourly.skycon[14].datetime.split("\x20")[1],
				data.result.hourly.skycon[15].datetime.split("\x20")[1],
				data.result.hourly.skycon[16].datetime.split("\x20")[1],
				data.result.hourly.skycon[17].datetime.split("\x20")[1],
				data.result.hourly.skycon[18].datetime.split("\x20")[1],
				data.result.hourly.skycon[19].datetime.split("\x20")[1],
				data.result.hourly.skycon[20].datetime.split("\x20")[1],
				data.result.hourly.skycon[21].datetime.split("\x20")[1],
				data.result.hourly.skycon[22].datetime.split("\x20")[1],
				data.result.hourly.skycon[23].datetime.split("\x20")[1],
				data.result.hourly.skycon[24].datetime.split("\x20")[1],
				data.result.hourly.skycon[25].datetime.split("\x20")[1],
				data.result.hourly.skycon[26].datetime.split("\x20")[1],
				data.result.hourly.skycon[27].datetime.split("\x20")[1],
				data.result.hourly.skycon[28].datetime.split("\x20")[1],
				data.result.hourly.skycon[29].datetime.split("\x20")[1],
				data.result.hourly.skycon[30].datetime.split("\x20")[1],
				data.result.hourly.skycon[31].datetime.split("\x20")[1],
				data.result.hourly.skycon[32].datetime.split("\x20")[1],
				data.result.hourly.skycon[33].datetime.split("\x20")[1],
				data.result.hourly.skycon[34].datetime.split("\x20")[1],
				data.result.hourly.skycon[35].datetime.split("\x20")[1],
				data.result.hourly.skycon[36].datetime.split("\x20")[1],
				data.result.hourly.skycon[37].datetime.split("\x20")[1],
				data.result.hourly.skycon[38].datetime.split("\x20")[1],
				data.result.hourly.skycon[39].datetime.split("\x20")[1],
				data.result.hourly.skycon[40].datetime.split("\x20")[1],
				data.result.hourly.skycon[41].datetime.split("\x20")[1],
				data.result.hourly.skycon[42].datetime.split("\x20")[1],
				data.result.hourly.skycon[43].datetime.split("\x20")[1],
				data.result.hourly.skycon[44].datetime.split("\x20")[1],
				data.result.hourly.skycon[45].datetime.split("\x20")[1],
				data.result.hourly.skycon[46].datetime.split("\x20")[1],
				data.result.hourly.skycon[47].datetime.split("\x20")[1]];
	hourly_skycon=     [data.result.hourly.skycon[0].value,
						data.result.hourly.skycon[1].value,
						data.result.hourly.skycon[2].value,
						data.result.hourly.skycon[3].value,
						data.result.hourly.skycon[4].value,
						data.result.hourly.skycon[5].value,
						data.result.hourly.skycon[6].value,
						data.result.hourly.skycon[7].value,
						data.result.hourly.skycon[8].value,
						data.result.hourly.skycon[9].value,
						data.result.hourly.skycon[10].value,
						data.result.hourly.skycon[11].value,
						data.result.hourly.skycon[12].value,
						data.result.hourly.skycon[13].value,
						data.result.hourly.skycon[14].value,
						data.result.hourly.skycon[15].value,
						data.result.hourly.skycon[16].value,
						data.result.hourly.skycon[17].value,
						data.result.hourly.skycon[18].value,
						data.result.hourly.skycon[19].value,
						data.result.hourly.skycon[20].value,
						data.result.hourly.skycon[21].value,
						data.result.hourly.skycon[22].value,
						data.result.hourly.skycon[23].value,
						data.result.hourly.skycon[24].value,
						data.result.hourly.skycon[25].value,
						data.result.hourly.skycon[26].value,
						data.result.hourly.skycon[27].value,
						data.result.hourly.skycon[28].value,
						data.result.hourly.skycon[29].value,
						data.result.hourly.skycon[30].value,
						data.result.hourly.skycon[31].value,
						data.result.hourly.skycon[32].value,
						data.result.hourly.skycon[33].value,
						data.result.hourly.skycon[34].value,
						data.result.hourly.skycon[35].value,
						data.result.hourly.skycon[36].value,
						data.result.hourly.skycon[37].value,
						data.result.hourly.skycon[38].value,
						data.result.hourly.skycon[39].value,
						data.result.hourly.skycon[40].value,
						data.result.hourly.skycon[41].value,
						data.result.hourly.skycon[42].value,
						data.result.hourly.skycon[43].value,
						data.result.hourly.skycon[44].value,
						data.result.hourly.skycon[45].value,
						data.result.hourly.skycon[46].value,
						data.result.hourly.skycon[47].value];
	hourly_temperature=	    [data.result.hourly.temperature[0].value.toFixed(1),
							data.result.hourly.temperature[1].value.toFixed(1),
							data.result.hourly.temperature[2].value.toFixed(1),
							data.result.hourly.temperature[3].value.toFixed(1),
							data.result.hourly.temperature[4].value.toFixed(1),
							data.result.hourly.temperature[5].value.toFixed(1),
							data.result.hourly.temperature[6].value.toFixed(1),
							data.result.hourly.temperature[7].value.toFixed(1),
							data.result.hourly.temperature[8].value.toFixed(1),
							data.result.hourly.temperature[9].value.toFixed(1),
							data.result.hourly.temperature[10].value.toFixed(1),
							data.result.hourly.temperature[11].value.toFixed(1),
							data.result.hourly.temperature[12].value.toFixed(1),
							data.result.hourly.temperature[13].value.toFixed(1),
							data.result.hourly.temperature[14].value.toFixed(1),
							data.result.hourly.temperature[15].value.toFixed(1),
							data.result.hourly.temperature[16].value.toFixed(1),
							data.result.hourly.temperature[17].value.toFixed(1),
							data.result.hourly.temperature[18].value.toFixed(1),
							data.result.hourly.temperature[19].value.toFixed(1),
							data.result.hourly.temperature[20].value.toFixed(1),
							data.result.hourly.temperature[21].value.toFixed(1),
							data.result.hourly.temperature[22].value.toFixed(1),
							data.result.hourly.temperature[23].value.toFixed(1),
							data.result.hourly.temperature[24].value.toFixed(1),
							data.result.hourly.temperature[25].value.toFixed(1),
							data.result.hourly.temperature[26].value.toFixed(1),
							data.result.hourly.temperature[27].value.toFixed(1),
							data.result.hourly.temperature[28].value.toFixed(1),
							data.result.hourly.temperature[29].value.toFixed(1),
							data.result.hourly.temperature[30].value.toFixed(1),
							data.result.hourly.temperature[31].value.toFixed(1),
							data.result.hourly.temperature[32].value.toFixed(1),
							data.result.hourly.temperature[33].value.toFixed(1),
							data.result.hourly.temperature[34].value.toFixed(1),
							data.result.hourly.temperature[35].value.toFixed(1),
							data.result.hourly.temperature[36].value.toFixed(1),
							data.result.hourly.temperature[37].value.toFixed(1),
							data.result.hourly.temperature[38].value.toFixed(1),
							data.result.hourly.temperature[39].value.toFixed(1),
							data.result.hourly.temperature[40].value.toFixed(1),
							data.result.hourly.temperature[41].value.toFixed(1),
							data.result.hourly.temperature[42].value.toFixed(1),
							data.result.hourly.temperature[43].value.toFixed(1),
							data.result.hourly.temperature[44].value.toFixed(1),
							data.result.hourly.temperature[45].value.toFixed(1),
							data.result.hourly.temperature[46].value.toFixed(1),
							data.result.hourly.temperature[47].value.toFixed(1)];
	page=1;

	for (i=1;i<48;i++)
	{
		if (hour[i]=="00:00") tag++;
		switch (tag)
		{
			case 1: hour[i]+="<font style='font-size: 12px; color: rgba(255,255,255,0.625)'>明天</font>";break;
			case 2: hour[i]+="<font style='font-size: 12px; color: rgba(255,255,255,0.625)'>后天</font>";break;
		}
	}

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

	document.getElementById("main_screen").style.filter="opacity(0%)";
	document.getElementById("weather_detail").style.width="100%";
	var text=
		"<div id='weather_detail_inner' style='height: 100%; width: 100%'>"+
		"<div id='realtime' style='margin: 5px; text-align: center; position: absolute; right: 50%; bottom: 50%; width: 40%; height: 40%; background: rgba(255, 255, 255, 0.125)'>"+
		"<br><br><br><br><img src='./icon/"+skycon+".png' height=150px width=150px><br>"+
		"<p style='font-size: 20px; color: #FFFFFF'>"+
		condition+"</p>"+
		"<table align='center'><tr>"+
		"<td style='font-size: 20px; color: #FFFFFF'>"+Max_temperature+"℃</td>"+
		"<td style='font-size: 20px; color: rgba(255,255,255,0.625'>"+"/</td>"+
		"<td style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+Min_temperature+"℃</td>"+
		"</tr></table><br><br>"+
		"<p style='font-size: 20px; color: rgba(255,255,255,0.625); line-height:1.5; width: 60%; margin:0 auto'>"+
		hourly_description+"<br><br>"+forecast_keypoint+
		"</p>"+
		"</div>"+
		"<div id='daily' style='margin: 5px; position: absolute; right: 50%; top: 50%; width: 40%; height: 40%; background: rgba(255,255,255,0.125)'>"+
		"<table align='center' width=90% height=19%>"+
		"<tr>"+
		"<td align='left' width=40%><font style='font-size: 20px; color: #FFFFFF'>&nbsp;"+date[0][0]+"/"+date[0][1]+"/"+date[0][2]+"</font>"+
		"<font style='font-size: 12px; color: rgba(255,255,255,0.625)'>今日</font></td>"+
		"<td align='center' width=20%><img src='./icon/"+daily_skycon[0]+".png' height=50px width=50px></td>"+
		"<td align='right' width=20% style='font-size: 20px; color: #FFFFFF'>"+daily_Max_temperature[0]+"℃</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+"/</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+daily_Min_temperature[0]+"℃&nbsp;</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=19%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+date[1][0]+"/"+date[1][1]+"/"+date[1][2]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+daily_skycon[1]+".png' height=50px width=50px></td>"+
		"<td align='right' width=20% style='font-size: 20px; color: #FFFFFF'>"+daily_Max_temperature[1]+"℃</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+"/</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+daily_Min_temperature[1]+"℃&nbsp;</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=19%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+date[2][0]+"/"+date[2][1]+"/"+date[2][2]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+daily_skycon[2]+".png' height=50px width=50px></td>"+
		"<td align='right' width=20% style='font-size: 20px; color: #FFFFFF'>"+daily_Max_temperature[2]+"℃</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+"/</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+daily_Min_temperature[2]+"℃&nbsp;</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=19%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+date[3][0]+"/"+date[3][1]+"/"+date[3][2]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+daily_skycon[3]+".png' height=50px width=50px></td>"+
		"<td align='right' width=20% style='font-size: 20px; color: #FFFFFF'>"+daily_Max_temperature[3]+"℃</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+"/</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+daily_Min_temperature[3]+"℃&nbsp;</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=19%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+date[4][0]+"/"+date[4][1]+"/"+date[4][2]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+daily_skycon[4]+".png' height=50px width=50px></td>"+
		"<td align='right' width=20% style='font-size: 20px; color: #FFFFFF'>"+daily_Max_temperature[4]+"℃</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+"/</td>"+
		"<td align='right' style='font-size: 20px; color: rgba(255,255,255,0.625)'>"+daily_Min_temperature[4]+"℃&nbsp;</td>"+
		"</tr></table></div>"+
		"<div id='hourly' style='margin-left: 5px; position: absolute; left: 50%; top: 10%; width: 40%; height: 80%; background: rgba(255, 255, 255, 0.125)'>"+
		"<img id='UP' src='./icon/UP.png' height=25px width=25px style='margin-left: 20px; margin-top: 5px; filter: opacity(37.5%)'><img id='DOWN' src='./icon/DOWN.png' height=25px width=25px style='margin-left: 10px; margin-top: 5px'>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<div id='page' style='width: 100%; height: 98%'>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[0]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[0]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[0]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[1]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[1]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[1]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[2]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[2]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[2]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[3]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[3]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[3]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[4]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[4]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[4]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[5]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[5]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[5]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[6]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[6]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[6]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[7]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[7]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[7]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[8]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[8]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[8]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[9]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[9]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[9]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[10]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[10]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[10]+"℃</td>"+
		"</tr></table>"+
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
		"<table align='center' width=90% height=8%>"+
		"<tr>"+
		"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[11]+"</td>"+
		"<td align='center' width=20%><img src='./icon/"+hourly_skycon[11]+".png' height=50px width=50px></td>"+
		"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[11]+"℃</td>"+
		"</tr></table>"+
		"</div></div></div>";
	document.getElementById("weather_detail").innerHTML=text;
}

function Weather_Detail_Spread()
{
	$.getJSON("https://api.caiyunapp.com/v2/2Nz1KiLTJ1CUH82o/117.25,31.83/weather.jsonp?callback=?",
		function(data){Weather_Detail(data);});
}

function Switch_Page_Down()
{
	page++;
	var text=   "<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+0]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+0]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+0]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+1]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+1]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+1]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+2]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+2]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+2]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+3]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+3]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+3]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+4]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+4]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+4]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+5]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+5]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+5]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+6]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+6]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+6]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+7]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+7]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+7]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+8]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+8]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+8]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+9]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+9]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+9]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+10]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+10]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+10]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+11]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+11]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+11]+"℃</td>"+
				"</tr></table>";
	document.getElementById("page").innerHTML=text;
	if (page!=1)
		document.getElementById("UP").style.filter="";
	else
		document.getElementById("UP").style.filter="opacity(37.5%)";
	if (page!=4)
		document.getElementById("DOWN").style.filter="";
	else
		document.getElementById("DOWN").style.filter="opacity(37.5%)";
}

function Switch_Page_Up()
{
	page--;
	var text=   "<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40%><font style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+0]+"</font></td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+0]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+0]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+1]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+1]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+1]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+2]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+2]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+2]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+3]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+3]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+3]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+4]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+4]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+4]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+5]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+5]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+5]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+6]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+6]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+6]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+7]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+7]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+7]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+8]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+8]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+8]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+9]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+9]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+9]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+10]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+10]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+10]+"℃</td>"+
				"</tr></table>"+
				"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.125)'></div>"+
				"<table align='center' width=90% height=8%>"+
				"<tr>"+
				"<td align='left' width=40% style='font-size: 20px; color: #FFFFFF'>&nbsp;"+hour[(page-1)*12+11]+"</td>"+
				"<td align='center' width=20%><img src='./icon/"+hourly_skycon[(page-1)*12+11]+".png' height=50px width=50px></td>"+
				"<td align='right' style='font-size: 20px; color: #FFFFFF'>"+hourly_temperature[(page-1)*12+11]+"℃</td>"+
				"</tr></table>";
	document.getElementById("page").innerHTML=text;
	if (page!=1)
		document.getElementById("UP").style.filter="";
	else
		document.getElementById("UP").style.filter="opacity(37.5%)";
	if (page!=4)
		document.getElementById("DOWN").style.filter="";
	else
		document.getElementById("DOWN").style.filter="opacity(37.5%)";
}

function Weather_Detail_Fold()
{
	document.getElementById("main_screen").style.filter="opacity(100%)";
	document.getElementById("weather_detail").style.width="0%";
	document.getElementById("weather_detail").innerHTML="";
}