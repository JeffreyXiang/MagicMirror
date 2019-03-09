#!/bin/bash

xrandr -o 1
chromium-browser --kiosk "/home/pi/Documents/MagicMirror/Booting.html" --incognito&
sudo create_ap --stop wlan0
sudo wvdial Huawei_4G &
sleep 60s
sudo create_ap -g 192.168.0.1 wlan0 ppp0 Pi 20190223 &
sudo python3 /home/pi/Documents/MagicMirror/MagicMirror.py &