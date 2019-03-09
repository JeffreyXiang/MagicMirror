var minute;

function Time()
{
	var time=new Date();
	var year=time.getFullYear();
	var month=time.getMonth()+1;
	var date=time.getDate();
	var day=time.getDay()
	var hours=time.getHours();
	var temp=time.getMinutes();

	if (temp!=minute)
	{
		minute=temp;
		Alarm_Clock_Ring();
		switch (day)
		{
			case 1: day="星期一";break;
			case 2: day="星期二";break;
			case 3: day="星期三";break;
			case 4: day="星期四";break;
			case 5: day="星期五";break;
			case 6: day="星期六";break;
			case 0: day="星期日";break;
		}
		var text=   "<p align ='right'>"+
				"<font style='color: #FFFFFF ;font-size: 120px'>"+
				Set_Width(hours)+":"+Set_Width(minute)+
				"</font><br>"+
				"<font style='color: #FFFFFF ;font-size: 20px'>"+
				year+"年"+month+"月"+date+"日"+day+"&nbsp;"+
				"</font>"+
				"</p>";
		document.getElementById("time").innerHTML=text;
	}
}


function Set_Width(a)
{
	if (a<10)
		return "0"+a;
	else
		return a;
}

$(function(){setInterval(Time,1000);});
$(function(){Time();});