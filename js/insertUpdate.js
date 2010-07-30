var indexLoading=0;
var indexRemoveLoading = 0;
var indexSelectInsertUpdate = 0;
var deletions = 0;
var deletions1 = 0;
var arrayCollectionsAssociatedUpdate = new Array();
var indexCollectionsAssociatedUpdate = 0;
var controlInsert = 0;
var controlInsert1 = 0;
var controlUpdate = 0;
var controlUpdate1 = 0;
function getOptionsInsertUpdate() {
	arrayCollectionsAssociatedUpdate.length = 0;
	indexCollectionsAssociatedUpdate = 0;
	indexLoading = 0;
	indexRemoveLoading = 0;
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	var key = document.getElementById("key").value;
	var collectionReference = document.getElementById("collection").value;
	for (var i=0; i<collectionsAssociated.length; i++) {
		for (var j=0; j<allCollections.length; j++) {
			if (collectionsAssociated[i]==allCollections[j].collection_id) {
				if (allCollections[j].collection_id!=collectionReference) {
					if (document.getElementById("tableSelectItems"+allCollections[j].name)!=null) {
						cleanOptions("tableSelectItems"+allCollections[j].name,allCollections[j].name);
						document.getElementById("tableSelectItems"+allCollections[j].name).style.display="";
						if (document.getElementById("divJGrid"+allCollections[j].name)!=null) {
							document.getElementById("divJGrid"+allCollections[j].name).style.display="none";
						}
						else{
							if (document.getElementById("table"+allCollections[j].name)!=null) {
								document.getElementById("table"+allCollections[j].name).style.display="none";
							}
						}
						removeElement("loading");
					}
					else{
						if (document.getElementById("divJGrid"+allCollections[j].name)!=null) {
							document.getElementById("divJGrid"+allCollections[j].name).style.display="none";	
							document.getElementById("tableButtonsGrid"+allCollections[j].name).style.display="none";	
							urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>items</from><where><collection_id>'+allCollections[j].collection_id+'</collection_id></where></S3QL>';
							indexRemoveLoading++;
							s3db_jsonpp_call(urlQuery,'putOptions(ans,"'+allCollections[j].name+'")');
						}
						else{
							if (document.getElementById("table"+allCollections[j].name)!=null) {
								document.getElementById("table"+allCollections[j].name).style.display="none";	
								urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>items</from><where><collection_id>'+allCollections[j].collection_id+'</collection_id></where></S3QL>';
								indexRemoveLoading++;
								s3db_jsonpp_call(urlQuery,'putOptions(ans,"'+allCollections[j].name+'")');
							}
						}
					}
				}
				if (allCollections.length==1) {
						removeElement("loading");
				}
			}
		}
	}
}
function cleanOptions(id,collection_name) {
	arrayCollectionsAssociatedUpdate.length = 0;
	indexCollectionsAssociatedUpdate = 0;
	var clean = document.getElementById("tbodySelectItems"+collection_name).childNodes;
	for (var i=1; i<clean.length; i++) {
		removeElement(clean[i].id);
	}
	document.getElementById("optionItem"+collection_name+"optionEmpty").selected = true;
}
function putOptions(ans,collection_name) {
	indexLoading++;
	createTable("tableSelectItems"+collection_name,"tab"+collection_name,"tbodySelectItems"+collection_name);
	createTr("trSelectItems"+collection_name, "tbodySelectItems"+collection_name);
	createTd("tdSelectItemsText"+collection_name,"trSelectItems"+collection_name,"Select a Item");
	createTd("tdSelectItems"+collection_name,"trSelectItems"+collection_name,"");
	var str = '<select id="selectItems' +collection_name+ '" onChange="checkCollectionsAssociatedUpdate(this.id);"></select>';
	document.getElementById("tdSelectItems"+collection_name).innerHTML = str;
	var option = document.createElement("option");
	option.id = "optionItem"+collection_name+"optionEmpty";
	option.value = "";
	document.getElementById("selectItems" +collection_name).appendChild(option);
	document.getElementById(option.id).innerHTML = "";
	for (var k = 0; k < ans.length; k++) {
		var option = document.createElement("option");
		option.id = "optionItem"+collection_name+k;
		option.name = "optionItem"+collection_name+k;
		option.value = ans[k].item_id;
		document.getElementById("selectItems" +collection_name).appendChild(option);
		if (ans[k].notes!="") {
			document.getElementById(option.id).innerHTML = ans[k].notes;
		}
	    else{
			document.getElementById(option.id).innerHTML =ans[k].item_id;
		}
	}
	createTd("tdButtonInsertUpdateAdd"+collection_name,"trSelectItems"+collection_name,"");
	var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="selectItems' + collection_name+'" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addOptionsInsertUpdate(this.id);"/>&nbsp&nbsp&nbsp&nbsp<img id="trSelectItems'+collection_name+'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>';
	document.getElementById("tdButtonInsertUpdateAdd" +collection_name).innerHTML=buttons;
	if (indexRemoveLoading==indexLoading) {
		removeElement("loading");
	}
}
function addOptionsInsertUpdate(id) {
	indexSelectInsertUpdate++;
	collection_name = id.split("selectItems");
	if (collection_name[1]!="") {
		collection_name = collection_name[1];
	}
	else{
		collection_name = collection_name[0];
	}
	createTr("trSelectItems"+collection_name+indexSelectInsertUpdate, "tbodySelectItems"+collection_name);
	createTd("tdSelectItemsText"+collection_name+indexSelectInsertUpdate,"trSelectItems"+collection_name+indexSelectInsertUpdate,"Select a Item");
	createTd("tdSelectItems"+collection_name+indexSelectInsertUpdate,"trSelectItems"+collection_name+indexSelectInsertUpdate,"");
	var tmp = document.getElementById(id);
	tmp_clone = tmp.cloneNode(true);
	tmp_clone.id = "selectItems"+collection_name+indexSelectInsertUpdate;
	document.getElementById("tdSelectItems"+collection_name+indexSelectInsertUpdate).appendChild(tmp_clone);
	createTd("tdButtonInsertUpdateAdd"+collection_name+indexSelectInsertUpdate,"trSelectItems"+collection_name+indexSelectInsertUpdate,"");
	var buttons = '&nbsp&nbsp&nbsp&nbsp<img id="selectItems' + collection_name+'" align="top" style="cursor:pointer" title="Add Parameter" src="images/Add.png" onclick="addOptionsInsertUpdate(this.id);"/>&nbsp&nbsp&nbsp&nbsp<img id="trSelectItems'+collection_name+indexSelectInsertUpdate+'" align="top" style="cursor:pointer" title="Delete Parameter" src="images/Delete.png" onclick="removeElement(this.id);"/>';
	document.getElementById("tdButtonInsertUpdateAdd" +collection_name+indexSelectInsertUpdate).innerHTML=buttons;
}
function removeOptionsInsertUpdate() {
	var collectionReference = document.getElementById("collection").value;
	for (var i=0; i<collectionsAssociated.length; i++) {
		for (var j=0; j<allCollections.length; j++) {
			if (collectionsAssociated[i]==allCollections[j].collection_id) {
				if (allCollections[j].collection_id!=collectionReference) {
					if (document.getElementById("divJGrid"+allCollections[j].name)!=null) {
						if (document.getElementById("tableSelectItems"+allCollections[j].name)!=null) {
							document.getElementById("tableSelectItems"+allCollections[j].name).style.display="none";
							document.getElementById("table"+allCollections[j].name).style.display="";
							document.getElementById("divJGrid"+allCollections[j].name).style.display="";	
						}
					}
					else{
						if (document.getElementById("table"+allCollections[j].name)!=null) {
							if (document.getElementById("tableSelectItems"+allCollections[j].name)!=null) {
								document.getElementById("tableSelectItems"+allCollections[j].name).style.display="none";
								document.getElementById("table"+allCollections[j].name).style.display="";	
							}
						}
					}
				}
			}
		}
	}
}
function save(){
	if (arrayCollectionsAssociatedUpdate.length!=0) {
		arrayCollectionsAssociatedUpdate=removeNumberArray(arrayCollectionsAssociatedUpdate);
		var tmp1 = new Array();
		var indexTmp1 = 0;
		for (var i=0; i<arrayCollectionsAssociatedUpdate.length; i++) {
			var tmp = arrayCollectionsAssociatedUpdate[i].split("selectItems");
			if (tmp[1]!="") {
				tmp1[indexTmp1] = tmp[1];
				indexTmp1++;
			}
			else{
				tmp1[indexTmp1] = tmp[0];
				indexTmp1++;
			}
		}
		arrayCollectionsAssociatedUpdate = tmp1;
		arrayCollectionsAssociatedUpdateUnique = array_unique(arrayCollectionsAssociatedUpdate);
		var tmp = new Array();
		var indexTmp = 0;
		for (var i=0; i<arrayCollectionsAssociatedUpdate.length; i++) {
			if (arrayCollectionsAssociatedUpdateUnique[i]!=null) {
				tmp[indexTmp] = arrayCollectionsAssociatedUpdateUnique[i];
				indexTmp++;
			}
		}
		arrayCollectionsAssociatedUpdate = tmp;
	}
	//Vou ver se eh insert ou update
	// Se o botao add estiver habilitado eh update, senao eh insert
	if (document.getElementById("imgNew")!=null) {
		update();
	}
	else{
		insert();
	}
}
function insert() {
	var notes = prompt("Type an identifier to the new registry. If leave blank or click in cancel a value default will be set. This identifier will help you associate it with main collection.");
	if (arrayInsertUpdate.length==0) {
		alert("You don't have nothing to insert!");
	}
	else{
		createImg("loading","","pLoading","Loading","images/loading.gif","");
		setStyle("loading","absolute","","","80%","50px");
		var collectionReference = document.getElementById("collection").value;
		var key = document.getElementById("key").value;
		for (var i=0; i<allCollections.length; i++) {
			//Insert item collectionReference first
			if (allCollections[i].collection_id==collectionReference) {
			//if grid insert two or more items
			if ((notes!=null)&& (notes!="")) {
				urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>item</insert><where><collection_id>'+allCollections[i].collection_id+'</collection_id><notes>'+notes+'</notes></where></S3QL>';
			}
			else{
				urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>item</insert><where><collection_id>'+allCollections[i].collection_id+'</collection_id></where></S3QL>';
			}
				s3db_jsonpp_call(urlQuery,'insertStatements(ans)');
			}
		}
	}
}
function insertStatements(ans) {
	if (ans[0].error_code!=0) {
		alert(ans[0].message);
		removeElement("loading");
	}
	else{
		var collectionReference = document.getElementById("collection").value;
		var key = document.getElementById("key").value;
		for (var i=0; i<arrayInsertUpdate.length; i++) {
			for (var j=0; j<allRules.length; j++) {
				if (allRules[j].rule_id==arrayInsertUpdate[i]) {
					// Se eh colecao de referencia 
					for (var k=0; k<allCollections.length; k++) {
						if (allCollections[k].collection_id==collectionReference) {
							if (collectionReference==allRules[j].subject_id) {
								var isGrid=checkIfGrid(allCollections[k].collection_id);
								if (isGrid == true){
									for (var l=0;l<grid.length ;l++ )
									{
										if (allCollections[k].name==grid[l].collection_name)
										{
											var aux = 0;
											for (var m=1;m<grid[l].rows.count() ;m++ )
											{
												aux++;
												result = checkField(allRules[j].rule_id,j);
												value = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+aux).value;
												if (value!="") {
													urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>statement</insert><where><rule_id>'+allRules[j].rule_id+'</rule_id><item_id>'+ans[0].item_id+'</item_id><value>'+value+'</value></where></S3QL>';
													controlInsert++;
													s3db_jsonpp_call(urlQuery,"confirmInsertions(ans)");	
												}
											}
										}
									}
								}
								else{
									result = checkField(allRules[j].rule_id,j);
									value = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id).value;
									urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>statement</insert><where><rule_id>'+allRules[j].rule_id+'</rule_id><item_id>'+ans[0].item_id+'</item_id><value>'+value+'</value></where></S3QL>';
									controlInsert++;
									s3db_jsonpp_call(urlQuery,"confirmInsertions(ans)");
								}
							}
						}
					}
				}
			}
		}
	}
	//Insere as associacoes da colecao principal com as outras colecoes colecoes
	for (var i=0; i<collectionsAssociated.length; i++) {
		for (var j=0; j<allCollections.length; j++) {
			if (collectionsAssociated[i]==allCollections[j].collection_id) {
				if (allCollections[j].collection_id!=collectionReference) {
					//Quantos campos tem?
					var insertAssociations = "";
					var item_id = 0;
					if (document.getElementById("tbodySelectItems"+allCollections[j].name)!=null) {
						insertAssociations=document.getElementById("tbodySelectItems"+allCollections[j].name).childNodes;
						for (var k=0; k<insertAssociations.length; k++) {
							var tmp=insertAssociations[k].id.split("trSelectItems");
							if (tmp[1]!="") {
								tmp = tmp[1];
							}
							else{
								tmp = tmp[0];
							}
							item_id = document.getElementById("selectItems"+tmp).value;
							if (item_id!="") {
								for (var q=0; q<allRules.length; q++) {
									if ((allRules[q].subject_id==collectionReference)&&(allRules[q].object_id==collectionsAssociated[i])) {
										urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>statement</insert><where><rule_id>'+allRules[q].rule_id+'</rule_id><item_id>'+ans[0].item_id+'</item_id><value>'+item_id+'</value></where></S3QL>';
										controlInsert++;
										s3db_jsonpp_call(urlQuery,"confirmInsertions(ans)");	
									}
								}	
							}
						}
					}
				}
			}
		}
	}			
}
function confirmInsertions(ans) {
	controlInsert1++;
	if (controlInsert==controlInsert1) {
		removeElement("loading");
		alert("Registry inserted with sucess!!");
	}
}
function update() {
	if (arrayInsertUpdate.length==0) {
		alert("You don't have nothing to update!");
	}
	else{
		createImg("loading","","pLoading","Loading","images/loading.gif","");
		setStyle("loading","absolute","","","80%","50px");
		var collectionReference = document.getElementById("collection").value;
		var key = document.getElementById("key").value;
		var item_id = document.getElementById("item_id").value;
		for (var i=0; i<arrayInsertUpdate.length; i++) {
			for (var j=0; j<allRules.length; j++) {
				if (allRules[j].rule_id==arrayInsertUpdate[i]) {
					// Se eh colecao de referencia 
					for (var k=0; k<allCollections.length; k++) {
						if (allCollections[k].collection_id==collectionReference) {
							if (allCollections[k].collection_id==allRules[j].subject_id) {
								var isGrid=checkIfGrid(allCollections[k].collection_id);
								if (isGrid == true){
									for (var l=0;l<grid.length ;l++ )
									{
										if (allCollections[k].name==grid[l].collection_name)
										{
											var aux = 0;
											for (var m=1;m<grid[l].rows.count() ;m++ )
											{
												aux++;
												result = checkField(allRules[j].rule_id,j);
												value = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+"row"+aux).value;
												if (value!="") {
													urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>statements</from><where><rule_id>'+allRules[j].rule_id+'</rule_id><item_id>'+item_id+'</item_id></where></S3QL>';
													s3db_jsonpp_call(urlQuery,"getStatementIdUpdate(ans,'"+value+"','"+item_id+"','"+allRules[j].rule_id+"')");		
												}
											}
										}
									}
								}
								else{
									result = checkField(allRules[j].rule_id,j);
									value = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id).value;
									urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>statements</from><where><rule_id>'+allRules[j].rule_id+'</rule_id><item_id>'+item_id+'</item_id></where></S3QL>';
									s3db_jsonpp_call(urlQuery,"getStatementIdUpdate(ans,'"+value+"','"+item_id+"','"+allRules[j].rule_id+"')");
								}
							}
						}
					}
				}
			}
		}
		//Primeiro deletar as associacoes
		for (var i=0; i<arrayCollectionsAssociatedUpdate.length; i++) {
			for (var j=0; j<collectionsAssociated.length; j++) {
				for (var k=0; k<allCollections.length; k++) {
					if ((allCollections[k].collection_id==collectionsAssociated[j])&&(allCollections[k].collection_id!=collectionReference)
						&&(arrayCollectionsAssociatedUpdate[i]==allCollections[k].name)) {
						for (var l=0; l<allRules.length; l++) {
							if ((allRules[l].subject_id==collectionReference)&&(allRules[l].object_id==collectionsAssociated[j])) {
								//Buscar os statements para deletar
								urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><select>*</select><from>statements</from><where><rule_id>'+allRules[l].rule_id+'</rule_id><item_id>'+item_id+'</item_id></where></S3QL>';
								s3db_jsonpp_call(urlQuery,"deleteAssociations(ans,'"+item_id+"')");
							}
						}
					}
				}
			}
		}	
	}
}
function getStatementIdUpdate(ans,value,item_id,rule_id) {
	var collectionReference = document.getElementById("collection").value;
	var key = document.getElementById("key").value;
	if ((ans[0]==null)&&(value!="")) {
		//fazer o insert
		urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>statement</insert><where><rule_id>'+rule_id+'</rule_id><item_id>'+item_id+'</item_id><value>'+value+'</value></where></S3QL>';
		controlUpdate++;
		s3db_jsonpp_call(urlQuery,"confirmUpdates(ans)");	
	}
	else{
		urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><update>statement</update><where><statement_id>'+ans[0].statement_id+'</statement_id><value>'+value+'</value></where></S3QL>';
		controlUpdate++;
		s3db_jsonpp_call(urlQuery,"confirmUpdates(ans)");
	}
}
function deleteAssociations(ans,item_id) {
	var key = document.getElementById("key").value;
	for (var i=0; i<ans.length; i++) {
		urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><delete>statement</delete><where><statement_id>'+ans[i].statement_id+'</statement_id></where></S3QL>';
		deletions++;
		s3db_jsonpp_call(urlQuery,"confirmDeletions(ans,'"+item_id+"')");
	}
	if (ans.length==0) {
		deletions++;
		confirmDeletions("",item_id);
	}
}
function confirmDeletions(ans,item_id1) {
	var collectionReference = document.getElementById("collection").value;
	var key = document.getElementById("key").value;
	deletions1++;
	if (deletions==deletions1) {
		//Dai eu posso inserir as associacoes
		//Insere as associacoes da colecao principal com as outras colecoes colecoes
		for (var i=0; i<collectionsAssociated.length; i++) {
			for (var j=0; j<allCollections.length; j++) {
				if (collectionsAssociated[i]==allCollections[j].collection_id) {
					if (allCollections[j].collection_id!=collectionReference) {
						//Quantos campos tem?
						var insertAssociations = "";
						var item_id = 0;
						insertAssociations=document.getElementById("tbodySelectItems"+allCollections[j].name).childNodes;
						for (var k=0; k<insertAssociations.length; k++) {
							var tmp=insertAssociations[k].id.split("trSelectItems");
							if (tmp[1]!="") {
								tmp = tmp[1];
							}
							else{
								tmp = tmp[0];
							}
							item_id = document.getElementById("selectItems"+tmp).value;
							if (item_id!="") {
								for (var q=0; q<allRules.length; q++) {
									if ((allRules[q].subject_id==collectionReference)&&(allRules[q].object_id==collectionsAssociated[i])) {
										urlQuery = url+'/S3QL.php?query=<S3QL><key>'+key+'</key><insert>statement</insert><where><rule_id>'+allRules[q].rule_id+'</rule_id><item_id>'+item_id1+'</item_id><value>'+item_id+'</value></where></S3QL>';
										controlUpdate++;
										s3db_jsonpp_call(urlQuery,"confirmUpdates(ans)");	
									}
								}	
							}
						}
					}
				}
			}
		}		
	}
}
function confirmUpdates(ans) {
	if (ans[0].error_code!=0) {
		alert(ans[0].message);
		removeElement("loading");
	}
	else{
		controlUpdate1++;
		if (controlUpdate==controlUpdate1) {
			removeElement("loading");
			alert("Registry updated with sucess!!!")
		}
	}
}
function checkCollectionsAssociatedUpdate(id) {
	arrayCollectionsAssociatedUpdate[indexCollectionsAssociatedUpdate]=id;
	indexCollectionsAssociatedUpdate++;
}
function removeNumberArray(tmp){
	var tmp1 = new Array();
	for (i = 0; i < tmp.length; i++) {
		found = tmp[i].search(/[0-9]$/);
		if (found!=-1) {
			tmp1 = tmp[i].split(/[0-9]$/);
			if (tmp1[1]!="") {
				tmp1=tmp1[1];
			}
			else{
				tmp1=tmp1[0];
			}
			tmp[i] = tmp1;
		}	
	}
	return tmp;
}
