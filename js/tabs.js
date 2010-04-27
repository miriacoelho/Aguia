/**
 * @author mcoelho
 */11/30/2009
var allRulesFixed = new Array();
var collectionsAssociated = new Array();
var allRules = new Array();
var allCollections = new Array();
var indiceSearch;
var initName = new Array();
var initBoolean = new Array();
var validation="";
var contGrid = 0;
var lengthInitName=0;
var initName2 = new Array();
var indiceInitName2=0;
var indiceTreeSubAba=new Array();
var indiceArrayTree = 0;
var grid = new Array();
var indexGrid = 0;
 function selectCollection(target) {
	var img = document.createElement("img");
	img.id = "imgLogo";
	img.src="images/mdacclog.bmp";
	img.border=2;
	document.body.appendChild(img);	
	setStyle("imgLogo","absolute","163px","86px","10px","28px");
	setStyle("imgAguia","absolute","","","40%","05px");
	setStyle("pTextLogo","absolute","600px","","32%","80px");
	document.getElementById("pTextLogo").style.font="italic bold 18px arial,serif";
	document.getElementById("pTextLogo").style.fontWeight="900";
	document.getElementById("pTextLogo").style.color = "#0F399B";
	var key = document.getElementById("key").value;
	if (target!=null) {
		var project = document.createElement("br");
		project.id = "project";
		project.value = target.PROJECTDATA;
	}
	else{
		var project = document.createElement("br");
		project.id = "project";
		project.value = document.getElementById("getProjects").value;
	}
	document.body.appendChild(project);
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>collections</from><where><project_id>'+project.value+'</project_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,"getCollections(ans,"+JSON.stringify(target)+")");
 }
 function getCollections(ans,target) {
	 if ((ans[0].error_code>0)&&(target==null)) {
			alert("An unexpected error occurred on the server, please try again later!");
			window.location.href = window.location.href;
	}
	 var key = document.getElementById("key").value;
	 if (ans[0].error_code>0) {
		alert("The project "+target.PROJECTDATA+" not exist in url "+target.URLDATA);
		url = window.location.href;
		url = window.location.href.split("&PROJECTDATA");
		window.location.href = url[0];
	 }
	 else{
		ans=removeNumber(ans);
		removeElement("tableSelectProject");
		removeElement("imgProjectsSmall");
		removeElement("imgProjects");
		removeElement("imgProjectsHelp");
		removeElement("pTextHelp");
		removeElement("pTextHelp1");
		removeElement("pTextHelp2");
		removeElement("pTextHelp3");
		removeElement("pTextHelp4");
		removeElement("helpProjects");
		removeElement("pTextSelectProjects");
		createDiv("divTree","body","dTree");
		d = new dTree('dCollections');
		d.add(0,-1,"Select a Collection");
		for (var i=0; i<ans.length; i++) {
			if (ans[i].name!="s3dbVerb") {
				d.add(i+1,0,"<a id='font"+i+"'style='cursor:pointer' title='"+ans[i].name+"' onmouseover='textDecorationUnderline(this.id);' onmouseout='textDecorationNone(this.id);' onclick='queryCollectionsAssociated("+ans[i].collection_id+")'>"+ans[i].name+"</a>");
			}
		}
		createP("pTree",'<a href="javascript: d.openAll();">Expand all</a> | <a href="javascript: d.closeAll();">Collapse all</a>',"divTree");
		setStyle("divTree","absolute","280px","","","190px");
		document.getElementById("divTree").innerHTML=d;	
		queryAllRules(target);
	 }
 }
 function queryAllRules(target) {
	var key = document.getElementById("key").value;
	var project = document.getElementById("project").value;
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>rule_id,object,subject,subject_id,validation,notes,object_id,verb</select><from>rules</from><where><project_id>'+project+'</project_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getAllRules(ans,'+JSON.stringify(target)+')');
 }
 //Todas as regras do projeto
 function getAllRules(ans,target) {
	 if ((ans[0].error_code>0)&&(target==null)) {
		alert("An unexpected error occurred on the server, please try again later!");
		window.location.href = window.location.href;
	}
	var key = document.getElementById("key").value;
	allRulesFixed = ans;
	removeElement("loading");
	if (target!=null) {
		urlQuery=url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>collection_id</select><from>collections</from><where><collection_id>'+target.COLLECTIONDATA+'</collection_id></where></S3QL>';
		s3db_jsonpp_call(urlQuery,"queryCollectionsAssociated(ans,"+JSON.stringify(target)+")");
	}
 }
 function textDecorationUnderline(id) {
	document.getElementById(id).style.textDecoration="underline";
 }
 function textDecorationNone(id) {
	document.getElementById(id).style.textDecoration="none";
 }
 function queryCollectionsAssociated(collection_id,target){
	 if (collection_id[0]!=null) {
		if ((collection_id[0].error_code>0)&&(target==null)) {
			alert("An unexpected error occurred on the server, please try again later!");
			window.location.href = window.location.href;
		}
	 }
	 var collection = false;
	 if (collection_id[0]!=null) {
		if (collection_id[0].error_code>0) {
			alert("The collection "+target.COLLECTIONDATA+" not exist!");
			collection = true;

		}
		else{
			collection_id = collection_id[0].collection_id;
		}
	 }
	 if (document.getElementById("collection")!=null) {
		removeElement("collection");	
	 }
	 if (collection==false) {
		var collection = document.createElement("br");
		collection.id = "collection";
		collection.value = collection_id;
		document.body.appendChild(collection);
		 if (document.getElementById("tabMain")!=null) {
			removeElement("form");
			// remove global variables
			cleanGlobalVariables();
		
		/* Don't change anything below here */
		 dhtmlgoodies_tabObj = new Array();
		 activeTabIndex = new Array();
		 MSIE = navigator.userAgent.indexOf('MSIE')>=0?true:false;
		
		 regExp = new RegExp(".*MSIE ([0-9]\.[0-9]).*","g");
		 navigatorVersion = navigator.userAgent.replace(regExp,'$1');
		
		 ajaxObjects = new Array();
		 tabView_countTabs = new Array();
		 tabViewHeight = new Array();
		 tabDivCounter = 0;
		 closeImageHeight = 8;	// Pixel height of close buttons
		 closeImageWidth = 8;
		 }
		createImg("loading","","pLoading","Loading","images/loading.gif","");
		setStyle("loading","absolute","","","80%","50px");
		getCollectionsAssociated();
		
	 }
}
function getCollectionsAssociated() {
	var collection = document.getElementById("collection").value;
	var index = 0;
	collectionsAssociated[index] = collection;
	index++;
	for (var i=0; i<allRulesFixed.length; i++) {
		if ((allRulesFixed[i].object_id!="")&&(allRulesFixed[i].subject_id==collection)) {
			collectionsAssociated[index] = allRulesFixed[i].object_id;
			index++;
		}
	}
	collectionUnique=array_unique(collectionsAssociated);
	var indexTmp = 0;
	var tmp = new Array();
	for (var i=0; i<collectionsAssociated.length; i++) {
		if (collectionUnique[i]!=null) {
			tmp[indexTmp] = collectionUnique[i];
			indexTmp++;
		}
	}
	collectionsAssociated = tmp;
	var index = 0;
	for (var i=0; i<collectionsAssociated.length; i++) {
		for (var j=0; j<allRulesFixed.length; j++) {
			if (allRulesFixed[j].subject_id==collectionsAssociated[i]) {
				allRules[index] = allRulesFixed[j];
				index++;
			}
		}
	}
	queryProjectName();
}
function queryProjectName(){
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	var key = document.getElementById("key").value;
	var project = document.getElementById("project").value;
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>name</select><from>projects</from><where><project_id>'+project+'</project_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,"getProjectName(ans)");
}
function getProjectName(ans){
	if ((ans[0].error_code>0)) {
		alert("An unexpected error occurred on the server, please try again later!");
		window.location.href = window.location.href;
	}
	projectName = ans[0].name;
	document.getElementById("project").name = ans[0].name;
	createP("pProjectName","Project Name: "+projectName,"body");
	setStyle("pProjectName","absolute","325px","140px","350px","140px");
	document.getElementById("pProjectName").style.font="italic bold 13px arial,serif";
	document.getElementById("pProjectName").style.color = "#003399";
	tabs();
}
function tabs(){
	if (document.getElementById("tabMain")!=null){
		removeElement("tabMain");
	}
	createP("pImgNew","","body");
	createImg("imgNew","cursor:pointer","pImgNew","New","images/add1.png","disabledButtons(this.id);");
	setStyle("pImgNew","absolute","","","79%","130px");
	createP("pImgUpdateDisabled","","body");
	createImg("imgUpdateDisabled","","pImgUpdateDisabled","Update","images/updateDisabled.png","");
	setStyle("pImgUpdateDisabled","absolute","","","83%","130px");
	createP("pImgSaveDisabled","","body");
	createImg("imgSaveDisabled","","pImgSaveDisabled","Save","images/save_disabled.png");
	setStyle("pImgSaveDisabled","absolute","","","87%","130px");
	createP("pImgCancelDisabled","","body");
	createImg("imgCancelDisabled","","pImgCancelDisabled","Cancel","images/cancel1_disabled.png","");
	setStyle("pImgCancelDisabled","absolute","","","91%","130px");
	createP("pLink","","body");
	createImg("imgExit","cursor:pointer","pLink","Logout","images/logout1.png","logout();");
	setStyle("pLink","absolute","","","95%","130px");
	queryAllCollections();
}
function queryAllCollections(){
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	var key = document.getElementById("key").value;
	var project = document.getElementById("project").value;
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>name,collection_id</select><from>collections</from><where><project_id>'+project+'</project_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getAllCollections(ans)');
}
function getAllCollections(collections){
	if ((collections[0].error_code>0)) {
		alert("An unexpected error occurred on the server, please try again later!");
		window.location.href = window.location.href;
	}
	var found = false;
	var index = 0;
	for (var i=0; i<collections.length; i++) {
		for (var j=0; j<collectionsAssociated.length; j++) {
			if (collections[i].collection_id==collectionsAssociated[j]) {
				allCollections[index] = collections[i];
				index++;
			}
		}
	}
	allCollections= order(allCollections);
	allCollections=removeNumber(allCollections);
	var form = document.createElement("form");
	form.id="form";
	form.name="form";
	form.method = "post";
	form.action="http://ibl.mdanderson.org/~mcoelho/Project/php/excel.php";
	document.body.appendChild(form);
	createDiv("tabMain","form","");
	setStyle("tabMain","absolute","","","270px","180px");
	var indexFirstCollection = 0;
	var indice = 0;
	for (var i=0; i<allCollections.length; i++) {
		found = false;
		for (var j=0; j<subCollections.length; j++) {
			for (var k=0; k<subCollections[j].length; k++) {
				if (subCollections[j][k].verb=="range") {
					if(allCollections[i].collection_id == subCollections[j][k].value){
						found = true;
					}	
				}	
			}
		}
		if ((found == false)&&(allCollections[i].name!="s3dbVerb")) {
			if (allCollections[i].collection_id==document.getElementById("collection").value) {
				indexFirstCollection = indice;
			}
			initName[indice] = allCollections[i].name;
			initBoolean[indice] = false;
			indice++;
		}
	}
	for (var i=0; i<allCollections.length; i++) {
		for (var j=0; j<initName.length; j++) {
			if (initName[j]==allCollections[i].name) {
				if (initName.length>30) {
					createTabMain(allCollections[i],"dhtmlgoodies_aTab2");
				}
				else{
					if (initName.length>14) {
						createTabMain(allCollections[i],"dhtmlgoodies_aTab1");
					}
					else{
						createTabMain(allCollections[i],"dhtmlgoodies_aTab");
					}
				}
			}
		}
	}
	if (initName.length>30) {
		createDiv("divSearch","tabMain","dhtmlgoodies_aTab2");
		createDiv("tabSearch","divSearch","");
	}
	else{
		if (initName.length>14) {
			createDiv("divSearch","tabMain","dhtmlgoodies_aTab1");
			createDiv("tabSearch","divSearch","");
		}
		else{
			createDiv("divSearch","tabMain","dhtmlgoodies_aTab");
			createDiv("tabSearch","divSearch","");
		}
	}
	initName[indice] = "Search";
	indiceSearch = indice;
	initBoolean[indice]=false;
	init("tabMain",initName,initBoolean,indexFirstCollection,"","");
	var collection_name = "";
	for (var i=0; i<allCollections.length; i++) {
		if (allCollections[i].collection_id==document.getElementById("collection").value) {
			collection_name = allCollections[i].name;
		}
	}
	d = new dTree('d');
	d.add(0,-1,"Hierarchy of node: "+collection_name);
	for (var i=0; i<initName.length-1; i++) {
		d.add(i+1,0,initName[i]);
	}
	getRules();
	return false;
}
function createImg(id,style,idParent,title,src,onclick){
	var str='<img id="'+id+'" align="top" style="'+style+'" title="'+title+'" src="'+src+'" onclick="'+onclick+'"/>';
	document.getElementById(idParent).innerHTML = str;
}
function createTabMain(ans,classCss){
	var collectionName = ans.name;
	var collectionId = ans.collection_id;
	if (collectionName != "s3dbVerb") {
		createDiv("div"+collectionName,"tabMain",classCss);
		createDiv("tab"+collectionName,"div"+collectionName,"");
	}
	removeElement("loading");
	return false;
}
function getRules(){
	allRules = orderRules(allRules);
	allRules=removeNumberRules(allRules);
	allRules = removeNumberSubject(allRules);
	var createSubTabs=false;
	var readonlyInputAndDate="";
	var readonlyTextAreaAndSelect=false;
	lengthInitName = initName.length;
	// Order subCollections
	var subCollectionsOrder = new Array();
	var index = 0;
	for (var i=0; i<allCollections.length; i++) {
		for (var j=0; j<subCollections.length; j++) {
			for (var k=0; k<subCollections[j].length; k++) {
				if (subCollections[j][k].verb=="range") {
					if (subCollections[j][k].value==allCollections[i].collection_id) {
						subCollectionsOrder[index]=subCollections[j][k];
						index++;
					}
				}
			}
		}
	}
	var index = 0;
	for (var i=0; i<subCollections.length; i++) {
		for (var j=0; j<subCollections[i].length; j++) {
			if ((subCollections[i][j].verb=="range")&&(subCollectionsOrder!="")) {
				subCollections[i][j] = subCollectionsOrder[index];
				index++;
			}
		}
	}
	for (var i = 0; i < allCollections.length; i++) {
		var index = 0;
		var initId1= new Array();
		var initBoolean1 = new Array();
		var initName1 = new Array();
		for (var j = 0; j < subCollections.length; j++) {
			for (var k=0; k<subCollections[j].length; k++) {
				if (subCollections[j][k].verb=="domain") {
					if (allCollections[i].collection_id == subCollections[j][k].value) {
						for (var l=0; l<subCollections[j].length; l++) {
							if (subCollections[j][l].verb=="range") {
								for (var m=0; m<allCollections.length; m++) {
									if (allCollections[m].collection_id==subCollections[j][l].value) {
										createDiv("div" + allCollections[m].name, "tab" + allCollections[i].name, "dhtmlgoodies_aTab");
										createDiv("tab" + allCollections[m].name, "div" + allCollections[m].name, "");
										initName1[index] = allCollections[m].name;
										initId1[index] = allCollections[m].collection_id;
										initBoolean1[index] = false;
										index++;
										createSubTabs = true;
									}
								}
							}
						}
					}
				}
			}
		}	
		if (createSubTabs==true)
		{
			init("tab"+allCollections[i].name,initName1,initBoolean1,0,"98%","");	
			createSubTabs = false;
			index=0;
			for (var k=0; k<initName.length; k++) {
				if (allCollections[i].name==initName[k]) {
					var indiceTree=k+1;
				}
			}
			for (var k=0; k<initName1.length; k++) {
				initName2[indiceInitName2]=initName1[k];
				d.add(lengthInitName,indiceTree,initName1[k]);
				indiceTreeSubAba[indiceArrayTree] = lengthInitName;
				indiceArrayTree++;
				lengthInitName++;
				indiceInitName2++;
			}
		}
	}
	for (var i=0; i<allCollections.length; i++) {
		for (j = 0; j < allRules.length; j++) {
			if (allCollections[i].collection_id == allRules[j].subject_id) {
				if ((allRules[j].verb!="isSubCollectionOf")){
					createFields(allCollections[i].collection_id,allRules[j].rule_id);
				}
			}
		}
	}
	if (moreFields[0]!=null)
	{
		for (var i=0;i<moreFields.length ;i++ )
		{
			for (var j=0;j<allCollections.length ;j++ )
			{
				if (allCollections[j].collection_id==moreFields[i].value)
				{
					indexGrid = 0;
					createGrid(moreFields[i].value,contGrid);
					contGrid++;
				}

			}
		}
	}
}
function createFields(collection_id,rule_id) {
	for (i = 0; i < allCollections.length; i++) {
		if (allCollections[i].collection_id==collection_id) {
			for (j = 0; j < allRules.length; j++) {
				if (allRules[j].rule_id==rule_id) {
				var search='><img id="input' + allCollections[i].name + allRules[j].object + allRules[j].rule_id + '" align="top" style="cursor:pointer" src="images/icon-search.PNG" title="Click here to search!" onclick="tabSearch(this.id);"/>';
				if (allCollections[i].collection_id == allRules[j].subject_id) {
					if ((allRules[j].verb != "isSubCollectionOf")&&(allRules[j].subject!="s3dbVerb")) {
						createTable("table" + allCollections[i].name, "tab" + allCollections[i].name, "tbody" + allCollections[i].name);
						if (allRules[j].object_id == "") {
							createTr("tr" + allCollections[i].name + allRules[j].object, "tbody" + allCollections[i].name);
							createTd("td" + allCollections[i].name + allRules[j].object, "tr" + allCollections[i].name + allRules[j].object, allRules[j].object);
							var indiceTree="";
							for (var k=0; k<initName.length; k++) {
								if (allCollections[i].name==initName[k]) {
									indiceTree=k+1;
								}
							}
							if (indiceTree=="") {
								for (var k=0; k<initName2.length; k++) {
									if (allCollections[i].name==initName2[k]) {
										indiceTree=indiceTreeSubAba[k];
									}
								}
							}
							validation = searchSelect(allRules[j].validation);
							if (validation=="")
							{
								validation=checkFieldType(j);
							}
							lengthInitName++;
							if (validation!="textarea") {
								d.add(lengthInitName,indiceTree,"<a id='font"+allRules[j].subject+allRules[j].object+"'style='cursor:pointer' title='"+allRules[j].object+"' onmouseover='textDecorationUnderline(this.id);' onmouseout='textDecorationNone(this.id);' onclick='createField("+allRules[j].rule_id+")'>"+allRules[j].object+"</a>");
								lengthInitName++;
							}
							else{
								d.add(lengthInitName,indiceTree,allRules[j].object);
								lengthInitName++;
							}
							if (validation == "textarea") {
								typeSelect = "textarea";
							}
							else {
								if ((validation == "")||(validation=="text")){
									typeSelect = "text";
								}
								else {
									if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
										typeSelect = "date";
									}
									else {
										if (validation == "number") {
											typeSelect = "number";
										}
										else{
											if (validation.length > 0) {
												typeSelect = "select";
											}
										}
									}
								}
							}
							readonly = checkInactiveField(j,typeSelect);
							if (readonly !="")
							{
								search=">";
							}
							if (typeSelect == "text") {
								createTd("tdInput" + allCollections[i].name + allRules[j].object, "tr" + allCollections[i].name + allRules[j].object, "");
								document.getElementById("tdInput" + allCollections[i].name + allRules[j].object).innerHTML = '<input id="input' + allCollections[i].name + allRules[j].object + allRules[j].rule_id + '" type="text" value="" onblur="checkFieldRestrictions(this.id);" name="" '+readonly+' '+search+'';
							}
							if (typeSelect == "number") {
								createTd("tdInput" + allCollections[i].name + allRules[j].object, "tr" + allCollections[i].name + allRules[j].object, "");
								document.getElementById("tdInput" + allCollections[i].name + allRules[j].object).innerHTML = '<input id="input' + allCollections[i].name + allRules[j].object + allRules[j].rule_id + '" type="text" value="" onKeyUp="javascript:onlyNumber(this);" onblur="checkFieldRestrictions(this.id);" name="" '+readonly+' '+search+'';
							}
							if (typeSelect == "date") {
								var formatDate = "";
								var temp = cleanString(allRules[j].object);
								var indexL = "";
								createTd("tdInput" +allCollections[i].name+ allRules[j].object, "tr" +allCollections[i].name+ allRules[j].object, "");
								for (var l=0; l<fieldDate.length; l++) {
									for (var m=0; m<fieldDate[l].length; m++) {
										if (fieldDate[l][m].verb=="domain") {
											if (fieldDate[l][m].value==allRules[j].rule_id) {
												indexL = l;
											}
										}	
									}
								}
								for (var l=0; l<fieldDate.length; l++) {
									for (var m=0; m<fieldDate.length; m++) {
										if ((l == indexL)&&(fieldDate[l][m].verb=="value")) {
											formatDate = fieldDate[l][m].value;
										}
									}
								}
								if (formatDate =="") {
									formatDate = "mm/dd/yyyy";
								}
								var onClickImage = "displayCalendar(document.forms[0]." + temp + ",'"+formatDate+"',this)";
								document.getElementById("tdInput" +allCollections[i].name+allRules[j].object).innerHTML = '<input id="input' +allCollections[i].name+allRules[j].object +allRules[j].rule_id+ '" type="text" value="" name="' + temp + '" onChange="checkFieldRestrictions(this.id);" '+readonly+'><img  align="top" style="cursor:pointer" src="images/calendar.png" onclick="' + onClickImage + '"/><img id="input' + allCollections[i].name + allRules[j].object + allRules[j].rule_id + '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
							}
							if (typeSelect== "textarea") {
								createTd("tdTextArea" + allCollections[i].name + allRules[j].object, "tr" +allCollections[i].name + allRules[j].object, "");
								var textArea = document.createElement("textarea");
								textArea.id = "inputTextArea"+allCollections[i].name + allRules[j].object+allRules[j].rule_id;
								textArea.rows = "2";
								textArea.cols = "30";
								textArea.readOnly=readonly;
								document.getElementById("tdTextArea" +allCollections[i].name + allRules[j].object).appendChild(textArea);
							}
							if (typeSelect == "select") {
								createTd("tdSelect" +allCollections[i].name+ allRules[j].object, "tr" +allCollections[i].name+allRules[j].object, "");
								var str = '<select id="select' +allCollections[i].name+allRules[j].object +allRules[j].rule_id+ '" onChange="checkFieldRestrictions(this.id);"></select><img id="select' + allCollections[i].name + allRules[j].object + allRules[j].rule_id + '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
								document.getElementById("tdSelect" +allCollections[i].name+ allRules[j].object).innerHTML = str;
								var option = document.createElement("option");
								option.id = allCollections[i].name+allRules[j].object+"optionEmpty";
								option.value = "";
								document.getElementById("select" +allCollections[i].name+allRules[j].object+allRules[j].rule_id).appendChild(option);
								document.getElementById(option.id).innerHTML = "";
								for (k = 0; k < validation.length; k++) {
									var option = document.createElement("option");
									option.id = allCollections[i].name+allRules[j].object + validation[k];
									option.name = allCollections[i].name+allRules[j].object + validation[k];
									option.value = validation[k];
									document.getElementById("select" +allCollections[i].name+allRules[j].object +allRules[j].rule_id).appendChild(option);
									document.getElementById(option.id).innerHTML = validation[k];
								}
								document.getElementById("select" +allCollections[i].name+allRules[j].object+allRules[j].rule_id).disabled=readonly;
							}
						}
					}
				}
			}
			}
		readonlyInputAndDate="";
		readonlyTextAreaAndSelect=false;
		}
	}
}
function createGrid(collection_id,contGrid){
	var newGrid = false;
	var collection_id = getNumber(collection_id);
	if (collection_id[1]!=null)
	{
		collection_id = collection_id[1];
	}
	var column = 0;
	allRules = removeNumberSubject(allRules);
	for (var i=0;i<allCollections.length ;i++ )
	{
		if (collection_id==allCollections[i].collection_id)
		{
			var collection_name = allCollections[i].name;
		}
	}
	if (document.getElementById("divJGrid"+collection_name)==null)
	{
		newGrid = true;
		removeElement("table"+collection_name);
		createDiv("divJGrid"+collection_name,"tab"+collection_name,"");
		grid[contGrid] = new jsGrid("divJGrid"+collection_name);
		grid[contGrid].setTextMatrix(0,0,"");
		grid[contGrid].id="grid"+collection_name;
		grid[contGrid].collection_name = collection_name;
		grid[contGrid].collection_id = collection_id;
	}
	var variable="";
	for (var j=0;j<grid.length ; j++)
	{
		if (grid[j].id=="grid"+collection_name)
		{
			contGrid = j;
			indexGrid=grid[j].rows.count();
		}
	}
	grid[contGrid].rows.add();
	for (var j=0;j<allRules.length ;j++ )
	{
		if (allRules[j].subject_id==collection_id)
		{
			var search='><img id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id +"row"+indexGrid+ '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
			if ((allRules[j].verb != "isSubCollectionOf")&&(allRules[j].subject!="s3dbVerb")&&(allRules[j].object_id == ""))
			{
				column++;
				if ((indexGrid-1==0)&&(newGrid==true))
				{
					grid[contGrid].rows.addCol("200px");
				}
				grid[contGrid].setTextMatrix(0,column,allRules[j].object);
				validation = searchSelect(allRules[j].validation);
				if (validation=="")
				{
					validation=checkFieldType(j);
				}
				if (validation == "textarea") {
					typeSelect = "textarea";
				}
				else {
					if ((validation == "")||(validation=="text")){
						typeSelect = "text";
					}
					else {
						if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
							typeSelect = "date";
						}
						else {
							if (validation == "number") {
								typeSelect = "number";
							}
							else{
								if (validation.length > 0) {
									typeSelect = "select";
								}
							}
						}
					}
				}
				readonly = checkInactiveField(j,typeSelect);
				if (readonly !="")
				{
					search=">";
				}
				grid[contGrid].setTextMatrix(indexGrid,0,indexGrid);
				if (typeSelect == "text") {
					grid[contGrid].setTextMatrix(indexGrid,column,'<input id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexGrid+'" type="text" onblur="checkFieldRestrictions(this.id);" value="" name="" '+readonly+' '+search+'');
				}
				if (typeSelect == "number") {
					grid[contGrid].setTextMatrix(indexGrid,column,'<input id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexGrid+'" type="text" onKeyUp="javascript:onlyNumber(this);" onblur="checkFieldRestrictions(this.id);" value="" name="" '+readonly+' '+search+'');
				}
				if (typeSelect == "date") {
					var temp = cleanString(allRules[j].object);
					temp = temp+"row"+indexGrid;
					var formatDate = "";
					var indexL = "";
					for (var l=0; l<fieldDate.length; l++) {
						for (var m=0; m<fieldDate[l].length; m++) {
							if (fieldDate[l][m].verb=="domain") {
								if (fieldDate[l][m].value==allRules[j].rule_id) {
									indexL = l;
								}
							}	
						}
					}
					for (var l=0; l<fieldDate.length; l++) {
						for (var m=0; m<fieldDate.length; m++) {
							if ((l == indexL)&&(fieldDate[l][m].verb=="value")) {
								formatDate = fieldDate[l][m].value;
							}
						}
					}
					if (formatDate =="") {
						formatDate = "mm/dd/yyyy";
					}
					var onClickImage = "displayCalendar(document.forms[0]." + temp + ",'"+formatDate+"',this)";
					grid[contGrid].setTextMatrix(indexGrid,column,'<input id="input' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexGrid+'" type="text" value="" name="' + temp + '" onChange="checkFieldRestrictions(this.id);" '+readonly+'><img  align="top" style="cursor:pointer" src="images/calendar.png" onclick="' + onClickImage + '"/><img id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id +"row"+indexGrid+ '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>');
				}
				if (typeSelect == "textArea")
				{
					grid[contGrid].setTextMatrix(indexGrid,column,'<textarea id="inputTextArea'+allRules[j].subject+ allRules[j].object+allRules[j].rule_id+"row"+indexGrid+'" rows="2" cols="30"/>');
				}
				if (typeSelect == "select") 
				{
					var str='<select id="select' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexGrid+ '" onChange="checkFieldRestrictions(this.id);">';
					str =str+'<option id="'+allRules[j].subject+allRules[j].object+"optionEmpty"+"row"+indexGrid+'" name="'+allRules[j].subject+allRules[j].object+"optionEmpty"+'" value=""></option>';
					for (var k =0;k<validation.length ;k++ )
					{
						str =str+'<option id="'+allRules[j].subject+allRules[j].object+validation[k]+"row"+indexGrid+'" name="'+allRules[j].subject+allRules[j].object+validation[k]+"row"+indexGrid+'" value="'+validation[k]+'">'+validation[k]+'</option>';
					}
					str = str+'</select><img id="select' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexGrid+ '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
					grid[contGrid].setTextMatrix(indexGrid,column,str);
					document.getElementById('select' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexGrid).style.width="150px";
				}

			}
		}
	}
	if (document.getElementById("tableButtonsGrid" + collection_name)==null)
	{
		createTable("tableButtonsGrid" + collection_name, "tab" + collection_name, "tbodyButtonsGrid" + collection_name);
		createTr("tr" + collection_name + "buttons", "tbodyButtonsGrid" + collection_name);
		var buttonGridAdd = '<input id="ButtonGridAdd'+collection_id+'" type="button" value="Add Rows" name="button" size="200" onClick=" createGrid(this.id);">';
		var buttonGridRemove = '<input id="ButtonGridRemove'+collection_id+'" type="button" value="Remove Rows" name="button" size="200" onClick=" removeRowsGrid(this.id);">';
		createTd("td" + collection_name + "buttonAdd", "tr" + collection_name + "buttons", buttonGridAdd);
		createTd("td" + collection_name + "buttonRemove", "tr" + collection_name + "buttons", buttonGridRemove);
	}
}
function removeRowsGrid(id){
	var collection_id = getNumber(id);
	if (collection_id[1]!=null)
	{
		collection_id = collection_id[1];
	}
	allRules = removeNumberSubject(allRules);
	for (var i=0;i<allCollections.length ;i++ )
	{
		if (collection_id==allCollections[i].collection_id)
		{
			var collection_name = allCollections[i].name;
		}
	}
	for (var j=0;j<grid.length ; j++)
	{
		if (grid[j].id=="grid"+collection_name)
		{
			contGrid = j;
			indexGrid=grid[j].rows.count();
		}
	}
	grid[contGrid].rows.remove(grid[contGrid].rows.count()-1);
}
function checkInactiveField(k,typeSelect){
	var readonly="";
	if (fieldInactive[0]!=null) {
		for (var i=0; i<fieldInactive.length; i++) {
			if (fieldInactive[i].verb!="action") {
				if (allRules[k].rule_id==fieldInactive[i].value) {
					if ((typeSelect=="date")||(typeSelect=="text"))
					{
						readonly ='readonly=""';
					}
					else{
						readonly=true;
					}
				}
			}
		}
		
	}
	return readonly;
}
function checkFieldType(k){
	var optionsField= new Array();
	var index = 0;
	if (fieldTextArea[0]!=null)
	{
		for (var j=0;j<fieldTextArea.length ;j++ )
		{
			if (allRules[k].rule_id==fieldTextArea[j].value)
			{
				optionsField = "textarea";
				break;
			}
		}
	}
	if (fieldDate[0]!=null)
	{
		for (var j=0;j<fieldDate.length ;j++ )
		{
			for (var l=0; l<fieldDate[j].length; l++) {
				if (allRules[k].rule_id==fieldDate[j][l].value)
				{
					optionsField = "date";
					break;
				}	
			}
		}
	}
	if (fieldText[0]!=null)
	{
		for (var j=0;j<fieldText.length ;j++ )
		{
			if (allRules[k].rule_id==fieldText[j].value)
			{
				optionsField = "text";
				break;
			}
		}
	}
	if (fieldNumber[0]!=null)
	{
		for (var j=0;j<fieldNumber.length ;j++ )
		{
			if (allRules[k].rule_id==fieldNumber[j].value)
			{
				optionsField = "number";
				break;
			}
		}
	}
	if (fieldOptions[0]!=null)
	{
		for (var j=0;j<fieldOptions.length ;j++ )
		{
			for (var l=0; l<fieldOptions[j].length; l++) {
				if (fieldOptions[j][l].verb=="domain") {
					if (allRules[k].rule_id==fieldOptions[j][l].value)
					{	
						for (var m=0; m<fieldOptions[j].length; m++) {
							if ((fieldOptions[j][m].verb!="domain")&&(fieldOptions[j][m].verb!="action")) {
								optionsField[index]=fieldOptions[j][m].value;
								index++;
							}
						}
					}	
				}
			}
		}
	}
	return optionsField;
}
function createDiv(id, idParent,classDiv){
	if(idParent=="body"){
		var div= document.createElement("div");
		div.id=id;
		div.className=classDiv;
		document.getElementsByTagName("body")[0].appendChild(div);
	}
	else{
		var div= document.createElement("div");
		div.id=id;
		div.className=classDiv;
		document.getElementById(idParent).appendChild(div);
		return false;
	}
}
function cleanString(s)
{
	while (s.search(" ")!=-1){
		s=s.replace(" ","");
	}
	return(s);
}
function searchSelect(str){
	if (str == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")
	{
		tmp=str;
	}
	else{
		tmp=(str.split("|"));
	}
	return(tmp);
}
function removeNumber(tmp){
	for (i = 0; i < tmp.length; i++) {
		if (tmp[i].name!=null)
		{
			var founded = tmp[i].name.search(/[0-9][0-9]_/);
			if (founded!=-1)
			{
				tmp[i].name = tmp[i].name.slice(3);
			}
		}
	}
	return tmp;
}
function order(ans){
	for (i = 0; i < ans.length-1; i++){
		for (j = ans.length-1; i<j; j--){
			if(ans[j].name<ans[j-1].name){
				tmp = ans[j];
				ans[j] = ans[j-1];
				ans[j-1] = tmp;
			}
		}
	}
	return ans;
}
function removeNumberRules(tmp){
	for (i = 0; i < tmp.length; i++) {
		if (tmp[i].object!=null)
		{
			var founded = tmp[i].object.search(/[0-9][0-9]_/);
			if (founded!=-1)
			{
				tmp[i].object = tmp[i].object.slice(3);
			}
		}
	}
	return tmp;
}
function removeNumberSubject(tmp){
	for (i = 0; i < tmp.length; i++) {
		if (tmp[i].subjct!=null)
		{
			var founded = tmp[i].subject.search(/[0-9][0-9]_/);
			if (founded!=-1)
			{
				tmp[i].subject = tmp[i].subject.slice(3);
			}
		}
	}
	return tmp;
}
function orderRules(ans){
	for (i = 0; i < ans.length-1; i++){
		for (j = ans.length-1; i<j; j--){
			if(ans[j].object<ans[j-1].object){
				tmp = ans[j];
				ans[j] = ans[j-1];
				ans[j-1] = tmp;
			}
		}
	}
	return ans;
}
function init(idTab,initName,initBoolean,activeTab,width,height){
	initTabs(idTab,initName,activeTab,width,height,initBoolean);
	return false;
}
function getNumberRule(id){
	var ruleNumber= id.split(/[^0-9]+/);
	return ruleNumber;
}
function getNumber(id){
	var number= id.split(/[^0-9]+/);
	return number;
}
function disabledButtons(id){
	if ((id=="imgNew"))
	{
		indexArrayInsertUpdate = 0;
		arrayInsertUpdate.length = 0;
		arrayCollectionsAssociatedUpdate.length = 0;
		indexCollectionsAssociatedUpdate = 0;
		createP("pImgNewDisabled","","body");
		createImg("imgNewDisabled","","pImgNewDisabled","New","images/add_disabled.png","");
		setStyle("pImgNewDisabled","absolute","","","79%","130px");
		removeElement("pImgNew");
		createP("pImgUpdateDisabled","","body");
		createImg("imgUpdateDisabled","","pImgUpdateDisabled","Update","images/updateDisabled.png","");
		setStyle("pImgUpdateDisabled","absolute","","","83%","130px");
		removeElement("pImgUpdate");
		if (id == "imgNew")
		{
			//Colocar as opcoes nas colecoes que nao sejam a colecao mae.
			getOptionsInsertUpdate();
			cleanAllFields();
			enableButtons(id);
		}
		else{
			if (id=="imgSearch2") {
				enableButtons(id);
				removeOptionsInsertUpdate();
			}
		}
	}
	if (id=="imgUpdate") {
		createP("pImgUpdateDisabled","","body");
		createImg("imgUpdateDisabled","","pImgUpdateDisabled","Update","images/updateDisabled.png","");
		setStyle("pImgUpdateDisabled","absolute","","","83%","130px");
		removeElement("pImgUpdate");
		enableButtons(id);
		getOptionsInsertUpdate();
	}
	if ((id=="imgCancel")||(id=="imgSave")||(id=="imgSearch1")) {
		removeElement("pImgCancel");
		removeElement("pImgSave");
		removeElement("pImgUpdate");
		createP("pImgCancelDisabled","","body");
		createImg("imgCancel","","pImgCancelDisabled","Cancel","images/cancel1_disabled.png","");
		setStyle("pImgCancelDisabled","absolute","","","91%","130px");
		createP("pImgSaveDisabled","","body");
		createImg("imgSaveDisabled","","pImgSaveDisabled","Save","images/save_disabled.png","");
		setStyle("pImgSaveDisabled","absolute","","","87%","130px");
		createP("pImgUpdateDisabled","","body");
		createImg("imgUpdateDisabled","","pImgUpdateDisabled","Update","images/updateDisabled.png","");
		setStyle("pImgUpdateDisabled","absolute","","","83%","130px");
		if (id=="imgSave") {
			save();
			enableButtons(id);
			removeOptionsInsertUpdate();
			//cleanAllFields();
		}
		else{
			if (id=="imgCancel") {
				cleanAllFields();
				enableButtons(id);
				removeOptionsInsertUpdate();
			}
			else {
				if (id=="imgSearch1") {
					enableButtons(id);
				}
			}
		}
	}
}
function enableButtons(id){
	if ((id=="imgNew")||(id=="imgUpdate"))
	{
		createP("pImgSave","","body");
		createImg("imgSave","cursor:pointer","pImgSave","Save","images/save1.png","disabledButtons(this.id);");
		setStyle("pImgSave","absolute","","","87%","130px");
		createP("pImgCancel","","body");
		createImg("imgCancel","cursor:pointer","pImgCancel","Cancel","images/cancel1.png","disabledButtons(this.id);");
		setStyle("pImgCancel","absolute","","","91%","130px");
		removeElement("pImgSaveDisabled");
		removeElement("pImgCancelDisabled");
	}
	if (id=="imgSearch2") {
		createP("pImgCancel","","body");
		createImg("imgCancel","cursor:pointer","pImgCancel","Cancel","images/cancel1.png","disabledButtons(this.id);");
		setStyle("pImgCancel","absolute","","","91%","130px");
		createP("pImgUpdate","","body");
		createImg("imgUpdate","cursor:pointer","pImgUpdate","Update","images/update.png","disabledButtons(this.id);");
		setStyle("pImgUpdate","absolute","","","83%","130px");
		removeElement("pImgCancelDisabled");
		removeElement("pImgUpdateDisabled");
	}
	if ((id=="imgCancel")||(id=="imgSave")||(id=="imgSearch1")||(id=="imgUpdate")) {
		createP("pImgNew","","body");
		createImg("imgNew","cursor:pointer","pImgNew","New","images/add1.png","disabledButtons(this.id);");
		setStyle("pImgNew","absolute","","","79%","130px");
		removeElement("pImgNewDisabled");
	}
}
function array_unique (array) {
    // Removes duplicate values from array  
    var key = '', tmp_arr1 = {}, tmp_arr2 = {};
    var val = '';
    tmp_arr1 = array;
    
    var __array_search = function (needle, haystack) {
        var fkey = '';
        for (fkey in haystack) {
            if ((haystack[fkey] + '') === (needle + '')) {
                return fkey;
            }
        }
        return false;
    };

    for (key in tmp_arr1) {
        val = tmp_arr1[key];
        if (false === __array_search(val, tmp_arr2)) {
            tmp_arr2[key] = val;
        }
        
        delete tmp_arr1[key];
    }
    
    return tmp_arr2;
}
function onlyNumber(fieldNumber) {
	var digits="0123456789"  
	var field_temp   
		for (var i=0;i<fieldNumber.value.length;i++){  
			field_temp=fieldNumber.value.substring(i,i+1)   
			if (digits.indexOf(field_temp)==-1){  
				fieldNumber.value = fieldNumber.value.substring(0,i);  
			}  
		}  
} 
function cleanGlobalVariables() {
	indexLoading=0;
	indexRemoveLoading = 0;
	arrayCollectionsAssociatedUpdate.length = 0;
	indexCollectionsAssociatedUpdate = 0;
	allCollections.length = 0;
	collectionsAssociated.length = 0;
	initName.length = 0;
	initBoolean.length = 0;
	allRules.length = 0;
	grid.length =0;
	indexGrid = 0
	validation="";
	contGrid = 0;
	lengthInitName=0;
	initName2.length = 0;
	indiceInitName2=0;
	textPadding = 3;
	strictDocType = true; 
	tabView_maxNumberOfTabs = 20;
	arrayInsertUpdate.length = 0;
	indexArrayInsertUpdate = 0;
	controlInsert = 0;
	controlInsert1 = 0;
	controlUpdate = 0;
	controlUpdate1 = 0;
}

