/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2017 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","sap/ui/model/odata/ODataUtils","sap/ui/Device","sap/ui/core/library","sap/ui/thirdparty/URI","sap/ui/core/message/MessageParser","sap/ui/core/message/Message"],function(q,O,D,c,U,M,a){"use strict";var b=c.MessageType;var s={"error":b.Error,"warning":b.Warning,"success":b.Success,"info":b.Information};var d=M.extend("sap.ui.model.odata.ODataMessageParser",{metadata:{publicMethods:["parse","setProcessor","getHeaderField","setHeaderField"]},constructor:function(S,m){M.apply(this);this._serviceUrl=e(this._parseUrl(S).url);this._metadata=m;this._processor=null;this._headerField="sap-message";this._lastMessages=[];}});d.prototype.getHeaderField=function(){return this._headerField;};d.prototype.setHeaderField=function(F){this._headerField=F;return this;};d.prototype.parse=function(r,R,G,C){var m=[];var h={url:R?R.requestUri:r.requestUri,request:R,response:r};if(r.statusCode>=200&&r.statusCode<300){this._parseHeader(m,r,h);}else if(r.statusCode>=400&&r.statusCode<600){this._parseBody(m,r,h);}else{q.sap.log.warning("No rule to parse OData response with status "+r.statusCode+" for messages");}if(this._processor){this._propagateMessages(m,h,G,C);}else{this._outputMesages(m);}};d.prototype._isNavigationProperty=function(p,P){var E=this._metadata._getEntityTypeByPath(p);if(E){var n=this._metadata._getNavigationPropertyNames(E);return n.indexOf(P)>-1;}return false;};d.prototype._getAffectedTargets=function(m,r,G,C){var A=q.extend({"":true},G,C);var R=this._parseUrl(r).url;if(R.indexOf(this._serviceUrl)===0){R=R.substr(this._serviceUrl.length+1);}var E=this._metadata._getEntitySetByPath(R);if(E){A[E.name]=true;}for(var i=0;i<m.length;++i){var t=m[i].getTarget();if(t){var T=t.replace(/^\/+|\/$/g,"");A[T]=true;var S=T.lastIndexOf("/");if(S>0){var p=T.substr(0,S);var P=T.substr(S);var I=this._isNavigationProperty(p,P);if(!I){A[p]=true;}}}}return A;};d.prototype._propagateMessages=function(m,r,G,C){var i,t;var A=this._getAffectedTargets(m,r.url,G,C);var R=[];var k=[];for(i=0;i<this._lastMessages.length;++i){t=this._lastMessages[i].getTarget().replace(/^\/+|\/$/g,"");var p=t.lastIndexOf(")/");if(p>0){t=t.substr(0,p+1);}if(A[t]&&!this._lastMessages[i].getPersistent()){R.push(this._lastMessages[i]);}else{k.push(this._lastMessages[i]);}}this.getProcessor().fireMessageChange({oldMessages:R,newMessages:m});this._lastMessages=k.concat(m);};d.prototype._createMessage=function(m,r,i){var t=m["@sap.severity"]?m["@sap.severity"]:m["severity"];t=s[t]?s[t]:t;var C=m.code?m.code:"";var T=typeof m["message"]==="object"&&m["message"]["value"]?m["message"]["value"]:m["message"];var h=m.longtext_url?m.longtext_url:"";var p=false;if(!m.target&&m.propertyref){m.target=m.propertyref;}if(typeof m.target==="undefined"){m.target="";}if(m.target.indexOf("/#TRANSIENT#")===0){p=true;m.target=m.target.substr(12);}else if(m.transient){p=true;}var j=this._createTarget(m,r);return new a({type:t,code:C,message:T,descriptionUrl:h,target:O._normalizeKey(j),processor:this._processor,technical:i,persistent:p});};d.prototype._getFunctionTarget=function(F,r,u){var t="";var i;if(r.response&&r.response.headers&&r.response.headers["location"]){t=r.response.headers["location"];var p=t.lastIndexOf(this._serviceUrl);if(p>-1){t=t.substr(p+this._serviceUrl.length);}}else{var A=null;if(F.extensions){for(i=0;i<F.extensions.length;++i){if(F.extensions[i].name==="action-for"){A=F.extensions[i].value;break;}}}var E;if(A){E=this._metadata._getEntityTypeByName(A);}else if(F.entitySet){E=this._metadata._getEntityTypeByPath(F.entitySet);}else if(F.returnType){E=this._metadata._getEntityTypeByName(F.returnType);}var m=this._metadata._getEntitySetByType(E);if(m&&E&&E.key&&E.key.propertyRef){var I="";var P;if(E.key.propertyRef.length===1){P=E.key.propertyRef[0].name;if(u.parameters[P]){I=u.parameters[P];}}else{var k=[];for(i=0;i<E.key.propertyRef.length;++i){P=E.key.propertyRef[i].name;if(u.parameters[P]){k.push(P+"="+u.parameters[P]);}}I=k.join(",");}t="/"+m.name+"("+I+")";}else if(!m){q.sap.log.error("Could not determine path of EntitySet for function call: "+u.url);}else{q.sap.log.error("Could not determine keys of EntityType for function call: "+u.url);}}return t;};d.prototype._createTarget=function(m,r){var t=m.target;if(t.substr(0,1)!=="/"){var R="";var h=(r.request&&r.request.method)?r.request.method:"GET";var i=(h==="POST"&&r.response&&(r.response.statusCode==="201"||r.response.statusCode===201)&&r.response.headers&&r.response.headers["location"]);var u;if(i){u=r.response.headers["location"];}else{u=r.url;}var j=this._parseUrl(u);var k=j.url;var p=k.lastIndexOf(this._serviceUrl);if(p>-1){R=k.substr(p+this._serviceUrl.length+1);}else{R=k;}if(!i){var F=this._metadata._getFunctionImportMetadata(R,h);if(F){R=this._getFunctionTarget(F,r,j);if(t){t=R+"/"+t;}else{t=R;}return t;}}R="/"+R;var S=R.lastIndexOf("/");var n=S>-1?R.substr(S):R;if(n.indexOf("(")>-1){t=R+"/"+t;}else{t=R+t;}}return t;};d.prototype._parseHeader=function(m,r,R){var F=this.getHeaderField();if(!r.headers){return;}for(var k in r.headers){if(k.toLowerCase()===F.toLowerCase()){F=k;}}if(!r.headers[F]){return;}var h=r.headers[F];var S=null;try{S=JSON.parse(h);m.push(this._createMessage(S,R));if(Array.isArray(S.details)){for(var i=0;i<S.details.length;++i){m.push(this._createMessage(S.details[i],R));}}}catch(j){q.sap.log.error("The message string returned by the back-end could not be parsed");return;}};d.prototype._parseBody=function(m,r,R){var C=g(r);if(C&&C.indexOf("xml")>-1){this._parseBodyXML(m,r,R,C);}else{this._parseBodyJSON(m,r,R);}if(m.length>1){for(var i=1;i<m.length;i++){if(m[0].getCode()==m[i].getCode()&&m[0].getMessage()==m[i].getMessage()){m.shift();break;}}}};d.prototype._parseBodyXML=function(h,r,R,C){try{var o=new DOMParser().parseFromString(r.body,C);var E=f(o,["error","errordetail"]);for(var i=0;i<E.length;++i){var N=E[i];var j={};j["severity"]=b.Error;for(var n=0;n<N.childNodes.length;++n){var k=N.childNodes[n];var p=k.nodeName;if(p==="errordetails"||p==="details"||p==="innererror"||p==="#text"){continue;}if(p==="message"&&k.hasChildNodes()&&k.firstChild.nodeType!==window.Node.TEXT_NODE){for(var m=0;m<k.childNodes.length;++m){if(k.childNodes[m].nodeName==="value"){j["message"]=k.childNodes[m].text||k.childNodes[m].textContent;}}}else{j[k.nodeName]=k.text||k.textContent;}}h.push(this._createMessage(j,R,true));}}catch(t){q.sap.log.error("Error message returned by server could not be parsed");}};d.prototype._parseBodyJSON=function(m,r,R){try{var E=JSON.parse(r.body);var o;if(E["error"]){o=E["error"];}else{o=E["odata.error"];}if(!o){q.sap.log.error("Error message returned by server did not contain error-field");return;}o["severity"]=b.Error;m.push(this._createMessage(o,R,true));var F=null;if(Array.isArray(o.details)){F=o.details;}else if(o.innererror&&Array.isArray(o.innererror.errordetails)){F=o.innererror.errordetails;}else{F=[];}for(var i=0;i<F.length;++i){m.push(this._createMessage(F[i],R,true));}}catch(h){q.sap.log.error("Error message returned by server could not be parsed");}};d.prototype._parseUrl=function(u){var m={url:u,parameters:{},hash:""};var p=-1;p=u.indexOf("#");if(p>-1){m.hash=m.url.substr(p+1);m.url=m.url.substr(0,p);}p=u.indexOf("?");if(p>-1){var P=m.url.substr(p+1);m.parameters=U.parseQuery(P);m.url=m.url.substr(0,p);}return m;};d.prototype._outputMesages=function(m){for(var i=0;i<m.length;++i){var o=m[i];var h="[OData Message] "+o.getMessage()+" - "+o.getDescription()+" ("+o.getTarget()+")";switch(m[i].getType()){case b.Error:q.sap.log.error(h);break;case b.Warning:q.sap.log.warning(h);break;case b.Success:q.sap.log.debug(h);break;case b.Information:case b.None:default:q.sap.log.info(h);break;}}};function g(r){if(r&&r.headers){for(var h in r.headers){if(h.toLowerCase()==="content-type"){return r.headers[h].replace(/([^;]*);.*/,"$1");}}}return false;}var l=document.createElement("a");function e(u){l.href=u;return U.parse(l.href).path;}function f(o,E){var h=[];var m={};for(var i=0;i<E.length;++i){m[E[i]]=true;}var j=o;while(j){if(m[j.tagName]){h.push(j);}if(j.hasChildNodes()){j=j.firstChild;}else{while(!j.nextSibling){j=j.parentNode;if(!j||j===o){j=null;break;}}if(j){j=j.nextSibling;}}}return h;}return d;});
