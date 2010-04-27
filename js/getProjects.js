var allRules;
var allActions;
var idProjectGIRules = "";
var projectRules = "";
var idProjectGIRules="";
var range=null;
var domain=null;
var action=null;
var trigger=null;
var value=null;
var fieldTextArea=new Array();
var fieldOptions=new Array();
var fieldDate=new Array();
var fieldText=new Array();
var fieldInactive=new Array();
var fieldFormula=new Array();
var fieldConcatenation=new Array();
var fieldCondition=new Array();
var fieldRestrictionsActive=new Array();
var moreFields=new Array();
var subCollections = new Array();
var fieldNumber = new Array();
function queryProjects(){
	removeElement("tableLogin");
	removeElement("imgLogin");
	removeElement("pTextLogin");
	removeElement("loading");
	removeElement("helpLogin");
	removeElement("imgTextHelp");
	removeElement("pTextHelp");
	removeElement("pTextHelp1");
	removeElement("pTextHelp2");
	removeElement("pTextHelp3");
	removeElement("pTextHelp4");
	var key = document.getElementById("key").value;
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>project_id,name</select><from>projects</from><where></where></S3QL>';
	s3db_jsonpp_call(urlQuery,"getProjects(ans)");
}
function getProjects(ans){
	setStyle("imgAguia","absolute","","","14%","05px");
	setStyle("pTextLogo","absolute","600px","","6%","80px");
	document.getElementById("pTextLogo").style.font="italic bold 18px arial,serif";
	document.getElementById("pTextLogo").style.fontWeight="900";
	document.getElementById("pTextLogo").style.color = "#0F399B";
	projectRules = ans;
	var key = document.getElementById("key").value;
	removeElement("loading");
	var img = document.createElement("img");
	img.id = "imgProjectsSmall";
	img.src="images/selectProjectsSmall.PNG";
	img.align="center";
	document.body.appendChild(img);	
	setStyle("imgProjectsSmall","absolute","","","","190px");
	var img = document.createElement("img");
	img.id = "imgProjects";
	img.src="images/selectProjects.PNG";
	img.align="center";
	img.style.display="none";
	document.body.appendChild(img);	
	setStyle("imgProjects","absolute","","","","190px");
	var img = document.createElement("img");
	img.id = "helpProjects";
	img.src="images/InterrogacaoWinVista.PNG";
	img.align = "top";
	img.style.cursor="pointer";
	img.setAttribute("onclick","help2();");
	document.body.appendChild(img);	
	setStyle("helpProjects","absolute","","","585px","413px");
	createP("pTextSelectProjects","Select Projects","body");
	setStyle("pTextSelectProjects","absolute","400px","","20px","185px");
	document.getElementById("pTextSelectProjects").style.font="italic bold 16px arial,serif";
	document.getElementById("pTextSelectProjects").style.fontWeight="900";
	document.getElementById("pTextSelectProjects").style.color = "#FFFFFF";
	createTable("tableSelectProject","body","tbodySelectProject");
	setStyle("tableSelectProject","absolute","","","140px","230px");
	document.getElementById("tableSelectProject").cellSpacing="10";
	document.getElementById("tableSelectProject").width="500px";
	createTr("trSelectProject","tbodySelectProject");
	createTd("tdTextSelectProject","trSelectProject","Select Data Project");
	document.getElementById("tdTextSelectProject").style.font="bold 13px arial,serif";
	document.getElementById("tdTextSelectProject").style.fontWeight="900";
	document.getElementById("tdTextSelectProject").style.color = "#FFFFFF";
	document.getElementById("tdTextSelectProject").width="140px";
	document.getElementById("tdTextSelectProject").height="38px";
	createTd("tdSelectProject","trSelectProject","");
	var str = '<select id="getProjects" onChange="enableDisableButton(this.id);"></select>';
	document.getElementById("tdSelectProject").innerHTML=str;
	var optionProject = document.createElement("option");
	optionProject.id="optionProjectEmpty";
	optionProject.value="";
	document.getElementById("getProjects").appendChild(optionProject);
	document.getElementById(optionProject.id).innerHTML="";
	for (i = 0; i < ans.length; i++) {
		var optionProject = document.createElement("option");
		optionProject.id = ans[i].name;
		optionProject.name = ans[i].name;
		optionProject.value=ans[i].project_id;
		document.getElementById("getProjects").appendChild(optionProject);
		document.getElementById(optionProject.id).innerHTML=ans[i].name
	}
	createTr("trCheckBoxGUIProjects","tbodySelectProject");
	createTd("tdCheckBoxGUIProjects","trCheckBoxGUIProjects","");
	var str = '<input id="checkBoxGUIProjects" type="checkbox" onclick="getUrlGUIRules();"><i><b><font color="#FFFFFF">Graphic rules in another S3DB domain</font></b></i></input>'
	document.getElementById("tdCheckBoxGUIProjects").innerHTML =str ;
	document.getElementById("tdCheckBoxGUIProjects").colSpan="2";
	createTr("trSelectRulesProject","tbodySelectProject");
	createTd("tdTextSelectRulesProject","trSelectRulesProject","Select Graphic Rules Project");
	document.getElementById("tdTextSelectRulesProject").style.font="bold 13px arial,serif";
	document.getElementById("tdTextSelectRulesProject").style.fontWeight="900";
	document.getElementById("tdTextSelectRulesProject").style.color = "#FFFFFF";
	document.getElementById("tdTextSelectRulesProject").width="140px";
	document.getElementById("tdTextSelectRulesProject").height="35px";
	createTd("tdSelectRulesProject","trSelectRulesProject","");
	var str = '<select id="getRulesProjects" onChange=""></select>';
	document.getElementById("tdSelectRulesProject").innerHTML=str;
	var optionProject = document.createElement("option");
	optionProject.id="optionProjectEmpty";
	optionProject.value="";
	document.getElementById("getRulesProjects").appendChild(optionProject);
	document.getElementById(optionProject.id).innerHTML="";
	for (i = 0; i < ans.length; i++) {
		var optionProject = document.createElement("option");
		optionProject.id = "rule"+ans[i].name;
		optionProject.name = ans[i].name;
		optionProject.value=ans[i].project_id;
		document.getElementById("getRulesProjects").appendChild(optionProject);
		document.getElementById(optionProject.id).innerHTML=ans[i].name
	}
	createTr("trButtonOk","tbodySelectProject");
	createTd("tdButtonOk","trButtonOk","");
	var button = document.createElement("input");
	button.id="buttonOk";
	button.type="button";
	button.value="Ok";
	button.disabled = "disabled"
	button.setAttribute("onclick","getCollectionsRules('"+url+"','"+key+"')");
	document.getElementById("tdButtonOk").appendChild(button);
}
function help2() {
	if (document.getElementById("imgProjectsHelp")!=null) {
		removeElement("imgProjectsHelp");
		removeElement("pTextHelp");
		removeElement("pTextHelp1");
		removeElement("pTextHelp2");
		removeElement("pTextHelp3");
		removeElement("pTextHelp4");
	}
	else{
		var img=document.createElement("img");
		img.id="imgProjectsHelp";
		img.src="images/help.png";
		document.body.appendChild(img);
		setStyle("imgProjectsHelp","absolute","","","627px","208px");
		createP("pTextHelp","Help","body");
		setStyle("pTextHelp","absolute","","","757px","210px");
		document.getElementById("pTextHelp").style.font="italic bold 18px arial,serif";
		document.getElementById("pTextHelp").style.fontWeight="900";
		document.getElementById("pTextHelp").style.color = "#0F399B";
		createP("pTextHelp1","-<b>Field Select Data Project</b>: please select S3DB data project","body");
		setStyle("pTextHelp1","absolute","325px","","637px","250px");
		document.getElementById("pTextHelp1").style.font="14px arial,serif";
		document.getElementById("pTextHelp1").style.color = "#0F399B";
		createP("pTextHelp2","-<b>Field Select Graphic Rules Project</b>: please select S3DB data project. If this project doesn't exists, please leave empty;","body");
		setStyle("pTextHelp2","absolute","325px","","637px","290px");
		document.getElementById("pTextHelp2").style.font="14px arial,serif";
		document.getElementById("pTextHelp2").style.color = "#0F399B";
	}	
}
function enableDisableButton(id) {
	if (document.getElementById("buttonOk").disabled == true) {
		document.getElementById("buttonOk").disabled = "disabled";
		if (document.getElementById(id).value!="") {
			document.getElementById("buttonOk").disabled = false;
		}
	}
	else{
		document.getElementById("buttonOk").disabled = "disabled";
		if (document.getElementById(id).value!="") {
			document.getElementById("buttonOk").disabled = false;
		}
	}
}
function getUrlGUIRules() {
	var key = document.getElementById("key").value;
	if (document.getElementById("checkBoxGUIProjects").checked==true) {
		if (document.getElementById("imgProjectsHelp")!=null) {
			createP("pTextHelp3","-<b>Field URL GUI rules</b>: please enter URL GUI rules;","body");
			setStyle("pTextHelp3","absolute","325px","","637px","350px");
			document.getElementById("pTextHelp3").style.font="14px arial,serif";
			document.getElementById("pTextHelp3").style.color = "#0F399B";
			createP("pTextHelp4","-<b>Field Access Key</b>: please enter access key GUI rules and press enter.","body");
			setStyle("pTextHelp4","absolute","325px","","637px","380px");
			document.getElementById("pTextHelp4").style.font="14px arial,serif";
			document.getElementById("pTextHelp4").style.color = "#0F399B";
		}
		removeElement("trButtonOk");
		removeElement("trSelectRulesProject");
		document.getElementById("imgProjectsSmall").style.display = "none";
		setStyle("helpProjects","absolute","","","585px","493px");
		document.getElementById("imgProjects").style.display = "";
		setStyle("imgProjects","absolute","","","","190px");
		createTr("trGUIProjectURL","tbodySelectProject");
		createTd("tdTextUrlGUIProject","trGUIProjectURL","<i>URL GUI rules</i>");
		document.getElementById("tdTextUrlGUIProject").style.font="bold 13px arial,serif";
		document.getElementById("tdTextUrlGUIProject").style.fontWeight="900";
		document.getElementById("tdTextUrlGUIProject").style.color = "#FFFFFF";
		document.getElementById("tdTextUrlGUIProject").width="80px";
		document.getElementById("tdTextUrlGUIProject").height="35px";
		createTd("tdUrlGUIProject","trGUIProjectURL","");
		var input = document.createElement("input");
		input.id="urlGuiProjects";
		input.type = "text";
		input.value="";
		input.title="Enter with the S3DB URL!";
		input.setAttribute("onchange","queryProjectGUIRules()");
		document.getElementById("tdUrlGUIProject").appendChild(input);
		document.getElementById("urlGuiProjects").size="35";
		createTr("trGUIProjectKey","tbodySelectProject");
		createTd("tdTextKeyGUIProject","trGUIProjectKey","<i>Access key</i>");
		document.getElementById("tdTextKeyGUIProject").style.font="bold 13px arial,serif";
		document.getElementById("tdTextKeyGUIProject").style.fontWeight="900";
		document.getElementById("tdTextKeyGUIProject").style.color = "#FFFFFF";
		document.getElementById("tdTextKeyGUIProject").width="80px";
		document.getElementById("tdTextKeyGUIProject").height="35px";
		createTd("tdKeyGUIProject","trGUIProjectKey","");
		var input = document.createElement("input");
		input.id="keyGuiProjects";
		input.type = "password";
		input.value="";
		input.title="Enter with the S3DB key and press enter!!!";
		input.setAttribute("onchange","queryProjectGUIRules()");
		document.getElementById("tdKeyGUIProject").appendChild(input);
		createTr("trButtonOk","tbodySelectProject");
		createTd("tdButtonOk","trButtonOk","");
		var button = document.createElement("input");
		button.id="buttonOk";
		button.type="button";
		button.value="Ok";
		button.disabled = "disabled";
		document.getElementById("tdButtonOk").appendChild(button);
	}
	else{
		removeElement("trGUIProjectURL");
		removeElement("trGUIProjectKey");
		removeElement("pTextHelp3");
		removeElement("pTextHelp4");
		document.getElementById("imgProjectsSmall").style.display = "";
		document.getElementById("imgProjects").style.display = "none";
		setStyle("helpProjects","absolute","","","585px","413px");
		removeElement("trButtonOk");
		createTr("trSelectRulesProject","tbodySelectProject");
		createTd("tdTextSelectRulesProject","trSelectRulesProject","Select Graphic Rules Project");
		document.getElementById("tdTextSelectRulesProject").style.font="bold 13px arial,serif";
		document.getElementById("tdTextSelectRulesProject").style.fontWeight="900";
		document.getElementById("tdTextSelectRulesProject").style.color = "#FFFFFF";
		document.getElementById("tdTextSelectRulesProject").width="80px";
		document.getElementById("tdTextSelectRulesProject").height="35px";
		createTd("tdSelectRulesProject","trSelectRulesProject","");
		var str = '<select id="getRulesProjects" onChange=""></select>';
		document.getElementById("tdSelectRulesProject").innerHTML=str;
		var optionProject = document.createElement("option");
		optionProject.id="optionProjectEmpty";
		optionProject.value="";
		document.getElementById("getRulesProjects").appendChild(optionProject);
		document.getElementById(optionProject.id).innerHTML="";
		for (i = 0; i < projectRules.length; i++) {
			var optionProject = document.createElement("option");
			optionProject.id = "rule"+projectRules[i].name;
			optionProject.name = projectRules[i].name;
			optionProject.value=projectRules[i].project_id;
			document.getElementById("getRulesProjects").appendChild(optionProject);
			document.getElementById(optionProject.id).innerHTML=projectRules[i].name
		}	
		createTr("trButtonOk","tbodySelectProject");
		createTd("tdButtonOk","trButtonOk","");
		var button = document.createElement("input");
		button.id="buttonOk";
		button.type="button";
		button.value="Ok";
		if (document.getElementById("getProjects").value=="") {
			button.disabled = "disabled";
		}
		button.setAttribute("onclick","getCollectionsRules('"+url+"','"+key+"')");
		document.getElementById("tdButtonOk").appendChild(button);

	}
}
function queryProjectGUIRules(){
	if ((document.getElementById("urlGuiProjects").value!="")&&(document.getElementById("keyGuiProjects").value!="")) {
		var key = document.getElementById("key").value;
		if (document.getElementById("getProjects").value=="") {
			alert("Please Select a Data Project!");
			removeElement("loading");
		}
		else{
			if (document.getElementById("urlGuiProjects")!=null) {
				if (document.getElementById("urlGuiProjects").value=="") {
					alert("Please enter URL!");
					removeElement("loading");
				}
				else{
					if (document.getElementById("keyGuiProjects").value=="") {
						alert("Please enter your access key!");
						removeElement("loading");
					}
					else{
						createImg("loading","","pLoading","Loading","images/loading.gif","");
						setStyle("loading","absolute","","","80%","50px");
						urlGUIProjects = document.getElementById("urlGuiProjects").value;
						keyGUIProjects = document.getElementById("keyGuiProjects").value;
						whatURL = "";
						s3db_check_url(urlGUIProjects);
						var urlQuery = urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>project_id,name</select><from>projects</from><where></where></S3QL>';
						s3db_jsonpp_call(urlQuery,"getProjectGUIRules(ans,'"+urlGUIProjects+"','"+keyGUIProjects+"')");
						
					}
				}
			}
			else{
				createImg("loading","","pLoading","Loading","images/loading.gif","");
				setStyle("loading","absolute","","","80%","50px");
				urlGUIProjects=url;
				keyGUIProjects = key;
				var urlQuery = urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>project_id,name</select><from>projects</from><where></where></S3QL>';
				s3db_jsonpp_call(urlQuery,"getProjectGUIRules(ans,'"+urlGUIProjects+"','"+keyGUIProjects+"')");
			}
		}
	}
}
function getProjectGUIRules(ans,urlGUIProjects,keyGUIProjects) {
	removeElement("loading");
	if (document.getElementById("trSelectRulesProject")!=null) {
		removeElement("trSelectRulesProject");
	}
	if (ans[0].project_id==undefined) {
		alert(ans[0].message);
	}
	else{
		for (var i=0; i<ans.length; i++) {
			removeElement("trButtonOk");
			createTr("trSelectRulesProject","tbodySelectProject");
			createTd("tdTextSelectRulesProject","trSelectRulesProject","Select Graphic Rules Project");
			document.getElementById("tdTextSelectRulesProject").style.font="bold 13px arial,serif";
			document.getElementById("tdTextSelectRulesProject").style.fontWeight="900";
			document.getElementById("tdTextSelectRulesProject").style.color = "#FFFFFF";
			document.getElementById("tdTextSelectRulesProject").width="140px";
			document.getElementById("tdTextSelectRulesProject").height="35px";
			createTd("tdSelectRulesProject","trSelectRulesProject","");
			var str = '<select id="getRulesProjects" onChange=""></select>';
			document.getElementById("tdSelectRulesProject").innerHTML=str;
			var optionProject = document.createElement("option");
			optionProject.id="optionProjectEmpty";
			optionProject.value="";
			document.getElementById("getRulesProjects").appendChild(optionProject);
			document.getElementById(optionProject.id).innerHTML="";
			for (i = 0; i < ans.length; i++) {
				var optionProject = document.createElement("option");
				optionProject.id = "rule"+ans[i].name;
				optionProject.name = ans[i].name;
				optionProject.value=ans[i].project_id;
				document.getElementById("getRulesProjects").appendChild(optionProject);
				document.getElementById(optionProject.id).innerHTML=ans[i].name
			}
			createTr("trButtonOk","tbodySelectProject");
			createTd("tdButtonOk","trButtonOk","");
			var button = document.createElement("input");
			button.id="buttonOk";
			button.type="button";
			button.value="Ok";
			button.setAttribute("onclick","getCollectionsRules('"+urlGUIProjects+"','"+keyGUIProjects+"')");
			document.getElementById("tdButtonOk").appendChild(button);
		}
	}
}
function getCollectionsRules(urlGUIProjects,keyGUIProjects,target) {
	if (document.getElementById("buttonOk")!=null) {
		document.getElementById("buttonOk").disabled = "disabled";	
	}
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	if (target!=null) {
		urlGUIProjects = target.URLGUI;
		keyGUIProjects = target.KEYGUI;
		idProjectRules = target.PROJECTGUI;
		whatURL="URLGUI";
		s3db_check_url(urlGUIProjects);
	}
	else{
		idProjectRules = document.getElementById("getRulesProjects").value;
	}
	var urlQuery = urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>*</select><from>collections</from><where><project_id>'+idProjectRules+'</project_id><name>GUI action</name></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getIDGUIAction(ans,"'+idProjectRules+'","'+urlGUIProjects+'","'+keyGUIProjects+'",'+JSON.stringify(target)+')');
}
function getIDGUIAction(ans,idProjectRules,urlGUIProjects,keyGUIProjects,target) {
    if (ans[0]!=null) {
		if ((ans[0].error_code>0)&&(target==null)) {
				alert("An unexpected error occurred on the server, please try again later!");
				window.location.href = window.location.href;
		}
		if (ans[0].collection_id!=null) {
			var urlQuery = urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>item_id,notes</select><from>items</from><where><collection_id>'+ans[0].collection_id+'</collection_id></where></S3QL>';
			s3db_jsonpp_call(urlQuery,'getActions(ans,"'+idProjectRules+'","'+urlGUIProjects+'","'+keyGUIProjects+'",'+JSON.stringify(target)+')');
		}
		else{
			if (ans[0].error_code>0) {
					alert("The key "+target.KEYGUI+" is not valid!");
					url = window.location.href;
					url = url.toLowerCase();
					url = window.location.href.split("&projectdata");
					window.location.href = url[0];
			}
			else{
				alert("Collection GUI action not exists!\nPlease make this collection or select another rules project.");
				selectCollection(target);
			}
		}
    }
	else{
		alert("Collection GUI action not exists!\nPlease make this collection or select another rules project.");
		selectCollection(target);
	}
}
function getActions(ans,idProjectRules,urlGUIProjects,keyGUIProjects,target) {
	allActions = ans;
	if (ans[0].error_code>0) {
		alert("An unexpected error occurred on the server, please try again later!");
		window.location.href = window.location.href;
	}
	var urlQuery = urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>*</select><from>rules</from><where><project_id>'+idProjectRules+'</project_id><subject>GUI rules</subject></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getAllRulesGUIAction(ans,"'+urlGUIProjects+'","'+keyGUIProjects+'",'+JSON.stringify(target)+')');
}
function getAllRulesGUIAction(ans,urlGUIProjects,keyGUIProjects,target) {
	if (ans[0].error_code>0) {
			alert("An unexpected error occurred on the server, please try again later!");
			window.location.href = window.location.href;
	}
	for (var i=0; i<ans.length; i++) {
		urlQuery= urlGUIProjects+'/S3QL.php?query=<S3QL><key>'+keyGUIProjects+'</key><select>*</select><from>statements</from><where><rule_id>'+ans[i].rule_id+'</rule_id></where></S3QL>';
		s3db_jsonpp_call(urlQuery,'getStatementsGUIRules(ans,"'+ans[i].verb+'",'+JSON.stringify(target)+')');
	}
}
function getStatementsGUIRules(ans,verb,target) {
	switch (verb) {
	case "range":
		range = ans;
	break;
	case "domain":
		domain = ans;
	break;
	case "action":
		action = ans;
	break;
	case "value":
		value = ans;
	break;
	case "trigger":
		trigger = ans;
	break;
	}
	if ((range!=null)&&(domain!=null)&&(action!=null)&&(trigger!=null)&&(value!=null)) {
		joinStatementsGUIRules(target);
	}
}
function joinStatementsGUIRules(target) {
	var hasTextArea= new Array();
	var hasOptions= new Array();
	var hasDate= new Array();
	var hasText = new Array();
	var hasFieldInactive=new Array();
	var hasFormula = new Array();
	var hasConcatenation = new Array();
	var hasConditions = new Array();
	var hasRestrictionsActiveFields = new Array();
	var hasMoreFields= new Array();
	var hasSubCollections = new Array();
	var hasNumber = new Array();
	var indexTextArea = 0;
	var indexOptions=0;
	var indexText = 0;
	var indexDate=0;
	var indexFieldInactive = 0;
	var indexFormula = 0;
	var indexConcatenation = 0;
	var indexConditions = 0;
	var indexRestrictionsActiveFields = 0;
	var indexMoreFields = 0;
	var indexSubCollections = 0;
	var indexNumber = 0;
	var arrayGUIRules = new Array("range","domain","trigger","value","action");
	var arrayActions = new Array("hasTextArea","hasOptions","hasDate","hasText","hasFieldInactive","hasFormula","hasConcatenation","hasConditions","hasRestrictionsActiveFields","hasMoreFields","hasSubCollections","hasNumber");
	for (var i=0; i<action.length; i++) {
		for (var j=0; j<allActions.length; j++) {
			if (allActions[j].item_id == action[i].value) {
				switch (allActions[j].notes) {
				case "hasTextArea":
					hasTextArea[indexTextArea]=action[i].item_id;
					indexTextArea++;
				break;
				case "hasOptions":
					hasOptions[indexOptions]=action[i].item_id;
					indexOptions++;
				break;
				case "hasText":
					hasText[indexText]=action[i].item_id;
					indexText++;
				break;
				case "hasDate":
					hasDate[indexDate]=action[i].item_id;
					indexDate++;
				break;
				case "hasFieldInactive":
					hasFieldInactive[indexFieldInactive]=action[i].item_id;
					indexFieldInactive++;
				break;
				case "hasFormula":
					hasFormula[indexFormula]=action[i].item_id;
					indexFormula++;
				break;
				case "hasConcatenation":
					hasConcatenation[indexConcatenation]=action[i].item_id;
					indexConcatenation++;
				break;
				case "hasConditions":
					hasConditions[indexConditions]=action[i].item_id;
					indexConditions++;
				break;
				case "hasRestrictionsActiveFields":
					hasRestrictionsActiveFields[indexRestrictionsActiveFields]=action[i].item_id;
					indexRestrictionsActiveFields++;
				break;
				case "hasMoreFields":
					hasMoreFields[indexMoreFields]=action[i].item_id;
					indexMoreFields++;
				break;
				case "hasSubCollections":
					hasSubCollections[indexSubCollections]=action[i].item_id;
					indexSubCollections++;
				break;
				case "hasNumber":
					hasNumber[indexNumber]=action[i].item_id;
					indexNumber++;
				break;
				}
			}
		}
	}
	var index=0;
	var hasField = false;
	var str = new Array();
	for (var l=0; l<arrayActions.length; l++) {
		switch (arrayActions[l]) {
			case "hasTextArea":
				str = hasTextArea;
			break;
			case "hasOptions":
				str = hasOptions;
			break;
			case "hasText":
				str = hasText;
			break;
			case "hasDate":
				str = hasDate;
			break;
			case "hasFieldInactive":
				str = hasFieldInactive;
			break;
			case "hasFormula":
				str = hasFormula;
			break;
			case "hasConcatenation":
				str = hasConcatenation;
			break;
			case "hasConditions":
				str = hasConditions;
			break;
			case "hasRestrictionsActiveFields":
				str = hasRestrictionsActiveFields;
			break;
			case "hasMoreFields":
				str = hasMoreFields;
			break;
			case "hasSubCollections":
				str = hasSubCollections;
			break;
			case "hasNumber":
				str = hasNumber;
			break;
			}
		for (var i=0; i<str.length; i++) {
			var field = new Array();
			index = 0;
			for (var j=0; j<arrayGUIRules.length; j++) {
				var ans = new Array();
				switch (arrayGUIRules[j]) {
				case "range":
					ans = range;
				break;
				case "domain":
					ans = domain;
				break;
				case "action":
					ans = action;
				break;
				case "trigger":
					ans = trigger;
				break;
				case "value":
					ans = value;
				break;
				}
				for (var k=0; k<ans.length; k++) {
					if (ans[k].item_id==str[i]) {
						field[index] = ans[k];
						index++;
					}
				}
			}
			if (str.length>1) {
				switch (arrayActions[l]) {
				case "hasTextArea":
					fieldTextArea[i] = field;
				break;
				case "hasOptions":
					fieldOptions[i]=field;
				break;
				case "hasText":
					fieldText[i] = field;
				break;
				case "hasDate":
					fieldDate[i]=field;
				break;
				case "hasFieldInactive":
					fieldInactive[i]=field;
				break;
				case "hasFormula":
					fieldFormula[i] = field;
				break;
				case "hasConcatenation":
					fieldConcatenation[i] = field;
				break;
				case "hasConditions":
					fieldCondition[i] = field;
				break;
				case "hasRestrictionsActiveFields":
					fieldRestrictionsActive[i] = field;
				break;
				case "hasMoreFields":
					moreFields[i] = field;
				break;
				case "hasSubCollections":
					subCollections[i] = field;
				break;
				case "hasNumber":
					fieldNumber[i] = field;
				break;
				}
			}
			else{
				switch (arrayActions[l]) {
				case "hasTextArea":
					fieldTextArea = field;
				break;
				case "hasOptions":
					fieldOptions[i]=field;
				break;
				case "hasText":
					fieldText = field;
				break;
				case "hasDate":
					fieldDate[i]=field;
				break;
				case "hasFieldInactive":
					fieldInactive=field;
				break;
				case "hasFormula":
					fieldFormula[i] = field;
				break;
				case "hasConcatenation":
					fieldConcatenation = field;
				break;
				case "hasConditions":
					fieldCondition = field;
				break;
				case "hasRestrictionsActiveFields":
					fieldRestrictionsActive = field;
				break;
				case "hasMoreFields":
					moreFields = field;
				break;
				case "hasSubCollections":
					subCollections[i] = field;
				break;
				case "hasNumber":
					fieldNumber = field;
				break;
				}
			}		
		}
	}
	selectCollection(target);
}