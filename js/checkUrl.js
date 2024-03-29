// --- S3DB.URL ---
function s3db () {
	s3db.id = 's3db';
	s3db.config={"timeout_internal":1000,"timeout_external":10000,"fontFamily":"Verdana","fontSize_big":14,"fontSize_med":12,"fontSize_small":10}; 
	s3db.state={"P":[],"C":[],"I":[],"S":[]}; 
	s3db.U = new Array;
	s3db.browse = [];
	return false;
}
function s3db_check_url (url) {
	falseUrl = false;
	s3db.uid=null;
	s3db();
	// check url and report progress at msg_id
	var s3q=(url + "/URI.php?format=json");
	s3db.url=url;
	s3db_json_read(s3q,"checking_login_url",("s3db_check_url_success()"));
	setTimeout(("if (!s3db.uid) {s3db_check_url_failure()}"),s3db.config.timeout_external) ;
	return false;
}
function s3db_check_url_success () {
	s3db.uid=s3db_json.ans[0].uid;
	return false;
}
function s3db_check_url_failure () {
	alert("Time out was exceeded. The server may be busy or S3DB can not exist at this URL. \nPlease check the URL and try again!");
	removeElement("loading");
	if (whatURL=="url") {
		url = window.location.href;
		url = window.location.href.split("?url");
		window.location.href = url[0];
	}
	else{
		if (whatURL=="url1") {
			url = window.location.href;
			url = window.location.href.split("&project");
			window.location.href = url[0];	
		}
	}
	return false;
}

function s3db_json_read (src,src_id,next_eval) {
	// Read JSON data structure formated as s3db_json()
	s3db_json.done=0;
	s3db_json.next_eval=next_eval;
	var headID = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src ;
	script.id = src_id ;
	s3db_json.src_id = src_id ; // keep it here so it can be recognized and removed after script is executed
	script.defer=false;
	s3db_json.query = src ; // reccord query
	headID.appendChild(script); // retrieve answer, store results in s3db_json
	return false;
}
function s3db_json (ans) {
	//alert(ans);
	s3db_json.ans = ans;
	s3db_json.done = 1;
	try {
		eval(s3db_json.next_eval); // evaluate next command
		 // json structure loaded
	}
	catch (err) {
		s3db_json.done = 0; // evaluation check failed so this call is not complete
	}	
	remove_element_by_id (s3db_json.src_id);
	return false;
}