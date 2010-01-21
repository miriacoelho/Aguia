// for documentation and rationale see http://jonas-almeida.blogspot.com/search/label/JSONPP
// or http://sites.google.com/a/s3db.org/s3db/documentation/mis/json-jsonp-jsonpp where you
// can find this file

function remove_element_by_id (id) {
	var e = document.getElementById(id);
	e.parentNode.removeChild(e);
	return false}

function s3db_jsonpp_call (src,next_eval) {
	call = "call_"+Math.random().toString().replace(/\./g,"");//alert("787");
	var headID = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.id = call;
	script.type = 'text/javascript';
	// using padded, parameterized jason
	var src=src+"&format=json&jsonp=s3db_jsonpp&jsonpp="+next_eval+"&onload=remove_element_by_id('"+script.id+"')";
	script.src = src ;//window.open(src);
	headID.appendChild(script);//window.open(src); // retrieve answer
	}

function s3db_jsonpp (ans,jsonpp) {
	eval(jsonpp);
	return ans}