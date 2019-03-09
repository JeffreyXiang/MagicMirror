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
	var color=new Array
	(
		"#0F0F0F",
		"#1F1F1F",
		"#2F2F2F",
		"#3F3F3F",
		"#4F4F4F",
		"#5F5F5F",
		"#6F6F6F",
		"#7F7F7F",
		"#8F8F8F",
		"#9F9F9F",
		"#AFAFAF",
		"#BFBFBF",
		"#CFCFCF",
		"#DFDFDF",
		"#EFEFEF",
		"#FFFFFF"
	)
	var position;
	var text;
	for (var i=0;i<=3;i++)
	{
		position=1200;
    	for (var j=0;j<=15;j++)
   		{
   		 	position-=16-j;
    		text=	"<div style='height: "+position+"px'></div>"+
    				"<p align='center' style='color: "+color[j]+" ;font-size: 60px'>"+message[i]+"</p>";
    		(function(text,j)
    			{
    				setTimeout(function(){document.getElementById("message").innerHTML=text;},j*20+i*2000);
    			})(text,j)
    	}
    }
    for (var j=0;j<=7;j++)
   		{
   		 	position+=j+1;
    		text=	"<div style='height: "+position+"px'></div>"+
    				"<p align='center' style='color: "+color[15-2*j-1]+" ;font-size: 60px'>"+message[i-1]+"</p>";
    		(function(text,j)
    			{
    				setTimeout(function(){document.getElementById("message").innerHTML=text;},j*20+(i)*2000);
    			})(text,j)
    	}
    setTimeout(function(){document.getElementById("message").innerHTML="";},j*20+(i)*2000);
}