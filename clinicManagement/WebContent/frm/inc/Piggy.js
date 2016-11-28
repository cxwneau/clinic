if (typeof PiggyOrg == "undefined") {
    var PiggyOrg = {};
};

PiggyOrg.namespace = function() {
    var a=arguments, o=null, i, j, d;
    for (i=0; i<a.length; i=i+1) {
        d=a[i].split(".");
        o=PiggyOrg;

        for (j=(d[0] == "PiggyOrg") ? 1 : 0; j<d.length; j=j+1) {
            o[d[j]]=o[d[j]] || {};
            o=o[d[j]];
        }
    }

    return o;
};

PiggyOrg.lang = {
    /**
     * Determines whether or not the provided object is an array
     * @method isArray
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isArray: function(obj) { // frames lose type, so test constructor string
        if (obj && obj.constructor && obj.constructor.toString().indexOf('Array') > -1) {
            return true;
        } else {
            return obj && PiggyOrg.lang.isObject(obj) && obj.constructor == Array;
        }
    },

    /**
     * Determines whether or not the provided object is a boolean
     * @method isBoolean
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isBoolean: function(obj) {
        return typeof obj == 'boolean';
    },
    
    /**
     * Determines whether or not the provided object is a function
     * @method isFunction
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isFunction: function(obj) {
        return typeof obj == 'function';
    },
        
    /**
     * Determines whether or not the provided object is null
     * @method isNull
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isNull: function(obj) {
        return obj == null;
    },
        
    /**
     * Determines whether or not the provided object is a legal number
     * @method isNumber
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isNumber: function(obj) {
        return typeof obj == 'number' && isFinite(obj);
    },
      
    /**
     * Determines whether or not the provided object is of type object
     * or function
     * @method isObject
     * @param {any} obj The object being testing
     * @return Boolean
     */  
    isObject: function(obj) {
        return typeof obj == 'object' || PiggyOrg.lang.isFunction(obj);
    },
        
    /**
     * Determines whether or not the provided object is a string
     * @method isString
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isString: function(obj) {
        return typeof obj == 'string';
    },
        
    /**
     * Determines whether or not the provided object is undefined
     * @method isUndefined
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isUndefined: function(obj) {
        return typeof obj == 'undefined';
    },

    /**
     * Determines whether or not the provided object is undefined
     * @method isDate
     * @param {any} obj The object being testing
     * @return Boolean
     */
    isDate: function(obj) {
        if (obj.constructor && obj.constructor.toString().indexOf('Date') > -1) {
            return true;
        } else {
            return PiggyOrg.lang.isObject(obj) && obj.constructor == Date;
        }
    }
};


PiggyOrg.env = PiggyOrg.env || {};

PiggyOrg.env.isUseActiveX = (typeof ActiveXObject != "undefined");
PiggyOrg.env.isUseDom = document.implementation != null && typeof document.implementation.createDocument != "undefined";
PiggyOrg.env.isUseXmlHttp = (typeof XMLHttpRequest != "undefined");

PiggyOrg.env.ARR_XMLHTTP_VERS = ["MSXML2.XmlHttp.6.0","MSXML2.XmlHttp.3.0"];
PiggyOrg.env.ARR_DOM_VERS = ["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.3.0"];
PiggyOrg.env.XMLHTTP_VER = null;
PiggyOrg.env.DOM_VER = null;

PiggyOrg.env.createRequest = function () {
    //if it natively supports XMLHttpRequest object
    if (this.isUseXmlHttp) {
        return new XMLHttpRequest();
    } else if (this.isUseActiveX) { //IE < 7.0 = use ActiveX
  
        if (!this.XMLHTTP_VER) {
            for (var i=0; i < this.ARR_XMLHTTP_VERS.length; i++) {
                try {
                    new ActiveXObject(this.ARR_XMLHTTP_VERS[i]);
                    this.XMLHTTP_VER = this.ARR_XMLHTTP_VERS[i];
                    break;
                } catch (oError) {                
                }
            }
        }
        
        if (this.XMLHTTP_VER) {
            return new ActiveXObject(this.XMLHTTP_VER);
        } else {
            throw new Error("Could not create XML HTTP Request.");
        }
    } else {
        throw new Error("Your browser doesn't support an XML HTTP Request.");
    }

};

/**
 * Creates a XML DOM document.
 * @return A XML DOM document.
 */
PiggyOrg.env.createDocument = function() {
    if (PiggyOrg.env.isUseDom) {
        var oXmlDom = document.implementation.createDocument("","",null);
        oXmlDom.parseError = {
            valueOf: function () { return this.errorCode;},
            toString: function () { return this.errorCode.toString();}
        };
        oXmlDom.addEventListener("load", function () {
            this.__changeReadyState__(4);
        }, false);
        return oXmlDom;        
    } else if (this.isUseActiveX) {
        if (!this.DOM_VER) {
            for (var i=0; i < this.ARR_DOM_VERS.length; i++) {
                try {
                    new ActiveXObject(this.ARR_DOM_VERS[i]);
                    this.DOM_VER = this.ARR_DOM_VERS[i];
                    break;
                } catch (oError) {                
                }
            }
        }
        if (this.DOM_VER) {
            return new ActiveXObject(this.DOM_VER);
        } else {
            throw new Error("Could not create XML DOM document.");
        }
    } else {
        throw new Error("Your browser doesn't support an XML DOM document.");
    }
};

/**
 * 判断XML DOM document是有有XML头
 */
PiggyOrg.env.isDocumentHasXmlHead = function(xmlDoc) {
	if(PiggyOrg.env.serializeXml(xmlDoc).indexOf("xml") != -1){
		return true;
	} else{
		return false;
	}
};

/**
 * Parse a XML string to a XML DOM document
 * @return A XML DOM document
 */
PiggyOrg.env.parseXml = function(xml){
	var xmlDoc = null;
	if (typeof DOMParser != "undefined"){
		xmlDoc = (new DOMParser()).parseFromString(xml, "text/xml");
		var errors = xmlDoc.getElementsByTagName("parsererror");
		if (errors.length){
			throw new Error("XML parsing error:" + errors[0].textContent);
		}
	} else if (document.implementation.hasFeature("LS", "3.0")){
		var implementation = document.implementation;
		var parser = implementation.createLSParser(implementation.MODE_SYNCHRONOUS,null);
		var input = implementation.createLSInput();
		input.stringData = xml;
		xmlDoc = parser.parse(input);
	} else if (typeof ActiveXObject != "undefined"){
		xmlDoc = PiggyOrg.env.createDocument();
		xmlDoc.loadXML(xml);
		if (xmlDoc.parseError != 0){
			throw new Error("XML parsing error: " + xmlDoc.parseError.reason);
		}
	} else {
		throw new Error("No XML parser available.");
	}
	return xmlDoc;
};

/**
 * Serialize a XML DOM document to XML string
 * @return A XML string
 */
PiggyOrg.env.serializeXml = function(xmlDoc){
	if (typeof XMLSerializer != "undefined"){
		return (new XMLSerializer()).serializeToString(xmlDoc);
	} else if (document.implementation.hasFeature("LS", "3.0")){
		var implementation = document.implementation;
		var serializer = implementation.createLSSerializer();
		return serializer.writeToString(xmlDoc);
	} else if (typeof xmlDoc.xml != "undefined"){
		return xmlDoc.xml;
	} else {
		throw new Error("Could not serialize XML DOM.");
	}
};

/**
 * Select a single node from a XML DOM document
 * @return A single node
 */
PiggyOrg.env.selectSingleNode = function(context, expression, namespaces){
	var doc = (context.nodeType != 9 ? context.ownerDocument : context);
	if (typeof doc.evaluate != "undefined"){
		var nsresolver = null;
		if (namespaces instanceof Object){
			nsresolver = function(prefix){
				return namespaces[prefix];
			};
		}
		var result = doc.evaluate(expression, context, nsresolver, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		return (result !== null ? result.singleNodeValue : null);
	} else if (typeof context.selectSingleNode != "undefined"){
		//create namespace string
		if (namespaces instanceof Object){
			var ns = "";
			for (var prefix in namespaces){
				if (namespaces.hasOwnProperty(prefix)){
					ns += "xmlns:" + prefix + "=’" + namespaces[prefix] + "’ ";
				}
			}
			doc.setProperty("SelectionNamespaces", ns);
		}
		return context.selectSingleNode(expression);
	} else if (typeof doc.getElementsByTagName != "undefined"){ //a temporary solution for ie9

		var tagNames = expression.split("/");
		var root = doc.getElementsByTagName(tagNames[2])[0];
		var nodes = root.childNodes;
		
		for(var i=0; i<nodes.length; i++){
			if(nodes[i].tagName == tagNames[3]){
				return nodes[i];
			}
		}
		throw new Error("No node was found by path["+expression+"].");
	} else {
		throw new Error("No XPath engine found.");
	}
};

/**
 * Select single nodes from a XML DOM document
 * @return Nodes
 */
PiggyOrg.env.selectNodes = function(context, expression, namespaces){
	var doc = (context.nodeType != 9 ? context.ownerDocument : context);
	if (typeof doc.evaluate != "undefined"){
		var nsresolver = null;
		if (namespaces instanceof Object){
			nsresolver = function(prefix){
				return namespaces[prefix];
			};
		}
		var result = doc.evaluate(expression, context, nsresolver, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var nodes = new Array();
		if (result !== null){
			for (var i=0, len=result.snapshotLength; i < len; i++){
				nodes.push(result.snapshotItem(i));
			}
		}
		return nodes;
	} else if (typeof context.selectNodes != "undefined"){
		//create namespace string
		if (namespaces instanceof Object){
			var ns = "";
			for (var prefix in namespaces){
				if (namespaces.hasOwnProperty(prefix)){
					ns += "xmlns:" + prefix + "=’" + namespaces[prefix] + "’ ";
				}
			}
			doc.setProperty("SelectionNamespaces", ns);
		}
		var result = context.selectNodes(expression);
		var nodes = new Array();
		for (var i=0,len=result.length; i < len; i++){
			nodes.push(result[i]);
		}
		return nodes;
	} else {
		throw new Error("No XPath engine found.");
	}
};

PiggyOrg.eventUtil = {

	    addHandler: function(element, type, handler){
	        if (element.addEventListener){
	            element.addEventListener(type, handler, false);
	        } else if (element.attachEvent){
	            element.attachEvent("on" + type, handler);
	        } else {
	            element["on" + type] = handler;
	        }
	    },
	    
	    removeHandler: function(element, type, handler){
	        if (element.removeEventListener){
	            element.removeEventListener(type, handler, false);
	        } else if (element.detachEvent){
	            element.detachEvent("on" + type, handler);
	        } else {
	            element["on" + type] = null;
	        }
	    },
	    
	    getEvent: function(event){
	        return event ? event : window.event;
	    },
	    
	    preventDefault: function(event){
	        if (event.preventDefault){
	            event.preventDefault();
	        }
	        event.returnValue = false;
	    },
	    
	    stopPropagation: function(event){
	        if (event.stopPropagation){
	            event.stopPropagation();
	        }
	        event.cancelBubble = true;
	    },
	    
	    getTarget: function(event){
	        return event.target || event.srcElement;
	    },
	    
	    getRelatedTarget: function(event){
	        if (event.relatedTarget){
	            return event.relatedTarget;
	        } else if (event.toElement){
	            return event.toElement;
	        } else if (event.fromElement){
	            return event.fromElement;
	        } else {
	            return null;
	        }
	    
	    },
	    
	    getCharCode: function(event){
	        return event.keyCode;
	    	/*
	    	if (typeof event.charCode == "number"){
	            return event.charCode;
	        } else {
	            return event.keyCode;
	        }*/
	    },
	    
	    setCharCode: function(event, code){
	    	if (typeof event.charCode == "undefined"){//IE、Opera
	    		event.keyCode = code;
	        }
	    },
	    
	    getButton: function(event){
	        if (document.implementation.hasFeature("MouseEvents", "2.0")){
	            return event.button;
	        } else {
	            switch(event.button){
	                case 0:
	                case 1:
	                case 3:
	                case 5:
	                case 7:
	                    return 0;
	                case 2:
	                case 6:
	                    return 2;
	                case 4: return 1;
	            }
	        }
	    },
	    
	    getWheelDelta: function(event){
	        if (event.wheelDelta){
	            return (client.engine.opera && client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta);
	        } else {
	            return -event.detail * 40;
	        }
	    },
	    
	    getClipboardText: function(event){
	        var clipboardData =  (event.clipboardData || window.clipboardData);
	        return clipboardData.getData("text");
	    },
	    
	    setClipboardText: function(event, value){
	        if (event.clipboardData){
	            event.clipboardData.setData("text/plain", value);
	        } else if (window.clipboardData){
	            window.clipboardData.setData("text", value);
	        }
	    }
};