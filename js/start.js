/**
 * @author MCoelho
 */
 function checkFiveParameters() {
	 //create a tag <img>
	createP("pLoading","","body");
	var img = document.createElement("img");
	img.id = "imgAguia";
	img.src="images/Logo miria - bm 2.png";
	img.align = "center";
	document.body.appendChild(img);	
	setStyle("imgAguia","absolute","","","9%","05px");
	createP("pTextLogo","AGUIA: Autonomous Graphical User Interface Assembly","body");
	setStyle("pTextLogo","absolute","600px","","1%","80px");
	document.getElementById("pTextLogo").style.font="italic bold 18px arial,serif";
	document.getElementById("pTextLogo").style.fontWeight="900";
	document.getElementById("pTextLogo").style.color = "#0F399B";
	var target=new Object(); 
	var found = document.location.search.match(/[|]+/g);
	if (found !=null) {
		var parms=document.location.search.match(/[^?&=|]+/g);
		if (parms){
			for (var i=0;i<parms.length;i=i+2)
			{
				if ((i==2)||(i==7)) {
					if (i==2) {
						var found = checkArguments(parms[i],"C");
						if (found==true) {
							target["COLLECTIONDATA"]= parms[i];
							i--;
						}
						else{
							target[parms[i].toUpperCase()]=parms[i+1];
						}
					}
					else{
						var found = checkArguments(parms[i],"P");
						if (found==true) {
							target["PROJECTGUI"]= parms[i];
							i--;
						}
						else{
							target[parms[i]]=parms[i+1];
						}
					}
				}
				else{
					target[parms[i].toUpperCase()]=parms[i+1];
				}
			}
			createImg("loading","","pLoading","Loading","images/loading.gif","");
			setStyle("loading","absolute","","","80%","50px");
			if (target.COLLECTIONDATA!=null) {
				urlQuery = target.URLDATA+'/URI.php?key='+target.KEYDATA+'&uid='+target.COLLECTIONDATA;
				s3db_jsonpp_call(urlQuery,'getFirstLocation(ans,'+JSON.stringify(target)+')');
			}
			else{
				getKey("",target);
			}
		}
	}
	else{
		var parms=document.location.search.match(/[^?&=]+/g);
		// if there is anything there load all attribute/value pairs
		if (parms){
			for (var i=0;i<parms.length;i=i+2)
			{
				target[parms[i].toUpperCase()]=parms[i+1];
			}
			createImg("loading","","pLoading","Loading","images/loading.gif","");
			setStyle("loading","absolute","","","650px","50px");
			getKey("",target);
		}
		else{
			start();
		}
	}
 }
function getFirstLocation(ans,target) {
	if (ans[0].error_code!=null) {
		alert(ans[0].message);
		url = window.location.href;
		url = window.location.href.split("?URLDATA");
		window.location.href = url[0];
	}
	else{
		target["PROJECTDATA"] = ans[0].project_id;
		target["COLLECTIONDATA"] = ans[0].collection_id;
	}
	if ((target.PROJECTGUI!=null)&&(target.URLGUI!=null)&&(target.KEYGUI!=null)) {
		urlQuery = target.URLGUI+'/URI.php?key='+target.KEYGUI+'&uid='+target.PROJECTGUI;
		s3db_jsonpp_call(urlQuery,'getSecondLocation(ans,'+JSON.stringify(target)+')');
	}
	else{
		getKey("",target);
	}
}
function getSecondLocation(ans,target) {
	if (ans[0].error_code!=null) {
		alert(ans[0].message);
		getKey("",target);
	}
	else{
		target["PROJECTGUI"] = ans[0].project_id;
		getKey("",target);
	}
}
function start(){
	var img = document.createElement("img");
	img.id = "imgLogin";
	img.src="images/login.png";
	img.align="center";
	document.body.appendChild(img);	
	setStyle("imgLogin","absolute","","","","140px");
	createP("pTextLogin","Login","body");
	setStyle("pTextLogin","absolute","400px","","20px","135px");
	document.getElementById("pTextLogin").style.font="italic bold 16px arial,serif";
	document.getElementById("pTextLogin").style.fontWeight="900";
	document.getElementById("pTextLogin").style.color = "#FFFFFF";
	var img = document.createElement("img");
	img.id = "helpLogin";
	img.src="images/InterrogacaoWinVista.PNG";
	img.align = "top";
	img.style.cursor="pointer";
	img.setAttribute("onclick","help();");
	document.body.appendChild(img);	
	setStyle("helpLogin","absolute","","","440px","367px");
	createTable("tableLogin","body","tbodyLogin");
	setStyle("tableLogin","absolute","","","140px","180px");
	createTr("trAutentication","tbodyLogin");
	createTd("tdAuthority","trAutentication","Authority");
	document.getElementById("tdAuthority").style.font="bold 14px arial,serif";
	document.getElementById("tdAuthority").style.fontWeight="900";
	document.getElementById("tdAuthority").style.color = "#FFFFFF";
	document.getElementById("tdAuthority").width="80px";
	document.getElementById("tdAuthority").height="35px";
	createTd("tdSelectAuthority","trAutentication","");
	var str = '<select id="selectAutentication" onChange=""></select>';
	document.getElementById("tdSelectAuthority").innerHTML = str;
	var option = document.createElement("option");
	option.id = "optionS3DB";
	option.name = "S3DB";
	option.value = "S3DB";
	document.getElementById("selectAutentication").appendChild(option);
	document.getElementById(option.id).innerHTML = "S3DB";
	var option = document.createElement("option");
	option.id = "optionMdanderson";
	option.name = "mdanderson";
	option.value = "mdanderson";
	document.getElementById("selectAutentication").appendChild(option);
	document.getElementById(option.id).innerHTML = "mdanderson";
	var option = document.createElement("option");
	option.id = "optionGoogle";
	option.name = "google";
	option.value = "google";
	document.getElementById("selectAutentication").appendChild(option);
	document.getElementById(option.id).innerHTML = "google";
	createTr("trURL","tbodyLogin");
	createTd("tdURL","trURL","S3DB URL");
	document.getElementById("tdURL").style.font="bold 14px arial,serif";
	document.getElementById("tdURL").style.fontWeight="900";
	document.getElementById("tdURL").style.color = "#FFFFFF";
	document.getElementById("tdURL").height="35px";
	createTd("tdInputURL","trURL","");
	createInput("inputURL","text","http://ibl.mdanderson.org/edu","tdInputURL");
	createTr("trUsername","tbodyLogin");
	createTd("tdUsername","trUsername","Username");
	document.getElementById("tdUsername").style.font="bold 14px arial,serif";
	document.getElementById("tdUsername").style.fontWeight="900";
	document.getElementById("tdUsername").style.color = "#FFFFFF";
	document.getElementById("tdUsername").height="35px";
	createTd("tdInputUsername","trUsername","");
	createInput("inputUsername","text","","tdInputUsername");
	document.getElementById("inputUsername").title = "Insert your S3DB username!";
	createTr("trPassword","tbodyLogin");
	createTd("tdPassword","trPassword","Password");
	document.getElementById("tdPassword").style.font="bold 14px arial,serif";
	document.getElementById("tdPassword").style.fontWeight="900";
	document.getElementById("tdPassword").style.color = "#FFFFFF";
	document.getElementById("tdPassword").height="35px";
	createTd("tdInputPassword","trPassword","");
	createInput("inputPassword","password","","tdInputPassword","","");
	document.getElementById("inputPassword").title = "Insert your S3DB password!";
	var inputButton = document.createElement("input");
	inputButton.id = "inputButton";
	inputButton.type = "button";
	inputButton.value = "Login";
	inputButton.setAttribute("onClick","validationData()");
	createTr("trButton","tbodyLogin");
	createTd("tdEmpty","trButton","");
	createTd("tdButton","trButton","");
	document.getElementById("tdButton").appendChild(inputButton);
	document.getElementById("tdButton").align="right";
	createP("pPublic",'Note: There is a public login. To login as public, please use "public" as username and "public" as password.',"body");
	setStyle("pPublic","absolute","","","","400px");
	document.getElementById("pPublic").style.maxWidth = "480px";
	document.getElementById("pPublic").align = "center";
	document.getElementById("pPublic").style.font="italic 13px arial,serif";
	document.getElementById("pPublic").style.fontWeight="900";
	document.getElementById("pPublic").style.color = "#000000";
	return false;
}
function help() {
	if (document.getElementById("imgTextHelp")!=null) {
		removeElement("imgTextHelp");
		removeElement("pTextHelp");
		removeElement("pTextHelp1");
		removeElement("pTextHelp2");
		removeElement("pTextHelp3");
		removeElement("pTextHelp4");
	}
	else{
		var img=document.createElement("img");
		img.id="imgTextHelp";
		img.src="images/help.png";
		document.body.appendChild(img);
		setStyle("imgTextHelp","absolute","","","486px","155px");
		createP("pTextHelp","Help","body");
		setStyle("pTextHelp","absolute","","","630px","160px");
		document.getElementById("pTextHelp").style.font="italic bold 18px arial,serif";
		document.getElementById("pTextHelp").style.fontWeight="900";
		document.getElementById("pTextHelp").style.color = "#0F399B";
		createP("pTextHelp1","-<b>Field Autority</b>: please select MD Anderson, google or S3DB autority;","body");
		setStyle("pTextHelp1","absolute","325px","","495px","200px");
		document.getElementById("pTextHelp1").style.font="14px arial,serif";
		document.getElementById("pTextHelp1").style.color = "#0F399B";
		createP("pTextHelp2","-<b>Field S3DB URL</b>: please insert S3DB URL;","body");
		setStyle("pTextHelp2","absolute","325px","","495px","240px");
		document.getElementById("pTextHelp2").style.font="14px arial,serif";
		document.getElementById("pTextHelp2").style.color = "#0F399B";
		createP("pTextHelp3","-<b>Field Username</b>: please enter your S3DB username;","body");
		setStyle("pTextHelp3","absolute","325px","","495px","270px");
		document.getElementById("pTextHelp3").style.font="14px arial,serif";
		document.getElementById("pTextHelp3").style.color = "#0F399B";
		createP("pTextHelp4","-<b>Field Password</b>: please enter your S3DB password.","body");
		setStyle("pTextHelp4","absolute","325px","","495px","310px");
		document.getElementById("pTextHelp4").style.font="14px arial,serif";
		document.getElementById("pTextHelp4").style.color = "#0F399B";
		
	}

}
function createFieldset(idFieldset,idParent){
	//create a tag<fieldset>
	var fieldset = document.createElement("fieldset");
	fieldset.id = idFieldset;
	if (idParent=="body"){
		document.getElementsByTagName(idParent)[0].appendChild(fieldset);
	}
	else{
		document.getElementById(idParent).appendChild(fieldset);	
	}
	return false;
}
function createLegend(textLegend,idFieldset,idLegend){
	//create a tag <legend>
	var legend = document.createElement("legend");
	legend.id = idLegend;
	legend.border = "3px";
	document.getElementById(idFieldset).appendChild(legend).innerHTML = textLegend;
	return false;
}
function createInput(id,type,value,idParent,name,readonly){
	var input = document.createElement("input");
	input.id = id;
	input.type=type;
	input.value= value;
	input.name=name;
	input.readOnly=readonly;
	input.size="30";
	document.getElementById(idParent).appendChild(input);
	return false;
}
function createTable(idTable,idParent,idTbody){
	var table= document.createElement("table");
	table.id=idTable;
	if (idParent=="body"){
		document.getElementsByTagName(idParent)[0].appendChild(table);
	}
	else{
		document.getElementById(idParent).appendChild(table);	
	}
	var tbody= document.createElement("tbody");
	tbody.id=idTbody;
	document.getElementById(idTable).appendChild(tbody);
	return false;
}
function createTr(id,idParent){
	var tr = document.createElement("tr");
	tr.id = id;
	document.getElementById(idParent).appendChild(tr);
	return false;
}
function createTd(id,idParent,text){
	var td = document.createElement("td");
	td.id = id;
	document.getElementById(idParent).appendChild(td).innerHTML = text;
	return false;
}
function createP(idP,textP,idParent){
	//create a first tag <p>
	var temp = document.createElement("p");
	temp.id = idP;
	if (idParent=="body"){
		document.getElementsByTagName(idParent)[0].appendChild(temp);
	}
	else{
		document.getElementById(idParent).appendChild(temp);	
	}
	if (textP != "") {
		document.getElementById(temp.id).innerHTML = textP;
	}
	return false;
}
function setStyle(id,position,width,height,left,top){
	document.getElementById(id).style.font = "13px arial,serif";
	document.getElementById(id).style.position=position;
	document.getElementById(id).style.width=width;
	document.getElementById(id).style.height=height;
	document.getElementById(id).style.left=left;
	document.getElementById(id).style.top=top;
	return false;
}
function checkArguments(str,arg) {
	var found = str.search(arg);
	if (found==-1) {
		return false;
	}
	else{
		var found = str.search(/[0-9][0-9]+/);
		if (found==-1) {
			return false;
		}
		else{
			return true;
		}
	}
}
