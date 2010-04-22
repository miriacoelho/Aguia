function activeFields(ruleNumber,id){
	for (var i=0;i<allRules.length ;i++ )
	{
		if (allRules[i].rule_id==ruleNumber)
		{
			var collectionNumber= allRules[i].subject_id;
		}
	}
	allRules = removeNumberSubject(allRules);
	for (i=0;i<allRules.length ;i++ )
	{
		if ((allRules[i].subject_id==collectionNumber)&&(allRules[i].object_id=="")&&(allRules[i].verb!="isSubCollectionOf"))
		{
			var validation = searchSelect(allRules[i].validation);
			if (validation=="")
			{
				validation=checkFieldType(i);
			}
			readonly = checkInactiveField(i,validation);
			var isGrid=checkIfGrid(allRules[i].subject_id);
			if (isGrid==true)
			{
				checkGridActiveFields(i,validation,id,readonly);
			}
			else{
				if (readonly!="")
				{
					if (validation == "textarea") {
						document.getElementById("inputTextArea"+allRules[i].subject + allRules[i].object+allRules[i].rule_id).readOnly=true;
					}
					else {
						if ((validation == "")||(validation=="text")) {
							document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id).readOnly=true;
						}
						else {
							if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
							}
							else {
								if (validation == "number") {
									document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=false;
								}
								else{
									if (validation.length > 0) {
										document.getElementById("select" +allRules[i].subject+allRules[i].object +allRules[i].rule_id).disabled="disabled";
									}
								}
							}
						}
					}
				}
				else{
					if (validation == "textarea") {
						document.getElementById("inputTextArea"+allRules[i].subject + allRules[i].object+allRules[i].rule_id).readOnly=false;
					}
					else {
						if ((validation == "")||(validation=="text")) {
							document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id).readOnly=false;
						}
						else {
							if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
							}
							else {
								if (validation == "number") {
									document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=false;
								}
								else{
									if (validation.length > 0) {
										document.getElementById("select" +allRules[i].subject+allRules[i].object +allRules[i].rule_id).disabled="";
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
function checkGridActiveFields(i,validation,id,readonly){
	var number = getNumberRowGrid(id);
	if (readonly!="")
	{
		if (validation == "textarea") {
			document.getElementById("inputTextArea"+allRules[i].subject + allRules[i].object+allRules[i].rule_id+"row"+number).readOnly=true;
		}
		else {
			if ((validation == "")||(validation=="text")) {
				document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=true;
			}
			else {
				if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
				}
				else {
					if (validation == "number") {
						document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=false;
					}
					else{
						if (validation.length > 0) {
							document.getElementById("select" +allRules[i].subject+allRules[i].object +allRules[i].rule_id+"row"+number).disabled="disabled";
						}
					}
				}
			}
		}
	}
	else{
		if (validation == "textarea") {
			document.getElementById("inputTextArea"+allRules[i].subject + allRules[i].object+allRules[i].rule_id+"row"+number).readOnly=false;
		}
		else {
			if ((validation == "")||(validation=="text")) {
				document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=false;
			}
			else {
				if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
				}
				else {
					if (validation == "number") {
						document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id+"row"+number).readOnly=false;
					}
					else{
						if (validation.length > 0) {
							document.getElementById("select" +allRules[i].subject+allRules[i].object +allRules[i].rule_id+"row"+number).disabled="";
						}
					}
				}
			}
		}
	}
}
function getNumberRowGrid(id){
	var number= id.match(/[0-9]$/);
	return number;
}