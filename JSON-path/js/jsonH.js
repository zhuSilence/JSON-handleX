JH.mod.add(['jsonH.nav', 'listenResizeWin', 'ad', 'lang'], 'jsonH', function (modName, JH, $$) {

		var _interface = [];






		var _pri_static = {
			langOut : function (key) {},
			// _pri.oLang.getStr('msg_1')
			// .langID_msg_1
			langPack : {}
		};



		var _pro_static = {

		};


	var _pub_static = function (sJson) {
		var _checkArgs, _parseDOM, _init, _uiEvt, _custEvt, _airEvt, _main, _this = this, _args = arguments, _pri = {}, _pro = {}, _pub = {__varyContext_:function (pro, pub) {_pro = pro;_pub = pub;}}, _mod, _base, _parent;


		_pri["checkEvalAuthority"] = (function () {
			var _fun = function () {
				if(!_fun.isOk()) {
					$(_pri.node['jsObjEnterOk']).hide();
				}
			};

			//_fun["isOk"] = function () {
				//try{
					//Function('var a;');
				//}catch(e) {
					//return false;
				//}
				//return true;
			//};

			_fun["isOk"] = function () {
				return _pub_static.oIni.jsonEngine === 'JH-JSON';
				// return !~location.href.indexOf('chrome-extension:');
			};


			return _fun;

		}());

		_main = function () {
			_mod = JH.mod.init(_pub_static, _this, _pro, _pub, _pro_static, _interface, _base, _args);
			_pro = _mod.pro;
			_pub = _mod.pub;
			_parent = _mod.parent;

			_pri.checkEvalAuthority();


			//_pub_static.oIni.times = 1;
			if (_pub_static.oIni.jsonEngine === 'JSON') {
				JSON5 = JSON;
			}
			_pro.oTreeNav = $$.jsonH.nav('#jsonNav');
			_pro.oTreeNav.oIni = _pub_static.oIni;
			if(_pub_static.oIni.renderMode) {
				$('html').removeClass('rich').addClass(_pub_static.oIni.renderMode);
			}
			_pro.oTreeNav.buildCallback = function () {
				top.postMessage({
					cmd : 'jhLoadedOk'
				}, '*');
				// if(_pub_static.oIni.times % 20 === 0) {
					//var oAd = $$.ad().getAd(function (oAd) {
						//if(oAd) {
							//_pri.showAd(oAd);
							//_pub.showPanel();
						//}
					//});
				// }
				if(_pub_static.oIni.saveKeyStatus) {
					_pri.actCollapsePath();
				}
				// $('.elmBlock', JH.e('#jsonNav')).each(function (iIndex, eDiv) {
				// 	eDiv.title = JSON5.stringify(eDiv.oData,0,4);
				// });
			};
			_pro.oTreeNav.changeFlodCallback = function (bNotClearPathSave) {
				var aCollapsePath = bNotClearPathSave ? _pub_static.oIni.collapsePath : [];
				$('.elmBlock').each(function () {
					if(($(this).hasClass('array') || $(this).hasClass('object')) && !$(this).hasClass('open')) {
						aCollapsePath.push(this.getAttribute('nodePath'));
					}
				});
				//console.log(aCollapsePath);
				_pri.setIniRequest.send({
					collapsePath : aCollapsePath
				});
			};
			_pri.setIniRequest.send({
				times : ++_pub_static.oIni.times
				//console.log(_pub_static.oIni.times);
			});

			_pri.oTreeNavListener = JH.event.buildListener(_pub);

			_pri.oTreeNavListener.add(_pro.oTreeNav, 'clickElm', function (evt) {
				if(!_pri.holdPanelMode) {
					if(evt.evt
						&&  (
							(_pub_static.oIni.panelMode === 'leftClick' && evt.evt.which === 1)
							|| (_pub_static.oIni.panelMode === 'rightClick' && evt.evt.which === 3)
						)
					) {
						_pub.showPanel();
					}
				}
			});

			if(_pri.goEnterInput) {
				_pri.showEnterInputDialog(sJson);
			}else{
				try{
					_pub.oJson = JSON5.parse(sJson);
					_pro.oTreeNav.build(_pub.oJson);
				}catch(e) {
					var errorLine = e.lineNumber || null;
					var errorCol = e.columnNumber || null;
					_pri.showEnterInputDialog(sJson, e.message, errorLine, errorCol);
					top.postMessage({
						cmd : 'jhLoadedError',
						msg : e.message
					}, '*');
				}
			}

			_pub.checkIcoAsFolderBtn($('#icoAsFolder')[0]);
			_pub.checkShowValueInNav($('#showValueInNav')[0]);
			_pub.checkShowArrLeng($('#showArrLeng')[0]);
			_pub.checkShowIco($('#showIco')[0]);
			_pub.checkShowImg($('#showImg')[0]);


			_pub_static.language = _pub_static.oIni.lang;
			_pub.resetLang();

			var iSI = setInterval(function() {try{
				if(_pri.sTempShowValue != _pri.node['showValue'].value) {
					_pri.sTempShowValue = _pri.node['showValue'].value;
					_pri.node['showValue'].style.color = '#000';
					$('#msgBox').html('');
				}
			}catch(e) {alert(e);clearInterval(iSI);}},500);
			$$.listenResizeWin.add(_pri.resizeLayout);
			_pri.resizeLayout($$.listenResizeWin.checkResize());
			document.addEventListener('copy', function () {
				$('#copyTips').show();
				$('#copyTips').addClass('show');
				$('#copyTips').removeClass('hide');
				setTimeout(function() {
					$('#copyTips').removeClass('show');
					$('#copyTips').addClass('hide');
				});
				setTimeout(function() {
					$('#copyTips').hide();
				},3000);
			});




			if(_pub_static.oIni.times % 9 === 0) {
				_pri.getVer(function (iVer) {
					if(iVer !== _pub_static.oIni.adVer) {
						_pri.getAdData(_pub_static.oIni.times, function (oResp) {
							var oAdData = oResp.data;
							try{
								_pub_static.oIni.adList = oAdData.adList;
								_pub_static.oIni.adVer = oAdData.adVer;
								_pub_static.oIni.adIndex = 0;
								localStorage['jhIni'] = JSON.stringify(_pub_static.oIni);
							}catch(e) {}
						});
					}
				});
			}

			$('#panel').show();

		};



		_checkArgs = function () {
			if(!sJson) {
				_pri.goEnterInput = true;
			}
		};




		_parseDOM = function () {

			_pri.node = {
				showValue : JH.e('#showValue'),
				enterValue : JH.e('#enterValue'),
				undoBtn : JH.e('#undoBtn'),
				enterForm : JH.e('#enterForm'),
				minBtn : JH.e('#minBtn'),
				valueAct : JH.e('#valueAct'),
				panel : JH.e('#panel'),
				saveFile : JH.e('#saveFile'),
				enterInputTips : JH.e('#enterInputTips'),
				jsObjEnterOk : JH.e('#jsObjEnterOk'),
				copyValue : JH.e('#copyValue'),
				deURI : JH.e('#deURI'),
				deBase64 : JH.e('#deBase64'),
				aLine: JH.e('#aLine'),
				insertTemplateBtn : JH.e('#insertTemplateBtn'),
				saveAsTemplateBtn : JH.e('#saveAsTemplateBtn'),
				showPath : JH.e('#showPath'),
				copyTips : JH.e('#copy-tips'),
				rcmd : JH.e('#rcmd'),
				optBtn : JH.e('#optBtn'),
				closeAd : JH.e('#closeAd'),
				redoBtn : JH.e('#redoBtn')
			};
		};


		_uiEvt = function () {
			$('#saveBtn').on('click', _pri.uiEvtCallback.clickSaveBtn);
			$('#showIco').on('click', _pri.uiEvtCallback.clickShowIco);
			$('#icoAsFolder').on('click', _pri.uiEvtCallback.clickIcoAsFolder);
			$('#expandAll').on('click', _pri.uiEvtCallback.clickExpandAll);
			$('#expandCur').on('click', _pri.uiEvtCallback.clickExpandCur);
			$('#collapseAll').on('click', _pri.uiEvtCallback.clickCollapseAll);
			$('#gotoCur').on('click', _pri.uiEvtCallback.clickGotoCur);
			//$('#saveFile').on('click', _pri.uiEvtCallback.clickSaveFile);
			$('#showValueInNav').on('click', _pri.uiEvtCallback.clickShowValueInNav);
			$('#showArrLeng').on('click', _pri.uiEvtCallback.clickShowArrLeng);
			$('#showImg').on('click', _pri.uiEvtCallback.clickShowImg);
			$(_pri.node['undoBtn']).on('click', _pri.uiEvtCallback.clickUndoBtn);
			$(_pri.node['redoBtn']).on('click', _pri.uiEvtCallback.clickRedoBtn);
			$(_pri.node['minBtn']).on('click', _pri.uiEvtCallback.clickMinBtn);
			$(_pri.node['jsObjEnterOk']).on('click', _pri.uiEvtCallback.jsObjEnterOkClick);
			$(_pri.node['copyValue']).on('click', _pri.uiEvtCallback.clickCopyValue);
			$(_pri.node['deURI']).on('click', _pri.uiEvtCallback.clickDeURI);
			$(_pri.node['deBase64']).on('click', _pri.uiEvtCallback.clickDeBase64);
			$(_pri.node['aLine']).on('click', _pri.uiEvtCallback.clickALine);
			$(_pri.node['insertTemplateBtn']).on('click', _pri.uiEvtCallback.showTemplateDialog);
			$(_pri.node['saveAsTemplateBtn']).on('click', _pri.uiEvtCallback.saveAsTemplateBtn);
			$(_pri.node['showPath']).on('input', _pri.uiEvtCallback.inputShowPath);
			$(_pri.node['rcmd']).on('click', _pri.uiEvtCallback.clickRcmd);
			$(_pri.node['closeAd']).on('click', _pri.uiEvtCallback.clickCloseAd);
			$(_pri.node['optBtn']).on('click', _pri.uiEvtCallback.clickOptBtn);
			$(document).on('click', '.rcmdContent', _pri.uiEvtCallback.clickRcmdContent);

			$(_pri.node['enterForm']).on('submit', _pri.uiEvtCallback.submitEnterForm);
			$('#closeError').on('click', _pri.uiEvtCallback.clickCloseError);
			$('#sigh').on('click', _pri.uiEvtCallback.clickSigh);
			$('#showValue, #enterValue').on('focus', function () {
				if(!_pri.holdErrorTips) {
					$('#errorTips').hide();
				}
			});

		};




		_custEvt = function () {

		};




		_airEvt = function () {

		};

		_pri["Base64"] = {

			// private property
			_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

			// public method for encoding
			encode : function (input) {
				var output = "";
				var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
				var i = 0;

				input = _pri.Base64._utf8_encode(input);

				while (i < input.length) {

					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}

					output = output +
					this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
					this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

				}

				return output;
			},

			// public method for decoding
			decode : function (input) {
				var output = "";
				var chr1, chr2, chr3;
				var enc1, enc2, enc3, enc4;
				var i = 0;

				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				while (i < input.length) {

					enc1 = this._keyStr.indexOf(input.charAt(i++));
					enc2 = this._keyStr.indexOf(input.charAt(i++));
					enc3 = this._keyStr.indexOf(input.charAt(i++));
					enc4 = this._keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}

				}

				output = _pri.Base64._utf8_decode(output);

				return output;

			},

			// private method for UTF-8 encoding
			_utf8_encode : function (string) {
				string = string.replace(/\r\n/g,"\n");
				var utftext = "";

				for (var n = 0; n < string.length; n++) {

					var c = string.charCodeAt(n);

					if (c < 128) {
						utftext += String.fromCharCode(c);
					}
					else if((c > 127) && (c < 2048)) {
						utftext += String.fromCharCode((c >> 6) | 192);
						utftext += String.fromCharCode((c & 63) | 128);
					}
					else {
						utftext += String.fromCharCode((c >> 12) | 224);
						utftext += String.fromCharCode(((c >> 6) & 63) | 128);
						utftext += String.fromCharCode((c & 63) | 128);
					}

				}

				return utftext;
			},

			// private method for UTF-8 decoding
			_utf8_decode : function (utftext) {
				var string = "";
				var i = 0;
				var c = c1 = c2 = 0;

				while ( i < utftext.length ) {

					c = utftext.charCodeAt(i);

					if (c < 128) {
						string += String.fromCharCode(c);
						i++;
					}
					else if((c > 191) && (c < 224)) {
						c2 = utftext.charCodeAt(i+1);
						string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
						i += 2;
					}
					else {
						c2 = utftext.charCodeAt(i+1);
						c3 = utftext.charCodeAt(i+2);
						string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
						i += 3;
					}

				}

				return string;
			}

		};

		_pri["request"] = JH.request(_pub);

		_pub["showPanel"] = function (bIni) {
			$(_pri.node['panel']).removeClass('min');
			_pri.node['minBtn'].innerHTML = '◥';
			if(bIni) {
				setTimeout(function() {
					$(_pri.node['panel']).removeClass('disTransition');
				},500);
			}
		};

		_pub["hidePanel"] = function (bIni) {
			$(_pri.node['panel']).addClass('min');
			_pri.node['minBtn'].innerHTML = '◣';
			if(bIni) {
				setTimeout(function() {
					$(_pri.node['panel']).removeClass('disTransition');
				},500);
			}
		};

		_pri["strToObj"] = function (s) {
			// var sFun = 'var o = ' + s + ';return o;';
			// var f = new window['Functio'+'n'.toString()](sFun);
			// var o = f();
			var o = JSON5.parse(s);
			return o;
		};

		JH.mergePropertyFrom(_pri, {
			"setIniRequest" : _pri.request.create(JH.request.NS.jsonH, 'setIni'),
			"getAdData" : function (iTimes, cb) {
				//_pri.request.create(JH.request.NS.jsonH, 'getAdData', {
					//succeed : function (oAdData) {
						//cb(oAdData);
					//}
				//}).send({
					//url : 'http://jsonhandle-addondownload.stor.sinaapp.com/jh.json?times='+iTimes
				//});
			},
			"actCollapsePath" : function () {
				if(_pub_static.oIni.collapsePath) {
					_pub_static.oIni.collapsePath.forEach(function (sPath) {
						$('[nodepath]').each(function () {
							if(this.getAttribute('nodepath') === sPath) {
								$(this).removeClass('open');
							}
						});
					});
				}
			},
			"openTab" : function (url, cb) {
				_pri.request.create(JH.request.NS.jsonH, 'openTab', {
					succeed : function (oAdData) {
						cb && cb(oAdData);
					}
				}).send(url);
			},
			"uiEvtCallback" : {
				clickCopyValue : function () {
					var eV = $('<textarea></textarea>')[0];
					eV.value = JSON5.stringify($('#showValue').prop('oData'), 0, 4);
					if(eV.value[0] === '"' && eV.value.slice(-1) === '"') {
						eV.value = eV.value.slice(1, -1);
					}
					$('#hideBox').empty().append(eV);
					eV.select();
					document.execCommand('copy');
					$(eV).remove();
				},
				clickDeURI : function () {
					var eV = $('#showValue')[0];
					var sT = $('#showValue').prop('oData');
					try{
						var sR = decodeURIComponent(eV.value);
						eV.value = sR;
					}catch(e) {
						$('#deError').html('deURI error');
						$('#deError').addClass('show');
						$('#deError').removeClass('hide');
						setTimeout(function() {
							$('#deError').removeClass('show');
							$('#deError').addClass('hide');
						}, 3000);
					}
				},
				clickDeBase64 : function () {
					var eV = $('#showValue')[0];
					var sT = $('#showValue').prop('oData');
					try{
						var sR = _pri.Base64.decode(sT);
						if(typeof sT == 'string') {
							sR = '"' + sR + '"';
						}
						eV.value = sR;
					}catch(e) {
						$('#deError').html('deBase64 error');
						$('#deError').addClass('show');
						$('#deError').removeClass('hide');
						setTimeout(function() {
							$('#deError').removeClass('show');
							$('#deError').addClass('hide');
						}, 3000);
					}
				},
				clickALine : function () {
					var eV = $('#showValue')[0];
					eV.value = JSON5.stringify($('#showValue').prop('oData'));
				},
				showTemplateDialog: function showTemplateDialog() {
					loadTemplates(function(list) {
						// 遮罩
						var mask = document.createElement('div');
						mask.id = 'templateDialogMask';
						mask.style = 'position:fixed;z-index:9998;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.18);';
						document.body.appendChild(mask);
						// 弹窗
						var html = '<div id="templateDialog" style="position:fixed;z-index:9999;top:50%;left:50%;transform:translate(-50%,-50%);background:#fff;border-radius:10px;box-shadow:0 4px 24px #0002;padding:28px 28px 18px 28px;min-width:220px;max-width:90vw;min-height:80px;">';
						html += '<div style="position:absolute;top:10px;right:16px;cursor:pointer;font-size:20px;color:#888;" id="closeTemplateDialog">×</div>';
						html += '<h3 style="margin:0 0 18px 0;font-size:18px;text-align:center;">选择模板</h3>';
						html += '<div style="display:flex;flex-direction:column;gap:12px;align-items:stretch;">';
						for(var i=0;i<list.length;i++){
							html += '<button class="insertTemplateBtn" data-file="'+list[i].file+'" style="padding:8px 0;border-radius:6px;border:1px solid #ddd;background:#f7f7f7;font-size:15px;cursor:pointer;transition:background 0.2s;">'+list[i].name+'</button>';
						}
						html += '</div>';
						html += '</div>';
						$(document.body).append(html);
						// 按钮高亮
						$(document).on('mouseenter', '.insertTemplateBtn', function(){ $(this).css('background','#e6f7ff'); });
						$(document).on('mouseleave', '.insertTemplateBtn', function(){ $(this).css('background','#f7f7f7'); });
						// 事件绑定（只绑定一次）
						$(document).off('click.insertTemplateBtn').on('click.insertTemplateBtn', '.insertTemplateBtn', function(){
							var file = $(this).data('file');
							loadTemplateContent(file, function (content) {
								if(_pri.node.enterValue){
									_pri.node.enterValue.value = content;
								}
								$('#templateDialog').remove();
								$('#templateDialogMask').remove();
								$('#enterOk').click(); 
							});
						});
						// 关闭按钮
						$(document).off('click.closeTemplateDialog').on('click.closeTemplateDialog', '#closeTemplateDialog', function(){
							$('#templateDialog').remove();
							$('#templateDialogMask').remove();
						});
						// 点击遮罩关闭
						$('#templateDialogMask').off('click').on('click', function(){
							$('#templateDialog').remove();
							$('#templateDialogMask').remove();
						});
					});
				},
				saveAsTemplateBtn: function(){
					var name = prompt('请输入模板名称（中文/英文均可）');
					if(!name) return;
					// 生成文件名
					var file = name.replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, '_').replace(/\s+/g, '_').toLowerCase() + '.json';
					// 获取当前 JSON
					var jsonStr = '';
					if(_pri.node && _pri.node.enterValue){
						jsonStr = _pri.node.enterValue.value;
					}else if(document.getElementById('enterValue')){
						jsonStr = document.getElementById('enterValue').value;
					}
					// 下载 json 文件
					var blob = new Blob([jsonStr], {type: 'application/json'});
					var a = document.createElement('a');
					a.href = URL.createObjectURL(blob);
					a.download = file;
					a.style.display = 'none';
					document.body.appendChild(a);
					a.click();
					document.body.removeChild(a);
					// 更新 index.json 内容
					loadTemplates(function(list){
						list.push({name: name, file: file});
						var indexBlob = new Blob([JSON.stringify(list, null, 2)], {type: 'application/json'});
						var a2 = document.createElement('a');
						a2.href = URL.createObjectURL(indexBlob);
						a2.download = 'index.json';
						a2.style.display = 'none';
						document.body.appendChild(a2);
						a2.click();
						document.body.removeChild(a2);
						alert('模板已下载，请将新模板和 index.json 一起放入 templates 目录下。');
					});
				},
				inputShowPath: function(){
					var eV = $('#showValue')[0];
					let path = $('#showPath').val().replace('JSON', '$');
					eV.value = JSON5.stringify(jsonpath.query(_pro.oTreeNav.getData(), path), null, 2);
				},
				clickGotoCur : function () {
					var eCurr = _pro.oTreeNav.gotoCurrElm();
				},
				clickMinBtn : function () {
					_pri.holdPanelMode = true;
					if($(_pri.node['panel']).hasClass('min')) {
						_pub.showPanel();
					}else{
						_pub.hidePanel();
					}
				},
				clickRcmdContent : function () {
					_pri.shootAd(this.getAttribute('data-id'));
				},
				clickRcmd : function (evt) {
					_pri.showAdTips();
					if(evt.target.id === 'closeAd') {
						evt.stopPropagation();
					}else if(evt.target.className === 'adHelp') {
						evt.preventDefault();
						_pri.openTab(evt.target.href);
					}
				},
				clickOptBtn : function (evt) {
					_pri.openTab('options.html');
				},
				clickCloseAd : function (evt) {
					_pri.showAdTips();
				},
				jsObjEnterOkClick : function () {
					_pri.inputFormatIsJsObj = true;
					// if(confirm('! Make sure the code is secure, The code will run as javascript !\n! 请确保内容是安全�? 输入内容将按javascript脚本执行 !')) {
						_pri.uiEvtCallback.submitEnterForm();
					// }
				},
				submitEnterForm : function (evt) {
					if(evt) {
						evt.preventDefault();
					}
					_pri.hasError = false;

					var sData = _pri.node['enterValue'].value;
					var sTxt;
					if(_pri.inputFormatIsJsObj) {
						try{
							sTxt = JSON.stringify(_pri.strToObj(sData));
						}catch(e) {
							_pri.node['enterValue'].style.color = 'red';
							_pri.hasError = true;
							alert(e.message);
							_pri.inputFormatIsJsObj = false;
							return false;
						}

					}
					sTxt = sTxt || _pri.filterStrFormat(sData);
					var oD;
					try{
						JSON.parse(sTxt);
						_pro.oTreeNav.build(JSON5.parse(sTxt));
						_pri.hideEnterInputDialog();
					}catch(e) {
						try{
							var sTempData = sData.slice(sData.indexOf('(')+1, sData.lastIndexOf(')'));
							JSON.parse(sTempData);
							_pro.oTreeNav.build(JSON5.parse(sTempData));
							_pri.hideEnterInputDialog();
						}catch(e) {
							_pri.node['enterInputTips'].style.color = 'red';
							_pri.showErrorTips(sData);
							_pri.hasError = true;
						}
					}
					if(_pub_static.oIni.panelMode === 'always') {
						_pub.showPanel(true);
					}else{
						_pub.hidePanel(true);
					}

					if(!_pri.hasError) {
						$('#errorTips, #sigh').hide();
					}else{
						$('#errorTips, #sigh').show();
					}

					_pri.inputFormatIsJsObj = false;
					return false;
				},
				clickUndoBtn : function () {
					_pri.historyGoBack();
				},
				clickSaveFile : function () {
					//this.disabled = false;
				},
				clickRedoBtn : function () {
					_pri.historyGoForward();
				},
				clickSaveBtn : function () {
					var sCurId, sEval, eCurId = _pro.oTreeNav.getCur(), oResult;
					if(!eCurId) {
						_pri.showMsg(_pri.oLang.getStr('msg_1'));
						return false;
					}
					sCurId = eCurId.id;
					var oData = _pro.oTreeNav.getData();
					var oHistoryData = oData;
					_pri.hasError = false;
					try{
						//eval('(' + $('#showValue').val() + ');');
						var sTxt = _pri.filterStrFormat($('#showValue').val());
						// JSON.parse(sTxt);
						oResult = JSON5.parse(sTxt);
						//debugger;
						if($('#showKey').val() !== $('#showKey').attr('oldValue')) {
							var sNewKey = $('#showKey').val().replace(/\'/g, '\\\'');
							sEval = 'delete ' + 'oData' + $('#showPath').val().slice(4) + ';' + 'oData' + $('#showPath').attr('parentpath').slice(4) + "['" + sNewKey + "']" ;
						}else{
							sEval = $('#showPath').val();
							if(sEval[4] === '[') {
								sEval = sEval.slice(5).replace(']', '');
							}else{
								sEval = sEval.slice(5);
							}

						}


						_pri.pushToHistory([oHistoryData, sCurId]);
						_pri.node['undoBtn'].style.visibility = 'visible';
						_pri.node['redoBtn'].style.visibility = 'hidden';
						if(sEval) {
							JH.setTo(oResult, sEval, oData);
						}else{
							oData = oResult;
						}
						//console.log(sEval+'| '+oResult+'| '+ oData);
						//eval(sEval);
						sCurId = _pro.oTreeNav.getCur().id;
						//debugger;
						_pro.oTreeNav.build(oData);
						_pro.oTreeNav.collapseAll();
						_pro.oTreeNav.expandCur(sCurId);
						_pri.node['saveFile'].disabled = false;
					}catch(e) {
						_pri.hasError = true;
						$('#msgBox').html(_pri.oLang.getStr('msg_2'));
						_pri.sTempShowValue = _pri.node['showValue'].value;
						$('#showValue').css('color', 'red');
						_pri.showErrorTips(_pri.sTempShowValue);
					}
					if(!_pri.hasError) {
						$('#errorTips, #sigh').hide();
					}else{
						$('#errorTips, #sigh').show();
					}
				},
				clickShowImg : function () {
					_pri.setIniRequest.send({
						showImg : _pub.checkShowImg(this)
					});
				},
				clickShowValueInNav : function () {
					_pri.setIniRequest.send({
						showValue : _pub.checkShowValueInNav(this)
					});
				},
				clickShowArrLeng : function () {
					_pri.setIniRequest.send({
						showArrLeng : _pub.checkShowArrLeng(this)
					});
				},
				clickShowIco : function () {
					_pri.setIniRequest.send({
						showIco : _pub.checkShowIco(this)
					});
				},
				clickIcoAsFolder : function () {
					_pri.setIniRequest.send({
						showStyle : _pub.checkIcoAsFolderBtn(this) ? 'folder' : ''
					});
				},
				clickExpandAll : function () {
					_pro.oTreeNav.expandAll(this);
				},
				clickExpandCur : function () {
					var eCur = _pro.oTreeNav.getCur();
					if(eCur) {
						_pro.oTreeNav.collapseAll();
						_pro.oTreeNav.expandCur();
					}else{
						_pri.showMsg(_pri.oLang.getStr('msg_1'));
					}

				},
				clickCollapseAll : function () {
					_pro.oTreeNav.collapseAll();
				},
				clickCloseError : function () {
					$('#errorTips').toggle();
				},
				clickSigh : function () {
					$('#errorTips').toggle();
					_pri.holdErrorTips = true;
				}
			},
			"shootAd" : function (id) {
				_pub_static.oIni.adShoot[id] = true;
				_pri.setIniRequest.send({
					adShoot : _pub_static.oIni.adShoot
				});
			},
			"getVer" : function (cb) {
				//var sStatsPicUrl = 'http://jsonhandle-addondownload.stor.sinaapp.com/jh.png';
				//var eImg = new Image();
				//eImg.src = sStatsPicUrl;
				//eImg.onload = function () {
					//var iVer = eImg.width * eImg.height;
					//cb(iVer);
				//};
			},
			"resizeLayout" : function (oWH) {
				$('#showValue').height(oWH.height * 0.8 - 220);
			},
			"showAdTips" : function () {
				$(_pri.node.rcmd).addClass('tips').empty().append(JH.parseHTML('<a href="'+(_pub_static.oIni.jhPath||'')+'../options.html#ad" target="_blank" class="adHelp langID_msg_11">'+_pri.oLang.getStr('msg_11')+'</a>'));
			},
			"showAd" : function (oAd) {
				$(_pri.node.rcmd).append(JH.parseHTML('<a href="'+oAd.url+'" target="_blank" class="rcmdContent" data-id="'+oAd.id+'" title="'+oAd.title+'"><img src="'+oAd.pic+'" /></a><button id="closeAd">☓</button>'));
			},
			"filterStrFormat" : function (s) {
				s = s.replace(/^\s+/, '').replace(/\s+$/, '');
				if(s.substr(0, 1) === '"' && s.substr(-1, 1) === '"') {
					s = s.replace(/\n/g, '\\n').replace(/\r/g, '').replace(/\t/g, '\\t');
				}
				return s;
			},
			"encodeToXMLchar" : function (sValue) {
				return sValue.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;').replace(/\"/g,'&quot;');
			},
			"pushToHistory" : function (aData) {
				// [oData, sCurId]
				_pri.historyBackData = [JSON5.parse(JSON5.stringify(aData[0])), aData[1]];
			},
			"showErrorTips" : function (sJson) {
				var oJsonCheck = oLineCode(sJson);
				if(oJsonCheck.oError) {
					var s = _pri.oLang.getStr('msg_4') + _pri.oLang.getStr('msg_5', oJsonCheck.oError.line+1) + ' : ' + '<span id="errorTarget">'+_pri.encodeToXMLchar(oJsonCheck.oError.lineText)+'</span>';
					$('#tipsBox').html(s);
					_pri["holdErrorTips"] = false;
				}else{
					//alert('ok');
				}
				$('#errorCode').html(oJsonCheck.dom);
			},
			"historyGoBack" : function () {
				if(_pri.historyBackData) {
					_pri.historyForwardData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
					_pro.oTreeNav.build(_pri.historyBackData[0]);
					_pro.oTreeNav.expandCur(_pri.historyBackData[1]);
					_pri.node['undoBtn'].style.visibility = 'hidden';
					_pri.node['redoBtn'].style.visibility = 'visible';
				}
			},
			"historyGoForward" : function () {
				if(_pri.historyForwardData) {
					_pri.historyBackData = [_pro.oTreeNav.getData(), _pro.oTreeNav.getCur().id];
					_pro.oTreeNav.build(_pri.historyForwardData[0]);
					_pro.oTreeNav.expandCur(_pri.historyForwardData[1]);
					_pri.node['undoBtn'].style.visibility = 'visible';
					_pri.node['redoBtn'].style.visibility = 'hidden';
				}
			},
			"showMsg" : function (sMsg) {
				$('#msgBox').html(sMsg);
				clearTimeout(_pri.showMsg.iS);
				_pri.showMsg.iS = setTimeout(function() {
					$('#msgBox').html('');
				},4000);
			},
			"showEnterInputDialog" : function (sJson, errorMsg, errorLine, errorCol) {
				var setValue = function(jsonStr) {
					$('#mask').show();
					_pri.node['enterValue'].value = jsonStr;
					// 错误提示
					if(errorMsg) {
						var msg = '<span style="color:red;font-weight:bold;">'+(_pri.oLang ? _pri.oLang.getStr('msg_4') : 'JSON格式错误')+'</span>';
						if(errorLine && errorCol) {
							msg += '<br><span style="color:red;">'+(_pri.oLang ? (_pri.oLang.getStr('msg_5', '', errorLine) + '，第'+errorCol+'列') : ('@第'+errorLine+'行，第'+errorCol+'列'))+'</span>';
						}
						msg += '<br><span style="color:red;">'+errorMsg+'</span>';
						$(_pri.node['enterInputTips']).html('Input JSON String...<br>'+msg);
						// 高亮输入框错误位置
						var lines = jsonStr.split('\n');
						var pos = 0;
						for(var i=0;i<errorLine-1;i++) pos += lines[i].length+1;
						pos += (errorCol?errorCol-1:0);
						var input = _pri.node['enterValue'];
						if(input.setSelectionRange) {
							input.focus();
							input.setSelectionRange(pos, pos+1);
						}
					} else {
						$(_pri.node['enterInputTips']).html('Input JSON String...');
					}
				};
				if (!sJson) {
					loadDefaultJson(setValue);
				} else {
					setValue(sJson);
				}
			},
			"hideEnterInputDialog" : function () {
				$('#mask').hide();
			}

		});

		JH.mergePropertyFrom(_pro, {



		});

		JH.mergePropertyFrom(_pub, {

			"resetLang" : function () {
				_pri.oLang = $$.lang(_pub_static.language);
				_pri.oLang.setPage();
				//_pri.oLang.switchLang(sLang).setPage();
			},
			"langStr" : function (sId) {
				var sL = _pub_static.language || 'en';
				return _pri_static.langPack[sL][sId];
			},
			"checkShowValueInNav" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').addClass('showValueInNav');
				}else{
					$('#jsonNav').removeClass('showValueInNav');
				}
				return elm.checked;
			},
			"checkShowArrLeng" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').addClass('show-leng');
				}else{
					$('#jsonNav').removeClass('show-leng');
				}

				$('#jsonNav').addClass('lengMode-'+_pub_static.oIni.showLengthMode);
				return elm.checked;
			},
			"checkShowImg" : function (elm) {
				//elm.typeShow = _pub_static.oIni.showImgMode;
				if(elm.checked) {
					_pro.oTreeNav.showAllImg = true;
					$('#jsonNav').addClass('showImg');
					if(_pub_static.oIni.showImgMode === 'all') {
						$('#jsonNav').removeClass('hover-show-img');
						if(!$('#jsonNav').hasClass('hasLoadedValueImg')) {
							_pro.oTreeNav.renderValueImg();
						}
					}else{
						$('#jsonNav').addClass('hover-show-img');
						$('#jsonNav').on('mouseenter', '.elmSpan .value', function () {
							if(!$(this).hasClass('check-img')) {
								$(this).addClass('check-img');
								_pro.oTreeNav.checkValueImg(this);
							}
						});
					}
				}else{
					$('#jsonNav').removeClass('showImg');
				}
				return elm.checked;
			},
			"checkShowIco" : function (elm) {
				if(elm.checked) {
					$('#jsonNav').removeClass('noIco');
					$('#showIcoAsFolder').show();
				}else{
					$('#jsonNav').addClass('noIco');
					$('#showIcoAsFolder').hide();
				}
				return elm.checked;
			},
			"checkIcoAsFolderBtn" : function (elm) {
				if(elm.checked && $('#showIco')[0].checked) {
					$('#jsonNav').addClass('folderIco');
					$('#showIcoAsFolder').show();
				}else{
					$('#jsonNav').removeClass('folderIco');
				}
				return elm.checked;
			},
			"destroy" : function(){
				if(_pub) {


					_pri = _pro = _pub = null;
				}
			}

		});



		_init= function(){
			if(_checkArgs()) {
				return false;
			}
			_parseDOM();
			_main();
			_uiEvt();
			_custEvt();
			_airEvt();
		};
		_init();



		// 新增：模板插入功能
		function loadTemplates(callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'templates/index.json', true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						try {
							var list = JSON.parse(xhr.responseText);
							callback(list);
						} catch (e) {
							callback([]);
						}
					} else {
						callback([]);
					}
				}
			};
			xhr.send();
		}
		function loadTemplateContent(filename, callback) {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', 'templates/' + filename, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						callback(xhr.responseText);
					} else {
						callback('');
					}
				}
			};
			xhr.send();
		}

		return _pub;

	};

	return JH.mergePropertyFrom(_pub_static, {

		language : 'en'

	});
});

// 新增：异步加载默认 JSON
function loadDefaultJson(callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'init.json', true);
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status === 200) {
				callback(xhr.responseText);
			} else {
				callback('{\n    "l1": {\n        "l1_1": [\n            "l1_1_1",\n            "l1_1_2"\n        ],\n        "l1_2": {\n            "l1_2_1": 121\n        }\n    },\n    "l2": {\n        "l2_1": null,\n        "l2_2": true,\n        "l2_3": {}\n    }\n}'); // 兜底
			}
		}
	};
	xhr.send();
}
