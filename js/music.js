var loop_id=0;
var Name=[];
var music_number;
var current=0;
var lyric;
var lyric_row=0;
var lyric_margin;

function Music_Event()
{
	$.get("http://0.0.0.0:80/jsonp/music_filename/read",function(data)
	{
		var i;
		music_number=data.length;
		for (i=0;i<music_number;i++)
			Name[i]=data[i].name;
		Music_Load();
	},"jsonp")
}

function Lyric_Event()
{
	var name=Name;
	lyric_row=0;
	lyric_margin=0;
	document.getElementById("lyric_display_inner").style.transform="translateY("+lyric_margin+"px)";
	document.getElementById('lyric_display_inner').innerHTML="";
	$.get("http://0.0.0.0:80/jsonp/lyric/"+name[current].slice(0,name[current].lastIndexOf('.'))+".lrc",function(data)
	{
		var i;
		lyric=data;
		for (i=0;i<data.length;i++)
			document.getElementById('lyric_display_inner').innerHTML+="<p id='lyric_row_"+i+"' style='color: #BFBFBF ;font-size: 20px'>"+data[i].text+"</p>"
	},"jsonp")
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
			document.getElementById("lyric_row_"+(lyric_row-1)).style.color="#BFBFBF";
			lyric_margin-=document.getElementById("lyric_row_"+(lyric_row-1)).clientHeight+20;
			document.getElementById("lyric_display_inner").style.transform="translateY("+lyric_margin+"px)";
		}
		document.getElementById("lyric_row_"+lyric_row).style.color="#FFFFFF";
		lyric_row++;
	}
}

function Music_Spread()
{
	var name=Name;
	document.getElementById("main_screen").style.filter="opacity(0%)";
	document.getElementById("music").style.height="100%";
document.getElementById('lyric_display_inner').style.marginTop=document.getElementById('lyric_display').clientHeight*0.45+"px";
	document.getElementById("music_display").style.filter="opacity(100%)";
	document.getElementById("lyric_display").style.filter="opacity(100%)";
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
	if (document.getElementById("music_player").currentTime>document.getElementById("music_player").duration-1)
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

}

function Music_Switch_Right()
{
	var tag=document.getElementById("music_player").paused;
	document.getElementById("music_player").pause();
	switch (loop_id)
	{
		case 0:
		case 1:current=(current+1)%music_number;break;
		case 2:current=Math.floor(Math.random()*music_number)%music_number;break;
	}
	Music_Load();
	if (!tag)
		document.getElementById("music_player").play();
}

function Music_Switch_Left()
{
	var tag=document.getElementById("music_player").paused;
	document.getElementById("music_player").pause();
	switch (loop_id)
	{
		case 0:
		case 1:current=(current+music_number-1)%music_number;break;
		case 2:current=Math.floor(Math.random()*music_number)%music_number;break;
	}
	Music_Load();
	Music_Refresh();
	if (!tag)
		document.getElementById("music_player").play();
}

function Music_Fold()
{
	document.getElementById("main_screen").style.filter="opacity(100%)";
	document.getElementById("music").style.height="0%";
	document.getElementById("music_display").style.filter="opacity(0%)";
	document.getElementById("lyric_display").style.filter="opacity(0%)";
	document.getElementById("music_player").ontimeupdate=function(){};
	document.getElementById("music_display").innerHTML="";
}

$(function(){Music_Event();setInterval(function(){Music_Loop();},200);});
