var screen_id=0;

function Central_Control(data)
{
	switch (screen_id)
	{
		case 0:
			switch (data.cmd)
			{
				case "home": Message();break;
				case "left": Calendar_Spread();screen_id=1;break;
				case "up": Clock_Spread();screen_id=2;break;
				case "right": Weather_Detail_Spread();screen_id=3;break;
				case "down": Music_Spread();screen_id=4;break;
			}
			break;
		case 1:
			switch (data.cmd)
			{
				case "home": Calendar_Fold();screen_id=0;break;
				case "left": break;
				case "up": break;
				case "right": break;
				case "down": break;
			}
			break;
		case 2:
			switch (data.cmd)
			{
				case "home": Clock_Fold();screen_id=0;break;
				case "left": if (alarm_clock_mode!=3) {if (face!=4) Switch_Face_Behind();} else {if (add_number!=1) Alarm_Clock_Add_Change_Left();}break;
				case "up":
					switch (face) 
					{
						case 1:
							switch (alarm_clock_mode)
							{
								case 1: if (alarm_clock_number!=0) Alarm_Clock_Change_Up();break;
								case 2: if (alarm_clock_number!=0) Alarm_Clock_Delete_Change_Up();break;
								case 3: 
									switch (add_number)
									{
										case 1: Alarm_Clock_Add_Hour_Change_Up();break;
										case 2: Alarm_Clock_Add_Minute_Change_Up();break; 
										case 3: Alarm_Clock_Add_Frequency_Change_Up();break;
									}
									break;
							}
							break;
						case 2: break;
						case 3: if (count<15) Stopwatch_Count();break;
						case 4: Calculagraph_Set();break;
					}
					break;
				case "right":
					if (face!=1) Switch_Face_Front();
					else 
						switch (alarm_clock_mode)
						{
							case 0: Alarm_Clock_Edit(1);break;
							case 1:
								if (alarm_clock_number==0)
									Alarm_Clock_Delete_Mode();
								else if (alarm_clock_number==alarm_clock_sum+1)
									Alarm_Clock_Add_Mode();
								else
									Alarm_Clock_Switch();
								break;
							case 2:
								if (alarm_clock_number==0)
									Alarm_Clock_Edit(0);
								else
									Alarm_Clock_Delete();
								break;
							case 3:
								if (add_number!=5) Alarm_Clock_Add_Change_Right();break;
						}
						break;
				case "down":
					switch (face) 
					{
						case 1: 
							switch (alarm_clock_mode)
							{
								case 1: if (alarm_clock_number!=alarm_clock_sum+1) Alarm_Clock_Change_Down();break;
								case 2: if (alarm_clock_number!=alarm_clock_sum) Alarm_Clock_Delete_Change_Down();break;
								case 3: 
									switch (add_number)
									{
										case 1: Alarm_Clock_Add_Hour_Change_Down();break;
										case 2: Alarm_Clock_Add_Minute_Change_Down();break;
										case 3: Alarm_Clock_Add_Frequency_Change_Down();break;
										case 4: Alarm_Clock_Add(Set_Width(add_hour)+":"+Set_Width(add_minute),add_frequency[add_frequency_id]);break;
										case 5: Alarm_Clock_Edit(alarm_clock_sum+1);break;
									}
									break;
							}
							break;
						case 2: break;
						case 3: Stopwatch_Control();break;
						case 4: Calculagraph_Start();break;
					}
					break;
			}
			break;
		case 3:
			switch (data.cmd)
			{
				case "home": Weather_Detail_Fold();screen_id=0;break;
				case "left": break;
				case "up": if (page!=4) Switch_Page_Down();break;
				case "right": break;
				case "down": if (page!=1) Switch_Page_Up();break;
			}
			break;
		case 4:
			switch (data.cmd)
			{
				case "home": Music_Fold();screen_id=0;break;
				case "left": Music_Switch_Right();break;
				case "up": Music_Play_Control();break;
				case "right": Music_Switch_Left();break;
				case "down": Music_Loop_Control();break;
			}
			break;
		case 5:
			switch (data.cmd)
			{
				case "home": Alarm_Clock_Ring_Fold();break;
				case "left": Alarm_Clock_Ring_Fold();break;
				case "up": Alarm_Clock_Ring_Fold();break;
				case "right": Alarm_Clock_Ring_Fold();break;
				case "down": Alarm_Clock_Ring_Fold();break;
			}
			break;
	}
}

function Event()
{
	$.getJSON("http://0.0.0.0:80/jsonp/cmd?callback=?",
		function(data){if (data.cmd!="none") Central_Control(data);});
}

$(function(){setInterval(Event,1000);});
