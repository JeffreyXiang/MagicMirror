void setup() {
  // put your setup code here, to run once:
  pinMode(4,INPUT);
  pinMode(5,INPUT);
  pinMode(6,INPUT);
  pinMode(7,INPUT);
  Serial.begin(9600);
}

void output()
{
  int i=0;
  int cmd;
  if (!digitalRead(4)) cmd=1;
  else if (!digitalRead(5)) cmd=2;
  else if (!digitalRead(6)) cmd=3;
  else cmd=4;
  while (!(digitalRead(4) && digitalRead(5) && digitalRead(6) && digitalRead(7)))
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
    case 0:
      Serial.println("home");
      break;
    case 1:
      Serial.println("left");
      break;
    case 2:
      Serial.println("up");
      break;
    case 3:
      Serial.println("right");
      break;
    case 4:
      Serial.println("down");
      break;
  }
  delay(1000);
  while (!(digitalRead(4) && digitalRead(5) && digitalRead(6) && digitalRead(7)))
  {
    delay(10);
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!(digitalRead(4) && digitalRead(5) && digitalRead(6) && digitalRead(7)))
    output();
}
