function activeAllFields(){
	for (var i=0;i<allRules.length ;i++ )
	{
		var isGrid=checkIfGrid(allRules[i].subject_id);
		if ((allRules[i].object_id=="")&&(allRules[i].verb!="isSubCollectionOf")&&(allRules[i].subject!="s3dbVerb")&&(isGrid==false))
		{
			var validation = searchSelect(allRules[i].validation);
			if (validation=="")
			{
				validation=checkFieldType(i);
			}
			readonly = checkInactiveField(i,validation);
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
							if (validation.length > 0) {
								document.getElementById("select" +allRules[i].subject+allRules[i].object +allRules[i].rule_id).disabled="disabled";
							}
						}
					}
				}
			}
			else{
				if (isGrid==false)
				{
					if (validation == "textarea") {
						document.getElementById("inputTextArea"+allRules[i].subject + allRules[i].object+allRules[i].rule_id).readOnly=false;
					}
					else {
						if ((validation == "")||(validation=="text")) {
							if (document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id)==null)
							{
								alert("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id);
							}
							document.getElementById("input" + allRules[i].subject + allRules[i].object + allRules[i].rule_id).readOnly=false;
						}
						else {
							if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation == "date")) {
							}
							else {
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
function checkIfGrid(index){
	var isGrid=false;
	if (moreFields[0]!=null) {
		for (var i=0; i<moreFields.length; i++) {
			if (moreFields[i].verb=="domain") {
				if (index==moreFields[i].value)
				{
					isGrid = true;
				}
			}
		}
	}
	return isGrid;
}
