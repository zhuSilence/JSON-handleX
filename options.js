(function (_pub) {
	"use strict";
	var _pri = {},
		_pro = {};

	_pri = {
		oIni: {},
		_init: function () {
			_pri.request.getIni.send();
			_pri.bindEvt();
			_pri.initLang();
		},

		request: {
			getIni: {
				send: function () {
					chrome.runtime.sendMessage({
						cmd: 'getIni'
					}, function (oIni) {
						_pri.oIni = oIni;
						_pri.setOpt(oIni);
					});
				}
			},
			setIni: {
				send: function (data) {
					chrome.runtime.sendMessage({
						cmd: 'setIni',
						oIni: data
					});
				}
			}
		},

		initLang: function () {
			var oLang = {
				'en': {
					'saveOpt': 'Save Options',
					'autoDecode': 'Auto Decode URL',
					'useCustStyle': 'Use Custom Style',
					'custStyle': 'Style:',
					'openJson': 'Open In New Tab',
					'minMode': 'Minimalist Mode'
				},
				'zh_CN': {
					'saveOpt': '保存设置',
					'autoDecode': '对URL自动解码',
					'useCustStyle': '使用自定义样式',
					'custStyle': '样式:',
					'openJson': '在新窗口打开',
					'minMode': '极简模式'
				},
				'zh_TW': {
					'saveOpt': '儲存設定',
					'autoDecode': '對URL自動解碼',
					'useCustStyle': '使用自定義樣式',
					'custStyle': '樣式:',
					'openJson': '在新視窗打開',
					'minMode': '極簡模式'
				}
			};
			var sLang = navigator.language;
			if (sLang !== 'zh_CN' && sLang !== 'zh_TW') {
				sLang = 'en';
			}

			_pri.oIni.lang = oLang[sLang];
		},
		bindEvt: function () {
			var fEvt = _pri.uiEvt,
				oUi = _pri.ui;

			document.body.addEventListener('click', fEvt, false);

		},
		uiEvt: function (e) {
			var oElm = e.target,
				sId = oElm.id;
			if (sId) {
				var fCb = _pri.uiEvtCallback['click' + sId.replace(/^\w/, function (s) {
					return s.toUpperCase()
				})];
				fCb && fCb.call(oElm);
			}

		},
		setOpt: function (oIni) {
			document.getElementById('saveBtn').value = _pri.oIni.lang.saveOpt;
			document.getElementById('autoDecode').innerHTML = _pri.oIni.lang.autoDecode;
			document.getElementById('useCustStyle').innerHTML = _pri.oIni.lang.useCustStyle;
			document.getElementById('custStyleTip').innerHTML = _pri.oIni.lang.custStyle;
			document.getElementById('open').innerHTML = _pri.oIni.lang.openJson;
			document.getElementById('minMode').innerHTML = _pri.oIni.lang.minMode;

			document.getElementById('autoDecode').previousElementSibling.checked = oIni.autoDecode;
			document.getElementById('useCustStyle').previousElementSibling.checked = oIni.useCustStyle;
			document.getElementById('custStyle').value = oIni.custStyle;
			document.getElementById('minMode').previousElementSibling.checked = oIni.minMode;

		},
		changeIni: function (sKey, sValue) {
			var o = {};
			o[sKey] = sValue;
			_pri.oIni[sKey] = sValue;
			_pri.request.setIni.send(o);
		},
		uiEvtCallback: {
			clickSaveBtn: function () {
				var oPost = {};
				oPost.autoDecode = document.getElementById('autoDecode').previousElementSibling.checked;
				oPost.useCustStyle = document.getElementById('useCustStyle').previousElementSibling.checked;
				oPost.custStyle = document.getElementById('custStyle').value;
				oPost.minMode = document.getElementById('minMode').previousElementSibling.checked;

				_pri.request.setIni.send(oPost);

				var oSaveOk = document.getElementById('saveOk');
				oSaveOk.style.opacity = 1;
				setTimeout(function () {
					oSaveOk.style.opacity = 0;
				}, 1e3);
			},
			clickOpen: function () {
				var jsonH_url = chrome.runtime.getURL("JSON-path/JSON-path.html");
				chrome.tabs.create({
					"url": jsonH_url,
					"selected": true
				});
			}
		}
	};
	_pub.init = _pri._init;

}(window.jhOpt = {}));


document.addEventListener('DOMContentLoaded', function () {
	window.jhOpt.init();
});






