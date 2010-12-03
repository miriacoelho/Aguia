var conditions = "";
var restrictions="";
var concat="";
var extractConditions = "";
var extractRestrictions="";
var valueField="";
var valueFieldGrid= new Array();
var isFieldInactive=false;
var cont2=1;
var receiveValue="";
var lala= new Array(); 
var arrayInsertUpdate = new Array();
var indexArrayInsertUpdate = 0;
function checkFieldRestrictions(id,value){
	id = id;
	isFieldInactive=false;
	ruleNumber=getNumberRule(id);
	allRules = removeNumberSubject(allRules);
	if (ruleNumber[0]!="")
	{
		ruleNumber = ruleNumber[0];
	}
	else{
		ruleNumber = ruleNumber[1];
	}
	if (document.getElementById(id)!=null) {
		if (document.getElementById(id).value!="") {
			arrayInsertUpdate[indexArrayInsertUpdate] = ruleNumber;
			arrayInsertUpdateUnique = array_unique(arrayInsertUpdate);
			var tmp = new Array();
			var indexTmp = 0;
			for (var i=0; i<arrayInsertUpdate.length; i++) {
				if (arrayInsertUpdateUnique[i]!=null) {
					tmp[indexTmp] = arrayInsertUpdateUnique[i];
					indexTmp++;
				}
			}
			arrayInsertUpdate = tmp;
			indexArrayInsertUpdate++;	
		}
	}
	ruleNumber = ruleNumber+"";
	activeFields(ruleNumber,id);
	if (value==null)
	{
		receiveValue=document.getElementById(id).value;
	}
	else{
		receiveValue=value;
	}
	if (fieldConcatenation.length!=0) {
		for (var p=0;p<fieldConcatenation.length ;p++ )
		{
			concat = fieldConcatenation[p];
			concatenation(id);
		}
	}
	if (fieldCondition.length!=0) {
		for (var p=0;p<fieldCondition.length ;p++  )
		{
			conditions = fieldCondition[p];
			conditionsField(id);
		}
	}
	if (fieldRestrictionsActive.length!=0) {
		for (var p=0;p<fieldRestrictionsActive.length ;p++ )
		{
			restrictions = fieldRestrictionsActive[p];
			restrictionActive(id);
		}
	}
	if (fieldFormula.length!=0) {
		for (var p=0;p<fieldFormula.length ;p++ )
		{
			optionsFormula = fieldFormula[p];
			formula(optionsFormula,id);
		}
	}
}
function conditionsField(id){
	var receiveValue = "";
	var hasGrid = "";
	for (var i=0;i<conditions.length ;i++ )
	{
		if (conditions[i].verb=="domain") {
			for (var j=0; j<allRules.length; j++) {
				if (conditions[i].value==allRules[j].rule_id) {
					var isGrid=checkIfGrid(allRules[i].subject_id);
					if (isGrid==true)
					{
						var row=checkIdIfGrid(id);
						if (row!=-1){
							var number = getNumberRowGrid(id);
							hasGrid = "row"+number;
							result = checkField(allRules[j].rule_id,j);
							receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
							condictionsField1(receiveValue,id,hasGrid);
						}
						else{
							for (var k=0;k<grid.length ;k++ )
							{
								if (allRules[i].subject==grid[k].collection_name)
								{
									for (var m=1;m<grid[k].rows.count() ;m++ )
									{
										hasGrid = "row"+m;
										result = checkField(allRules[j].rule_id,j);
										receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
										condictionsField1(receiveValue,id,hasGrid);
									}
								}
							}
						}	
					}
					else{
						result = checkField(allRules[j].rule_id,j);
						receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id).value;
						condictionsField1(receiveValue,id,hasGrid);
					}
				}
			}
		}
	}
}
function condictionsField1(receiveValue,id,hasGrid) {
	if (receiveValue!="")
	{
		for (var i=0; i<conditions.length; i++) {
			if (conditions[i].verb=="trigger") {
				if (receiveValue==conditions[i].value) {
					tmp = true;
					for (var j=0; j<conditions.length; j++) {
						for (var k=0; k<allRules.length; k++) {
							if (conditions[j].verb=="range") {
								if (allRules[k].rule_id==conditions[j].value) {
									var validation = searchSelect(allRules[j].validation);
									for (var l=0; l<conditions.length; l++) {
										if (conditions[l].verb=="value") {
											inactive(k,conditions[l].value,"",hasGrid);
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
}
function concatenation(id){
	var hasGrid = "";
	var valueField = "";
	var valueFieldGrid="";
	allRules = removeNumberSubject(allRules);
	for (var i=0;i<concat.length ;i++ )
	{
		for (var j=0;j<allRules.length ;j++ )
		{
			if ((concat[i].verb!="action")&&(concat[i].verb!="range")) {
				if (allRules[j].rule_id==concat[i].value)
				{
					var isGrid=checkIfGrid(allRules[j].subject_id);
					if (isGrid==true)
					{
						var row=checkIdIfGrid(id);
						if (row!=-1)
						{
							if (i!=concat.length-1) {
								var number = getNumberRowGrid(id);
								hasGrid = "row"+number;
								result = checkField(allRules[j].rule_id,j);
								valueField = valueField+ document.getElementById(result +allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
							}
						}
						else{
							for (var k=0;k<grid.length ;k++ )
							{
								if (allRules[j].subject==grid[k].collection_name)
								{
									for (var m=1;m<grid[k].rows.count() ;m++ )
									{
										hasGrid = "row"+m;
										if (i!=concat.length-1) {
											result = checkField(allRules[j].rule_id,j);
											if (valueFieldGrid[m]==null) {
												valueFieldGrid[m]="";
											}
											valueFieldGrid[m] = valueFieldGrid[m]+ document.getElementById(result +allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
										}
										else{
											for (var l=0; l<concat.length; l++) {
												if (concat[l].verb=="range") {
													for (var m=0; m<allRules.length; m++) {
														if (allRules[m].rule_id==concat[l].value){
															if (allRules[m].rule_id==concat[l].value)
															{
																var number = getNumberRowGrid(hasGrid);
																var validation = searchSelect(allRules[m].validation);
																inactive(m,valueFieldGrid[number],"",hasGrid);
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
					}
					else{
						result = checkField(allRules[j].rule_id,j);
						valueField = valueField+ document.getElementById(result +allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
						for (var l=0; l<concat.length; l++) {
							if (concat[l].verb=="range") {
								for (var m=0; m<allRules.length; m++) {
									if (allRules[m].rule_id==concat[l].value)
									{
										var validation = searchSelect(allRules[m].validation);
										inactive(m,valueField,"",hasGrid);
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
function restrictionActive(id){
	var hasGrid = "";
	var numberRule = getNumberRule(id);
	allRules = removeNumberSubject(allRules);
	for (var i=0;i<restrictions.length ;i++ )
	{
		if (restrictions[i].verb=="domain") {
			
			for (var j=0; j<allRules.length; j++) {
				if (restrictions[i].value==allRules[j].rule_id) {
					var isGrid=checkIfGrid(allRules[j].subject_id);
					if (isGrid==true)
					{
						var row=checkIdIfGrid(id);
						if (row!=-1)
						{
							var number = getNumberRowGrid(id);
							hasGrid = "row"+number;
							result = checkField(allRules[j].rule_id,j);
							receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
							checkFieldRestrictions1(receiveValue,id,hasGrid);
						}
						else{
							for (var k=0;k<grid.length ;k++ )
							{
								if (allRules[j].subject==grid[k].collection_name)
								{
									for (var m=1;m<grid[k].rows.count() ;m++ )
									{
										hasGrid = "row"+m;
										result = checkField(allRules[j].rule_id,j);
										receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
										checkFieldRestrictions1(receiveValue,id,hasGrid);
									}
								}
							}
						}
					}
					else{
						result = checkField(allRules[j].rule_id,j);
						receiveValue = document.getElementById(result+allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value;
						checkFieldRestrictions1(receiveValue,id,hasGrid);
					}
				}
			}
		}
	}
}
function checkFieldRestrictions1(receiveValue,id,hasGrid){
	for (var i=0; i<restrictions.length; i++) {
		if (restrictions[i].verb=="trigger") {
			if (receiveValue==restrictions[i].value) {
				for (var j=0; j<restrictions.length; j++) {
					if (restrictions[j].verb=="range") {
						for (var k=0; k<allRules.length; k++) {
							if (restrictions[j].value==allRules[k].rule_id) {
								isFieldInactive=true;
								inactive(k,"",id,hasGrid);
							}
						}
					}
				}
			}
		}
	}
	if (isFieldInactive==false)
	{
		activeFields(ruleNumber,id);
	}
}
function formula(optionsFormula,id){
	var verifyInputNull=false;
	var valueInput=new Array();
	var validationDate = new Array();
	var found = false;
	var hasGrid="";
	var indexLala=-1;
	var number1 = new Array();
	for (var r=0;r<optionsFormula.length ;r++ )
	{
		if (optionsFormula[r].verb=="domain") {
			indexLala++;
			number = extractNumber(optionsFormula[r].value);
			valueDate = extractValue(optionsFormula[r].value);
			if (valueDate=="dateToday") {
				var length = number.length+1;
				for (var j=0; j<length; j++) {
					if (j==0) {
						number1[j]=valueDate[0];
					}
					else{
						number1[j]=number[j-1];
					}
				}
				number = number1;
			}
			var foundRule = false;
			for (var j=0;j<number.length ;j++)
			{
				for (var w=0;w<allRules.length ;w++ )
				{
					if (allRules[w].rule_id==number[j])
					{
						var foundRule = true;
						var isGrid=checkIfGrid(allRules[w].subject_id);
						if (isGrid==true)
						{
							var row=checkIdIfGrid(id);
							if (row!=-1)
							{
								var numberRow = getNumberRowGrid(id);
								hasGrid = "row"+numberRow;
								found = true;
								validationDate[j]=allRules[w].validation;
								if (validationDate[j]=="")
								{
									validationDate[j]=checkFieldType(w);
								}
								result = checkField(allRules[w].rule_id,w);
								valueInput[j]= document.getElementById(result +allRules[w].subject+allRules[w].object +allRules[w].rule_id+hasGrid).value;
							}
							else{
								for (var k=0;k<grid.length ;k++ )
								{
									if (allRules[w].subject==grid[k].collection_name)
									{
										for (var m=1;m<grid[k].rows.count() ;m++ )
										{
											hasGrid = "row"+m;
											found = true;
											validationDate[j]=allRules[w].validation;
											if (validationDate[j]=="")
											{
												validationDate[j]=checkFieldType(w);
											}
											result = checkField(allRules[w].rule_id,w);
											id= result +allRules[w].subject+allRules[w].object +allRules[w].rule_id+hasGrid;
											formula(optionsFormula,id);
										}
									}
								}
							}
						}
						else{
							found = true;
							validationDate[j]=searchSelect(allRules[w].validation);
							if (validationDate[j]=="")
							{
								validationDate[j]=checkFieldType(w);
							}
							result = checkField(allRules[w].rule_id,w);
							valueInput[j]= document.getElementById(result +allRules[w].subject+allRules[w].object +allRules[w].rule_id+hasGrid).value;
						}
					}
				}
				foundRule=false;
				if (found == false)
				{
					if (number[j]=="dateToday") {
							var d=new Date();
							var month = d.getMonth()+1;
							if (month<10){
							  month = "0"+month;
							}
							var day = d.getDate();
							var year = d.getFullYear();
							valueInput[j]=month+"/"+day+"/"+year;
							valueDate="";
					}
					else{
						valueInput[j]=number[j];	
					}
				}
				found = false;
			}
			formula1(number,valueInput,validationDate,hasGrid,indexLala,verifyInputNull,optionsFormula,r);
		}
	
		verifyInputNull = false;
	}
}
function formula1(number,valueInput,validationDate,hasGrid,indexLala,verifyInputNull,optionsFormula,r) {
	var moreOptions = 0;
	for (var i=0; i<optionsFormula.length; i++) {
		if (optionsFormula[i].verb=="domain") {
			moreOptions++;
		}
	}
	for (var j=0;j<validationDate.length ;j++ )
	{
		if ((validationDate[j]=="(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validationDate[j]=="date"))
		{
			if (valueInput[j]!="")
			{
				var minutes = 1000*60;
				var hours = minutes*60;
				var days = hours*24;
				var years = days*365;
				valueInput[j]=new Date(valueInput[j]);
				valueInput[j] = valueInput[j].getTime();
				valueInput[j]= valueInput[j]/days;
			}
		}
	}
	for (var j=0; j<number.length; j++) {
		if ((number[j]=="dateToday")) {
			var minutes = 1000*60;
				var hours = minutes*60;
				var days = hours*24;
				var years = days*365;
				valueInput[j]=new Date(valueInput[j]);
				valueInput[j] = valueInput[j].getTime();
				valueInput[j]= valueInput[j]/days;
		}
		
	}
	//var length = number.length;
	for (var j=0;j<valueInput.length-1 ;j++ )
	{
		for (var k=0; k<allRulesFixed.length; k++) {
			if (valueInput[j]==allRulesFixed[k].rule_id) {
				valueInput[j]="";
			}
		}
		if (valueInput[j]=="")
		{
			verifyInputNull=true;
		}
	}
	if (verifyInputNull==false)
	{
		var better = indexLala;
		var str = new Array();
		for (var j=0; j<optionsFormula.length; j++) {
			str[j] = optionsFormula[j].value;
		}
		lala[indexLala] = extractFormula(str,number,valueInput,r);	
		if ((moreOptions>1))
		{
			for (s=0;s<lala.length ;s++ )
			{
				if (lala[s+1]!=null)
				{
					if (lala[s]<lala[s+1])
					{
						better = s;
					}
					else{
						better = s+1;
					}
				}
			}
		}
		insertValueInput(number,lala[better],hasGrid,moreOptions);
	}
	else{
		if (optionsFormula.length==1)
		{
			for (var i=0; i<optionsFormula.length; i++) {
				if (optionsFormula[i].verb=="range") {
					for (j=0;j<allRules.length ;j++ )
					{
						if (allRules[j].rule_id==optionsFormula[i].value)
						{
							result = checkField(allRules[j].rule_id,j);
							document.getElementById(result +allRules[j].subject+allRules[j].object +allRules[j].rule_id+hasGrid).value="";
						}
					}		
				}
			}
		}
	}
}
function insertValueInput(number,tmp,hasGrid,moreOptions){
	//var length = number.length-1;
	for (var i=0; i<optionsFormula.length; i++) {
		if (optionsFormula[i].verb=="range") {
			for (g=0;g<allRules.length ;g++ )
			{
				if (allRules[g].rule_id==optionsFormula[i].value)
				{
					result = checkField(allRules[g].rule_id,g);
					calc=eval(tmp);
					if (calc<0)
					{
						calc=-calc;
						calc = Math.round( calc * Math.pow( 10 , 2 ) ) / Math.pow( 10 , 2 );
					}
					else{
						calc = Math.round( calc * Math.pow( 10 , 2 ) ) / Math.pow( 10 , 2 );
					}
					document.getElementById(result +allRules[g].subject+allRules[g].object +allRules[g].rule_id+hasGrid).value=calc;
					if (moreOptions==1) {
						lala=[];	
					}
				}
			}		
		}
	}
}
function inactive(k,value,id,hasGrid){
	result = checkField(allRules[k].rule_id,k);
	if (result == "select")
	{
		document.getElementById(result +allRules[k].subject+allRules[k].object +allRules[k].rule_id+hasGrid).disabled="disabled";
	}
	else{
		document.getElementById(result +allRules[k].subject+allRules[k].object +allRules[k].rule_id+hasGrid).readOnly=true;
	}
	document.getElementById(result +allRules[k].subject+allRules[k].object +allRules[k].rule_id+hasGrid).value=value;
}
function checkField(rule_id,i){
	var validation = searchSelect(allRules[i].validation);
	if (validation=="")
	{
		validation=checkFieldType(i);
	}
	if (validation == "textarea") 
	{
		result = "inputTextArea";
	}
	else 
	{
		if ((validation == "text") ||(validation==""))
		{
			result = "input";
		}
		else 
		{
			if ((validation == "(0[1-9]|1[012])/(0[1-9]|[12][0-9]|3[01])/[12][0-9]{3}")||(validation=="date"))
			{
				result = "input";
			}
			else 
			{
				if (validation.length > 0) 
				{
					result = "select";
				}
			}
		}
	}
	return result;
}
function extractValues(str){
	tmp=(str.split("_"));
	return(tmp);
}
function extractOptionsFormula(str){
	tmp = (str.split("|"));
	return tmp;
}
function extractNumber(str){
	var tmp1 = new Array();
	var cont3 = 0;
	tmp= str.split(/[^0-9]+/);
	for (i=0;i<tmp.length ;i++ )
	{
		if (tmp[i]!="")
		{
			tmp1[cont3]= tmp[i];
			cont3++;
		}
	}
	return tmp1;
}
function extractValue(str) {
	var tmp1 = new Array();
	var cont3 = 0;
	tmp= str.split(/[^A-Za-z]+/);
	for (i=0;i<tmp.length ;i++ )
	{
		if (tmp[i]!="")
		{
			tmp1[cont3]= tmp[i];
			cont3++;
		}
	}
	return tmp1;
}
function extractFormula(str,number,valueInput,r){
	var length = number.length;
	var index = 0;
	for (var j=0;j<number.length ;j++ )
	{
		if (str[r].search(number[j])!=-1)
		{
			if (valueInput[j]<0)
			{
				valueInput[j] = "("+valueInput[j]+")";
			}
			str[r]=str[r].replace(number[j],valueInput[j]);
		}
	}		
	return str[r];
}
function checkIdIfGrid(id){
	var row= id.search(/row/);
	return row;
}