var loop_id=0;
var Name=[];
var music_number;
var current=0;
var lyric;
var lyric_row=0;
var lyric_margin;

function Music_Event()
{
	$.get("./json/music_filename/read",function(data)
	{
		var i;
		music_number=data.length;
		for (i=0;i<music_number;i++)
			Name[i]=data[i].name;
		Music_Load();
	},"json")
}

function Lyric_Event()
{
	var name=Name;
	lyric_row=0;
	lyric_margin=0;
	document.getElementById("lyric_display_inner").style.transform="translateY("+lyric_margin+"px)";
	document.getElementById('lyric_display_inner').innerHTML="";
	$.get("./json/lyric/"+name[current].slice(0,name[current].lastIndexOf('.'))+".lrc",function(data)
	{
		var i;
		lyric=data;
		for (i=0;i<data.length;i++)
			document.getElementById('lyric_display_inner').innerHTML+="<p id='lyric_row_"+i+"' style='color: #7F7F7F ;font-size: 20px'>"+data[i].text+"</p>"
	},"json")
}

function Music_Refresh()
{
	var name=Name;
	var text=   "<table style='margin:0 auto; width: 75%; margin-top: 45px; text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
				"<td><img align='left' height=25px width=25px src='./icon/LEFT.png'></img></td>"+
				"<td><div>"+name[current].slice(0,name[current].lastIndexOf('.'))+"</div></td>"+
				"<td><img align='right' height=25px width=25px src='./icon/RIGHT.png'></img></td>"+
				"</tr></table>"+
				"<div style='margin:0 auto; width: 75%; margin-top: 20px'>"+
				"<div style='width: 100%; height: 3px; background: rgba(255, 255, 255, 0.25)'>"+
				"<div style='width: "+(document.getElementById("music_player").currentTime/document.getElementById("music_player").duration*100)+"%; height: 3px; background: rgba(255, 255, 255, 1)'></div>"+
				"</div>"+
				"<p align='right' style='margin-top: -10px; color: #FFFFFF ;font-size: 15px'><br>"+
				Show_Time(document.getElementById("music_player").currentTime)+"/"+Show_Time(document.getElementById("music_player").duration)+
				"</p></div>"+
				"<table align='center' style='margin-top: -20px'><tr>"+
				"<td><img height=30px width=30px src='./icon/"+(loop_id==0?"SINGLE_LOOP":loop_id==1?"LIST_LOOP":"RANDOM_LOOP")+".png'></img></td>"+
				"<td align='center' width=100px><img height=50px width=50px src='./icon/"+(document.getElementById("music_player").paused?"PLAY":"PAUSE")+".png'></img></td>"+
				"<td><img height=30px width=30px src='./icon/VOLUME.png'></img></td>"+
				"</tr></table>";
	document.getElementById("music_display").innerHTML=text;
	if (lyric_row<lyric.length && document.getElementById("music_player").currentTime>lyric[lyric_row].time)
	{
		if (lyric_row != 0)
		{
			document.getElementById("lyric_row_"+(lyric_row-1)).style.color="#7F7F7F";
			lyric_margin-=document.getElementById("lyric_row_"+(lyric_row-1)).clientHeight+20;
			document.getElementById("lyric_display_inner").style.transform="translateY("+lyric_margin+"px)";
		}
		document.getElementById("lyric_row_"+lyric_row).style.color="#FFFFFF";
		lyric_row++;
	}
}

function Music_Spread()
{
	var i;
	var height=1;
	document.getElementById("music_display").style.filter="opacity(0%)";
	document.getElementById("lyric_display").style.filter="opacity(0%)";
	document.getElementById("lyric_display_inner").style.transition="all 0.5s";
	for (i=1;i<=10;i++)
		(function(i)
		{
			setTimeout(function(){document.getElementById("main_screen").style.filter="blur("+i+"px)";},40*i);
		})(i)
	setTimeout(function(){document.getElementById('lyric_display_inner').style.marginTop=document.getElementById('lyric_display').clientHeight*0.45+"px";},400);
	document.getElementById("music").style.background="rgba(255, 255, 255, 0.125)";
	for (i=1;i<=20;i++)
		(function(i)
		{
			setTimeout(function(){height+=20-i;document.getElementById("music").style.height=(height*100/191)+"%";},20*i);
			setTimeout(function(){document.getElementById("music_display").style.filter="opacity("+(5*i)+"%)";},400+20*i);
			setTimeout(function(){document.getElementById("lyric_display").style.filter="opacity("+(5*i)+"%)";},800+20*i);
		})(i)
	Music_Refresh();
	document.getElementById("music_player").ontimeupdate=Music_Refresh;
}

function Set_Width(a)
{
	if (a<10)
		return "0"+a;
	else
		return a;
}

function Show_Time(time)
{
	time=time.toFixed(0);
	var minute=Set_Width(Math.floor(time/60));
	var second=Set_Width(time-60*minute);
	return minute+":"+second;
}

function Music_Load()
{
	var name=Name;
	document.getElementById("music_player").src="./music/"+name[current];
	Lyric_Event();
}

function Music_Play_Control()
{
	if (document.getElementById("music_player").paused)
		document.getElementById("music_player").play();
	else
	{
		document.getElementById("music_player").pause();
		Music_Refresh();
	}
}

function Music_Loop_Control()
{
	loop_id=(loop_id+1)%3;
	Music_Refresh();
}

function Music_Loop()
{
	switch (loop_id)
	{
		case 0:break;
		case 1:current=(current+1)%music_number;break;
		case 2:current=Math.floor(Math.random()*music_number)%music_number;break;
	}
	Music_Load();
	document.getElementById("music_player").play();
	
}

function Music_Switch_Right()
{
	var tag=document.getElementById("music_player").paused;
	var margin=0;
	var name=Name;
	document.getElementById("music_player").pause();
	for (i=1;i<=20;i++)
	{
		margin-=0.75*i;
		(function(i,margin)
		{
			setTimeout(function()
			{
				var text=   "<table style='margin:0 auto; width: 75%; margin-top: 45px; text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
							"<td><img align='left' height=25px width=25px src='./icon/LEFT.png'></img></td>"+
							"<td><div style='position:relative; left:"+margin+"px; filter: opacity("+(100-5*i)+"%); width: 100%'>"+name[current].slice(0,name[current].lastIndexOf('.'))+"</div></td>"+
							"<td><img align='right' height=25px width=25px src='./icon/RIGHT.png'></img></td>"+
							"</tr></table>"+
							"<div style='margin:0 auto; width: 75%; margin-top: 20px'>"+
							"<div style='width: 100%; height: 3px; background: rgba(255, 255, 255, 0.25)'>"+
							"<div style='width: "+(document.getElementById("music_player").currentTime/document.getElementById("music_player").duration*100)+"%; height: 3px; background: rgba(255, 255, 255, 1)'></div>"+
							"</div>"+
							"<p align='right' style='margin-top: -10px; color: #FFFFFF ;font-size: 15px'><br>"+
							Show_Time(document.getElementById("music_player").currentTime)+"/"+Show_Time(document.getElementById("music_player").duration)+
							"</p></div>"+
							"<table align='center' style='margin-top: -20px'><tr>"+
							"<td><img height=30px width=30px src='./icon/"+(loop_id==0?"SINGLE_LOOP":loop_id==1?"LIST_LOOP":"RANDOM_LOOP")+".png'></img></td>"+
							"<td align='center' width=100px><img height=50px width=50px src='./icon/"+(document.getElementById("music_player").paused?"PLAY":"PAUSE")+".png'></img></td>"+
							"<td><img height=30px width=30px src='./icon/VOLUME.png'></img></td>"+
							"</tr></table>";
				document.getElementById("music_display").innerHTML=text;
				document.getElementById("lyric_display").style.filter="opacity("+(100-5*i)+"%)";
			},20*i);
		})(i,margin)
	}
	for (i=1;i<=20;i++)
	{
		margin+=0.75*(21-i);
		(function(i,margin)
		{
			setTimeout(function()
			{
				var text=   "<table style='margin:0 auto; width: 75%; margin-top: 45px; text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
							"<td><img align='left' height=25px width=25px src='./icon/LEFT.png'></img></td>"+
							"<td><div style='position:relative; right:"+margin+"px; filter: opacity("+5*i+"%); width: 100%'>"+name[current].slice(0,name[current].lastIndexOf('.'))+"</div></td>"+
							"<td><img align='right' height=25px width=25px src='./icon/RIGHT.png'></img></td>"+
							"</tr></table>"+
							"<div style='margin:0 auto; width: 75%; margin-top: 20px'>"+
							"<div style='width: 100%; height: 3px; background: rgba(255, 255, 255, 0.25)'>"+
							"<div style='width: "+(document.getElementById("music_player").currentTime/document.getElementById("music_player").duration*100)+"%; height: 3px; background: rgba(255, 255, 255, 1)'></div>"+
							"</div>"+
							"<p align='right' style='margin-top: -10px; color: #FFFFFF ;font-size: 15px'><br>"+
							Show_Time(document.getElementById("music_player").currentTime)+"/"+Show_Time(document.getElementById("music_player").duration)+
							"</p></div>"+
							"<table align='center' style='margin-top: -20px'><tr>"+
							"<td><img height=30px width=30px src='./icon/"+(loop_id==0?"SINGLE_LOOP":loop_id==1?"LIST_LOOP":"RANDOM_LOOP")+".png'></img></td>"+
							"<td align='center' width=100px><img height=50px width=50px src='./icon/"+(document.getElementById("music_player").paused?"PLAY":"PAUSE")+".png'></img></td>"+
							"<td><img height=30px width=30px src='./icon/VOLUME.png'></img></td>"+
							"</tr></table>";
				document.getElementById("music_display").innerHTML=text;
				document.getElementById("lyric_display").style.filter="opacity("+5*i+"%)";
			},400+20*i);
		})(i,margin)
	}
	setTimeout(function()
	{
		switch (loop_id)
		{
			case 0:
			case 1:current=(current+1)%music_number;break;
			case 2:current=Math.floor(Math.random()*music_number)%music_number;break;
		}
		Music_Load();
	},400);
	if (!tag)
		setTimeout(function()
		{
			document.getElementById("music_player").play();
		},800);
}

function Music_Switch_Left()
{
	var tag=document.getElementById("music_player").paused;
	var margin=0;
	var name=Name;
	document.getElementById("music_player").pause();
	for (i=1;i<=20;i++)
	{
		margin-=0.75*i;
		(function(i,margin)
		{
			setTimeout(function()
			{
				var text=   "<table style='margin:0 auto; width: 75%; margin-top: 45px; text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
							"<td><img align='left' height=25px width=25px src='./icon/LEFT.png'></img></td>"+
							"<td><div style='position:relative; right:"+margin+"px; filter: opacity("+(100-5*i)+"%); width: 100%'>"+name[current].slice(0,name[current].lastIndexOf('.'))+"</div></td>"+
							"<td><img align='right' height=25px width=25px src='./icon/RIGHT.png'></img></td>"+
							"</tr></table>"+
							"<div style='margin:0 auto; width: 75%; margin-top: 20px'>"+
							"<div style='width: 100%; height: 3px; background: rgba(255, 255, 255, 0.25)'>"+
							"<div style='width: "+(document.getElementById("music_player").currentTime/document.getElementById("music_player").duration*100)+"%; height: 3px; background: rgba(255, 255, 255, 1)'></div>"+
							"</div>"+
							"<p align='right' style='margin-top: -10px; color: #FFFFFF ;font-size: 15px'><br>"+
							Show_Time(document.getElementById("music_player").currentTime)+"/"+Show_Time(document.getElementById("music_player").duration)+
							"</p></div>"+
							"<table align='center' style='margin-top: -20px'><tr>"+
							"<td><img height=30px width=30px src='./icon/"+(loop_id==0?"SINGLE_LOOP":loop_id==1?"LIST_LOOP":"RANDOM_LOOP")+".png'></img></td>"+
							"<td align='center' width=100px><img height=50px width=50px src='./icon/"+(document.getElementById("music_player").paused?"PLAY":"PAUSE")+".png'></img></td>"+
							"<td><img height=30px width=30px src='./icon/VOLUME.png'></img></td>"+
							"</tr></table>";
				document.getElementById("music_display").innerHTML=text;
				document.getElementById("lyric_display").style.filter="opacity("+(100-5*i)+"%)";
			},20*i);
		})(i,margin)
	}
	for (i=1;i<=20;i++)
	{
		margin+=0.75*(21-i);
		(function(i,margin)
		{
			setTimeout(function()
			{
				var text=   "<table style='margin:0 auto; width: 75%; margin-top: 45px; text-align: center; color: #FFFFFF ;font-size: 20px'><tr>"+
							"<td><img align='left' height=25px width=25px src='./icon/LEFT.png'></img></td>"+
							"<td><div style='position:relative; left:"+margin+"px; filter: opacity("+5*i+"%); width: 100%'>"+name[current].slice(0,name[current].lastIndexOf('.'))+"</div></td>"+
							"<td><img align='right' height=25px width=25px src='./icon/RIGHT.png'></img></td>"+
							"</tr></table>"+
							"<div style='margin:0 auto; width: 75%; margin-top: 20px'>"+
							"<div style='width: 100%; height: 3px; background: rgba(255, 255, 255, 0.25)'>"+
							"<div style='width: "+(document.getElementById("music_player").currentTime/document.getElementById("music_player").duration*100)+"%; height: 3px; background: rgba(255, 255, 255, 1)'></div>"+
							"</div>"+
							"<p align='right' style='margin-top: -10px; color: #FFFFFF ;font-size: 15px'><br>"+
							Show_Time(document.getElementById("music_player").currentTime)+"/"+Show_Time(document.getElementById("music_player").duration)+
							"</p></div>"+
							"<table align='center' style='margin-top: -20px'><tr>"+
							"<td><img height=30px width=30px src='./icon/"+(loop_id==0?"SINGLE_LOOP":loop_id==1?"LIST_LOOP":"RANDOM_LOOP")+".png'></img></td>"+
							"<td align='center' width=100px><img height=50px width=50px src='./icon/"+(document.getElementById("music_player").paused?"PLAY":"PAUSE")+".png'></img></td>"+
							"<td><img height=30px width=30px src='./icon/VOLUME.png'></img></td>"+
							"</tr></table>";
				document.getElementById("music_display").innerHTML=text;
				document.getElementById("lyric_display").style.filter="opacity("+5*i+"%)";
			},400+20*i);
		})(i,margin)
	}
	setTimeout(function()
	{
		switch (loop_id)
		{
			case 0:
			case 1:current=(current+music_number-1)%music_number;break;
			case 2:current=Math.floor(Math.random()*music_number)%music_number;break;
		}
		Music_Load();
	},400);
	if (!tag)
		setTimeout(function()
		{
			document.getElementById("music_player").play();
		},800);
}

function Music_Fold()
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
			setTimeout(function(){height-=i;document.getElementById("music").style.height=(height*100/191)+"%";},400+20*i);
			setTimeout(function(){document.getElementById("music_display").style.filter="opacity("+(100-5*i)+"%)";},20*i);
			setTimeout(function(){document.getElementById("lyric_display").style.filter="opacity("+(100-5*i)+"%)";},20*i);
		})(i)
	setTimeout(function(){document.getElementById("music").style.background="rgba(255, 255, 255, 0)";},400+20*i);
	setTimeout(function(){	document.getElementById("music_player").ontimeupdate=function(){};
							document.getElementById("music_display").innerHTML="";
							document.getElementById("lyric_display_inner").style.transition="";},20*i);
}

$(function(){Music_Event();document.getElementById("music_player").onended=Music_Loop;});