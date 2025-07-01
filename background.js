var oDefaultIni = {
	"able": true,
	"renderMode": 'rich',
	"panelMode": 'leftClick',
	"openJhMode": 'win',
	"showLengthMode": 'array',
	"saveKeyStatus": true,
	"contextsMenu": true,
	"jsonEngine": 'JH-JSON',
	"sortKey": 0,
	"minimalism": true,
	"miniTime": 'tooLarge',
	"showLengthMode": 'array'
};


// if(!chrome.storage.local.get('jhIni')) {
// 	chrome.storage.local.set('jhIni') = JSON.stringify(oDefaultIni);
// }

var Http = (function () {
	var _fun = function (oA){
		var oReq=_fun.createRequest(), oJson, i, l;
		if(oReq) {
			oA.headers = oA.headers || [];
			oA.method = oA.method || 'get';
			oA.async = oA.async === false?false:true;
			oA.clear = oA.clear === false?false:true;
			oA.resultType = oA.resultType || 'json';
			oA.onSuccess = oA.onSuccess || function () {};
			oA.onError = oA.onError || function () {};
			oA.onEnd = oA.onEnd || function () {};
			oReq.onreadystatechange=function(){
				var oReArg, bError = false, err;
				if(oReq.readyState == 1 && oA.onRead) {
					oA.onRead.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 2 && oA.onSent) {
					oA.onSent.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 3 && oA.onConnected) {
					oA.onConnected.call(oA, oReq, oA.context);
				}
				if(oReq.readyState == 4 && oA.onEnd) {
					switch(oA.resultType.toLowerCase()) {
						case 'text':
							oReArg = oReq.responseText;
							break;
						case 'xml':
							oReArg = oReq.responseXML;
							break;
						case 'xhr':
							oReArg = oReq;
							break;
						case 'json':
							if(!oReq.responseText) {
								bError = true;
							}else{
								oJson = JSON.parse(oReq.responseText);
								if(oJson.constructor === String) {
									bError = true;
								}else{
									oReArg = oJson;
								}
							}
							break;
						default:
							err = new Error('XHR.resultType 的值只能是 text | xml | xhr | json');
							err.message += err.stack;
							throw err;
					}
					if(oReq.status < 400 && !bError) {
						oA.onSuccess.call(oA, oReArg, oA.context);
					}else{
						oA.onError.call(oA, oReq, oA.context);
					}
					oA.onEnd.call(oA, oReq, oA.context);
				}
			};
			if(oA.clear) {
				if(oA.url.indexOf('?') != -1) {oA.url += '&';}
				else{oA.url += '?';}
				oA.url += 'clear_client_cache='+Math.random()+'_'+new Date().getTime();
			}
			oA.method = oA.method.toUpperCase();
			if(oA.method == 'GET' && oA.data) {
				if(oA.url.indexOf('?') != -1) {oA.url += '&';}
				else{oA.url += '?';}
				oA.url += oA.data;
			}
			oReq.open(oA.method,oA.url,oA.async,oA.un,oA.pw);//print_r('Value = '+oA.method+' || '+oA.url+' || '+oA.async+' || '+oA.un+' || '+oA.pw,false);
			oReq.setRequestHeader("request-method", "XMLHttpRequest");
			if(oA.method == 'POST') {
				oReq.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			}
			if(oA.headers && oA.headers.length) {
				for(i=0, l=oA.headers.length; i<l; i++) {
					oReq.setRequestHeader(oA.headers[i][0], oA.headers[i][1]);
				}
			}
			if(!oA.data) {oA.data = null;}
			oReq.send(oA.data);
		}else{
			oReq = false;
		}
		return oReq;
	};

	_fun["createRequest"] = function(){
		for(var i=0; i<_fun.api.length; i++){
			try{
				var request=_fun.api[i]();
				return request;
			}
			catch(e){
				continue;
			}
		}
		//alert("XMLHttpRequest not supported");
		return false;
	};

	_fun["api"] = [
		function(){return new XMLHttpRequest();},
		function(){return new ActiveXObject("Microsoft.XMLHTTP");},
		function(){return new ActiveXObject("Msxml2.XMLHTTP");}
	];

	return _fun;
}());


function openJH() {
	chrome.storage.local.get('jhIni', function(result) {
		var oIni = result.jhIni || oDefaultIni;
		var jsonH_url = chrome.runtime.getURL("JSON-path/JSON-path.html");
		if (oIni.openJhMode === 'tab') {
			chrome.tabs.create({ "url": jsonH_url, "selected": true });
		} else {
			chrome.windows.create({ url: jsonH_url, type: "popup", width: 1024, height: 768 });
		}
	});
}

chrome.action.onClicked.addListener(function(tab) {
	openJH();
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	try {
		switch(request.cmd) {
			case 'setJson':
				chrome.storage.local.set({ sJson: request.sJson }, function() {
					sendResponse({});
				});
				return true;
			case 'openTab':
				chrome.tabs.create({"url":request.data, "selected":true}, function (oTab) {
					chrome.windows.update(oTab.windowId, {
						focused : true
					});
					sendResponse({});
				});
				return true;
			case 'getAdData':
				fetch(request.data.url)
					.then(response => response.json())
					.then(data => sendResponse(data))
					.catch(error => sendResponse({error: error.toString()}));
				return true;
			case 'getJson':
				chrome.storage.local.get('sJson', function(data) {
					sendResponse(data.sJson);
					chrome.storage.local.remove('sJson');
				});
				return true;
			case 'setIni':
				chrome.storage.local.get('jhIni', function(result) {
					var oIni = result.jhIni || {};
					for (var i in request.oIni) {
						if(request.oIni.hasOwnProperty(i)) {
							oIni[i] = request.oIni[i];
						}
					}
					chrome.storage.local.set({ jhIni: oIni }, function() {
						sendResponse({});
					});
				});
				return true;
			case 'getIni':
				chrome.storage.local.get('jhIni', function(result) {
					var sIni = result.jhIni || {};
					for (var k in oDefaultIni) {
						if(sIni[k] === undefined) {
							sIni[k] = oDefaultIni[k];
						}
					}
					sendResponse(sIni);
				});
				return true;
			case 'getJhData':
				sendResponse({
					jhPath : chrome.runtime.getURL('JSON-path/')
				});
				break;
			case 'env js ok':
			case 'content script ok':
				break;
			default:
				throw new Error('bg 收到的 cmd 不正确');
		}
	} catch (e) {
		console.error('background.js error:', e);
	}
});


// MV3-specific initialization
chrome.runtime.onInstalled.addListener(() => {
	chrome.storage.local.get('jhIni', (result) => {
		if (!result.jhIni) {
			chrome.storage.local.set({ jhIni: oDefaultIni });
		}
	});
	contextsMenu(); // Initialize context menus on installation
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status === 'loading') {
		if (!tab.url || tab.url.startsWith('chrome-extension://') || tab.url.startsWith('chrome://')) {
			return;
		}
		try {
			chrome.scripting.executeScript({
				target: { tabId: tabId },
				func: () => {
					try{
						window.bHasScript = document.querySelectorAll("script").length > 0;
						window.bHasCss = document.querySelectorAll('link[rel="stylesheet"]').length > 0;
						window.bHasTitle = !!document.getElementsByTagName("title").length;
					}catch(e) {}
				},
				injectImmediately: true
			});
		} catch (e) {
			console.warn('executeScript failed:', e);
		}
	}
});



chrome.webRequest.onResponseStarted.addListener(function (oD) {
	if(oD.responseHeaders && oD.type === 'main_frame') {
		var sContetnType = '';
		oD.responseHeaders.some(function (o) {
			if(o.name.toLowerCase() === 'content-type') {
				sContetnType = o.value;
			}
		});

		if(sContetnType.split(';')[0] === 'text/html') {
			// 只注入到普通网页
			if (oD.tabId && oD.url && !oD.url.startsWith('chrome-extension://') && !oD.url.startsWith('chrome://')) {
				try {
					chrome.scripting.executeScript({
						target: { tabId: oD.tabId },
						func: () => { window.beHtml = true; },
						injectImmediately: true
					});
				} catch (e) {
					console.warn('executeScript failed:', e);
				}
			}
		}
	}
},{urls: ['<all_urls>']}, ['responseHeaders']);



var contextsMenu = (function() {
	var _pub_static = function() {
		var _pub = {},
			_pri = {},
			_pro = {};
		var _init = function() {

			var contexts = ["page", "selection"];
			chrome.storage.local.get('jhIni', function(result) {
				var oIni = result.jhIni || oDefaultIni;
				if (oIni.contextsMenu) {
					chrome.contextMenus.removeAll(function() {
						contexts.forEach(function(name) {
							chrome.contextMenus.create({
								"id": "jh_" + name,
								"title": 'JSON-path (' + name + ')',
								"contexts": [name]
							});
						});
					});
				}
			});
		};

		_pri["genericOnClick"] = function(info, tab) {
			if (info.selectionText) {
				chrome.storage.local.set({ sJson: info.selectionText }, function() {
					openJH();
				});
			} else {
				if (tab && tab.id) {
					chrome.tabs.sendMessage(tab.id, { cmd: 'runJhInPage' }).catch(e => console.log(e));
				}
			}
		};

		chrome.contextMenus.onClicked.addListener(_pri.genericOnClick);

		_init();

		return _pub;
	};

	return _pub_static;
}());

