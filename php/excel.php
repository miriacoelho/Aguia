<?php
set_time_limit(100000);
$url = $_REQUEST['inputSubmit'];
$variables=split("_",$url);	
//$variables=explode(chr(9),$url);	
$url = $variables[0];
$url=urlencodeMiria($url);
list($url, $data) = S3DBcall($url);
require_once "ExcelExport.php";
$excel = new ExcelExport();
$sizeArray = sizeof($data);
$rulesSearch = createArray($rulesSearch);
$aux = 0;
for($j = 1; $j < sizeof($variables); $j++){
	if ($variables[$j]!=null){
		$str[$aux]=($variables[$j]);
		$aux++;
	}
}
$excel->addRow($str);
$aux = 0;
for($i = 0; $i < $sizeArray; $i++){
	$aux = 0;
	for($j = 1; $j < sizeof($variables); $j++){
		if ($data[$i][$variables[$j]]!=null){
			//Escreve o nome dos campos de uma tabela
			$str[$aux]=($data[$i][$variables[$j]]);
			$aux++;
		}
	}
	$excel->addRow($str);
 }
 $excel->download("excel.xls");
function createArray($variable){
	$ans=split(",",$variable);
	return $ans;
}
function S3DBcall($url)
{
	$data = stream_get_contents(fopen($url,'r'));
	return (array($url,unserialize($data)));
}
function urlencodeMiria($str){
	 $str = str_replace( " ","%20",$str ); 
	 return $str;
}
?>