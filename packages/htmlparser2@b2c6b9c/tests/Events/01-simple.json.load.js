montageDefine("b2c6b9c","tests/Events/01-simple.json",{exports:{name:"simple",options:{handler:{},parser:{}},html:"<h1 class=test>adsf</h1>",expected:[{event:"opentagname",data:["h1"]},{event:"attribute",data:["class","test"]},{event:"opentag",data:["h1",{"class":"test"}]},{event:"text",data:["adsf"]},{event:"closetag",data:["h1"]}]}});