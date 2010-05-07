var object="";
var validation="";
var notes="";
var collection="";
var arrayGrids=new Array();
var indexOfArrayGrids=0;
var indexTabClicked = 0;
var urlSearch="";
var resultQuery ="";
var contStatements=0;
var contStatements1 = 0;
var index = 0;
var index2 = 0;
function tabSearch(id){
	disabledButtons("imgSearch1");
	if (document.getElementById("item_id")!=null) {
		removeElement("item_id");
	}
	allRules = removeNumberSubject(allRules);
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	showTab("tabMain",indiceSearch);
	inputSearch = document.getElementById(id).value;
	//document.getElementById(id).value="";
	rule_id = getNumberRule(id);
	if (rule_id[0]!="")
	{
		rule_id = rule_id[0];
	}
	else{
		rule_id = rule_id[1];
	}
	//Pegar o nome da colecao para saber qual tab foi clicada
	for (var i=0; i<initName.length; i++) {
		for (var j=0; j<allRules.length; j++) {
			if (rule_id==allRules[j].rule_id) {
				if (initName[i]==allRules[j].subject) {
					indexTabClicked = i;
				}
			}
		}
	}
	if (document.getElementById("selectPatient")!=null)
	{
		removeElement("tableSearch");
	}
	if (document.getElementById("fieldsetSearch")!=null)
	{
		removeElement("fieldsetSearch");
	}
	createTable("tableMainSearch","tabSearch","tbodyMainSearch");
	createTr("trMainSearch", "tbodyMainSearch");
	createTd("tdFieldset","trMainSearch","");
	document.getElementById("tdFieldset").style.verticalAlign="top";
	createFieldset("fieldsetSearch","tdFieldset");
	createLegend("Search Options","fieldsetSearch","legendSearch")
	createTable("tableSearch","fieldsetSearch","tbodySearch");
	createField(rule_id,inputSearch);
	removeElement("loading");
	createTd("tdHierarchy","trMainSearch","");
	document.getElementById("tdHierarchy").style.verticalAlign="top";
	document.getElementById("tdHierarchy").style.paddingLeft="2cm";
	createTable("tableHierarchy","tdHierarchy","tbodyHierarchy");
	setStyle("tableHierarchy","relative","","","800px","");
	createTr("trHierarchy", "tbodyHierarchy");
	createTd("tdHierarchy","trHierarchy","");
	document.getElementById("tdHierarchy").innerHTML=d;
	createP("pTreeHierarchy",'<a href="javascript: d.openAll();">Expand all</a> | <a href="javascript: d.closeAll();">Collapse all</a>',"tdHierarchy");
}
function createField(rule_id,inputSearch){
	if (inputSearch==null)
	{
		inputSearch="";
	}
	if (document.getElementById("trSearchButton")!=null)
	{
		removeElement("trSearchButton");
	}
	if (rule_id==null)
	{
		rule_id = document.getElementById("selectFields").value;
	}
	removeElement("trAddFields");
	allRules=removeNumberSubject(allRules);
	for (var i=0;i<allRules.length ;i++ )
	{
		if (allRules[i].rule_id==rule_id)
		{
			object = allRules[i].object;
			validation = searchSelect(allRules[i].validation);
			if (validation=="")
			{
				validation=checkFieldType(i);
			}
			notes=allRules[i].notes.toLowerCase();
			collection=allRules[i].subject;
		}
	}
	createTr("trSearch"+collection+object, "tbodySearch");
	if (validation == "textarea") {
		typeSelect = "textarea";
	}
	else {
		if ((validation == "")||(validation=="text")){
			if(document.getElementById("tdInputSearch"+collection+object+rule_id)==null) {
				createTd("tdSearch"+collection+object+rule_id,"trSearch"+collection+object,collection+" "+object);
				createTd("tdInputSearch"+collection+object+rule_id ,"trSearch"+collection+object, "");
				createTd("tdButtons"+collection+ object, "trSearch"+collection+object, "");
				document.getElementById("tdInputSearch"+collection+object+rule_id).innerHTML = '<input id="inputSearchAdd' + collection+object+rule_id + '" type="text" value="'+inputSearch+'" size="30">';
				var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="inputSearchAdd' + collection+object+rule_id + '" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addFields();"/>&nbsp&nbsp&nbsp&nbsp<img id="trSearch'+ collection+object +'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>&nbsp&nbsp&nbsp&nbsp<input id="searchBy'+collection+object+'" type="radio"  name="searchBy" value="'+collection+object+'">Result by '+collection+" "+object+'</input>';
				document.getElementById("tdButtons" +collection+object).innerHTML = buttons;
			}
		}
		else {
			if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation=="date")) {
				if(document.getElementById("tdInputSearch"+collection+object)==null) {
					var temp = "SearchData"; 
					temp= temp+cleanString(object);
					createTd("tdSearch"+collection+object+rule_id,"trSearch"+collection+object,collection+" "+object);
					createTd("tdInputSearch" +collection+object, "trSearch"+collection+object, "");
					createTd("tdButtons"+collection+ object, "trSearch"+collection+object, "");
					var formatDate = "";
					var indexL = "";
					for (var l=0; l<fieldDate.length; l++) {
						for (var m=0; m<fieldDate[l].length; m++) {
							if (fieldDate[l][m].verb=="domain") {
								if (fieldDate[l][m].value==rule_id) {
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
					document.getElementById("tdInputSearch" +collection+object).innerHTML = '<input id="inputSearch' +collection+object+rule_id+ '" type="text" value="'+inputSearch+'" name="' + temp + '" readonly=""><img  align="top" style="cursor:pointer" src="images/calendar.png" onclick="' + onClickImage + '"/>';
					var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="inputSearchAdd' + collection+object+rule_id + '" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addFields();"/>&nbsp&nbsp&nbsp&nbsp<img id="trSearch'+collection+ object +'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>&nbsp&nbsp&nbsp&nbsp<input id="searchBy'+collection+object+'" type="radio"  name="searchBy" value="'+collection+object+'">Result by '+collection+" "+object+'</input>';
					document.getElementById("tdButtons" +collection+object).innerHTML = buttons;
				}
			}
			else {
				if (validation == "number") {
					createTd("tdSearch"+collection+object+rule_id,"trSearch"+collection+object,collection+" "+object);
					createTd("tdInputSearch"+collection+object+rule_id ,"trSearch"+collection+object, "");
					createTd("tdButtons"+collection+ object, "trSearch"+collection+object, "");
					document.getElementById("tdInputSearch"+collection+object+rule_id).innerHTML = '<input id="inputSearchAdd' + collection+object+rule_id + '" onKeyUp="javascript:onlyNumber(this); type="text" value="'+inputSearch+'" size="30">';
					var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="inputSearchAdd' + collection+object+rule_id + '" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addFields();"/>&nbsp&nbsp&nbsp&nbsp<img id="trSearch'+ collection+object +'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>&nbsp&nbsp&nbsp&nbsp<input id="searchBy'+collection+object+'" type="radio"  name="searchBy" value="'+collection+object+'">Result by '+collection+" "+object+'</input>';
					document.getElementById("tdButtons" +collection+object).innerHTML = buttons;
				}
				else{
					if (validation.length > 0) {
						if(document.getElementById("tdSelectSearch"+collection+object)==null) {
							createTd("tdSearch"+collection+object+rule_id,"trSearch"+collection+object,collection+" "+object);
							createTd("tdSelectSearch" +collection+ object, "trSearch"+collection+object, "");
							createTd("tdButtons"+collection+ object, "trSearch"+collection+object, "");
							var str = '<select id="selectSearch' +collection+object +rule_id+ '" onChange=""></select>';
							document.getElementById("tdSelectSearch" +collection+object).innerHTML = str;
							var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="selectSearchAdd' + collection+object+rule_id + '" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addFields();"/>&nbsp&nbsp&nbsp&nbsp<img id="trSearch'+ collection+object +'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>&nbsp&nbsp&nbsp&nbsp<input id="searchBy'+collection+object+'" type="radio"  name="searchBy" value="'+collection+object+'">Result by '+collection+" "+object+'</input>';
							document.getElementById("tdButtons" +collection+object).innerHTML = buttons;
							var option = document.createElement("option");
							option.id = "optionSearch"+collection+object+"optionEmpty";
							option.value = "";
							document.getElementById("selectSearch" +collection+object+rule_id).appendChild(option);
							document.getElementById(option.id).innerHTML = "";
							for (k = 0; k < validation.length; k++) {
								var option = document.createElement("option");
								option.id = "optionSearch"+collection+object + validation[k];
								option.name = "optionSearch"+collection+object + validation[k];
								option.value = validation[k];
								document.getElementById("selectSearch" +collection+object +rule_id).appendChild(option);
								document.getElementById(option.id).innerHTML = validation[k];
							}
							if (inputSearch!="")
							{
								document.getElementById("optionSearch"+collection+object+inputSearch).selected = true;
							}
						}
					}
				}
			}
		}
	}
	str = '<input id="searchButton" type="button" value="Search" size="200" onClick="search();"/>';
	createTr("trSearchButton","tbodySearch");
	createTd("tdSearchButton","trSearchButton","");
	document.getElementById("tdSearchButton").innerHTML=str;
	// Aqui eu vou colocar a quantidade de registros que tem no banco de dados
	var key = document.getElementById("key").value;
	var urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>statement_id</select><from>statements</from><where><rule_id>'+rule_id+'</rule_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getNumberRegistry(ans,"'+rule_id+'")');
}
function getNumberRegistry(ans,rule_id) {
	var cont_registry = ans.length;
	for (var i=0; i<allRules.length; i++) {
		if (rule_id==allRules[i].rule_id) {
			if (document.getElementById("contRegistry"+allRules[i].subject + allRules[i].object+rule_id)!=null) {
				removeElement("contRegistry"+allRules[i].subject + allRules[i].object+rule_id);
			}
			var textTd = document.getElementById("tdSearch"+allRules[i].subject + allRules[i].object+rule_id).innerHTML;
			var id = "contRegistry"+allRules[i].subject + allRules[i].object+rule_id;
			textTd = textTd+"<i id="+id+"><b><font color='red'>("+cont_registry+")</font></b></i>";
			document.getElementById("tdSearch"+allRules[i].subject + allRules[i].object+rule_id).innerHTML = textTd;
		}
	}
}
function addFields(){
	removeElement("trSearchButton");
	createTr("trAddFields", "tbodySearch");
	createTd("tdAddFields","trAddFields","Add Field:");
	createTd("tdAddFieldsSelect","trAddFields","");
	var str = '<select id="selectFields" multiple="multiple" onChange="createField();"></select>';
	document.getElementById("tdAddFieldsSelect").innerHTML = str;
	allRules = orderRules(allRules);
	//Estou listando as regras que irao estar disponiveis para a consulta
	for (var i = 0; i < allRules.length; i++) {
		validation=checkFieldType(i);
		if ((allRules[i].verb!="isSubCollectionOf")&&(allRules[i].object_id=="")&&(allRules[i].subject!="s3dbVerb")&&(validation!="textarea"))
		{
			var option = document.createElement("option");
			option.id = "search"+allRules[i].subject+allRules[i].object+allRules[i].rule_id;
			option.name = "search"+allRules[i].subject+allRules[i].object;
			option.value = allRules[i].rule_id;
			document.getElementById("selectFields").appendChild(option);
			document.getElementById(option.id).innerHTML = allRules[i].subject+"->"+allRules[i].object;
		}
	}
	inputButton = '<input id="searchButton" type="button" value="Search" size="200" onClick="search();"/>';
	createTr("trSearchButton","tbodySearch");
	createTd("tdSearchButton","trSearchButton","");
	document.getElementById("tdSearchButton").innerHTML=inputButton;
}
function search(){
	var rule_id = new Array();
	var inputSearch = new Array();
	var collection_id = new Array();
	if (document.getElementById("fieldsetSelectPatient")!=null)
	{
		removeElement("fieldsetSelectPatient");
	}
	createP("pLoading","","body");
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	var tmp = document.getElementById("tbodySearch").childNodes;
	for (i=0;i<tmp.length-1 ;i++ )
	{
		tmp1=document.getElementById(tmp[i].id).childNodes;
		tmp1 = document.getElementById(tmp1[1].id).childNodes;
		numberRule = getNumberRule(tmp1[0].id);
		inputSearch[i]=tmp1[0].value;
		if (numberRule[1]!=null)
		{
			rule_id[i] = numberRule[1];
		}
		else{
			rule_id[i]=numberRule[0];
		}
	}
	for (i=0;i<rule_id.length ;i++ )
	{
		for (j=0;j<allRules.length ;j++ )
		{
			if (allRules[j].rule_id==rule_id[i])
			{
				collection_id[i] = allRules[j].subject_id;
			}
		}
	}
	queryPatient(rule_id,collection_id,inputSearch);
}
function queryPatient(rule_id,collection_id,inputSearch){
	var query = "";
	var result = "";
	var urlItem = "";
	var rulesSearch = "";
	var arraySearch = new Array();
	var indexArraySearch = 0;
	for (var i=0;i<rule_id.length ;i++ )
	{
		for (var j=0;j<allRules.length;j++ )
		{
			if (rule_id[i]==allRules[j].rule_id)
			{
				if ((document.getElementById("searchBy"+allRules[j].subject+allRules[j].object).checked==true)||(i==0))
				{
					result=cleanString(document.getElementById("searchBy"+allRules[j].subject+allRules[j].object).value);
					urlItem = cleanString(allRules[j].subject);
				}
				if (inputSearch[i]!="")
				{
					if ((checkFieldType(j)=="")||(checkFieldType(j)=="text")) {
						query = query+" ?"+cleanString(allRules[j].subject)+" :R"+cleanString(allRules[j].rule_id)+" ?"+cleanString(allRules[j].subject)+cleanString(allRules[j].object)+" FILTER regex(?"+cleanString(allRules[j].subject)+cleanString(allRules[j].object)+","+'"'+inputSearch[i]+'"'+") .";
						arraySearch[indexArraySearch] = allRules[j].subject;
						indexArraySearch++;
						rulesSearch=rulesSearch+"_"+cleanString(allRules[j].subject)+cleanString(allRules[j].object);
					}
					else{
						query = query+" ?"+cleanString(allRules[j].subject)+" :R"+cleanString(allRules[j].rule_id)+" ?"+cleanString(allRules[j].subject)+cleanString(allRules[j].object)+" FILTER regex(?"+cleanString(allRules[j].subject)+cleanString(allRules[j].object)+","+'"^'+inputSearch[i]+'"'+") .";
						arraySearch[indexArraySearch] = allRules[j].subject;
						indexArraySearch++;
						rulesSearch=rulesSearch+"_"+cleanString(allRules[j].subject)+cleanString(allRules[j].object);
					}
					
				}
				else{
					query = query+" ?"+cleanString(allRules[j].subject)+" :R"+cleanString(allRules[j].rule_id)+" ?"+cleanString(allRules[j].subject)+cleanString(allRules[j].object)+" .";
					arraySearch[indexArraySearch] = allRules[j].subject;
					indexArraySearch++;
					rulesSearch=rulesSearch+"_"+cleanString(allRules[j].subject)+cleanString(allRules[j].object);
				}
			}
			if ((collection_id[i]==allRules[j].subject_id))
			{
				if ((allRules[j].object_id!="")&&(allRules[j].subject!=allRules[j].object))
				{
					for (var k=0; k<rule_id.length; k++) {
						for (var l=0; l<allRules.length; l++) {
							if (rule_id[k]==allRules[l].rule_id) {
								if (allRules[j].object==allRules[l].subject) {
									query = " ?"+cleanString(allRules[j].subject)+" :R"+cleanString(allRules[j].rule_id)+" ?"+cleanString(allRules[j].object)+" ."+query;
									arraySearch[indexArraySearch] = allRules[j].subject;
									indexArraySearch++;
								}
							}
						}
						
					}
				}
			}
		}
	}
	var key = document.getElementById("key").value;
	var urlQuery = url+'/sparql.php?key='+key+'&query=SELECT * WHERE{'+query+'}&clean=1';
	urlSearch = urlQuery+"&format=php"+rulesSearch;
	s3db_jsonpp_call(urlQuery,'resultSearch(ans,"'+result+'","'+urlItem+'",'+JSON.stringify(arraySearch)+')');
}
function resultSearch(ans,result,urlItem,arraySearch){
	var tmp;
	var item_id;
	resultQuery=ans;
	if (ans!="")
	{
		if (document.getElementById("selectPatient")!=null)
		{
			removeElement("tableSearch");
		}
		createFieldset("fieldsetSelectPatient","fieldsetSearch");
		createLegend("Result","fieldsetSelectPatient","legendSelectPatient");
		createP("pResultSearch","","fieldsetSelectPatient");
		var str = '<select id="selectPatient" multiple="multiple"></select>';
		document.getElementById("pResultSearch").innerHTML = str;
		document.getElementById("selectPatient").setAttribute("onChange","queryItems("+JSON.stringify(ans)+","+JSON.stringify(arraySearch)+",'"+urlItem+"')");
		for (i = 0; i < ans.length; i++) {
			var option = document.createElement("option");
			option.id = "search"+ans[i][result]+i;
			option.name = "search"+ans[i][result]+i;
			tmp = getNumberItem(ans[i][urlItem]);
			if (tmp[1]!=null)
			{
				item_id = tmp[1];
			}
			else{
				item_id = tmp[0];
			}
			option.value = item_id;
			document.getElementById("selectPatient").appendChild(option);
			document.getElementById(option.id).innerHTML = urlItem+"-> "+result+"-> "+ans[i][result];
		}
		var inputSubmit=document.createElement('input');
		inputSubmit.id = "inputSubmit";
		inputSubmit.name="inputSubmit";
		inputSubmit.type="hidden";
		inputSubmit.value=urlSearch;
		inputButton = '<input id="exportExcelButton" type="submit" value="Export to excel" size="200"/>';
		createTd("tdButtonExportExcel","trSearchButton","");
		document.getElementById("tdButtonExportExcel").innerHTML = inputButton;
		createTd("tdInputExportExcel","trSearchButton","");
		document.getElementById("tdInputExportExcel").appendChild(inputSubmit);
	}
	else{
		alert("Your query had no results!\nPlease, check your query.");
	}
	removeElement("loading");
}
function queryItems(ans,arraySearch,urlItem){
	if (document.getElementById("item_id")!=null) {
		removeElement("item_id");
	}
	contStatements=0;
	contStatements1=0;
	enableButtons("imgSearch2");
	createP("pLoading","","body");
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	showTab("tabMain",indexTabClicked);
	var key = document.getElementById("key").value;
	var item_id = document.getElementById("selectPatient").value; 
	cleanAllFields();
	arraySearchUnique = array_unique(arraySearch);
	var tmp = new Array();
	var indexTmp = 0;
	for (var i=0; i<arraySearch.length; i++) {
		if (arraySearchUnique[i]!=null) {
			tmp[indexTmp] = arraySearchUnique[i];
			indexTmp++;
		}
	}
	arraySearch = tmp;
	var collectionReference = document.getElementById("collection").value;
	for (var i=0; i<arraySearch.length; i++) {
		for (var j=0; j<allCollections.length; j++) {
			if ((allCollections[j].name==arraySearch[i])&&(collectionReference==allCollections[j].collection_id)) {
			  var indexCollectionReference = j;		
			}
		}
	}
	if (indexCollectionReference != null) {
		for (var i=0; i<ans.length; i++) {
			tmp = getNumberItem(ans[i][urlItem]);
			if (tmp[0]!="")
			{
				item_id1 = tmp[0];
			}
			else{
				item_id1 = tmp[1];
			}
			if (item_id==item_id1) {
				tmp = getNumberItem(ans[i][cleanString(allCollections[indexCollectionReference].name)]);
				if (tmp[0]!="")
				{
					item_id = tmp[0];
				}
				else{
					item_id = tmp[1];
				}
			}
		}
	}
	for ( var i=0;i<grid.length ;i++ )
	{
		var sizeRowsGrid = grid[i].rows.count();
		for (var j=1;j<sizeRowsGrid ;j++ )
		{
			grid[i].rows.remove(grid[i].rows.count()-1);
		}
		createGrid("ButtonGridAdd"+grid[i].collection_id);
	}
	activeAllFields();
	//Select * porque o value nao esta sendo retornado por esta query
	urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>statements</from><where><item_id>'+item_id+'</item_id></where></S3QL>';
	s3db_jsonpp_call(urlQuery,'getStatements(ans)');
}
function getStatements(ans){
	contStatements = ans.length;
	var collectionReference = document.getElementById("collection").value;
	if (ans[0]!=null) {
		for (var i=0; i<allCollections.length; i++) {
			if (allCollections[i].collection_id==collectionReference) {
				if (ans[0].subject_id==allCollections[i].collection_id) {
					if (document.getElementById("item_id")==null) {
						var br= document.createElement("br");
						br.id = "item_id";
						br.value = ans[0].item_id;
						document.body.appendChild(br);	
					}
				}
			}
		}	
	}
	var variable ="";
	allRules = removeNumberSubject(allRules);
	ans = removeNumberSubject(ans);
	ans = removeNumberObject(ans);
	var key = document.getElementById("key").value;
	var numItems= new Array();
	var equals = false;
	var gridCreate = false;
	for (var x=0;x<ans.length ;x++ )
	{
		for (var y=0;y<allRules.length;y++ )
		{
			if((ans[x].rule_id == allRules[y].rule_id)&&(ans[x].object!="")){
				isLiteral(ans[x],ans.length);	
			}
		}
	}
}
function isLiteral(ans,size) {
	var key = document.getElementById("key").value;
	if (ans.object_id!="") {
		index2++;
		urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>statements</from><where><item_id>'+ans.value+'</item_id></where></S3QL>';
		s3db_jsonpp_call(urlQuery,'putStatements(ans)');
	}
	else{
		var statement = new Array();
		statement[index] = ans;
		putStatements(statement,"literal");	
	}
}
function putStatements(ans,literal) {
contStatements1++;
	var variable ="";
	allRules = removeNumberSubject(allRules);
	ans = removeNumberSubject(ans);
	ans = removeNumberObject(ans);
	var i=0;
	var indexCollectionId=null;
	var key = document.getElementById("key").value;
	var isGrid = false;
	var indexGrid =0;
	for (var j=0; j<allCollections.length; j++) {
		if (ans[0]!=null) {
			if (ans[0].subject==allCollections[j].name) {
				indexCollectionId=j;
				break;
			}	
		}
	}
	if (indexCollectionId!=null) {
		isGrid=checkIfGrid(allCollections[indexCollectionId].collection_id);	
	}
	if (isGrid==true) {
		for (var j=0;j<grid.length ; j++)
		{
			if (ans[0]!=null) {
				if (grid[j].id=="grid"+ans[0].subject)
				{
					contGrid = j;
					indexGrid=grid[j].rows.count();
				}	
			}
		}
		if (literal!="literal") {
			indexGrid = indexGrid-1;
			createGridSearch(ans,indexGrid);	
			variable = "row"+indexGrid;	
		}
		else{
			indexGrid = indexGrid-1;	
			variable = "row"+indexGrid;	
		}
	}
	for (var i=0;i<ans.length ;i++ )
	{
		for (var j=0;j<allRules.length;j++ )
		{
			if((ans[i].rule_id == allRules[j].rule_id)&&(ans[i].object!="")&&(ans[i].object_id=="")){	
				validation = allRules[j].validation;
				if (validation=="")
				{
					validation=checkFieldType(j);
				}
				if((validation == "text")||(validation=="")||(validation=="number")||(validation=="date")||(validation=="(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation=="textarea")){
					if(validation!="textarea"){
						isGrid=checkIfGrid(ans[i].subject_id);
						if ((document.getElementById("input"+ans[i].subject+ans[i].object+ans[i].rule_id+variable).value!="")&&(isGrid==true)&&(literal=="literal")) {
							for (var k=0;k<grid.length ; k++)
							{
								if (grid[k].id=="grid"+ans[i].subject)
								{
									contGrid = k;
									indexGrid=grid[k].rows.count();
								}
							}
							indexGrid = indexGrid - 1;
							createGridSearch(ans,indexGrid);
							for (var k=0;k<grid.length ; k++)
							{
								if (grid[k].id=="grid"+ans[i].subject)
								{
									contGrid = k;
									indexGrid=grid[k].rows.count();
								}
							}
							indexGrid = indexGrid - 1;
							variable = "row"+indexGrid;	
						}
						if ((isGrid==true)&&(literal=="literal")) {
							for (var k=1; k<=indexGrid; k++) {
								variable = "row"+k;
								var input = document.getElementById("input"+ans[i].subject+ans[i].object+ans[i].rule_id+variable);
								if (input.value=="") {
									input.value = ans[i].value;
									break;
								}
							}
						}
						else{
							var input = document.getElementById("input"+ans[i].subject+ans[i].object+ans[i].rule_id+variable);
							input.value = ans[i].value;
						}
						
						//checkFieldRestrictions("input"+ans[x].subject+ans[x].object+ans[x].rule_id,ans[x].value);
					}
					else{
						if (validation=="textarea")
						{
							isGrid=checkIfGrid(ans[i].subject_id);
							if ((document.getElementById("inputTextArea"+ans[i].subject+ans[i].object+ans[i].rule_id+variable).value!="")&&(isGrid==true)&&(literal=="literal")) {
								for (var k=0;k<grid.length ; k++)
								{
									if (grid[k].id=="grid"+ans[i].subject)
									{
										contGrid = k;
										indexGrid=grid[k].rows.count();
									}
								}
								indexGrid = indexGrid - 1;
								createGridSearch(ans,indexGrid);
								for (var k=0;k<grid.length ; k++)
								{
									if (grid[k].id=="grid"+ans[i].subject)
									{
										contGrid = k;
										indexGrid=grid[k].rows.count();
									}
								}
								indexGrid = indexGrid - 1;
								variable = "row"+indexGrid;	
							}
							if ((isGrid==true)&&(literal=="literal")) {
								for (var k=1; k<=indexGrid; k++) {
									variable = "row"+k;
									var input = document.getElementById("inputTextArea"+ans[i].subject+ans[i].object+ans[i].rule_id+variable);
									if (input.value=="") {
										input.value = ans[i].value;
										break;
									}
								}
							}
							else{
								var input = document.getElementById("inputTextArea"+ans[i].subject+ans[i].object+ans[i].rule_id+variable);
								input.value = ans[i].value;
							}
						}
					}
				}
				else{
					if ((validation.length>0))
					{
						str = ans[i].value;
						str=removeLastSpace(str);
						if (str.length>1) {
							if (str[0]==null) {
								str=str[1];
							}
							else{
								str=str[0];
							}
						}
						if ( document.getElementById(ans[i].subject+ans[i].object+str+variable)==null) {
							alert("The option '"+str+"(collection '"+ans[i].subject+"' rule '"+ans[i].object+"')' doesn't exist in database.\nPlease add this option!");
						}
						isGrid=checkIfGrid(ans[i].subject_id);
						if ((document.getElementById(ans[i].subject+ans[i].object+str+variable).selected!=false)&&(isGrid==true)&&(literal=="literal")) {
							for (var k=0;k<grid.length ; k++)
							{
								if (grid[k].id=="grid"+ans[i].subject)
								{
									contGrid = k;
									indexGrid=grid[k].rows.count();
								}
							}
							indexGrid = indexGrid - 1;
							createGridSearch(ans,indexGrid);
							for (var k=0;k<grid.length ; k++)
							{
								if (grid[k].id=="grid"+ans[i].subject)
								{
									contGrid = k;
									indexGrid=grid[k].rows.count();
								}
							}
							indexGrid = indexGrid - 1;
							variable = "row"+indexGrid;	
						}
						if ((isGrid==true)&&(literal=="literal")) {
							for (var k=1; k<=indexGrid; k++) {
								variable = "row"+k;
								var select = document.getElementById(ans[i].subject+ans[i].object+str+variable);
								if (select.selected=="false") {
									select.selected = true;
									break;
								}
							}
						}
						else{
							var select = document.getElementById(ans[i].subject+ans[i].object+str+variable);
							select.selected = true;
						}
					}
				}
			}
		}
	}	
	if (contStatements1==contStatements)
	{
		checkFieldRestrictions("","");
		arrayInsertUpdate.length = 0;
		indexArrayInsertUpdate = 0;
		removeElement("loading");
		for (var k=0; k<allCollections.length; k++) {
			isGrid=checkIfGrid(allCollections[k].collection_id);
			if (isGrid==true) {
				for (var l=0;l<grid.length ; l++)
				{
					if (grid[l].id=="grid"+allCollections[k].name)
					{
						indexGrid=grid[l].rows.count();
						for (var m=1; m<indexGrid; m++) {
							for (var n=0; n<allRules.length; n++) {
								var validation = allRules[n].validation;
								if (validation=="")
								{
									validation=checkFieldType(n);
								}
								if ((allRules[n].subject_id==allCollections[k].collection_id)&&(allRules[n].object_id=="")) {
									if((validation == "text")||(validation=="number")||(validation=="")||(validation=="date")||(validation=="(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation=="textarea"))
									{
										if(validation!="textarea"){
											if (document.getElementById("input"+allRules[n].subject+allRules[n].object+allRules[n].rule_id+"row"+m).value!="") {
												var noDeleteGrid = true;
											}
										}
										else{
											if (validation=="textarea") {
												if (document.getElementById("inputTextArea"+allRules[n].subject+allRules[n].object+allRules[n].rule_id+"row"+m).value!="") {
													var noDeleteGrid = true;
												}
											}
										}
									}
									else{
										if ((validation.length>0)) {
											var select = document.getElementById(allRules[n].subject+allRules[n].object+"optionEmpty"+"row"+m);
											if (select.selected=="false") {
												var noDeleteGrid = true;
											}
										}
									}
								}
							}
							if (noDeleteGrid==false) {
								var sizeRowsGrid = grid[l].rows.count();
								grid[l].rows.remove(grid[l].rows.count()-1);
							}
							var noDeleteGrid = false;
						}
					}
				}
			}
		}
	}
}
function createGridSearch(ans,i){
	ans = removeNumberSubject(ans);
	allRules = removeNumberSubject(allRules);
	var variable="";
	var indexRow = "";
	var contRows = 0;
	var column = 0;
	var gridRows = 0;
	var indexGrid = 0;
	for (var j=0;j<grid.length ; j++)
	{
		if (grid[j].id=="grid"+ans[0].subject)
		{
			contGrid = j;
			indexGrid=grid[j].rows.count();
		}
	}
	if (i!=0) {
			grid[contGrid].rows.add();	
	}
	for (var j=0;j<allRules.length ;j++ )
	{
		var search='><img id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id +"row"+indexGrid+'" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
		if (ans[0].subject==allRules[j].subject)
		{
			if ((allRules[j].verb != "isSubCollectionOf")&&(allRules[j].subject!="s3dbVerb")&&(allRules[j].object_id == ""))
			{
				column++;
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
				grid[contGrid].setTextMatrix(i+1,0,i+1);
				if (typeSelect == "text") {
					var indexRow = i+1;
					grid[contGrid].setTextMatrix(i+1,column,'<input id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexRow+'" type="text" value="" onChange="checkFieldRestrictions(this.id);" name="" '+readonly+' '+search+'');
				}
				if (typeSelect == "number") {
					grid[contGrid].setTextMatrix(indexGrid,column,'<input id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexGrid+'" type="text" onKeyUp="javascript:onlyNumber(this);" onblur="checkFieldRestrictions(this.id);" value="" name="" '+readonly+' '+search+'');
				}
				if (typeSelect == "date") {
					var temp = cleanString(allRules[j].object);
					var indexRow = i+1;
					temp = temp+"row"+indexRow;
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
					grid[contGrid].setTextMatrix(i+1,column,'<input id="input' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexRow+'" type="text" value="" name="' + temp + '" onChange="checkFieldRestrictions(this.id);" '+readonly+'><img  align="top" style="cursor:pointer" src="images/calendar.png" onclick="' + onClickImage + '"/><img id="input' + allRules[j].subject + allRules[j].object + allRules[j].rule_id +"row"+indexRow+ '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>');
				}
				if (typeSelect == "textArea")
				{
					var indexRow = i+1;
					grid[contGrid].setTextMatrix(i+1,column,'<textarea id="inputTextArea'+allRules[j].subject+ allRules[j].object+allRules[j].rule_id+"row"+indexRow+'" rows="2" cols="30"/>');
				}
				if (typeSelect == "select") 
				{
					var indexRow = i+1;
					var str='<select id="select' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexRow+ '" onChange="checkFieldRestrictions(this.id);">';
					str =str+'<option id="'+allRules[j].subject+allRules[j].object+"optionEmpty"+"row"+indexRow+'" name="'+allRules[j].subject+allRules[j].object+"optionEmpty"+'" value=""></option>';
					for (var k =0;k<validation.length ;k++ )
					{
						str =str+'<option id="'+allRules[j].subject+allRules[j].object+validation[k]+"row"+indexRow+'" name="'+allRules[j].subject+allRules[j].object+validation[k]+"row"+indexRow+'" value="'+validation[k]+'">'+validation[k]+'</option>';
					}
					str = str+'</select><img id="select' + allRules[j].subject + allRules[j].object + allRules[j].rule_id+"row"+indexRow+ '" align="top" style="cursor:pointer" src="images/icon-search.PNG" onclick="tabSearch(this.id);"/>';
					grid[contGrid].setTextMatrix(i+1,column,str);
					document.getElementById('select' +allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+indexRow).style.width="150px";
				}

			}
		}
	}
	indexRow = i+1;
	variable = "row"+indexRow;
	column = 0;
	//getItems([items[i]],variable,false);
}
function removeNumberSubject(tmp){
	for (i = 0; i < tmp.length; i++) {
		if (tmp[i].subject!= null)
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
function removeNumberObject(tmp){
	for (i = 0; i < tmp.length; i++) {
		if (tmp[i].object!= null)
		{
			var founded = tmp[i].object.search(/[0-9][0-9]_/);
			if (founded!=-1)
			{
				tmp[i] .object= tmp[i].object.slice(3);
			}
		}
	}
	return tmp;
}
function removeLastSpace(str){
	var tmp="";
	tmp = str.split(/[" "]*$/);
	return tmp;
}
function getNumberItem(urlItem){
	var itemNumber= urlItem.match(/I[0-9]+/);
	itemNumber = itemNumber[0].split(/[^0-9]+/);
	return itemNumber;
}
