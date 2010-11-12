/**
 * @author Miriã
 */
 var url="";
 var whatURL="";
function validationData(){
	createP("pLoading","","body");
	createP("pTextLoading","Loading...","body");
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","90%","50px");
	setStyle("pTextLoading","absolute","","","90%","60px");
	document.getElementById("pTextLoading").style.color = "#00CC33";
	document.getElementById("pTextLoading").style.font="bold 16px arial,serif";
	var falseUrl = false;
	createImg("loading","","pLoading","Loading","images/loading.gif","");
	setStyle("loading","absolute","","","80%","50px");
	var username = document.getElementById("inputUsername").value;
	var password = document.getElementById("inputPassword").value;
	url = removeLoginPHP(document.getElementById("inputURL").value);
	url = url[0];
	if (username == "") {
		alert("Please type your username");
		removeElement("pLoading");
		return false;
	}
	else {
		if (password == "") {
			alert("Please type your password");
			removeElement("pLoading");
			return false;
		}
	}
	var authority = document.getElementById("selectAutentication").value;
	if (authority == "")
	{
		alert("Please select an authority");
		removeElement("pLoading");
	}
	else{
		whatURL="url";
		s3db_check_url(url);
		if (authority == "mdanderson")
		{
			urlKey = url+"/apilogin.php?username="+username+"&password="+password+"&authority=mdanderson";
			username="mdanderson:"+username;
		}
		else{
			if (authority =="google") {
				urlKey = url+"/apilogin.php?username="+username+"&password="+password+"&authority=google";
				username="google:"+username;
			}
			else{
				if (authority == "S3DB")
				{
					urlKey = url+"/apilogin.php?username="+username+"&password="+password;
				}
			}
		}
		s3db_jsonpp_call(urlKey,'getKey(ans)');
	}
}
function getKey(ans,target){
	if (target!=null) {
		url = target.URLDATA;
		whatURL="url";
		s3db_check_url(url);
		var temp=document.createElement("br");
		temp.id="key";
		temp.value =target.KEYDATA;
		document.body.appendChild(temp);
		var urlQuery = url+'/URI.php?key='+target.KEYDATA;
		s3db_jsonpp_call(urlQuery,'getUserName(ans,'+JSON.stringify(target)+')');
	}
	else{
		if (ans[0].key_id==undefined){
			removeElement("loading");
			alert(ans[0].message);
			window.location.href = window.location.href;
		}
		else{		
			var temp=document.createElement("br");
			temp.id="key";
			temp.value =ans[0].key_id;
			document.body.appendChild(temp);
			var urlQuery = url+'/URI.php?key='+ans[0].key_id;
			s3db_jsonpp_call(urlQuery,'getUserName(ans,'+JSON.stringify(target)+')');
		}
	}
}
function getUserName(ans,target){
	if (ans[0].error_code!=null) {
		alert(ans[0].message);
		url = window.location.href;
		url = url.toLowerCase();
		url = window.location.href.split("?urldata");
		window.location.href = url[0];
	}
	else{
		if (target!=null) {
			if ((target.PROJECTDATA!=null)&&(target.PROJECTGUI!=null)&&(target.URLGUI!=null)&&(target.KEYGUI!=null)) {
				var account_uname= ans[0].account_uname;
				createP("pUname","User: "+account_uname,"body");
				setStyle("pUname","absolute","325px","140px","","140px");
				document.getElementById("pUname").style.font="italic bold 13px arial,serif";
				document.getElementById("pUname").style.color = "#003399";
				createP("pLink","","body");
				getCollectionsRules("","",target);
			}	
			else{
				var account_uname= ans[0].account_uname;
				createP("pUname","User: "+account_uname,"body");
				setStyle("pUname","absolute","325px","140px","","140px");
				document.getElementById("pUname").style.font="italic bold 13px arial,serif";
				document.getElementById("pUname").style.color = "#003399";
				createP("pLink","","body");
				queryProjects();
			}
		}
		else{
			var account_uname= ans[0].account_uname;
			createP("pUname","User: "+account_uname,"body");
			setStyle("pUname","absolute","325px","140px","","140px");
			document.getElementById("pUname").style.font="italic bold 13px arial,serif";
			document.getElementById("pUname").style.color = "#003399";
			createP("pLink","","body");
			queryProjects();
		}
	}
}
function logout(){
	url = window.location.href;
	url = window.location.href.split("?");
	window.location.href = url[0];
}
function removeElement(id){
	var tmp = document.getElementById(id);
	if (tmp != null){
		tmp.parentNode.removeChild(tmp);
	}
}
function removeLoginPHP(str){
	var tmp="";
	tmp = str.split(/login.php/);
	return tmp;
}