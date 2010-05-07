function cleanAllFields(){
	for (var i = 0; i < allCollections.length; i++) {
		for (var j = 0; j < allRules.length; j++) {
			if (allCollections[i].collection_id == allRules[j].subject_id) {
				if ((allRules[j].verb != "isSubCollectionOf")&&(allRules[j].subject!="s3dbVerb")&&(allRules[j].object_id=="")) {
					if (allRules[j].object_id == "") {
						var validation = searchSelect(allRules[j].validation);
						if (validation=="")
						{
							validation=checkFieldType(j);
						}
						if (validation =="textarea") {
							typeSelect = "textarea";
						}
						else {
							if ((validation == "")||(validation=="text"))  {
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
					}
					var isGrid = checkIfGrid(allCollections[i].collection_id);
					if (isGrid==true) {
						cleanGrid(typeSelect,allCollections[i],allRules[j]);
					}
					else{
						clean(typeSelect,"",allCollections[i],allRules[j]);
					}
				}
			}
		}
	}
}	
function cleanGrid(typeSelect,allCollections,allRules) {
	var isGrid=checkIfGrid(allRules.subject_id);
	if (isGrid == true)
	{
		for (var l=0;l<grid.length ;l++ )
		{
			var sizeRowsGrid = grid[l].rows.count();
			for (var j=1;j<sizeRowsGrid-1 ;j++ )
			{
				grid[l].rows.remove(grid[l].rows.count()-1);
			}
			for (var m=1;m<grid[l].rows.count() ;m++ )
			{
				var variable = "row"+m;
				clean(typeSelect,variable,allCollections,allRules);
			}
		}
	}
}
function clean(typeSelect,variable,collection,allRules) {
	if (typeSelect == "text") {
		if (document.getElementById("input" + collection.name + allRules.object + allRules.rule_id+variable)==null) {
			alert("Please check if you doens't have two or more rules with the same object!");
			removeElement("loading");
		}
		document.getElementById("input" + collection.name + allRules.object + allRules.rule_id+variable).value="";
	}
	if (typeSelect == "date") {
		if (document.getElementById("input" + collection.name + allRules.object + allRules.rule_id+variable)==null) {
			alert("Please check if you doens't have two or more rules with the same object!");
			removeElement("loading");
		}
		document.getElementById("input" +collection.name+allRules.object + allRules.rule_id+variable).value="";
	}
	if (typeSelect == "textarea") {
		if (document.getElementById("inputTextArea" + collection.name + allRules.object + allRules.rule_id+variable)==null) {
			alert("Please check if you doens't have two or more rules with the same object!");
			removeElement("loading");
		}
		document.getElementById("inputTextArea"+collection.name + allRules.object + allRules.rule_id+variable).value="";
	}
	if (typeSelect == "number") {
		if (document.getElementById("input" + collection.name + allRules.object + allRules.rule_id+variable)==null) {
			alert("Please check if you doens't have two or more rules with the same object!");
			removeElement("loading");
		}
		document.getElementById("input" + collection.name + allRules.object + allRules.rule_id+variable).value="";
	}
	if (typeSelect == "select") {
		if (document.getElementById(collection.name+allRules.object+"optionEmpty"+variable)==null) {
			alert("Please check if you doens't have two or more rules with the same object!");
			removeElement("loading");
		}
		select = document.getElementById(collection.name+allRules.object+"optionEmpty"+variable);
		select.selected = true;
	}	
}
function checkIfGrid(index){
	var isGrid=false;
	for (var i=0; i<moreFields.length; i++) {
		if (moreFields[i].verb=="domain") {
			if (allCollections[index].collection_id==moreFields[i].value)
			{
				isGrid = true;
			}
		}
	}
	return isGrid;
}