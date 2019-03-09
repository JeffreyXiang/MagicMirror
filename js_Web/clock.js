var face;
var sec;
var ms;
var s;
var count;
var interval;
var stopwatch_status;
var alarm_clock_text;
var alarm_clock_sum;
var alarm_clock_number;
var add_number
var alarm_clock_mode;
var add_hour;
var add_minute;
var add_frequency_id;
var add_frequency=["每天","周一至周五","周六、周日","临时"];
var alarm_clock_time=new Array();
var alarm_clock_frequency=new Array();
var alarm_clock_tag=new Array();
var calculagraph_status;

function Clock_Spread()
{
	var i;
	var height=1;
	face=1;
	setTimeout(function()
				{
					document.getElementById("clock").innerHTML=
					"<div id='clock_head' style='width: 100%; height: 50px; position:absolute; top: 0%'>"+
					"<table width=100% height=100% style='text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
					"<td width=10%><img id='FRONT' src='./icon/FRONT.png' height=25px width=25px style='vertical-align: middle; filter: opacity(37.5%)''></td>"+
					"<td width=20%>闹钟</td><td width=20%>世界时钟</td><td width=20%>秒表</td><td width=20%>计时器</td>"+
					"<td width=10%><img id='BEHIND' src='./icon/BEHIND.png' height=25px width=25px style='vertical-align: middle'></td>"+
					"</tr></table>"+
					"<div id='clock_head_left' style='width: 10%; height: 100%; position:absolute; top: 0%; left: 0%; background: rgba(255,255,255,0.125)'></div>"+
					"<div id='clock_head_right' style='width: 70%; height: 100%; position:absolute; top: 0%; right: 0%; background: rgba(255,255,255,0.125)'></div>"+
					"</div>"+
					"<div id='clock_inner' style='width: 100%; height: 100%; filter: opacity(0%)'></div>";
				},20);
	for (i=1;i<=10;i++)
		(function(i)
		{
			setTimeout(function(){document.getElementById("main_screen").style.filter="blur("+i+"px)";},40*i);
		})(i)
	document.getElementById("clock").style.background="rgba(255, 255, 255, 0.125)";
	for (i=1;i<=20;i++)
		(function(i)
		{
			setTimeout(function()
				{
					height+=20-i;
					document.getElementById("clock").style.height=(height*100/191)+"%";
				},20*i);
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*i+"%)";},400+20*i);
		})(i)
	setTimeout(function(){Alarm_Clock();},400);
}

function Alarm_Clock_Ring()
{
	var i;
	var time=new Date();
	var hour=time.getHours();
	var minute=time.getMinutes();
	var day=time.getDay();
	for (i=0;i<alarm_clock_sum;i++)
	{
		if (Set_Width(hour)+":"+Set_Width(minute)==alarm_clock_time[i] && alarm_clock_tag[i]=="ON" && (alarm_clock_frequency[i]=="每天" || alarm_clock_frequency[i]=="临时" || alarm_clock_frequency[i]=="周一至周五" && day>=1 && day<=5 || alarm_clock_frequency[i]=="周六、周日" && (day==0 || day==6)))
		{
			document.getElementById("ringtone").play();
			Alarm_Clock_Ring_Spread();
			if (alarm_clock_frequency[i]=="临时")
				$.get("./json/alarm_clock/switch",{number:i},function(data)
				{
					console.log(data.status);
					Alarm_Clock_Event();
				},"json");
		}
	}
}

function Alarm_Clock_Ring_Spread()
{
	var time=new Date();
	var hours=time.getHours();
	var minute=time.getMinutes();
	var alternative=["早上好","中午好","下午好","晚上好"];
	var message;
	temp=screen_id;
	switch (screen_id)
	{
		case 0: document.getElementById("main_screen").style.filter="blur(10px)";break;
		case 1: document.getElementById("calendar").style.filter="blur(10px)";break;
		case 2: document.getElementById("clock").style.filter="blur(10px)";break;
		case 3: document.getElementById("weather_detail").style.filter="blur(10px)";break;
		case 4: document.getElementById("music").style.filter="blur(10px)";break;
	}
	screen_id=5;
	if (hours>=6 && hours<10)
		message=alternative[0];
	else if (hours>=10 && hours<14)
		message=alternative[1];
	else if (hours>=14 && hours<18)
		message=alternative[2];
	else
		message=alternative[3];
	var text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
				"<div align='center' style='font-size: 100px; color: #FFFFFF; vertical-align: middle; width: 100%; display:inline-block'>"+
				Set_Width(hours)+":"+Set_Width(minute)+"<br>"+message+
				"</div>";
	document.getElementById("alarm_clock_ring").style.height="100%";
	document.getElementById("alarm_clock_ring").innerHTML=text;
}

function Alarm_Clock_Ring_Fold()
{
	screen_id=temp;
	switch (screen_id)
	{
		case 0: document.getElementById("main_screen").style.filter="";break;
		case 1: document.getElementById("calendar").style.filter="";break;
		case 2: document.getElementById("clock").style.filter="";break;
		case 3: document.getElementById("weather_detail").style.filter="";break;
		case 4: document.getElementById("music").style.filter="";break;
	}
	document.getElementById("ringtone").load();
	document.getElementById("alarm_clock_ring").style.height="0%";
	document.getElementById("alarm_clock_ring").innerHTML="";
}

function Alarm_Clock_Event()
{
	$.ajax({
		url:"./json/alarm_clock/read",
		async:false,
		dataType:"json",
		success:
		function(data)
		{
			var number=data.length;
			alarm_clock_sum=number;
			var i;
			var text="";
			for (i=0;i<number;i++)
			{
				alarm_clock_time[i]=data[i].time;
				alarm_clock_frequency[i]=data[i].frequency;
				alarm_clock_tag[i]=data[i].tag;
				text+=  "<div id='alarm_clock_"+(i+1)+"' align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
						"<table width=100% height=100%><tr>"+
						"<td width=80% style='text-align: left; color: #FFFFFF ;font-size: 60px'>&nbsp;"+data[i].time+
						"<font style='font-size: 20px; color: rgba(255,255,255,0.375)'>&nbsp;"+data[i].frequency+"</font>"+"</td>"+
						"<td width=20% style='text-align: center'><img src='./icon/"+data[i].tag+".png' height=50px width=50px style='vertical-align: middle'></td>"+
						"</tr></table></div>";
			}
			alarm_clock_text=text;
		}});
}

function Alarm_Clock()
{
	alarm_clock_mode=0;
	var text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
				"<div style='vertical-align: middle; width: 100%; display:inline-block'>"+
				alarm_clock_text+
				"</div>";
	document.getElementById("clock_inner").innerHTML=text;
}

function Alarm_Clock_Edit(k)
{
	alarm_clock_mode=1;
	alarm_clock_number=k;
	var text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
				"<div style='vertical-align: middle; width: 100%; display:inline-block'>"+
				"<div id='alarm_clock_0' align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
				"<table width=100% height=100%><tr>"+
				"<td width=100% style='text-align: center'><img src='./icon/DELETE.png' height=50px width=50px style='vertical-align: middle'></td>"+
				"</tr></table></div>"+
				alarm_clock_text+
				"<div id='alarm_clock_"+(alarm_clock_sum+1)+"' align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
				"<table width=100% height=100%><tr>"+
				"<td width=100% style='text-align: center'><img src='./icon/ADD.png' height=50px width=50px style='vertical-align: middle'></td>"+
				"</tr></table></div>"+
				"</div>";
	document.getElementById("clock_inner").innerHTML=text;
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.25)";
}

function Alarm_Clock_Change_Up()
{
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.125)";
	alarm_clock_number--;
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.25)";
}

function Alarm_Clock_Change_Down()
{
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.125)";
	alarm_clock_number++;
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.25)";
}

function Alarm_Clock_Switch()
{
	$.get("./json/alarm_clock/switch",{number:(alarm_clock_number-1)},function(data)
		{
			console.log(data.status);
			Alarm_Clock_Event();
			Alarm_Clock_Edit(alarm_clock_number);
		},"json");
}

function Alarm_Clock_Delete_Mode()
{
	alarm_clock_mode=2;
	alarm_clock_number=0;
	var text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
				"<div style='vertical-align: middle; width: 100%; display:inline-block'>"+
				"<div id='alarm_clock_0' align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
				"<table width=100% height=100%><tr>"+
				"<td width=100% style='text-align: center; color: #FFFFFF ;font-size: 30px'>取消</td>"+
				"</tr></table></div>"+
				alarm_clock_text+
				"<div id='alarm_clock_"+(alarm_clock_sum+1)+"' align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
				"<table width=100% height=100%><tr>"+
				"<td width=100% style='text-align: center'><img src='./icon/ADD.png' height=50px width=50px style='vertical-align: middle'></td>"+
				"</tr></table></div>"+
				"</div>";
	document.getElementById("clock_inner").innerHTML=text;
	document.getElementById("alarm_clock_0").style.background="rgba(255,127,127,0.5)";
	document.getElementById("alarm_clock_"+(alarm_clock_sum+1)).style.filter="opacity(0%)";
}

function Alarm_Clock_Delete_Change_Up()
{
	document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.125)";
	alarm_clock_number--;
	if (alarm_clock_number!=0)
		document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,127,127,0.25)";
	else
	{
		document.getElementById("alarm_clock_0").innerHTML=
			"<table width=100% height=100%><tr>"+
			"<td width=100% style='text-align: center; color: #FFFFFF ;font-size: 30px'>取消</td>"+
			"</tr></table>";
		document.getElementById("alarm_clock_0").style.background="rgba(255,127,127,0.5)";
	}
}

function Alarm_Clock_Delete_Change_Down()
{
	if (alarm_clock_number!=0)
		document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,255,255,0.125)";
	else
	{
		document.getElementById("alarm_clock_0").innerHTML=
			"<table width=100% height=100%><tr>"+
			"<td width=100% style='text-align: center'><img src='./icon/DELETE.png' height=50px width=50px style='vertical-align: middle'></td>"+
			"</tr></table>";
		document.getElementById("alarm_clock_0").style.background="rgba(255,127,127,0.5)";
	}
	alarm_clock_number++;
		document.getElementById("alarm_clock_"+alarm_clock_number).style.background="rgba(255,127,127,0.25)";
}

function Alarm_Clock_Delete()
{
	$.get("./json/alarm_clock/delete",{number:(alarm_clock_number-1)},function(data)
		{
			console.log(data.status);
			Alarm_Clock_Event();
			Alarm_Clock_Delete_Mode();
		},"json");
}

function Alarm_Clock_Add_Mode()
{
	alarm_clock_mode=3;
	add_number=1;
	add_hour=0;
	add_minute=0;
	add_frequency_id=0;
	text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
			"<div style='vertical-align: middle; width: 100%; display:inline-block'>"+
			"<div align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 25px; background: rgba(255,255,255,0.125)'>"+
			"<table width=100% height=100%><tr>"+
			"<td id='add_1' width=22.5% style='text-align: center; color: #FFFFFF ;font-size: 60px'>"+Set_Width(add_hour)+"</td>"+
			"<td width=5% style='text-align: center; color: #FFFFFF ;font-size: 60px'>:</td>"+
			"<td id='add_2' width=22.5% style='text-align: center; color: #FFFFFF ;font-size: 60px'>"+Set_Width(add_minute)+"</td>"+
			"<td id='add_3' width=50% style='text-align: center; color: rgba(255,255,255,0.375) ;font-size: 30px'>"+add_frequency[add_frequency_id]+"</td>"+
			"</tr></table></div>"+
			"<div align='center' style='height: 100px; width: 60%; margin: 0 auto; margin-top: 5px'>"+
			"<table width=100% height=100%><tr>"+
			"<td id='add_4' width=50% style='text-align: center; color: #FFFFFF ;font-size: 30px; background: rgba(127,255,127,0.25)'>确认</td>"+
			"<td id='add_5' width=50% style='text-align: center; color: #FFFFFF ;font-size: 30px; background: rgba(255,127,127,0.25)'>取消</td>"+
			"</tr></table></div>"+
			"</div>";
	document.getElementById("clock_inner").innerHTML=text;
	document.getElementById("add_"+add_number).style.background="rgba(255,255,255,0.125)";
}

function Alarm_Clock_Add_Change_Left()
{
	if (add_number==5)
		document.getElementById("add_5").style.background="rgba(255,127,127,0.25)";
	else if (add_number==4)
		document.getElementById("add_4").style.background="rgba(127,255,127,0.25)";
	else
		document.getElementById("add_"+add_number).style.background="rgba(255,255,255,0)";
	add_number--;
	if (add_number!=4)
		document.getElementById("add_"+add_number).style.background="rgba(255,255,255,0.125)";
	else
		document.getElementById("add_4").style.background="rgba(127,255,127,0.5)";
}

function Alarm_Clock_Add_Change_Right()
{
	if (add_number!=4)
	document.getElementById("add_"+add_number).style.background="rgba(255,255,255,0)";
	else
	document.getElementById("add_4").style.background="rgba(127,255,127,0.25)";
	add_number++;
	if (add_number==5)
		document.getElementById("add_5").style.background="rgba(255,127,127,0.5)";
	else if (add_number==4)
		document.getElementById("add_4").style.background="rgba(127,255,127,0.5)";
	else
		document.getElementById("add_"+add_number).style.background="rgba(255,255,255,0.125)";
}

function Alarm_Clock_Add_Hour_Change_Up()
{
	add_hour=(add_hour+1)%24;
	document.getElementById("add_1").innerHTML=Set_Width(add_hour);
}

function Alarm_Clock_Add_Hour_Change_Down()
{
	add_hour=(add_hour+23)%24;
	document.getElementById("add_1").innerHTML=Set_Width(add_hour);
}

function Alarm_Clock_Add_Minute_Change_Up()
{
	add_minute=(add_minute+5)%60;
	document.getElementById("add_2").innerHTML=Set_Width(add_minute);
}

function Alarm_Clock_Add_Minute_Change_Down()
{
	add_minute=(add_minute+55)%60;
	document.getElementById("add_2").innerHTML=Set_Width(add_minute);
}

function Alarm_Clock_Add_Frequency_Change_Up()
{
	add_frequency_id=(add_frequency_id+1)%4;
	document.getElementById("add_3").innerHTML=add_frequency[add_frequency_id];
}

function Alarm_Clock_Add_Frequency_Change_Down()
{
	add_frequency_id=(add_frequency_id+3)%4;
	document.getElementById("add_3").innerHTML=add_frequency[add_frequency_id];
}

function Alarm_Clock_Add(time,frequency)
{
	$.get("./json/alarm_clock/add",{time:time,frequency:frequency},function(data)
		{
			console.log(data.status);
			Alarm_Clock_Event();
			Alarm_Clock_Edit(alarm_clock_number);
		},"json");
}

function World_Time()
{
	var time=new Date();
	var year=time.getFullYear();
	var month=time.getMonth()+1;
	var date=time.getDate();
	var hours=time.getHours();
	var minute=time.getMinutes();
	var second=time.getSeconds();
	document.getElementById("clock_inner").innerHTML=
	"<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
	"<div style='text-align: center; vertical-align: middle; width: 100%; display:inline-block'>"+
	"<p style='color: #FFFFFF ;font-size: 100px'>"+
	Set_Width(hours)+":"+Set_Width(minute)+":"+Set_Width(second)+"</p>"+
	"<p style='color: #FFFFFF ;font-size: 20px'><br>中国标准时间</p>"+
	"<p style='color: rgba(255,255,255,0.375) ;font-size: 20px'>"+
	year+"年"+month+"月"+date+"日</p>"+
	"</div>";
}

function Stopwatch()
{
	ms=0;count=0;stopwatch_status=0;interval=0;
	document.getElementById("clock_inner").innerHTML=
		"<div style='position: absolute; top: 20%; left: 20%; text-align: center; width: 60%; height: 60%'>"+
		"<div id='stopwatch_time' style='color: #FFFFFF ;font-size: 100px'>"+
		Set_Width(Math.floor(ms/60000))+"′"+Set_Width(Math.floor(ms/1000%60))+"″"+Set_Width(ms/10%100)+"</div>"+
		"<div id='stopwatch_count'></div>"+
		"<div id='stopwatch_status' style='position: absolute; bottom: 0%; left: 0%; right: 0%'><img src='./icon/START.png' height=50px width=50px></div>"+
		"</div>";
}

function Stopwatch_Start()
{
	document.getElementById("stopwatch_status").innerHTML="<img src='./icon/STOP.png' height=50px width=50px>";
	sec=setInterval(function()
	{
		ms+=10;
		document.getElementById("stopwatch_time").innerHTML=
		Set_Width(Math.floor(ms/60000))+"′"+Set_Width(Math.floor(ms/1000%60))+"″"+Set_Width(ms/10%100)+"</div>";
	},10);
}

function Stopwatch_Stop()
{
	clearInterval(sec);
	document.getElementById("stopwatch_status").innerHTML="<img src='./icon/RESET.png' height=50px width=50px>";
}

function Stopwatch_Reset()
{
	Stopwatch();
}

function Stopwatch_Count()
{
	count++;
	interval=ms-interval;
	document.getElementById("stopwatch_count").innerHTML+=
		"<div style='width: 90%; margin-left: 5%; height: 2px; background: rgba(255,255,255,0.25)'></div>"+
		"<table align='center' width=80% height=8%>"+
		"<tr>"+
		"<td align='center' width=10% style='font-size: 40px; color: #FFFFFF'>"+count+"</td>"+
		"<td align='right' width=90%><font style='font-size: 20px; color: #FFFFFF'>"+
		Set_Width(Math.floor(ms/60000))+"′"+Set_Width(Math.floor(ms/1000%60))+"″"+Set_Width(ms/10%100)+
		"</font><font style='font-size: 20px; color: rgba(255,255,255,0.375)'>&nbsp;/&nbsp;"+
		Set_Width(Math.floor(interval/60000))+"′"+Set_Width(Math.floor(interval/1000%60))+"″"+Set_Width(interval/10%100)+
		"</font></td></tr></table>";
	interval=ms;
}

function Stopwatch_Control()
{
	switch (stopwatch_status)
	{
		case 0: Stopwatch_Start();break;
		case 1: Stopwatch_Stop();break;
		case 2: Stopwatch_Reset();stopwatch_status--;break;
	}
	stopwatch_status=(stopwatch_status+1)%3;
}

function Calculagraph()
{
	s=0;
	calculagraph_status=0;
	document.getElementById("clock_inner").innerHTML=
		"<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
		"<div style='text-align: center; vertical-align: middle; width: 100%; display:inline-block'>"+
		"<p style='color: #FFFFFF ;font-size: 100px'>"+
		Set_Width(Math.floor(s/60))+":"+Set_Width(Math.floor(s%60))+
		"</div>";
}

function Calculagraph_Timeup()
{
	temp=screen_id;
	switch (screen_id)
	{
		case 0: document.getElementById("main_screen").style.filter="blur(10px)";break;
		case 1: document.getElementById("calendar").style.filter="blur(10px)";break;
		case 2: document.getElementById("clock").style.filter="blur(10px)";break;
		case 3: document.getElementById("weather_detail").style.filter="blur(10px)";break;
		case 4: document.getElementById("music").style.filter="blur(10px)";break;
	}
	screen_id=5;
	var text=   "<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
				"<div align='center' style='font-size: 100px; color: #FFFFFF; vertical-align: middle; width: 100%; display:inline-block'>"+
				"时间到"+
				"</div>";
	document.getElementById("ringtone").play();
	document.getElementById("alarm_clock_ring").style.height="100%";
	document.getElementById("alarm_clock_ring").innerHTML=text;
}

function Calculagraph_Set()
{
	var margin=0;
	setTimeout(function(){s+=60;},200);
	for (i=1;i<=10;i++)
	{
		margin+=i/2;
		(function(i,margin)
		{
			setTimeout(function()
			{
				document.getElementById("clock_inner").innerHTML=
					"<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
					"<div style='text-align: center; vertical-align: middle; width: 100%; display:inline-block'>"+
					"<div style='height: 400px; display:inline-block; vertical-align: middle'>"+
					"<div style='color: #FFFFFF ;font-size: 100px;height: 120px; position: relative; top: "+(140-margin)+"px; filter: opacity("+10*(10-i)+"%)'>"+
					Set_Width(Math.floor(s/60))+
					"</div></div><div style='color: #FFFFFF ;font-size: 100px; display:inline-block; vertical-align: middle'>:"+
					Set_Width(Math.floor(s%60))+"</div>"+
					"</div>";
			},20*i);
			setTimeout(function()
			{
				document.getElementById("clock_inner").innerHTML=
					"<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
					"<div style='text-align: center; vertical-align: middle; width: 100%; display:inline-block'>"+
					"<div style='height: 400px; display:inline-block; vertical-align: middle'>"+
					"<div style='color: #FFFFFF ;font-size: 100px;height: 120px; position: relative; top: "+(167.5-margin)+"px; filter: opacity("+10*i+"%)'>"+
					Set_Width(Math.floor(s/60))+
					"</div></div><div style='color: #FFFFFF ;font-size: 100px; display:inline-block; vertical-align: middle'>:"+
					Set_Width(Math.floor(s%60))+"</div>"+
					"</div>";
			},400+20*i);
		})(i,margin)
	}
}

function Calculagraph_Start()
{
	if (calculagraph_status==0)
	{
		calculagraph_status=1;
		sec=setInterval(function()
		{
			s-=1;
			if (s<=0)
			{
				clearInterval(sec);
				Calculagraph();
				Calculagraph_Timeup();
			}
			document.getElementById("clock_inner").innerHTML=
			"<div style='height: 100%; width: 0; vertical-align: middle; display:inline-block'></div>"+
			"<div style='text-align: center; vertical-align: middle; width: 100%; display:inline-block'>"+
			"<p style='color: #FFFFFF ;font-size: 100px'>"+
			Set_Width(Math.floor(s/60))+":"+Set_Width(Math.floor(s%60))+
			"</div>";
		},1000);
	}
}

function Switch_Face_Behind()
{
	face++;
	width=0;
	setTimeout(function(){clearInterval(sec);},400);
	switch (face)
	{
		case 2: setTimeout(function(){World_Time();sec=setInterval(function(){World_Time();},1000);},800);break;
		case 3: setTimeout(function(){Stopwatch();},800);break;
		case 4: setTimeout(function(){Calculagraph();},800);break; 
	}
	for (i=1;i<=20;i++)
	{
		width+=i>10?20-i:i;
		(function(i,width)
		{
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*(20-i)+"%)";},20*i);
			setTimeout(function(){document.getElementById("clock_head_left").style.width=10+20*(face-2)+width/5+"%";},400+20*i);
			setTimeout(function(){document.getElementById("clock_head_right").style.width=70-20*(face-2)-width/5+"%";},400+20*i);
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*i+"%)";},800+20*i);
		})(i,width)
	}
	if (face!=1)
		setTimeout(function(){document.getElementById("FRONT").style.filter=""},800);
	else
		setTimeout(function(){document.getElementById("FRONT").style.filter="opacity(37.5%)"},800);
	if (face!=4)
		setTimeout(function(){document.getElementById("BEHIND").style.filter=""},800);
	else
		setTimeout(function(){document.getElementById("BEHIND").style.filter="opacity(37.5%)"},800);
}

function Switch_Face_Front()
{
	face--;
	width=0;
	setTimeout(function(){clearInterval(sec);},400);
	switch (face)
	{
		case 1: setTimeout(function(){Alarm_Clock();},800);break;
		case 2: setTimeout(function(){World_Time();sec=setInterval(function(){World_Time();},1000);},800);break;
		case 3: setTimeout(function(){Stopwatch();},800);break;
	}
	for (i=1;i<=20;i++)
	{
		width+=i>10?20-i:i;
		(function(i,width)
		{
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*(20-i)+"%)";},20*i);
			setTimeout(function(){document.getElementById("clock_head_left").style.width=10+20*face-width/5+"%";},400+20*i);
			setTimeout(function(){document.getElementById("clock_head_right").style.width=70-20*face+width/5+"%";},400+20*i);
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*i+"%)";},800+20*i);
		})(i,width)
	}
	if (face!=1)
		setTimeout(function(){document.getElementById("FRONT").style.filter=""},800);
	else
		setTimeout(function(){document.getElementById("FRONT").style.filter="opacity(37.5%)"},800);
	if (face!=4)
		setTimeout(function(){document.getElementById("BEHIND").style.filter=""},800);
	else
		setTimeout(function(){document.getElementById("BEHIND").style.filter="opacity(37.5%)"},800);
}

function Clock_Fold()
{
	var i;
	var height=191;
	for (i=1;i<=10;i++)
		(function(i)
		{
			setTimeout(function(){document.getElementById("main_screen").style.filter="blur("+(10-i)+"px)";},400+40*i);
		})(i)
	setTimeout(function(){document.getElementById("main_screen").style.filter="";},400+40*i);
	for (i=1;i<=20;i++)
		(function(i)
		{
			setTimeout(function()
				{
					height-=i;
					document.getElementById("clock").style.height=(height*100/191)+"%";
				},400+20*i);
			setTimeout(function(){document.getElementById("clock_inner").style.filter="opacity("+5*(20-i)+"%)";},20*i);
		})(i)
	setTimeout(function(){document.getElementById("clock").style.background="rgba(255, 255, 255, 0)";},400+20*i);
	setTimeout(function(){document.getElementById("clock").style.height="1%";},400+20*i);
	setTimeout(function(){document.getElementById("clock").innerHTML="";},360+20*i);
	setTimeout(function(){clearInterval(sec);document.getElementById("clock_inner").innerHTML="";},20*i);
}

$(function(){Alarm_Clock_Event();});
