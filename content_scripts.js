//alert('content_scripts.js');

chrome.runtime.sendMessage({cmd:'getIni'}, (function () {
	var _pub_static = function () {var _pri = {}, _pub = {};
		var _init = function (oIni) {
			_pri["oIni"] = oIni;
			if(oIni && oIni.able && _pri.isJson()) {
				_pri.createView();
			}else{
				chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
					switch(request.cmd) {
						case 'runJhInPage':
							if(_pri.isJson()) {
								_pri.createView();
								sendResponse({status: "view created"});
							}else{
								alert('Found not JSON text.');
								sendResponse({status: "not json"});
							}
							break;
					}
					return true; // Keep message channel open for async response
				});
			}
		};

		_pri["getTheJSON"] = function () {
			var arr = [];
			var sData = '';

			[].slice.call(document.getElementsByTagName('*')).filter(function (e) {
				return (e.offsetHeight + e.offsetWidth) > 0;
			}).forEach(function (e) {
				var sT = '';
				[].slice.call(e.childNodes).forEach(function (e) {
					if(e.nodeType === document.TEXT_NODE) {
						sT += e.data;
					}else{
						arr.push(sT);
						sT = '';
					}
				});
				sT && arr.push(sT);

			});

			arr = arr.filter(function (s) {
				return s.trim();
			});

			sData = arr[0] || '';
			arr.forEach(function (e) {
				try{

					var isJson = false;

					if(sData) {
						if(sData.match(/^\s*[\[\{]/)) {
								var oJson = JSON.parse(sData);
								if(typeof oJson === 'object') {
									isJson = true;
								}
						}else{
							var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
								if(typeof JSON.parse(sTempData) === 'object') {
									isJson = true;
									sData = sTempData;
								}
						}

					}
				}catch(e) {}

				if(e.length > sData.length) {
					sData = sData || e;
				}

				if(!isJson) {
					sData = '';
				}
			});
			return sData;
		};

		_pri["isJson"] = function () {

			var isJson = false, sData = '';

			try{
				if(window.beHtml) {
					if(window.bHasTitle && window.bHasScript && window.bHasCss) {
						return false;
					}
				}
				sData = _pri.getTheJSON();


			}catch(e) {}

			isJson = !!sData;

			_pri["sData"] = sData;

			return isJson;
		};

		_pri["showJhLoadTips"] = function () {
			var sStyle = [
				'html {height:100%;}',
				'body {margin:0;padding:0;height:100%;overflow:hidden;}',
				'.tips-loading {color:#ccc;font-size:12px;position:absolute;left:0;top:0;right:0;bottom:0;margin:auto;width:80%;text-align:center;height:50%;}'
			].join('');
			var eStyle = document.createElement('style');
			eStyle.id = 'tipsStyle';
			eStyle.innerHTML = sStyle;
			document.getElementsByTagName('head')[0].appendChild(eStyle);

			document.body.innerHTML = '<span class="_tipsLoading tips-loading">JSON-path is loading...</span>';
		};

		_pri["strongKey"] = function (sJson) {
			sJson = sJson.replace(/^\s+(".+?"): /gm, function (s, k) {
				if (k) {
					s = s.replace(k, '<b>'+k+'</b>');
				}
				return s;
			});
			return sJson;
		};


		_pri["createView"] = function () {
			document.body.innerHTML = '';
			document.getElementsByTagName('head')[0].innerHTML = '';
			chrome.runtime.sendMessage({
				cmd : 'setJson'
				, sJson : _pri.sData
			}, function() {

				var bMiniMalism = false;
				if (_pri.oIni.minimalism) {
					if (_pri.oIni.miniTime === 'anytime' || _pri.sData && _pri.sData.length > 600000) {
						document.body.className = _pri.oIni.renderMode;
						
						bMiniMalism = true;
						document.body.className += ' minimalism';
						chrome.runtime.sendMessage({cmd : 'getJson'});
						
						var sMStyle = [
							'body {line-height:1.6em;color:#2d47a2;background-color:#fcfcff;}',
							'pre {font-family:'+_pri.oIni.fontUse+';}',
							'.minimalism b {color:#3c67ff;}',
							'.dark.minimalism b {color:#c6dfea;}',
							'.rich {text-shadow:2px 2px 2px rgba(45, 44, 4, 0.12);}',
							'.dark {background-color:#0e0900;color:#9eafc3;}'
						].join('');
						var eStyle = document.createElement('style');
						eStyle.id = 'minimalismStyle';
						eStyle.innerHTML = sMStyle;
						document.getElementsByTagName('head')[0].appendChild(eStyle);
						
						var sJson = JSON.stringify(JSON.parse(_pri.sData), 0, 4);
						return document.body.innerHTML = '<pre>' + _pri.strongKey(sJson) + '</pre>';
						return document.body.innerHTML = '<pre>' + sJson + '</pre>';
					}
				}
				if(_pri.sData && _pri.sData.length > 100000) {
					_pri.showJhLoadTips();
				}
				if(!bMiniMalism) {
				  document.documentElement.style = 'height: 100%;padding: 0;margin: 0;overflow: hidden;';
				  document.body && (document.body.style = 'height: 100%;padding: 0;margin: 0;');
				}

				var oView = document.createElement('iframe');
				oView.style.width = '100%';
				oView.style.height = '100%';
				oView.style.border = 'none';
				//oView.src = 'http://toy.ggg/chromeEx/test/content_iframe.html';
				oView.src = chrome.runtime.getURL("JSON-path/JSON-path.html");
				document.body.appendChild(oView);
				window.addEventListener("message", function (evt) {
					var sUrl = chrome.runtime.getURL('');
					if(evt.origin == sUrl.slice(0, -1)) {
						var $tipsLoading = document.querySelector('._tipsLoading');
						if (!$tipsLoading) {
							return;
						}
						if(evt.data.cmd === 'jhLoadedError') {
							$tipsLoading.firstChild.data = 'JSON-path throw a error msg : <br />' + evt.data.msg;
						}else{
							$tipsLoading.parentNode.removeChild($tipsLoading);
							var eS = document.getElementById('tipsStyle');
							if(eS) {
								eS.parentNode.removeChild(eS);
							}
						}
					}
				}, false);
			});

		};
		_init.apply(_pub, arguments);
		return _pub;
	};



	return _pub_static;
}()));
