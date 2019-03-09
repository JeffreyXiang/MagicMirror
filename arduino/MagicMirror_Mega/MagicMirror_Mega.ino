void setup() {
  // put your setup code here, to run once:
  pinMode(46,INPUT);
  pinMode(48,INPUT);
  pinMode(50,INPUT);
  pinMode(52,INPUT);
  pinMode(49,OUTPUT);
  pinMode(51,OUTPUT);
  pinMode(53,OUTPUT);
  digitalWrite(49,0);digitalWrite(51,0);digitalWrite(53,0);
  Serial.begin(9600);
}

void output()
{
  int i=0;
  int cmd;
  if (!digitalRead(46)) cmd=1;
  else if (!digitalRead(48)) cmd=2;
  else if (!digitalRead(50)) cmd=3;
  else cmd=4;
  while (!(digitalRead(46) && digitalRead(48) && digitalRead(50) && digitalRead(52)))
  {
    delay(10);
    i+=10;
    if (i>=1000)
    {
      cmd=0;
      break;
    }
  }
  switch (cmd)
  {
    /* 
     * "none" : 000
     * "home" : 001
     * "left" : 010
     * "up"   : 011
     * "right": 100
     * "down" : 101
     */
    case 0:
      Serial.println("home");
      digitalWrite(49,0);digitalWrite(51,0);digitalWrite(53,1);
      break;
    case 1:
      Serial.println("left");
      digitalWrite(49,0);digitalWrite(51,1);digitalWrite(53,0);
      break;
    case 2:
      Serial.println("up");
      digitalWrite(49,0);digitalWrite(51,1);digitalWrite(53,1);
      break;
    case 3:
      Serial.println("right");
      digitalWrite(49,1);digitalWrite(51,0);digitalWrite(53,0);
      break;
    case 4:
      Serial.println("down");
      digitalWrite(49,1);digitalWrite(51,0);digitalWrite(53,1);
      break;
  }
  delay(1000);
  digitalWrite(49,0);digitalWrite(51,0);digitalWrite(53,0);
  while (!(digitalRead(46) && digitalRead(48) && digitalRead(50) && digitalRead(52)))
  {
    delay(10);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!(digitalRead(46) && digitalRead(48) && digitalRead(50) && digitalRead(52)))
    output();
  delay(10);
}
