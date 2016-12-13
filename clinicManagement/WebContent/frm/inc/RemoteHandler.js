function callRemoteFunction(serviceName,data,filter){
	return Remote.callRemoteFunction(serviceName,data,filter);
}

function callRemoteQueryFunction(queryName,argObj,filter){
	return Remote.callRemoteQueryFunction(queryName,argObj,filter);
}

function callRemoteQueryCountFunction(queryName,argObj){
	return Remote.callRemoteQueryCountFunction(queryName,argObj);
}

function callRemoteFunctionAsync(callAsync,serviceName,data,filter){
	return Remote.callRemoteFunctionAsync(callAsync,serviceName,data,filter);
}

function callRemoteQueryFunctionAsync(callAsync,serviceName,argObj,filter){
	return Remote.callRemoteQueryFunctionAsync(callAsync,serviceName,argObj,filter);
}

var g_baseUrlDomain = g_adapterWebRoot + "callservice.do";
var g_xmlHttpResp;
var g_reCallFunc;
var g_isAsyQuery = false;

var g_Protocol = {
	Version : "FR3",
	XML_HEAD : "version=\"1.0\" encoding=\"UTF-8\"",
	XML_ROOT : "piggy",
	XML_SERVICE_NAME : "ServiceName",
	XML_DATA_ROOT : "Data",
	XML_ERROR_ROOT : "Error",
	XML_ARRAY_ITEM : "I",
	XML_DYN_QUERY_RESULT : "DR",
	XML_TAG_ARRAYLIST : "AL"
};

function addParam(fieldName,fieldValue,inputParams){
	if(inputParams == null){
		inputParams = new Array();
	}
	inputParams[inputParams.length]= {};
	inputParams[inputParams.length-1][fieldName] = fieldValue;
};

var DataSetFilter = {
	addOrderField : function (fieldName,dataSetFilter){
		if (dataSetFilter.OrderFields == null){
			dataSetFilter.OrderFields =new Array();
		}
		dataSetFilter.OrderFields[dataSetFilter.OrderFields.length] = fieldName;
	},
	
	addShowField : function (fieldName,dataSetFilter){
		if (dataSetFilter.ShowFields == null){
			dataSetFilter.ShowFields =new Array();
		}
		dataSetFilter.ShowFields[dataSetFilter.ShowFields.length] = fieldName;
	}
	
};

function Packager(version){
    this.version = version;
};

Packager.prototype.getObjectType = function(obj){
	if(PiggyOrg.lang.isNull(obj)) return 'n';
	
	if(PiggyOrg.lang.isArray(obj)){
		return 'a';
	} else if(PiggyOrg.lang.isFunction(obj)){
		return 'm';
	} else if(PiggyOrg.lang.isObject(obj)){
		return 'o';
	} else{
	    return 's';
	}
};

var _packager = new Packager('FR3');

_packager.packageObject = function (elm,type,arg){
    if(type=='m'||type=='n') 
        return;
        
	switch(type){
		case 'o':
			for(var key in arg){
				var child = arg[key];
				var subtype = this.getObjectType(child);
				if(subtype=='m'||subtype=='n') continue;
	
			    var childElm = elm.ownerDocument.createElement(subtype+key);
			    elm.appendChild(childElm);
			    this.packageObject(childElm,subtype,child);
			}
			break;
		case 's':
			var childTextNode = elm.ownerDocument.createTextNode(arg.toString());
			elm.appendChild(childTextNode);
			break;
		case 'a':
			for(var i=0;i<arg.length;i++){
				var child=arg[i];
				var subtype = this.getObjectType(child);
				if(subtype=='m'||subtype=='n') continue;
	
			    var childElm = elm.ownerDocument.createElement(subtype+g_Protocol.XML_ARRAY_ITEM);
			    elm.appendChild(childElm);
			    this.packageObject(childElm,subtype,child);
			}
			break;
	}
};

_packager.getObjectFromXml = function(elm,type){
	var obj = {};

	var nodes = elm.childNodes;
	var len = nodes.length; 
	if(len==0){
		return "";
	} else if(len==1 && nodes[0].nodeType!=1){
		if(nodes[0].nodeType!=3){
			prompt("Got a problem! Fix me!!!", "in frm/common/RemoteHandler.js")
		}
	    return nodes[0].nodeValue;
	} else{
	    for(var i=0;i<nodes.length;i++){
		    var child = nodes[i];
		    if(child.nodeType==1){
			    var key = child.tagName;
				if(key == g_Protocol.XML_TAG_ARRAYLIST && (type == null || type == "2" || type == 2)){
			    	var childNodes = child.childNodes;
			    	var childLen = childNodes.length;
			    	if(childLen==1 && childNodes[0].nodeType!=1){
			    	} else{
			    		for(var j=0;j<childNodes.length;j++){
			    			var childChild = childNodes[j];
			    			if(childChild.nodeType==1){
			    				var childKey = childChild.tagName;
			    				var childValue = this.getObjectFromXml(childChild,type);
			    				if(obj[childKey]){
							        if(PiggyOrg.lang.isArray(obj[childKey])){
							            obj[childKey].push(childValue);
							        } else{
										var arr = [];
										arr.push(obj[key]);
										arr.push(childValue);
										obj[childKey] = arr;
									}
							    } else{
							    	var arr = [];
							    	arr.push(childValue);
							        obj[childKey] = arr;
							    }
			    			}
			    		}
			    	}
			    } else{
					var value = this.getObjectFromXml(child,type);
				    if(obj[key]){
				        if(PiggyOrg.lang.isArray(obj[key])){
				            obj[key].push(value);
				        } else{
							var arr = [];
							arr.push(obj[key]);
							arr.push(value);
							obj[key] = arr;
						}
				    } else{
				        obj[key] = value;
				    }
			    }
		    }else if(child.nodeType==3){
		    	obj = child.wholeText;
		    }
	    }
	}
	return obj;
};

_packager.unpackageException = function (xmlNode) {
    var ex = new Object();
    for(var i=0; i<xmlNode.childNodes.length; i++){
    	var currChild = xmlNode.childNodes[i];
    	var nodeName = currChild.nodeName;
    	if("ID" == nodeName){
    		ex.ID    = _packager.getNodeText(currChild);
    	}
    	else if("Time" == nodeName){
    		ex.Time  = _packager.getNodeText(currChild);
    	}
    	else if("Type" == nodeName){
    		ex.Type  = _packager.getNodeText(currChild);
    	}
    	else if("Code" == nodeName){
    		ex.Code  = _packager.getNodeText(currChild);
    	}
    	else if("Desc" == nodeName){
    		ex.Desc  = _packager.getNodeText(currChild);
    	}
    	else if("Trace" == nodeName){
    		ex.Trace = _packager.getNodeText(currChild);
    	}
    }
    return ex;
};

_packager.getNodeText = function (xmlNode) {
	if(!xmlNode) return null;
	if(xmlNode.nodeType==1 && xmlNode.childNodes && xmlNode.childNodes[0] && xmlNode.childNodes[0].nodeType==3){
		return xmlNode.childNodes[0].nodeValue;
	} else if(xmlNode.nodeType == 3){
		return xmlNode.nodeValue;
	}
};

_packager.QueryResultToObject = function(result){
	if(!result) return null; 
	
	var arrTable = result[g_Protocol.XML_DYN_QUERY_RESULT];
	if(arrTable != null && PiggyOrg.lang.isArray(arrTable)){
		return arrTable;
	} else{
		var arr = [];
		if(arrTable){
			arr[0] = arrTable;
		}
		return arr;
	}
};

var Remote = {
	post : function(URL, PARAMS) {        
	    var temp = document.createElement("form");        
	    temp.action = URL;        
	    temp.method = "post";        
	    temp.style.display = "none";        
	    for (var x in PARAMS) {        
	        var opt = document.createElement("textarea");        
	        opt.name = x;        
	        opt.value = PARAMS[x];        
	        temp.appendChild(opt);        
	    }        
	    document.body.appendChild(temp);        
	    temp.submit();        
	},        
	sendXml : function (url,strXml){
		var xmlHttp = PiggyOrg.env.createRequest(); 
		xmlHttp.open("POST",url,false);	
		xmlHttp.send(strXml);
		if(xmlHttp.status!=200){		    
			throw "Network issue or remote server issue, the status is: "+xmlHttp.status;
		} else{
			return xmlHttp.responseText;
		}

	},
		
	callRemoteFunction : function (serviceName,data,filter){
		if(filter!=null){
			data.piggy_query_page = new Object();
			data.piggy_query_page.page_index = filter.PageIndex;
			data.piggy_query_page.page_size = filter.PageLen;
			if(filter.OrderFields!=null){
				data.piggy_query_page.order = filter.OrderFields;
			}
			if(filter.ShowFields!=null){
				data.piggy_query_page.fields = filter.ShowFields;
			}			
	    }
		
		if(data == null){
	    	data = new Object();
	    	data.piggy_referer_url = window.location.href;
	    } else{
	    	data.piggy_referer_url = window.location.href;
	    }
		
		var url = g_baseUrlDomain + "?service=" + serviceName;
		//package arguments
		var xmlDoc = PiggyOrg.env.createDocument(); //针对Opera，这里已经生成了xml头了
		if(!PiggyOrg.env.isDocumentHasXmlHead(xmlDoc)){
			var pi = xmlDoc.createProcessingInstruction("xml", g_Protocol.XML_HEAD);
			xmlDoc.appendChild(pi);
		}
		
		var serviceNameTextNode = xmlDoc.createTextNode(serviceName);
		var serviceNameElm = xmlDoc.createElement(g_Protocol.XML_SERVICE_NAME);
		serviceNameElm.appendChild(serviceNameTextNode);
		var docElm = xmlDoc.appendChild(xmlDoc.createElement(g_Protocol.XML_ROOT));
		docElm.appendChild(serviceNameElm);
		
		var dataElm = xmlDoc.createElement(g_Protocol.XML_DATA_ROOT);
		var type = _packager.getObjectType(data);
        if(type=='a' && data.length==0){
            dataElm.setAttribute("t",'o');
            _packager.packageObject(dataElm,'o',null);
        } else{
            _packager.packageObject(dataElm,type,data);
        }
        docElm.appendChild(dataElm);
        
		//call remote service
        //prompt("sendXml",PiggyOrg.env.serializeXml(xmlDoc));
		var retVal = this.sendXml(url, PiggyOrg.env.serializeXml(xmlDoc));
		//prompt("retVal",retVal);
		
		//unpackage return value
		xmlDoc = PiggyOrg.env.parseXml(retVal);
		
		docElm = xmlDoc.documentElement;
		var rtNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Return");
		var retCode=rtNode.getAttributeNode("Code").nodeValue;
		
		switch(retCode){
			case "0":{
				var dataNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Data");
				var type = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Type").nodeValue;
				return _packager.getObjectFromXml(dataNode,type);
			}
			case "-1":		    
				throw _packager.unpackageException(rtNode);
			default:
				throw "Remote server returns invalid xml";
		}		
	},
	
	callRemoteQueryFunction : function(queryName,argObj,filter){
		var data = {};
		Object.extend(data,argObj);
		if(filter!=null){
			data.piggy_query_page = new Object();
			data.piggy_query_page.page_index = filter.PageIndex;
			data.piggy_query_page.page_size = filter.PageLen;
			if(filter.OrderFields!=null){
				data.piggy_query_page.order = filter.OrderFields;
			}
			if(filter.ShowFields!=null){
				data.piggy_query_page.fields = filter.ShowFields;
			}			
	    }
	    var retObj = this.callRemoteFunction(queryName,data);
		return _packager.QueryResultToObject(retObj);
	},
	
	callRemoteQueryCountFunction : function(queryName,argObj){
		var data = {};
		Object.extend(data,argObj);
		data.piggy_query_page = new Object();
		data.piggy_query_page.count = true;
	    var retObj = this.callRemoteFunction(queryName,data);
		var ret = _packager.QueryResultToObject(retObj);
		if(ret!=null && ret[0]!=null){
			return ret[0].CNT;
		} else{
			return 0;
		}
	},
	
	//异步调用
	sendXmlAsync : function(url,strXml,callAsync){
		var xmlHttpResp = PiggyOrg.env.createRequest(); 
		xmlHttpResp.open("POST",url,true);
		//g_xmlHttpResp.onreadystatechange=Remote.handleStateChange;
		xmlHttpResp.onreadystatechange= function(){
	        try{
	            if(this.readyState == 4){
	               if(this.status==200){
	                    var retVal = this.responseText;
	                    var xmlDoc = PiggyOrg.env.parseXml(retVal);
	                    var docElm = xmlDoc.documentElement;
	                    var rtNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Return");
	                    var retCode=rtNode.getAttributeNode("Code").nodeValue;
	                    
	                    switch(retCode){
	                        case "0":{
	                            var dataNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Data");
	                            var type = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Type").nodeValue;
	                            var retObj = _packager.getObjectFromXml(dataNode,type);
	                            if(g_isAsyQuery == true){
	                                retObj = _packager.QueryResultToObject(retObj);
	                            }
	                            callAsync.onComplete(retObj);
	                            return;
	                        }
	                        case "-1":{
	                            var retObj = _packager.unpackageException(rtNode);
	                            callAsync.onError(retObj);
	                            return;
	                        }
	                        default:
	                            throw "Remote server returns invalid xml";
	                    }
	                }
	            }
	        } catch(e){
	            throw e;
	        }
	    }
		xmlHttpResp.send(strXml);
	},
	
	//处理返回结果(弃用)
	handleStateChange : function(){
		try{
			if(g_xmlHttpResp.readyState == 4){
			   if(g_xmlHttpResp.status==200){
					var retVal = g_xmlHttpResp.responseText;
					var xmlDoc = PiggyOrg.env.parseXml(retVal);
					var docElm = xmlDoc.documentElement;
					var rtNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Return");
					var retCode=rtNode.getAttributeNode("Code").nodeValue;
					
					switch(retCode){
						case "0":{
							var dataNode = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Data");
							var type = PiggyOrg.env.selectSingleNode(docElm, "//piggy/Type").nodeValue;
							var retObj = _packager.getObjectFromXml(dataNode,type);
							if(g_isAsyQuery == true){
								retObj = _packager.QueryResultToObject(retObj);
							}
							Remote.onComplete(retObj);
							return;
						}
						case "-1":{
							var retObj = _packager.unpackageException(rtNode);
							Remote.onError(retObj);
							return;
						}
						default:
							throw "Remote server returns invalid xml";
					}
			    }
			}
		} catch(e){
			throw e;
		}
	},
	// 弃用
	onComplete : function(obj){
		if(g_reCallFunc != null && g_reCallFunc.onComplete != null){
			g_reCallFunc.onComplete(obj);
		}
	},
	// 弃用
	onError : function(obj){
		if(g_reCallFunc != null && g_reCallFunc.onError != null){
			g_reCallFunc.onError(obj);
		}
	},
	
	callRemoteFunctionAsync: function(callAsync,serviceName,data,filter){
		try{
			if(filter!=null){
				data.piggy_query_page = new Object();
				data.piggy_query_page.page_index = filter.PageIndex;
				data.piggy_query_page.page_size = filter.PageLen;
				if(filter.OrderFields!=null){
					data.piggy_query_page.order = filter.OrderFields;
				}
				if(filter.ShowFields!=null){
					data.piggy_query_page.fields = filter.ShowFields;
				}			
		    }
			g_isAsyQuery = false;
		    var url = g_baseUrlDomain + "?service=" + serviceName;
			g_reCallFunc = callAsync;
			//package arguments
			var xmlDoc = PiggyOrg.env.createDocument(); //针对Opera，这里已经生成了xml头了
			if(!PiggyOrg.env.isDocumentHasXmlHead(xmlDoc)){
				var pi = xmlDoc.createProcessingInstruction("xml", g_Protocol.XML_HEAD);
				xmlDoc.appendChild(pi);
			}
			
			var serviceNameTextNode = xmlDoc.createTextNode(serviceName);
			var serviceNameElm = xmlDoc.createElement(g_Protocol.XML_SERVICE_NAME);
			serviceNameElm.appendChild(serviceNameTextNode);
			var docElm = xmlDoc.appendChild(xmlDoc.createElement(g_Protocol.XML_ROOT));
			docElm.appendChild(serviceNameElm);
			
			var dataElm = xmlDoc.createElement(g_Protocol.XML_DATA_ROOT);
			var type = _packager.getObjectType(data);
			
			if(type=='a'&&arg.length==0){
	            dataElm.setAttribute("t",'o');
	            _packager.packageObject(dataElm,'o',null);
	        } else{
	            _packager.packageObject(dataElm,type,data);
	        }
	        docElm.appendChild(dataElm);
	
			//send to remote
		    this.sendXmlAsync(url,PiggyOrg.env.serializeXml(xmlDoc),callAsync);
		} catch(e){
			throw e;
		}
	},
	
	callRemoteQueryFunctionAsync : function(callAsync,serviceName,argObj,filter){
		try{
			g_isAsyQuery = true;
			var data = {};
			var len = 0;
			if(argObj!=null) len = argObj.length;
	
			for(var i=0;i<len;i++){
				Object.extend(data,argObj[i]);
			}
			if(filter!=null){
				data.piggy_query_page = new Object();
				data.piggy_query_page.page_index = filter.PageIndex;
				data.piggy_query_page.page_size = filter.PageLen;
				if(filter.OrderFields!=null){
					data.piggy_query_page.order = filter.OrderFields;
				}
				if(filter.ShowFields!=null){
					data.piggy_query_page.fields = filter.ShowFields;
				}			
		    }
			var url = g_baseUrlDomain + "?service=" + serviceName;
			g_reCallFunc = callAsync;
			//package arguments
			var xmlDoc = PiggyOrg.env.createDocument(); //针对Opera，这里已经生成了xml头了
			if(!PiggyOrg.env.isDocumentHasXmlHead(xmlDoc)){
				var pi = xmlDoc.createProcessingInstruction("xml", g_Protocol.XML_HEAD);
				xmlDoc.appendChild(pi);
			}
			
			var serviceNameTextNode = xmlDoc.createTextNode(serviceName);
			var serviceNameElm = xmlDoc.createElement(g_Protocol.XML_SERVICE_NAME);
			serviceNameElm.appendChild(serviceNameTextNode);
			var docElm = xmlDoc.appendChild(xmlDoc.createElement(g_Protocol.XML_ROOT));
			docElm.appendChild(serviceNameElm);
			
			var dataElm = xmlDoc.createElement(g_Protocol.XML_DATA_ROOT);
			var type = _packager.getObjectType(data);
			
			if(type=='a' && arg.length==0){
	            dataElm.setAttribute("t",'o');
	            _packager.packageObject(dataElm,'o',null);
	        } else{
	            _packager.packageObject(dataElm,type,data);
	        }
	        docElm.appendChild(dataElm);
	
			//send to remote
		    this.sendXmlAsync(url, PiggyOrg.env.serializeXml(xmlDoc));
		} catch(e){
			throw e;
		}
	}
};
