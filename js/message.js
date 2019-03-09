function Message()
{
	var source=new Array
	(
		new Array
		(
			"早上好",
			"中午好",
			"下午好",
			"晚上好"
		),
		new Array
		(
			"你看上去不错",
			"你看起来很自信"
		),
		new Array
		(
			"今日天气闷热",
			"今日天气酷热",
			"今日天气很热",
			"今日天气热",
			"今日天气温暖",
			"今日天气舒适",
			"今日天气凉爽",
			"今日天气冷",
			"今日天气很冷",
			"今日天气寒冷",
			"今日天气极冷",
			"今日天气刺骨的冷",
			"今日天气湿冷",
			"今日天气干冷"
		),
		new Array
		(
			"全天大部晴好",
			"全天大部多云",
			"全天阴，记得添衣",
			"今天有雨，记得带伞",
			"今天降雪，注意保暖",
			"今天有霾，注意防护"
		)
	)
	var hours=new Date().getHours();
	var message=new Array();
	var i;
	if (hours>=6 && hours<10)
		message[0]=source[0][0];
	else if (hours>=10 && hours<14)
		message[0]=source[0][1];
	else if (hours>=14 && hours<18)
		message[0]=source[0][2];
	else
		message[0]=source[0][3];
	message[1]=source[1][Math.floor(Math.random()*10)%2];
	message[2]=source[2][comfort];
	if (con=="CLEAR_DAY" || con=="CLEAR_NIGHT")
		message[3]=source[3][0];
	else if (con=="PARTLY_CLOUDY_DAY" || con=="PARTLY_CLOUDY_NIGHT")
		message[3]=source[3][1];
	else if (con=="CLOUDY")
		message[3]=source[3][2];
	else if (con=="RAIN")
		message[3]=source[3][3];
	else if (con=="SNOW")
		message[3]=source[3][4];
	else if (con=="HAZE")
		message[3]=source[3][5];
	var text;
	for (i=0;i<=3;i++)
	{
		text="<div style='text-align: center; margin-top: 125%; color: #FFFFFF; font-size: 60px'>"+message[i]+"</div>";
    	(function(i,text)
    	{
    		setTimeout(function(){document.getElementById("message").innerHTML=text;},i*2000);
    	})(i,text);
    }
    setTimeout(function(){document.getElementById("message").innerHTML="";},i*2000);
}