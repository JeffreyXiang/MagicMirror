var curriculum=[[],[],[],[],[]];

function Curriculum_Event()
{
	$.get("http://0.0.0.0:80/jsonp/curriculum/read",function(data)
	{
		var i,j;
		for (i=0;i<5;i++)
			for (j=0;j<5;j++)
				curriculum[i][j]=data[i][j].curriculum+"<br>"+data[i][j].place;
		Curriculum();
	},"jsonp")
}

function Curriculum()
{
	var day=new Date().getDay();
	var color=new Array
	(
		day==1?"#404040":"#202020",
		day==2?"#404040":"#202020",
		day==3?"#404040":"#202020",
		day==4?"#404040":"#202020",
		day==5?"#404040":"#202020"
	)
	var text=	"<div style='height: 10px'></div>"+
				"<table border='1px' bordercolor='#000000' cellspacing='0px' align ='right' style='color: #FFFFFF ;font-size: 15px'><tr height=30px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+">"+curriculum[0][0]+"</td>"+
				"<td width=90px bgcolor= "+color[1]+">"+curriculum[1][0]+"</td>"+
				"<td width=90px bgcolor= "+color[2]+">"+curriculum[2][0]+"</td>"+
				"<td width=90px bgcolor= "+color[3]+">"+curriculum[3][0]+"</td>"+
				"<td width=90px bgcolor= "+color[4]+">"+curriculum[4][0]+"</td>"+
				"</tr><tr height=30px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+">"+curriculum[0][1]+"</td>"+
				"<td width=90px bgcolor= "+color[1]+">"+curriculum[1][1]+"</td>"+
				"<td width=90px bgcolor= "+color[2]+">"+curriculum[2][1]+"</td>"+
				"<td width=90px bgcolor= "+color[3]+">"+curriculum[3][1]+"</td>"+
				"<td width=90px bgcolor= "+color[4]+">"+curriculum[4][1]+"</td>"+
				"</tr><tr height=5px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+"></td>"+
				"<td width=90px bgcolor= "+color[1]+"></td>"+
				"<td width=90px bgcolor= "+color[2]+"></td>"+
				"<td width=90px bgcolor= "+color[3]+"></td>"+
				"<td width=90px bgcolor= "+color[4]+"></td>"+
				"</tr><tr height=30px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+">"+curriculum[0][2]+"</td>"+
				"<td width=90px bgcolor= "+color[1]+">"+curriculum[1][2]+"</td>"+
				"<td width=90px bgcolor= "+color[2]+">"+curriculum[2][2]+"</td>"+
				"<td width=90px bgcolor= "+color[3]+">"+curriculum[3][2]+"</td>"+
				"<td width=90px bgcolor= "+color[4]+">"+curriculum[4][2]+"</td>"+
				"</tr><tr height=30px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+">"+curriculum[0][3]+"</td>"+
				"<td width=90px bgcolor= "+color[1]+">"+curriculum[1][3]+"</td>"+
				"<td width=90px bgcolor= "+color[2]+">"+curriculum[2][3]+"</td>"+
				"<td width=90px bgcolor= "+color[3]+">"+curriculum[3][3]+"</td>"+
				"<td width=90px bgcolor= "+color[4]+">"+curriculum[4][3]+"</td>"+
				"</tr><tr height=5px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+"></td>"+
				"<td width=90px bgcolor= "+color[1]+"></td>"+
				"<td width=90px bgcolor= "+color[2]+"></td>"+
				"<td width=90px bgcolor= "+color[3]+"></td>"+
				"<td width=90px bgcolor= "+color[4]+"></td>"+
				"</tr><tr height=30px align ='center'>"+
				"<td width=90px bgcolor= "+color[0]+">"+curriculum[0][4]+"</td>"+
				"<td width=90px bgcolor= "+color[1]+">"+curriculum[1][4]+"</td>"+
				"<td width=90px bgcolor= "+color[2]+">"+curriculum[2][4]+"</td>"+
				"<td width=90px bgcolor= "+color[3]+">"+curriculum[3][4]+"</td>"+
				"<td width=90px bgcolor= "+color[4]+">"+curriculum[4][4]+"</td>"+
				"</tr></table>";
	document.getElementById("curriculum").innerHTML=text;
}

//$(function(){setInterval(Curriculum_Event,1000);});
$(function(){Curriculum_Event();});