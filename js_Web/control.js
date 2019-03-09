var screen_id=0;
var temp;

function Central_Control(event)
{
	switch (screen_id)
	{
		case 0:
			switch (event.keyCode)
			{
				case 13: Message();break;
				case 37: Calendar_Spread();screen_id=1;break;
				case 38: Clock_Spread();screen_id=2;break;
				case 39: Weather_Detail_Spread();screen_id=3;break;
				case 40: Music_Spread();screen_id=4;break;
			}
			break;
		case 1:
			switch (event.keyCode)
			{
				case 13: break;
				case 37: break;
				case 38: break;
				case 39: Calendar_Fold();screen_id=0;break;
				case 40: break;
			}
			break;
		case 2:
			switch (event.keyCode)
			{
				case 13: Clock_Fold();screen_id=0;break;
				case 37: if (alarm_clock_mode!=3) {if (face!=4) Switch_Face_Behind();} else {if (add_number!=1) Alarm_Clock_Add_Change_Left();}break;
				case 38:
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
				case 39:
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
				case 40:
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
										case 4:	Alarm_Clock_Add(Set_Width(add_hour)+":"+Set_Width(add_minute),add_frequency[add_frequency_id]);break;
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
			switch (event.keyCode)
			{
				case 13: break;
				case 37: Weather_Detail_Fold();screen_id=0;break;
				case 38: if (page!=4) Switch_Page_Down();break;
				case 39: break;
				case 40: if (page!=1) Switch_Page_Up();break;
			}
			break;
		case 4:
			switch (event.keyCode)
			{
				case 13: Music_Play_Control();break;
				case 37: Music_Switch_Right();break;
				case 38: Music_Fold();screen_id=0;break;
				case 39: Music_Switch_Left();break;
				case 40: Music_Loop_Control();break;
			}
			break;
		case 5:
			switch (event.keyCode)
			{
				case 13: Alarm_Clock_Ring_Fold();break;
				case 37: Alarm_Clock_Ring_Fold();break;
				case 38: Alarm_Clock_Ring_Fold();break;
				case 39: Alarm_Clock_Ring_Fold();break;
				case 40: Alarm_Clock_Ring_Fold();break;
			}
			break;
	}
}

$(document).keydown(function(event){Central_Control(event);});
