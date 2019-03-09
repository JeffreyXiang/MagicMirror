var schedule_number;
var schedule_date=new Array();
var schedule_text=new Array();

function Calendar_Event()
{
	$.get("./json/schedule/read",function(data)
	{
		var i;
		schedule_number=data.length;
		for (i=0;i<schedule_number;i++)
		{
			schedule_date[i]=[data[i].year,data[i].month,data[i].day];
			schedule_text[i]=data[i].text;
		}
		if (schedule_number!=0)	Calendar_Delete();
	},"json");
}

function Calendar_Delete()
{
	var time=new Date();
	var year=time.getFullYear();
	var month=time.getMonth()+1;
	var _date=time.getDate();
	if (schedule_date[0][0]<year || schedule_date[0][0]==year && schedule_date[0][1]<month || schedule_date[0][0]==year && schedule_date[0][1]==month && schedule_date[0][2]<_date)
		$.get("./json/schedule/delete",{number:"0"},function(data)
		{
			console.log(data.status);
			Calendar_Event();
		},"json");
}

function Calendar_Spread()
{
	var i,j,k;
	var width=1;
	var appendix="";
	for (i=1;i<=10;i++)
		(function(i)
		{
			setTimeout(function(){document.getElementById("main_screen").style.filter="blur("+i+"px)";},40*i);
		})(i)
	document.getElementById("calendar").style.background="rgba(255, 255, 255, 0.125)";
	for (i=1;i<=20;i++)
		(function(i)
		{
			setTimeout(function(){width+=20-i;document.getElementById("calendar").style.width=(width*100/191)+"%";},20*i);
		})(i)
	var alpha= [[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];
	var color= [[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];
	var date=  [["日","一","二","三","四","五","六"],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0],
				[0,0,0,0,0,0,0]];
	var time=new Date();
	var year=time.getFullYear();
	var month=time.getMonth()+1;
	var _date=time.getDate();
	var day=time.getDay();
	var month_days=[31,(year%4==0 && year%100!=0 || year%400==0)?29:28,31,30,31,30,31,31,30,31,30,31];
	day=day-_date%7;
	day=(day<0?day+7:day)+1;
	var d=-1;
	var beta=30;
	for (i=1;i<7;i++)
		for (j=0;j<7;j++)
		{
			if (i==1 && j<day)
				date[i][j]=month_days[month-2<0?month+10:month-2]+1+j-day;
			else
			{
				d++;
				date[i][j]=d%month_days[month-1]+1;
			}
		}
	for (k=1;k<=10;k++)
		(function(k)
		{
			for (i=0;i<7;i++)
			{
				alpha[0][i]=k/40;
			}
			var text=
				"<div><br><br><br><br><br><br>"+
				"<p align='center'>"+
				"<font style='color:rgba(255,255,255,"+alpha[0][0]*8+") ;font-size: 40px ;font-weight: 100'>"+
				year+"年"+month+"月"+
				"</font>"+
				"</p>"+
				"<table align='center' style='font-size: 20px ;font-weight: 100'>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][0]+"); color:rgba(255,255,255,"+color[0][0]+")'>"+date[0][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][1]+"); color:rgba(255,255,255,"+color[0][1]+")'>"+date[0][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][2]+"); color:rgba(255,255,255,"+color[0][2]+")'>"+date[0][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][3]+"); color:rgba(255,255,255,"+color[0][3]+")'>"+date[0][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][4]+"); color:rgba(255,255,255,"+color[0][4]+")'>"+date[0][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][5]+"); color:rgba(255,255,255,"+color[0][5]+")'>"+date[0][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][6]+"); color:rgba(255,255,255,"+color[0][6]+")'>"+date[0][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][0]+"); color:rgba(255,255,255,"+color[1][0]+")'>"+date[1][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][1]+"); color:rgba(255,255,255,"+color[1][1]+")'>"+date[1][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][2]+"); color:rgba(255,255,255,"+color[1][2]+")'>"+date[1][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][3]+"); color:rgba(255,255,255,"+color[1][3]+")'>"+date[1][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][4]+"); color:rgba(255,255,255,"+color[1][4]+")'>"+date[1][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][5]+"); color:rgba(255,255,255,"+color[1][5]+")'>"+date[1][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][6]+"); color:rgba(255,255,255,"+color[1][6]+")'>"+date[1][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][0]+"); color:rgba(255,255,255,"+color[2][0]+")'>"+date[2][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][1]+"); color:rgba(255,255,255,"+color[2][1]+")'>"+date[2][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][2]+"); color:rgba(255,255,255,"+color[2][2]+")'>"+date[2][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][3]+"); color:rgba(255,255,255,"+color[2][3]+")'>"+date[2][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][4]+"); color:rgba(255,255,255,"+color[2][4]+")'>"+date[2][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][5]+"); color:rgba(255,255,255,"+color[2][5]+")'>"+date[2][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][6]+"); color:rgba(255,255,255,"+color[2][6]+")'>"+date[2][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][0]+"); color:rgba(255,255,255,"+color[3][0]+")'>"+date[3][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][1]+"); color:rgba(255,255,255,"+color[3][1]+")'>"+date[3][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][2]+"); color:rgba(255,255,255,"+color[3][2]+")'>"+date[3][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][3]+"); color:rgba(255,255,255,"+color[3][3]+")'>"+date[3][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][4]+"); color:rgba(255,255,255,"+color[3][4]+")'>"+date[3][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][5]+"); color:rgba(255,255,255,"+color[3][5]+")'>"+date[3][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][6]+"); color:rgba(255,255,255,"+color[3][6]+")'>"+date[3][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][0]+"); color:rgba(255,255,255,"+color[4][0]+")'>"+date[4][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][1]+"); color:rgba(255,255,255,"+color[4][1]+")'>"+date[4][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][2]+"); color:rgba(255,255,255,"+color[4][2]+")'>"+date[4][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][3]+"); color:rgba(255,255,255,"+color[4][3]+")'>"+date[4][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][4]+"); color:rgba(255,255,255,"+color[4][4]+")'>"+date[4][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][5]+"); color:rgba(255,255,255,"+color[4][5]+")'>"+date[4][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][6]+"); color:rgba(255,255,255,"+color[4][6]+")'>"+date[4][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][0]+"); color:rgba(255,255,255,"+color[5][0]+")'>"+date[5][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][1]+"); color:rgba(255,255,255,"+color[5][1]+")'>"+date[5][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][2]+"); color:rgba(255,255,255,"+color[5][2]+")'>"+date[5][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][3]+"); color:rgba(255,255,255,"+color[5][3]+")'>"+date[5][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][4]+"); color:rgba(255,255,255,"+color[5][4]+")'>"+date[5][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][5]+"); color:rgba(255,255,255,"+color[5][5]+")'>"+date[5][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][6]+"); color:rgba(255,255,255,"+color[5][6]+")'>"+date[5][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][0]+"); color:rgba(255,255,255,"+color[6][0]+")'>"+date[6][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][1]+"); color:rgba(255,255,255,"+color[6][1]+")'>"+date[6][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][2]+"); color:rgba(255,255,255,"+color[6][2]+")'>"+date[6][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][3]+"); color:rgba(255,255,255,"+color[6][3]+")'>"+date[6][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][4]+"); color:rgba(255,255,255,"+color[6][4]+")'>"+date[6][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][5]+"); color:rgba(255,255,255,"+color[6][5]+")'>"+date[6][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][6]+"); color:rgba(255,255,255,"+color[6][6]+")'>"+date[6][6]+"</td>"+
				"</tr>"+
				"</table>"+
				"</div>";
			setTimeout(function(){width+=20-i;document.getElementById("calendar").innerHTML=text;},1000+20*k);
		})(k)
	for (k=1;k<=10;k++)
		(function(k)
		{
			for (i=0;i<7;i++)
			{
				color[0][i]=k/10;
			}
			var text=
				"<div><br><br><br><br><br><br>"+
				"<p align='center'>"+
				"<font style='color: #FFFFFF ;font-size: 40px ;font-weight: 100'>"+
				year+"年"+month+"月"+
				"</font>"+
				"</p>"+
				"<table align='center' style='font-size: 20px ;font-weight: 100'>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][0]+"); color:rgba(255,255,255,"+color[0][0]+")'>"+date[0][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][1]+"); color:rgba(255,255,255,"+color[0][1]+")'>"+date[0][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][2]+"); color:rgba(255,255,255,"+color[0][2]+")'>"+date[0][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][3]+"); color:rgba(255,255,255,"+color[0][3]+")'>"+date[0][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][4]+"); color:rgba(255,255,255,"+color[0][4]+")'>"+date[0][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][5]+"); color:rgba(255,255,255,"+color[0][5]+")'>"+date[0][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][6]+"); color:rgba(255,255,255,"+color[0][6]+")'>"+date[0][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][0]+"); color:rgba(255,255,255,"+color[1][0]+")'>"+date[1][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][1]+"); color:rgba(255,255,255,"+color[1][1]+")'>"+date[1][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][2]+"); color:rgba(255,255,255,"+color[1][2]+")'>"+date[1][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][3]+"); color:rgba(255,255,255,"+color[1][3]+")'>"+date[1][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][4]+"); color:rgba(255,255,255,"+color[1][4]+")'>"+date[1][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][5]+"); color:rgba(255,255,255,"+color[1][5]+")'>"+date[1][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][6]+"); color:rgba(255,255,255,"+color[1][6]+")'>"+date[1][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][0]+"); color:rgba(255,255,255,"+color[2][0]+")'>"+date[2][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][1]+"); color:rgba(255,255,255,"+color[2][1]+")'>"+date[2][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][2]+"); color:rgba(255,255,255,"+color[2][2]+")'>"+date[2][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][3]+"); color:rgba(255,255,255,"+color[2][3]+")'>"+date[2][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][4]+"); color:rgba(255,255,255,"+color[2][4]+")'>"+date[2][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][5]+"); color:rgba(255,255,255,"+color[2][5]+")'>"+date[2][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][6]+"); color:rgba(255,255,255,"+color[2][6]+")'>"+date[2][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][0]+"); color:rgba(255,255,255,"+color[3][0]+")'>"+date[3][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][1]+"); color:rgba(255,255,255,"+color[3][1]+")'>"+date[3][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][2]+"); color:rgba(255,255,255,"+color[3][2]+")'>"+date[3][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][3]+"); color:rgba(255,255,255,"+color[3][3]+")'>"+date[3][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][4]+"); color:rgba(255,255,255,"+color[3][4]+")'>"+date[3][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][5]+"); color:rgba(255,255,255,"+color[3][5]+")'>"+date[3][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][6]+"); color:rgba(255,255,255,"+color[3][6]+")'>"+date[3][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][0]+"); color:rgba(255,255,255,"+color[4][0]+")'>"+date[4][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][1]+"); color:rgba(255,255,255,"+color[4][1]+")'>"+date[4][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][2]+"); color:rgba(255,255,255,"+color[4][2]+")'>"+date[4][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][3]+"); color:rgba(255,255,255,"+color[4][3]+")'>"+date[4][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][4]+"); color:rgba(255,255,255,"+color[4][4]+")'>"+date[4][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][5]+"); color:rgba(255,255,255,"+color[4][5]+")'>"+date[4][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][6]+"); color:rgba(255,255,255,"+color[4][6]+")'>"+date[4][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][0]+"); color:rgba(255,255,255,"+color[5][0]+")'>"+date[5][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][1]+"); color:rgba(255,255,255,"+color[5][1]+")'>"+date[5][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][2]+"); color:rgba(255,255,255,"+color[5][2]+")'>"+date[5][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][3]+"); color:rgba(255,255,255,"+color[5][3]+")'>"+date[5][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][4]+"); color:rgba(255,255,255,"+color[5][4]+")'>"+date[5][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][5]+"); color:rgba(255,255,255,"+color[5][5]+")'>"+date[5][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][6]+"); color:rgba(255,255,255,"+color[5][6]+")'>"+date[5][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][0]+"); color:rgba(255,255,255,"+color[6][0]+")'>"+date[6][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][1]+"); color:rgba(255,255,255,"+color[6][1]+")'>"+date[6][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][2]+"); color:rgba(255,255,255,"+color[6][2]+")'>"+date[6][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][3]+"); color:rgba(255,255,255,"+color[6][3]+")'>"+date[6][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][4]+"); color:rgba(255,255,255,"+color[6][4]+")'>"+date[6][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][5]+"); color:rgba(255,255,255,"+color[6][5]+")'>"+date[6][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][6]+"); color:rgba(255,255,255,"+color[6][6]+")'>"+date[6][6]+"</td>"+
				"</tr>"+
				"</table>"+
				"</div>";
			setTimeout(function(){width+=20-i;document.getElementById("calendar").innerHTML=text;},1400+20*k);
		})(k)
	for (i=1;i<7;i++)
		for (j=0;j<7;j++)
		{
			if (date[i][j-1]==1)
				beta=40-beta;
			for (k=1;k<=10;k++)
				(function(i,j,k)
				{
					if (beta==10 && date[i][j]==_date && _date!=1 || beta==30 && _date==1)
						alpha[i][j]=k/40;
					else
						alpha[i][j]=k/80;
					if (!(i==1 && j==0))
						if (j==0)
							color[i-1][6]=k/beta;
						else
							color[i][j-1]=k/beta;
					var text=
						"<div><br><br><br><br><br><br>"+
						"<p align='center'>"+
						"<font style='color: #FFFFFF ;font-size: 40px ;font-weight: 100'>"+
						year+"年"+month+"月"+
						"</font>"+
						"</p>"+
						"<table align='center' style='font-size: 20px ;font-weight: 100'>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][0]+"); color:rgba(255,255,255,"+color[0][0]+")'>"+date[0][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][1]+"); color:rgba(255,255,255,"+color[0][1]+")'>"+date[0][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][2]+"); color:rgba(255,255,255,"+color[0][2]+")'>"+date[0][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][3]+"); color:rgba(255,255,255,"+color[0][3]+")'>"+date[0][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][4]+"); color:rgba(255,255,255,"+color[0][4]+")'>"+date[0][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][5]+"); color:rgba(255,255,255,"+color[0][5]+")'>"+date[0][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][6]+"); color:rgba(255,255,255,"+color[0][6]+")'>"+date[0][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][0]+"); color:rgba(255,255,255,"+color[1][0]+")'>"+date[1][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][1]+"); color:rgba(255,255,255,"+color[1][1]+")'>"+date[1][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][2]+"); color:rgba(255,255,255,"+color[1][2]+")'>"+date[1][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][3]+"); color:rgba(255,255,255,"+color[1][3]+")'>"+date[1][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][4]+"); color:rgba(255,255,255,"+color[1][4]+")'>"+date[1][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][5]+"); color:rgba(255,255,255,"+color[1][5]+")'>"+date[1][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][6]+"); color:rgba(255,255,255,"+color[1][6]+")'>"+date[1][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][0]+"); color:rgba(255,255,255,"+color[2][0]+")'>"+date[2][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][1]+"); color:rgba(255,255,255,"+color[2][1]+")'>"+date[2][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][2]+"); color:rgba(255,255,255,"+color[2][2]+")'>"+date[2][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][3]+"); color:rgba(255,255,255,"+color[2][3]+")'>"+date[2][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][4]+"); color:rgba(255,255,255,"+color[2][4]+")'>"+date[2][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][5]+"); color:rgba(255,255,255,"+color[2][5]+")'>"+date[2][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][6]+"); color:rgba(255,255,255,"+color[2][6]+")'>"+date[2][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][0]+"); color:rgba(255,255,255,"+color[3][0]+")'>"+date[3][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][1]+"); color:rgba(255,255,255,"+color[3][1]+")'>"+date[3][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][2]+"); color:rgba(255,255,255,"+color[3][2]+")'>"+date[3][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][3]+"); color:rgba(255,255,255,"+color[3][3]+")'>"+date[3][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][4]+"); color:rgba(255,255,255,"+color[3][4]+")'>"+date[3][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][5]+"); color:rgba(255,255,255,"+color[3][5]+")'>"+date[3][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][6]+"); color:rgba(255,255,255,"+color[3][6]+")'>"+date[3][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][0]+"); color:rgba(255,255,255,"+color[4][0]+")'>"+date[4][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][1]+"); color:rgba(255,255,255,"+color[4][1]+")'>"+date[4][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][2]+"); color:rgba(255,255,255,"+color[4][2]+")'>"+date[4][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][3]+"); color:rgba(255,255,255,"+color[4][3]+")'>"+date[4][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][4]+"); color:rgba(255,255,255,"+color[4][4]+")'>"+date[4][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][5]+"); color:rgba(255,255,255,"+color[4][5]+")'>"+date[4][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][6]+"); color:rgba(255,255,255,"+color[4][6]+")'>"+date[4][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][0]+"); color:rgba(255,255,255,"+color[5][0]+")'>"+date[5][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][1]+"); color:rgba(255,255,255,"+color[5][1]+")'>"+date[5][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][2]+"); color:rgba(255,255,255,"+color[5][2]+")'>"+date[5][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][3]+"); color:rgba(255,255,255,"+color[5][3]+")'>"+date[5][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][4]+"); color:rgba(255,255,255,"+color[5][4]+")'>"+date[5][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][5]+"); color:rgba(255,255,255,"+color[5][5]+")'>"+date[5][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][6]+"); color:rgba(255,255,255,"+color[5][6]+")'>"+date[5][6]+"</td>"+
						"</tr>"+
						"<tr height=40px>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][0]+"); color:rgba(255,255,255,"+color[6][0]+")'>"+date[6][0]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][1]+"); color:rgba(255,255,255,"+color[6][1]+")'>"+date[6][1]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][2]+"); color:rgba(255,255,255,"+color[6][2]+")'>"+date[6][2]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][3]+"); color:rgba(255,255,255,"+color[6][3]+")'>"+date[6][3]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][4]+"); color:rgba(255,255,255,"+color[6][4]+")'>"+date[6][4]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][5]+"); color:rgba(255,255,255,"+color[6][5]+")'>"+date[6][5]+"</td>"+
						"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][6]+"); color:rgba(255,255,255,"+color[6][6]+")'>"+date[6][6]+"</td>"+
						"</tr>"+
						"</table>"+
						"</div>";
					setTimeout(function(){width+=20-i;document.getElementById("calendar").innerHTML=text;},900+700*i+100*j+10*k);
				})(i,j,k)
		}
	for (k=1;k<=10;k++)
		(function(k)
		{
			if (date[6][6]==1)
				beta=30;
			color[6][6]=k/beta;
			var text=
				"<div><br><br><br><br><br><br>"+
				"<p align='center'>"+
				"<font style='color: #FFFFFF ;font-size: 40px ;font-weight: 100'>"+
				year+"年"+month+"月"+
				"</font>"+
				"</p>"+
				"<table align='center' style='font-size: 20px ;font-weight: 100'>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][0]+"); color:rgba(255,255,255,"+color[0][0]+")'>"+date[0][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][1]+"); color:rgba(255,255,255,"+color[0][1]+")'>"+date[0][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][2]+"); color:rgba(255,255,255,"+color[0][2]+")'>"+date[0][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][3]+"); color:rgba(255,255,255,"+color[0][3]+")'>"+date[0][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][4]+"); color:rgba(255,255,255,"+color[0][4]+")'>"+date[0][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][5]+"); color:rgba(255,255,255,"+color[0][5]+")'>"+date[0][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][6]+"); color:rgba(255,255,255,"+color[0][6]+")'>"+date[0][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][0]+"); color:rgba(255,255,255,"+color[1][0]+")'>"+date[1][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][1]+"); color:rgba(255,255,255,"+color[1][1]+")'>"+date[1][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][2]+"); color:rgba(255,255,255,"+color[1][2]+")'>"+date[1][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][3]+"); color:rgba(255,255,255,"+color[1][3]+")'>"+date[1][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][4]+"); color:rgba(255,255,255,"+color[1][4]+")'>"+date[1][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][5]+"); color:rgba(255,255,255,"+color[1][5]+")'>"+date[1][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][6]+"); color:rgba(255,255,255,"+color[1][6]+")'>"+date[1][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][0]+"); color:rgba(255,255,255,"+color[2][0]+")'>"+date[2][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][1]+"); color:rgba(255,255,255,"+color[2][1]+")'>"+date[2][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][2]+"); color:rgba(255,255,255,"+color[2][2]+")'>"+date[2][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][3]+"); color:rgba(255,255,255,"+color[2][3]+")'>"+date[2][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][4]+"); color:rgba(255,255,255,"+color[2][4]+")'>"+date[2][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][5]+"); color:rgba(255,255,255,"+color[2][5]+")'>"+date[2][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][6]+"); color:rgba(255,255,255,"+color[2][6]+")'>"+date[2][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][0]+"); color:rgba(255,255,255,"+color[3][0]+")'>"+date[3][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][1]+"); color:rgba(255,255,255,"+color[3][1]+")'>"+date[3][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][2]+"); color:rgba(255,255,255,"+color[3][2]+")'>"+date[3][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][3]+"); color:rgba(255,255,255,"+color[3][3]+")'>"+date[3][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][4]+"); color:rgba(255,255,255,"+color[3][4]+")'>"+date[3][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][5]+"); color:rgba(255,255,255,"+color[3][5]+")'>"+date[3][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][6]+"); color:rgba(255,255,255,"+color[3][6]+")'>"+date[3][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][0]+"); color:rgba(255,255,255,"+color[4][0]+")'>"+date[4][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][1]+"); color:rgba(255,255,255,"+color[4][1]+")'>"+date[4][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][2]+"); color:rgba(255,255,255,"+color[4][2]+")'>"+date[4][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][3]+"); color:rgba(255,255,255,"+color[4][3]+")'>"+date[4][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][4]+"); color:rgba(255,255,255,"+color[4][4]+")'>"+date[4][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][5]+"); color:rgba(255,255,255,"+color[4][5]+")'>"+date[4][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][6]+"); color:rgba(255,255,255,"+color[4][6]+")'>"+date[4][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][0]+"); color:rgba(255,255,255,"+color[5][0]+")'>"+date[5][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][1]+"); color:rgba(255,255,255,"+color[5][1]+")'>"+date[5][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][2]+"); color:rgba(255,255,255,"+color[5][2]+")'>"+date[5][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][3]+"); color:rgba(255,255,255,"+color[5][3]+")'>"+date[5][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][4]+"); color:rgba(255,255,255,"+color[5][4]+")'>"+date[5][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][5]+"); color:rgba(255,255,255,"+color[5][5]+")'>"+date[5][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][6]+"); color:rgba(255,255,255,"+color[5][6]+")'>"+date[5][6]+"</td>"+
				"</tr>"+
				"<tr height=40px>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][0]+"); color:rgba(255,255,255,"+color[6][0]+")'>"+date[6][0]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][1]+"); color:rgba(255,255,255,"+color[6][1]+")'>"+date[6][1]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][2]+"); color:rgba(255,255,255,"+color[6][2]+")'>"+date[6][2]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][3]+"); color:rgba(255,255,255,"+color[6][3]+")'>"+date[6][3]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][4]+"); color:rgba(255,255,255,"+color[6][4]+")'>"+date[6][4]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][5]+"); color:rgba(255,255,255,"+color[6][5]+")'>"+date[6][5]+"</td>"+
				"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][6]+"); color:rgba(255,255,255,"+color[6][6]+")'>"+date[6][6]+"</td>"+
				"</tr>"+
				"</table>"+
				"</div>";
			setTimeout(function(){width+=20-i;document.getElementById("calendar").innerHTML=text;},5800+10*k);
		})(k)
	for (j=0;j<schedule_number+1;j++)
		for (k=1;k<=20;k++)
			(function(j,k)
			{
				if (j!=schedule_number)
					if (j==0 && schedule_date[0][0]==year && schedule_date[0][1]==month && schedule_date[0][2]==_date)
					{
						alpha[7][0]=k/80;
						if (k==1)
							appendix="<font style='font-size: 20px; color: rgba(255,255,255,0.375)'>今天</font>";
					}
					else
						alpha[7][j]=k/160;
				if (j!=0)
					color[7][j-1]=k/20;
				var text=
					"<div id='calendar_inner'><br><br><br><br><br><br>"+
					"<p align='center'>"+
					"<font style='color: #FFFFFF ;font-size: 40px ;font-weight: 100'>"+
					year+"年"+month+"月"+
					"</font>"+
					"</p>"+
					"<table align='center' style='font-size: 20px ;font-weight: 100'>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][0]+"); color:rgba(255,255,255,"+color[0][0]+")'>"+date[0][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][1]+"); color:rgba(255,255,255,"+color[0][1]+")'>"+date[0][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][2]+"); color:rgba(255,255,255,"+color[0][2]+")'>"+date[0][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][3]+"); color:rgba(255,255,255,"+color[0][3]+")'>"+date[0][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][4]+"); color:rgba(255,255,255,"+color[0][4]+")'>"+date[0][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][5]+"); color:rgba(255,255,255,"+color[0][5]+")'>"+date[0][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[0][6]+"); color:rgba(255,255,255,"+color[0][6]+")'>"+date[0][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][0]+"); color:rgba(255,255,255,"+color[1][0]+")'>"+date[1][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][1]+"); color:rgba(255,255,255,"+color[1][1]+")'>"+date[1][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][2]+"); color:rgba(255,255,255,"+color[1][2]+")'>"+date[1][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][3]+"); color:rgba(255,255,255,"+color[1][3]+")'>"+date[1][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][4]+"); color:rgba(255,255,255,"+color[1][4]+")'>"+date[1][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][5]+"); color:rgba(255,255,255,"+color[1][5]+")'>"+date[1][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[1][6]+"); color:rgba(255,255,255,"+color[1][6]+")'>"+date[1][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][0]+"); color:rgba(255,255,255,"+color[2][0]+")'>"+date[2][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][1]+"); color:rgba(255,255,255,"+color[2][1]+")'>"+date[2][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][2]+"); color:rgba(255,255,255,"+color[2][2]+")'>"+date[2][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][3]+"); color:rgba(255,255,255,"+color[2][3]+")'>"+date[2][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][4]+"); color:rgba(255,255,255,"+color[2][4]+")'>"+date[2][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][5]+"); color:rgba(255,255,255,"+color[2][5]+")'>"+date[2][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[2][6]+"); color:rgba(255,255,255,"+color[2][6]+")'>"+date[2][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][0]+"); color:rgba(255,255,255,"+color[3][0]+")'>"+date[3][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][1]+"); color:rgba(255,255,255,"+color[3][1]+")'>"+date[3][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][2]+"); color:rgba(255,255,255,"+color[3][2]+")'>"+date[3][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][3]+"); color:rgba(255,255,255,"+color[3][3]+")'>"+date[3][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][4]+"); color:rgba(255,255,255,"+color[3][4]+")'>"+date[3][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][5]+"); color:rgba(255,255,255,"+color[3][5]+")'>"+date[3][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[3][6]+"); color:rgba(255,255,255,"+color[3][6]+")'>"+date[3][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][0]+"); color:rgba(255,255,255,"+color[4][0]+")'>"+date[4][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][1]+"); color:rgba(255,255,255,"+color[4][1]+")'>"+date[4][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][2]+"); color:rgba(255,255,255,"+color[4][2]+")'>"+date[4][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][3]+"); color:rgba(255,255,255,"+color[4][3]+")'>"+date[4][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][4]+"); color:rgba(255,255,255,"+color[4][4]+")'>"+date[4][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][5]+"); color:rgba(255,255,255,"+color[4][5]+")'>"+date[4][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[4][6]+"); color:rgba(255,255,255,"+color[4][6]+")'>"+date[4][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][0]+"); color:rgba(255,255,255,"+color[5][0]+")'>"+date[5][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][1]+"); color:rgba(255,255,255,"+color[5][1]+")'>"+date[5][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][2]+"); color:rgba(255,255,255,"+color[5][2]+")'>"+date[5][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][3]+"); color:rgba(255,255,255,"+color[5][3]+")'>"+date[5][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][4]+"); color:rgba(255,255,255,"+color[5][4]+")'>"+date[5][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][5]+"); color:rgba(255,255,255,"+color[5][5]+")'>"+date[5][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[5][6]+"); color:rgba(255,255,255,"+color[5][6]+")'>"+date[5][6]+"</td>"+
					"</tr>"+
					"<tr height=40px>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][0]+"); color:rgba(255,255,255,"+color[6][0]+")'>"+date[6][0]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][1]+"); color:rgba(255,255,255,"+color[6][1]+")'>"+date[6][1]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][2]+"); color:rgba(255,255,255,"+color[6][2]+")'>"+date[6][2]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][3]+"); color:rgba(255,255,255,"+color[6][3]+")'>"+date[6][3]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][4]+"); color:rgba(255,255,255,"+color[6][4]+")'>"+date[6][4]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][5]+"); color:rgba(255,255,255,"+color[6][5]+")'>"+date[6][5]+"</td>"+
					"<td align ='center' width=40px style='background:rgba(255,255,255,"+alpha[6][6]+"); color:rgba(255,255,255,"+color[6][6]+")'>"+date[6][6]+"</td>"+
					"</tr>"+
					"</table>"+
					"<br><br><br><br><br>"+
					"<table align='center' width=600px>";
				for (i=0;i<schedule_number;i++)
				{
					if (i==0)
						text+=	"<tr height=80px style='font-size: 30px ;font-weight: 100; color:rgba(255,255,255,"+8*alpha[7][0]+")'>"+
								"<td><br>"+
								schedule_date[0][0]+"年"+schedule_date[0][1]+"月"+schedule_date[0][2]+"日"+appendix+
								"</td></tr>"+
								"<tr height=120px style='font-size: 25px ;font-weight: 100; background:rgba(255,255,255,"+alpha[7][0]+"); color:rgba(255,255,255,"+color[7][0]+")'>"+
								"<td>"+
								"&emsp;&emsp;"+schedule_text[0]+
								"</td></tr>";
					else
						text+=	"<tr height=80px style='font-size: 30px ;font-weight: 100; color:rgba(255,255,255,"+8*alpha[7][i]+")'>"+
								"<td><br>"+
								schedule_date[i][0]+"年"+schedule_date[i][1]+"月"+schedule_date[i][2]+"日"+
								"</td></tr>"+
								"<tr height=120px style='font-size: 25px ;font-weight: 100; background:rgba(255,255,255,"+alpha[7][i]+"); color:rgba(255,255,255,"+color[7][i]+")'>"+
								"<td>"+
								"&emsp;&emsp;"+schedule_text[i]+
								"</td></tr>";
				}
				text+="</table></div>";
				setTimeout(function(){width+=20-i;document.getElementById("calendar").innerHTML=text;},6000+400*j+20*k);
			})(j,k)
}
function Calendar_Fold()
{
	var i;
	var width=191;
	for (i=1;i<=10;i++)
		(function(i)
		{
			setTimeout(function(){document.getElementById("main_screen").style.filter="blur("+(10-i)+"px)";},400+40*i);
		})(i)
		setTimeout(function(){document.getElementById("main_screen").style.filter="";},400+40*i);
	for (i=1;i<=20;i++)
		(function(i)
		{
			setTimeout(function(){width-=i;document.getElementById("calendar").style.width=(width*100/191)+"%";},400+20*i);
			setTimeout(function(){document.getElementById("calendar_inner").style.filter="opacity("+(100-5*i)+"%)";},20*i);
		})(i)
	setTimeout(function(){document.getElementById("calendar").style.background="rgba(255, 255, 255, 0)";},400+20*i);
	setTimeout(function(){document.getElementById("calendar").innerHTML="";},20*i);
}

$(function(){Calendar_Event();setInterval(Calendar_Event,3600000);});