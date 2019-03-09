from flask import Flask,jsonify,send_file,request,make_response
import json
import serial
import os

Serial=serial.Serial('/dev/ttyUSB0',9600,timeout=1)
Serial.close()
Serial.open()
app=Flask(__name__)

@app.route('/MagicMirror')
def MagicMirror():
    return send_file('MagicMirror_Web.html')

@app.route('/js/<filename>')
def js(filename):
    return send_file('js/'+filename)

@app.route('/js_Web/<filename>')
def js_web(filename):
    return send_file('js_Web/'+filename)

@app.route('/icon/<filename>')
def icon(filename):
    return send_file('icon/'+filename)

@app.route('/music/<filename>')
def music(filename):
    return send_file('music/'+filename)

@app.route('/ringtone/<filename>')
def ringtone(filename):
    return send_file('ringtone/'+filename)

@app.route('/fonts/<filename>')
def fonts(filename):
    return send_file('fonts/'+filename)

@app.route('/json/cmd')
def json_cmd():
    cmd=Serial.readline().decode()
    if cmd!='':
        cmd={'cmd':cmd[0:len(cmd)-2]}
    else:
        cmd={'cmd':'none'}
    return jsonify(cmd)

@app.route('/jsonp/cmd')
def jsonp_cmd():
    jsonp=make_response()
    callback=request.args.get('callback')
    cmd=Serial.readline().decode()
    if cmd!='':
        cmd=cmd[0:len(cmd)-2]
    else:
        cmd='none'
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"cmd":"'+cmd+'"})'
    return jsonp

@app.route('/json/alarm_clock/read')
def json_alarm_clock():
    return send_file('json/alarm_clock.json')

@app.route('/jsonp/alarm_clock/read')
def jsonp_alarm_clock():
    jsonp=make_response()
    callback=request.args.get('callback')
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'('+json.dumps(data)+')'
    return jsonp

@app.route('/json/alarm_clock/add')
def json_alarm_clock_add():
    time=request.args.get('time')
    frequency=request.args.get('frequency')
    add={'time':time,'frequency':frequency,'tag':'ON'}
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    data.append(add)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    return jsonify({'status':'Success! File update done.'})

@app.route('/jsonp/alarm_clock/add')
def jsonp_alarm_clock_add():
    callback=request.args.get('callback')
    time=request.args.get('time')
    frequency=request.args.get('frequency')
    add={'time':time,'frequency':frequency,'tag':'ON'}
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    data.append(add)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    jsonp=make_response()
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"status":"Success! File update done."})'
    return jsonp

@app.route('/json/alarm_clock/delete')
def json_alarm_clock_delete():
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    data.pop(number)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    return jsonify({'status':'Success! File update done.'})

@app.route('/jsonp/alarm_clock/delete')
def jsonp_alarm_clock_delete():
    callback=request.args.get('callback')
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    data.pop(number)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    jsonp=make_response()
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"status":"Success! File update done."})'
    return jsonp

@app.route('/json/alarm_clock/switch')
def json_alarm_clock_switch():
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    if data[number]['tag']=='OFF':
        data[number]['tag']='ON'
    else:
        data[number]['tag']='OFF'
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    return jsonify({'status':'Success! File update done.'})

@app.route('/jsonp/alarm_clock/switch')
def jsonp_alarm_clock_switch():
    callback=request.args.get('callback')
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/alarm_clock.json'))
    if data[number]['tag']=='OFF':
        data[number]['tag']='ON'
    else:
        data[number]['tag']='OFF'
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/alarm_clock.json','w'))
    jsonp=make_response()
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"status":"Success! File update done."})'
    return jsonp

@app.route('/json/schedule/read')
def json_schedule():
    return send_file('json/schedule.json')

@app.route('/jsonp/schedule/read')
def jsonp_schedule():
    jsonp=make_response()
    callback=request.args.get('callback')
    data=json.load(open('/home/pi/Documents/MagicMirror/json/schedule.json'))
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'('+json.dumps(data)+')'
    return jsonp

@app.route('/json/schedule/add')
def json_schedule_add():
    i=0
    year=request.args.get('year')
    month=request.args.get('month')
    day=request.args.get('day')
    text=request.args.get('text')
    add={'year':year,'month':month,'day':day,'text':text}
    data=json.load(open('/home/pi/Documents/MagicMirror/json/schedule.json'))
    while (i<len(data)):
        if (int(data[i]['year'])*366+int(data[i]['month'])*31+int(data[i]['day'])<=int(add['year'])*366+int(add['month'])*31+int(add['day'])):
            i+=1
        else:
            break
    data.insert(i,add)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/schedule.json','w'))
    return jsonify({'status':'Success! File update done.'})

@app.route('/jsonp/schedule/add')
def jsonp_schedule_add():
    i=0
    jsonp=make_response()
    callback=request.args.get('callback')
    year=request.args.get('year')
    month=request.args.get('month')
    day=request.args.get('day')
    text=request.args.get('text')
    add={'year':year,'month':month,'day':day,'text':text}
    data=json.load(open('/home/pi/Documents/MagicMirror/json/schedule.json'))
    while (i<len(data)):
        if (int(data[i]['year'])*366+int(data[i]['month'])*31+int(data[i]['day'])<=int(add['year'])*366+int(add['month'])*31+int(add['day'])):
            i+=1
        else:
            break
    data.insert(i,add)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/schedule.json','w'))
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"status":"Success! File update done."})'
    return jsonp

@app.route('/json/schedule/delete')
def json_schedule_delete():
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/schedule.json'))
    data.pop(number)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/schedule.json','w'))
    return jsonify({'status':'Success! File update done.'})

@app.route('/jsonp/schedule/delete')
def jsonp_schedule_delete():
    callback=request.args.get('callback')
    number=int(request.args.get('number'))
    data=json.load(open('/home/pi/Documents/MagicMirror/json/schedule.json'))
    data.pop(number)
    json.dump(data,open('/home/pi/Documents/MagicMirror/json/schedule.json','w'))
    jsonp=make_response()
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'({"status":"Success! File update done."})'
    return jsonp

@app.route('/json/curriculum/read')
def json_curriculum():
    return send_file('json/curriculum.json')

@app.route('/jsonp/curriculum/read')
def jsonp_curriculum():
    jsonp=make_response()
    callback=request.args.get('callback')
    data=json.load(open('/home/pi/Documents/MagicMirror/json/curriculum.json'))
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'('+json.dumps(data)+')'
    return jsonp

@app.route('/json/music_filename/read')
def json_music_filename():
    i=1
    json=make_response()
    for null,null,filenames in os.walk('/home/pi/Documents/MagicMirror/music'):
        data='[{"name":"'+filenames[0]+'"}'
        while (i<len(filenames)):
            data+=',{"name":"'+filenames[i]+'"}'
            i+=1
        data+=']'
    json.headers['content-type']='application/json'
    json.response=data
    return json
            
@app.route('/jsonp/music_filename/read')
def jsonp_music_filename():
    i=1
    jsonp=make_response()
    callback=request.args.get('callback')
    for null,null,filenames in os.walk('/home/pi/Documents/MagicMirror/music'):
        data='[{"name":"'+filenames[0]+'"}'
        while (i<len(filenames)):
            data+=',{"name":"'+filenames[i]+'"}'
            i+=1
        data+=']'
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'('+data+')'
    return jsonp

@app.route('/json/lyric/<filename>')
def json_lyric(filename):
    lyric=[]
    if filename in os.listdir('/home/pi/Documents/MagicMirror/lyric'):
        data=open('/home/pi/Documents/MagicMirror/lyric/'+filename).read()
        data=data.split('\n')
        for i in range(0,len(data)):
            time=data[i][1:data[i].index(']')]
            text=data[i].split(']')[1]
            if text != '':
                time=60*int(time.split(':')[0])+float(time.split(':')[1])
                lyric.append({'time':time,'text':text})
    return jsonify(lyric)

@app.route('/jsonp/lyric/<filename>')
def jsonp_lyric(filename):
    jsonp=make_response()
    callback=request.args.get('callback')
    lyric=[]
    if filename in os.listdir('/home/pi/Documents/MagicMirror/lyric'):
        data=open('/home/pi/Documents/MagicMirror/lyric/'+filename).read()
        data=data.split('\n')
        for i in range(0,len(data)):
            time=data[i][1:data[i].index(']')]
            text=data[i].split(']')[1]
            if text != '':
                time=60*int(time.split(':')[0])+float(time.split(':')[1])
                lyric.append({'time':time,'text':text})
    jsonp.headers['content-type']='application/javascript'
    jsonp.response=callback+'('+json.dumps(lyric)+')'
    return jsonp

@app.route('/administration/<filename>')
def administration(filename):
    return send_file('administration/'+filename+'.html')

if __name__=='__main__':
    app.run(host='0.0.0.0',port=80,debug=False,threaded=True)
