window.__require=function e(t,a,i){function r(n,o){if(!a[n]){if(!t[n]){var c=n.split("/");if(c=c[c.length-1],!t[c]){var l="function"==typeof __require&&__require;if(!o&&l)return l(c,!0);if(s)return s(c,!0);throw new Error("Cannot find module '"+n+"'")}n=c}var d=a[n]={exports:{}};t[n][0].call(d.exports,function(e){return r(t[n][1][e]||e)},d,d.exports,e,t,a,i)}return a[n].exports}for(var s="function"==typeof __require&&__require,n=0;n<i.length;n++)r(i[n]);return r}({1:[function(e,t){var a=e("./package.json").version,i="en",r="jp",s={jp:{play:"\u30b9\u30bf\u30fc\u30c8"},en:{play:"Play Now!"}},n=500;function o(){console.log("H5ad v"+a),this._isInitialised=!1,this._splashAdShown=!1}function c(e){for(var t in e=e||{})void 0===e[t]&&delete e[t];return e}function l(e,t){console.error(e),(t=t||{}).noBreak?t.noBreak():(t.beforeBreak&&t.beforeBreak(),t.afterBreak&&t.afterBreak())}function d(){if(!navigator.language)return r;var e=navigator.language.toLowerCase().substr(0,2);return s[e]?e:i}o.prototype.initialize=function(e){if(this._isInitialised)console.warn("h5ad: already initialized");else{this._isInitialised=!0,e&&void 0!==e.adBreakTimeout&&(n=e.adBreakTimeout),adConfig=window.adConfig=function(){};var t=document.createElement("script");t.src="https://html5gameportal.com/embeds/wortal-1.0.0.js",t.async=!0,document.head.appendChild(t),t.addEventListener("load",()=>{window.initWortal(function(){adConfig({preloadAdBreaks:"on",sound:"on"}),console.log("Wortal setup complete!")})})}},o.prototype.onStart=function(e){if(e=e||{},this._isInitialised||this.initialize({adBreakTimeout:e.adBreakTimeout}),this._splashAdShown)console.warn("h5ad: onStart has already been called");else{this._splashAdShown=!0;var t="";t+=".splahContainer {",t+="    background-color: black;",t+="    position: absolute;",t+="    width: 100%;",t+="    height: 100%;",t+="    text-align: left;",t+="}",t+=".splahContainer .gameIcon {",t+="    position: relative;",t+="    width: 100px;",t+="    height: 100px;",t+="    background-size: 100%;",t+="    transform: translate(-50%, -100%);",t+="    left: 50%;",t+="    top: 31%;",t+="    border-radius: 10px;",t+="    border: 2px white solid;",t+="    border-radius: min(2vh,2vw);",t+="    border: min(0.7vw, 0.7vh) white solid;",t+="    width: min(30vw, 20vh);",t+="    height: min(30vw, 20vh);",t+="}",t+=".splahContainer .startButton {",t+="    background-color: rgb(255, 193, 7);",t+="    padding: 20px 30px;",t+="    border-radius: 13px;",t+="    transform: translate(-50%, 100%);",t+="    left: 50%;",t+="    top: 40%;",t+="    border: 5px solid white;",t+="    position: relative;",t+="    cursor: pointer;",t+="    font-size: 26px;",t+="    font-family: arial, verdana;",t+="    color: white;",t+="    text-align: center;",t+="    transition: all 0.1s;",t+="    width: min(50vw,27vh);",t+="    padding: min(3vw,3vh);",t+="    font-size: min(4vh,9vw);",t+="    border-radius: min(2vh,2vw);",t+="    border: min(1vw, 1vh) white solid;",t+="}",t+=".splahContainer .startButton:hover {",t+="    transform: translate(-50%, 100%) scale(1.1);",t+="    background-color: rgb(255 217 104);",t+="}";var a=document.createElement("style");a.styleSheet?a.styleSheet.cssText=t:a.appendChild(document.createTextNode(t)),document.getElementsByTagName("head")[0].appendChild(a);var i=document.createElement("div");e.color&&(i.style.backgroundColor=e.color),i.className="splahContainer";var r=document.createElement("div");r.textContent=s[d()].play,r.className="startButton",i.appendChild(r);var o=document.createElement("div");o.className="gameIcon",e.icon&&(o.style.backgroundImage="url("+e.icon+")"),i.appendChild(o),document.body.appendChild(i),r.onclick=function(){afterBreakCallbackCalled=!1;var t=setTimeout(function(){afterBreakCallbackCalled||(afterBreakCallbackCalled=!0,e.afterBreak&&e.afterBreak())},n);try{adBreak(c({type:"start",name:e.name||"splash_screen",beforeAd:function(){clearTimeout(t)},afterAd:function(){afterBreakCallbackCalled||(afterBreakCallbackCalled=!0,e.afterBreak&&e.afterBreak())}}))}catch(a){l(a,e)}setTimeout(function(){document.body.removeChild(i)},200)}}},o.prototype.onNext=function(e){(e=e||{}).type="next",this.adBreak(e)},o.prototype.onBrowse=function(e){(e=e||{}).type="browse",this.adBreak(e)},o.prototype.onPause=function(e){(e=e||{}).type="pause",this.adBreak(e)},o.prototype.onReward=function(e){(e=e||{}).type="reward",this.adBreak(e)},o.prototype.adBreak=function(e){var t,a=(e=e||{}).type;if(-1===["next","browse","pause","reward"].indexOf(a))return console.error("H5ad: unknown type",a);t=setTimeout(function(){e.noBreak&&e.noBreak()},n);try{adBreak(c({type:a,name:e.name||a,beforeAd:function(){t&&clearTimeout(t),e.beforeBreak&&e.beforeBreak()},afterAd:e.afterBreak,beforeReward:e.beforeReward,adDismissed:"reward"===a?e.adDismissed||function(){}:void 0,adViewed:e.adViewed}))}catch(i){l(i,e)}},o.prototype.onMute=function(){adConfig({sound:"off"})},o.prototype.onUnmute=function(){adConfig({sound:"on"})},t.exports=new o},{"./package.json":2}],2:[function(e,t){t.exports={name:"h5ad",version:"1.1.3",description:"Ad API wrapper for GC Turbo hyper casual games",main:"index.js",scripts:{},repository:{type:"git",url:"git+https://github.com/gc-turbo/h5ad.git"},author:"GC Turbo",license:"",bugs:{url:"https://github.com/gc-turbo/h5ad/issues"},homepage:"https://github.com/gc-turbo/h5ad#readme"}},{}],AdsHelper:[function(e,t){"use strict";cc._RF.push(t,"aa087CJBdZLOa4hBdrtzszi","AdsHelper");var a=e("h5ad"),i=e("./AnalyticHelper"),r=function(){function e(){this.interstitialLoadedCallback=null,this.interstitialFailedCallback=null,this.interstitialShownCallback=null,this.interstitialClickedCallback=null,this.interstitialDismissedCallback=null,this._removeAllRewardedAdsCallback(),this._retryRewardedAdsHTML5Count=0,this._isDebug=!1}var t=e.prototype;return t.prepareAllAds=function(){var e=this;cc.sys.isBrowser?(setTimeout(function(){e.prepareInterstitialAds()},1e3),this.prepareRewardedAds()):(this.prepareInterstitialAds(),this.prepareRewardedAds())},t.prepareInterstitialAds=function(e){switch(this._getPlatform()){case"android":jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager","prepareInterstitialAds","()V");break;case"ios":jsb.reflection.callStaticMethod("AdManager","prepareInterstitialAds");break;case"browser":this._prepareHTML5InterstitialAds(e.type||"browse");break;default:console.error("Not support ads for platform")}},t.showInterstitial=function(e){if(e&&(this.interstitialLoadedCallback=e.onInterstitialLoaded,this.interstitialFailedCallback=e.onInterstitialFailed,this.interstitialShownCallback=e.onInterstitialShown,this.interstitialClickedCallback=e.onInterstitialClicked,this.interstitialDismissedCallback=e.onInterstitialDismissed),this._isDebug)return this.onInterstitialDismissed();switch(this._getPlatform()){case"android":jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager","showInterstitial","()V");break;case"ios":jsb.reflection.callStaticMethod("AdManager","showInterstitial");break;case"browser":this._showHTML5InterstitialAds({type:e.type,gameFeature:e.gameFeature});break;default:console.error("Not support ads for platform"),this.onInterstitialDismissed()}},t.onInterstitialLoaded=function(){this.interstitialLoadedCallback&&this.interstitialLoadedCallback(),this.interstitialLoadedCallback=null},t.onInterstitialFailed=function(){this.interstitialFailedCallback&&this.interstitialFailedCallback(),this.interstitialFailedCallback=null},t.onInterstitialShown=function(){cc.director.pause(),cc.audioEngine.pauseAll(),this.interstitialShownCallback&&this.interstitialShownCallback(),this.interstitialShownCallback=null},t.onInterstitialClicked=function(){this.interstitialClickedCallback&&this.interstitialClickedCallback(),this.interstitialClickedCallback=null},t.onInterstitialDismissed=function(){cc.director.resume(),cc.audioEngine.resumeAll(),this.interstitialDismissedCallback&&this.interstitialDismissedCallback(),this.interstitialDismissedCallback=null},t.prepareRewardedAds=function(){switch(this._getPlatform()){case"android":jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager","prepareRewardedAds","()V");break;case"ios":jsb.reflection.callStaticMethod("AdManager","prepareRewardedAds");break;case"browser":this._prepareHTML5RewardedAds();break;default:console.error("Not support ads for platform")}},t.hasRewardedAds=function(){if(this._isDebug)return!0;var e=!1;switch(this._getPlatform()){case"android":e=jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager","hasRewardedAds","()Z");break;case"ios":e=jsb.reflection.callStaticMethod("AdManager","hasRewardedAds");break;case"browser":e=this._hasHTML5RewardedAds();break;default:console.error("Not support ads for platform"),e=!0}return e},t.showRewardedAds=function(e){if(e&&(this.rewardedAdLoadSuccessCallback=e.onRewardedAdLoadSuccess,this.rewardedAdLoadFailureCallback=e.onRewardedAdLoadFailure,this.rewardedAdStartedCallback=e.onRewardedAdStarted,this.rewardedAdShowErrorCallback=e.onRewardedAdShowError,this.rewardedAdClickedCallback=e.onRewardedAdClicked,this.rewardedAdClosedCallback=e.onRewardedAdClosed,this.rewardedAdCompletedCallback=e.onRewardedAdCompleted),this._isDebug)this.onRewardedAdCompleted();else switch(this._getPlatform()){case"android":jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AdManager","showRewardedAds","()V");break;case"ios":jsb.reflection.callStaticMethod("AdManager","showRewardedAds");break;case"browser":this._showHTML5RewardedAds({gameFeature:e.gameFeature});break;default:console.error("Not support ads for platform"),this.onRewardedAdClosed()}},t.onRewardedAdLoadSuccess=function(){this.rewardedAdLoadSuccessCallback&&this.rewardedAdLoadSuccessCallback(),this.rewardedAdLoadSuccessCallback=null},t.onRewardedAdLoadFailure=function(){cc.director.resume(),cc.audioEngine.resumeAll(),this.rewardedAdLoadFailureCallback&&this.rewardedAdLoadFailureCallback(),this._removeAllRewardedAdsCallback()},t.onRewardedAdStarted=function(){cc.director.pause(),cc.audioEngine.pauseAll(),this.rewardedAdStartedCallback&&this.rewardedAdStartedCallback(),this.rewardedAdStartedCallback=null},t.onRewardedAdShowError=function(){cc.director.resume(),cc.audioEngine.resumeAll(),this.rewardedAdShowErrorCallback&&this.rewardedAdShowErrorCallback(),this.rewardedAdShowErrorCallback=null},t.onRewardedAdClicked=function(){this.rewardedAdClickedCallback&&this.rewardedAdClickedCallback(),this.rewardedAdClickedCallback=null},t.onRewardedAdClosed=function(){cc.director.resume(),cc.audioEngine.resumeAll(),this.rewardedAdClosedCallback&&this.rewardedAdClosedCallback(),this._removeAllRewardedAdsCallback()},t.onRewardedAdCompleted=function(){cc.director.resume(),cc.audioEngine.resumeAll(),this.rewardedAdCompletedCallback&&this.rewardedAdCompletedCallback(),this.rewardedAdCompletedCallback=null},t._removeAllRewardedAdsCallback=function(){this.rewardedAdLoadSuccessCallback=null,this.rewardedAdLoadFailureCallback=null,this.rewardedAdStartedCallback=null,this.rewardedAdShowErrorCallback=null,this.rewardedAdClickedCallback=null,this.rewardedAdClosedCallback=null,this.rewardedAdCompletedCallback=null},t.showHTML5Intro=function(e){a.onStart({icon:this._getHTML5ResourceUrl("icon"),color:"rgb(255 226 128)",adBreakTimeout:3e3,afterBreak:function(){return e&&e()}}),this._hasShowHTML5Intro=!0},t._prepareHTML5InterstitialAds=function(e){this._showHTML5InterstitialAds({type:e})},t._showHTML5InterstitialAds=function(e){var t=this;a.adBreak({type:e.type||"browse",beforeBreak:function(){t.onInterstitialShown();var a={adType:"Interstitial"};a.gameFeature=e.gameFeature||"Interstitial_"+type,i.gtaPushEvent("AdShowSuccess",a)},afterBreak:function(){t.onInterstitialDismissed(),setTimeout(function(){t._prepareHTML5InterstitialAds(e.type||"browse")},1e3)},noBreak:function(){return t.onInterstitialDismissed()}})},t._prepareHTML5RewardedAds=function(){var e=this;this._rewardedAdsFunc||(this._prepareRewardedAdsInterval&&clearInterval(this._prepareRewardedAdsInterval),this._prepareRewardedAdsInterval=null,this._prepareRewardedAdsInterval=setInterval(function(){a.onReward({beforeReward:function(t){e._prepareRewardedAdsInterval&&clearInterval(e._prepareRewardedAdsInterval),e._prepareRewardedAdsInterval=null,e._rewardedAdsFunc=t,e.onRewardedAdLoadSuccess()},beforeBreak:function(){return e.onRewardedAdStarted()},adComplete:function(){return e.onRewardedAdCompleted()},adViewed:function(){return e.onRewardedAdCompleted()},afterBreak:function(){e._rewardedAdsFunc=null,e.onRewardedAdClosed(),e._prepareHTML5RewardedAds()}})},250))},t._showHTML5RewardedAds=function(e){var t=this;if(this._rewardedAdsFunc){clearInterval(this._retryRewardedAdsHTML5Process),this._retryRewardedAdsHTML5Count=0,this._rewardedAdsFunc();var a={adType:"RewardedAds"};a.gameFeature=e.gameFeature||"RewardedAds",i.gtaPushEvent("AdShowSuccess",a)}else this._retryRewardedAdsHTML5Process=setTimeout(function(){if(t._retryRewardedAdsHTML5Count+=1,t._retryRewardedAdsHTML5Count>2)return t._retryRewardedAdsHTML5Count=0,void t.onRewardedAdLoadFailure();t._showHTML5RewardedAds(e)},1e3)},t._hasHTML5RewardedAds=function(){return!!this._rewardedAdsFunc},t._getHTML5ResourceUrl=function(e){var t=cc.resources.getInfoWithPath(e),a=t.uuid;return t.nativeVer&&(a+="."+t.nativeVer),"./assets/resources/native/"+a.substr(0,2)+"/"+a+".png"},t._getPlatform=function(){if(cc.sys.isBrowser)return"browser";var e;switch(cc.sys.os){case cc.sys.OS_ANDROID:e="android";break;case cc.sys.OS_IOS:e="ios"}return e},e}();t.exports=new r,window.AdsHelper=e("AdsHelper"),cc._RF.pop()},{"./AnalyticHelper":"AnalyticHelper",AdsHelper:"AdsHelper",h5ad:1}],AnalyticHelper:[function(e,t){"use strict";cc._RF.push(t,"0ad3cSrSNlC/4oE72rMqxOk","AnalyticHelper"),t.exports={gtaInit:function(e,a){console.log("init:",e+" ** "+a);var i={gameId:e,version:t.exports.getGameVersion(),debugLog:!0,amplitude:{apiKey:a,debugLog:!0}};gcTurboAnalytics.init(i)},gtaSendBaseUserProperties:function(){var e=new Object;e.version=t.exports.getGameVersion(),gcTurboAnalytics.setUserProperties(e)},gtaSetUserProperties:function(e){e.version||(e.version=t.exports.getGameVersion()),gcTurboAnalytics.setUserProperties(e)},gtaPushEvent:function(e,a){a.gameName||(a.gameName=t.exports.getAppName()),gcTurboAnalytics.pushEvent(e,a)},getAppName:function(){return"Reversi"},getGameVersion:function(){return"1.0.0"},getWeblinkSource:function(){return document?document.referrer||document.URL:"Unknown"}},cc._RF.pop()},{}],Cell:[function(e,t){"use strict";cc._RF.push(t,"65be15nfR9GbY7TfqQS5enR","Cell"),cc.Class({extends:cc.Component,properties:{button:cc.Button,chessSprite:cc.Sprite,chessTextures:[cc.SpriteFrame],wrongNode:cc.Node,position:cc.Vec2,status:null,positionLabel:cc.Label},setData:function(e,t){this.position.x=e,this.position.y=t},setChess:function(e){this.status=e,this.chessSprite.spriteFrame=this.chessTextures[e]},showHint:function(){this.chessSprite.spriteFrame=this.chessTextures[2]},hideHint:function(){this.chessSprite.spriteFrame=null},clearChess:function(){this.chessSprite.node.active=!1,this.status=null},animateWrongCell:function(){cc.tween(this.wrongNode).to(.15,{opacity:{value:255,easing:"sineIn"}}).delay(.15).to(.15,{opacity:{value:0,easing:"sineOut"}}).start()}}),cc._RF.pop()},{}],ComboBoxItem:[function(e,t){"use strict";cc._RF.push(t,"e3eb2OoYnVNLpiehtkwiOa4","ComboBoxItem"),cc.Class({extends:cc.Component,properties:{label:{default:null,type:cc.Label},_parentCtrl:null,_data:null},setData:function(e,t){this._parentCtrl=e,this._data=t,this.label.string=LocalizationHelper.getText("label_text."+t.languageName)},onClickItemBtn:function(){this._parentCtrl.onClickItemBtn(),this._data.languageCode!=LocalizationHelper.language&&(LocalizationHelper.setLanguage(this._data.languageCode),this._parentCtrl.comboLabel.string=LocalizationHelper.getText("label_text."+this._data.languageName))}}),cc._RF.pop()},{}],ComboBox:[function(e,t){"use strict";cc._RF.push(t,"654288QCkNOzqcBu3xCbhmH","ComboBox");var a=["English","Japanese"],i=["en","ja"];cc.Class({extends:cc.Component,properties:{triangle:cc.Node,comboLabel:cc.Label,dropDown:cc.Node,vLayoutNode:cc.Node,contentNode:cc.Node,itemPrefab:cc.Prefab},onLoad:function(){this.isDropDown=!1},start:function(){this.comboLabel.string="en"==LocalizationHelper.language?LocalizationHelper.getText("label_text.English"):LocalizationHelper.getText("label_text.Japanese")},onClickItemBtn:function(e){this.rotateTriangle(),this.showHideDropDownBox(),this.isDropDown?this.isDropDown=!1:this.isDropDown=!0,e&&this.initItems()},rotateTriangle:function(){if(this.isDropDown){var e=cc.rotateTo(.5,-90).easing(cc.easeCubicActionOut());this.triangle.runAction(e)}else{var t=cc.rotateTo(.5,0).easing(cc.easeCubicActionOut());this.triangle.runAction(t)}},showHideDropDownBox:function(){this.isDropDown?this.dropDown.active=!1:this.dropDown.active=!0},initItems:function(){this.vLayoutNode.removeAllChildren();for(var e=0;e<a.length;e++){var t=cc.instantiate(this.itemPrefab);t.getComponent("ComboBoxItem").setData(this,{languageName:a[e],languageCode:i[e]}),this.vLayoutNode.addChild(t)}}}),cc._RF.pop()},{}],GlobalData:[function(e,t){"use strict";cc._RF.push(t,"b1aa52f9fhHlK3w1RgB2SUM","GlobalData");var a=cc.Enum({BLACK:0,WHITE:1}),i=cc.Enum({EASY:0,NORMAL:1,HARD:2});t.exports={CELL_STATUS:a,MODE_GAME:i},cc._RF.pop()},{}],HintButton:[function(e,t){"use strict";cc._RF.push(t,"9c23b5XBMZLIaWulZ2Kj/+y","HintButton"),cc.Class({extends:cc.Component,properties:{buttonSprite:cc.Sprite,buttonTextures:[cc.SpriteFrame],clickSound:cc.AudioClip},onLoad:function(){var e=cc.sys.localStorage.getItem("hintConfig")||1;this.buttonSprite.spriteFrame=this.buttonTextures[e]},onButtonClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e);var t=1==(cc.sys.localStorage.getItem("hintConfig")||1)?0:1;cc.sys.localStorage.setItem("hintConfig",t),this.buttonSprite.spriteFrame=this.buttonTextures[t]}}),cc._RF.pop()},{}],IngameScene:[function(e,t){"use strict";cc._RF.push(t,"41ca6i+HA9Ooqx0Sr36WHSO","IngameScene");var a=e("./component/Cell"),i=e("./config/GlobalData"),r=(e("../Script/utils"),e("./utils/AdsHelper"));cc.Class({extends:cc.Component,properties:{gridNode:cc.Node,cellPrefab:cc.Prefab,loading:cc.Node,gameInfoLabel:cc.Label,whiteScoreLabel:cc.Label,blackScoreLabel:cc.Label,dimBackground:cc.Node,dimLabel:cc.Label,dimLock:cc.BlockInputEvents,resultLayer:cc.Node,resultTitleLabel:cc.Label,resultPlayerScoreLabel:cc.Label,resultComputerScoreLabel:cc.Label,victoryNode:cc.Node,gameOverNode:cc.Node,clickSound:cc.AudioClip,chessSound:cc.AudioClip,wrongSound:cc.AudioClip,winSound:cc.AudioClip,loseSound:cc.AudioClip,bgmAudioClip:cc.AudioClip,background:cc.Node,topBackground:cc.Node,topFrame:cc.Node,boardFrame:cc.Node,optionButtonFtame:cc.Node,optionFrame:cc.Node,dimFrame:cc.Node},onLoad:function(){this.scaleFactor=Math.min(cc.winSize.width/600,1),this.background.scale=Math.max(cc.winSize.width,cc.winSize.height)/600,this.topBackground.scale=this.scaleFactor,this.topBackground.width=cc.winSize.width/this.scaleFactor,this.boardFrame.scale=this.scaleFactor,this.optionButtonFtame.scale=this.scaleFactor,this.topFrame.scale=this.scaleFactor,this.resultLayer.scale=this.scaleFactor,this.dimFrame.scale=this.scaleFactor,this.optionFrame.scale=this.scaleFactor,this.loading.scale=this.scaleFactor,this.initGrid(),this.prepareChessBoard()},start:function(){cc.audioEngine.playMusic(this.bgmAudioClip,!0),this.startGame()},initGrid:function(){this._cell=new Array(8);for(var e=0;e<this._cell.length;e++)this._cell[e]=new Array(8);for(var t=7;t>=0;t--)for(var i=0;i<8;i++){var r=cc.instantiate(this.cellPrefab),s=r.getComponent(a);s.setData(i,t);var n=new cc.Component.EventHandler;n.target=this.node,n.component="IngameScene",n.handler="onCellClicked",n.customEventData=s,r.getComponent(cc.Button).clickEvents.push(n),this.gridNode.addChild(r),this._cell[i][t]=s}},prepareChessBoard:function(){this._cell[3][3].setChess(i.CELL_STATUS.BLACK),this._cell[4][4].setChess(i.CELL_STATUS.BLACK),this._cell[3][4].setChess(i.CELL_STATUS.WHITE),this._cell[4][3].setChess(i.CELL_STATUS.WHITE)},prepareCustomChessBoard:function(){this._cell[6][5].setChess(i.CELL_STATUS.BLACK),this._cell[1][6].setChess(i.CELL_STATUS.BLACK),this._cell[4][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][5].setChess(i.CELL_STATUS.WHITE),this._cell[5][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][2].setChess(i.CELL_STATUS.WHITE),this._cell[5][2].setChess(i.CELL_STATUS.WHITE)},rollPlayerTurn:function(){return Math.random()<.5},animatePlayerTurnAnim:function(e,t){this.gameInfoLabel.string=e?LocalizationHelper.getText("label_text.yourTurn"):LocalizationHelper.getText("label_text.enemyTurn"),cc.tween(this.gameInfoLabel.node).to(.25,{scale:{value:1.2,easing:"sineIn"}}).to(.35,{scale:{value:1,easing:"sineOut"}}).call(function(){t&&t()}).start()},animateLostTurnAnim:function(e,t){var a=this;this.setChessBoardStatus(!1),this.dimLabel.string=e?LocalizationHelper.getText("label_text.youLostTurn"):LocalizationHelper.getText("label_text.computerLostTurn"),cc.tween(this.dimBackground).to(.5,{opacity:{value:123,easing:"sineIn"}}).delay(1.5).to(.5,{opacity:{value:0,easing:"sineOut"}}).call(function(){a.setChessBoardStatus(!0),t&&t()}).start(),cc.tween(this.dimLabel.node).delay(.5).to(.35,{opacity:{value:255,easing:"sineIn"}}).delay(.5).to(.35,{opacity:{value:0,easing:"sineOut"}}).start()},startGame:function(){this._playerSkipTurnCount=0,this._isPlayerFirst=this.rollPlayerTurn(),this._isPlayerFirst?this.processPlayerTurn():this.processComputerTurn()},processPlayerTurn:function(){var e=this;if(this.isEndGame())return this.showResult();this.animatePlayerTurnAnim(!0),this.setChessBoardStatus(!0);var t=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,a=this.getCellPossibility(t);if(0===a.length){if(this._playerSkipTurnCount+=1,this._playerSkipTurnCount>1)return this.showResult();this.animateLostTurnAnim(!0,function(){e.processComputerTurn()})}else{if(this._canPlayerPlay=!0,this._playerSkipTurnCount=0,(cc.sys.localStorage.getItem("gameMode")||0)==i.MODE_GAME.HARD)return;1==(cc.sys.localStorage.getItem("hintConfig")||1)&&this.showPossibleCell(a)}},processComputerTurn:function(){var e=this;this.setChessBoardStatus(!1),this.animatePlayerTurnAnim(!1),this._canPlayerPlay=!1;var t=this._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,a=this.getCellPossibility(t);if(0===a.length)return this._playerSkipTurnCount+=1,this._playerSkipTurnCount>1?this.showResult():this.animateLostTurnAnim(!1,function(){e.processPlayerTurn()});setTimeout(function(){e._playerSkipTurnCount=0;var r=cc.sys.localStorage.getItem("gameMode")||0;if(r==i.MODE_GAME.NORMAL){var s=Math.floor(Math.random()*a.length),n=a[s].position,o=e.getPossessedChessByPosition(t,n);e._cell[n.x][n.y].setChess(t),e.updateCell(o,t)}else if(r==i.MODE_GAME.HARD){var c=a[0].position,l=e.getPossessedChessByPosition(t,c);e._cell[c.x][c.y].setChess(t),e.updateCell(l,t)}else{var d=Math.floor(Math.random()*a.length),u=a[d].position,h=e.getPossessedChessByPosition(t,u);e._cell[u.x][u.y].setChess(t),e.updateCell(h,t)}e.playSound(e.chessSound),e.updateScore(),e.processPlayerTurn()},1500)},setChessBoardStatus:function(e){this.dimLock.node.active=!e},onCellClicked:function(e,t){if(null===t.status&&this._canPlayerPlay){var a=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,r=this.getPossessedChessByPosition(a,t.position);if(r.length>0){if(t.setChess(a),this.updateScore(),this.playSound(this.chessSound),this.updateCell(r,a),this.hidePossibleCell(),this.isEndGame())return this.showResult();this.processComputerTurn()}else this.playSound(this.wrongSound,!1,.6),t.animateWrongCell()}},updateCell:function(e,t){for(var a=0;a<e.length;a++)e[a].setChess(t)},getCellPossibility:function(e){for(var t=[],a=0;a<8;a++)for(var i=0;i<8;i++){var r=this._cell[i][a];if(null===r.status){var s=this.getPossessedChessByPosition(e,r.position);if(0!==s.length){var n={position:r.position,totalPossessedChess:s.length};t.push(n)}}}return t.sort(function(e,t){return t.totalPossessedChess-e.totalPossessedChess}),t},getPossessedChessByPosition:function(e,t){var a=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,0)),i=this.getPossessedChessByDirection(e,t,cc.Vec2(1,0)),r=this.getPossessedChessByDirection(e,t,cc.Vec2(0,1)),s=this.getPossessedChessByDirection(e,t,cc.Vec2(0,-1)),n=this.getPossessedChessByDirection(e,t,cc.Vec2(1,1)),o=this.getPossessedChessByDirection(e,t,cc.Vec2(1,-1)),c=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,-1)),l=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,1));return[].concat(a,i,r,s,n,o,c,l)},getPossessedChessByDirection:function(e,t,a){var i=[],r=[],s=t.clone();for(s.addSelf(a);this.isInChessBoard(s);){var n=this._cell[s.x][s.y];if(null===n.status)break;if(n.status===e){if(0===i.length)break;if(r.push(n),1===r.length)break}else i.push(n);if(2===r.length&&i.length>0)break;s.addSelf(a)}return 0===r.length&&i.length>0&&(i.length=0),i},showPossibleCell:function(e){for(var t=0;t<e.length;t++){var a=e[t].position;this._cell[a.x][a.y].showHint()}},hidePossibleCell:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++){var a=this._cell[t][e];null===a.status&&a.hideHint()}},isInChessBoard:function(e){return e.x>=0&&e.x<8&&e.y>=0&&e.y<8},isEndGame:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++)if(null===this._cell[t][e].status)return!1;return!0},showResult:function(){var e=this;setTimeout(function(){e.setChessBoardStatus(!1);var t=e._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,a=e._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,r=e.getScoreByChessType(),s=a===i.CELL_STATUS.WHITE?r.whiteScore:r.blackScore,n=t===i.CELL_STATUS.BLACK?r.blackScore:r.whiteScore;e.resultLayer.active=!0,n>s?(e.victoryNode.active=!0,e.gameOverNode.active=!1,e.playSound(e.winSound,!1,.75)):n<s?(e.victoryNode.active=!1,e.gameOverNode.active=!0,e.playSound(e.loseSound,!1,.75)):(e.victoryNode.active=!1,e.gameOverNode.active=!1,e.playSound(e.loseSound,!1,.75)),e.resultPlayerScoreLabel.string=""+n,e.resultComputerScoreLabel.string=""+s,cc.tween(e.resultLayer).to(1.5,{opacity:{value:255,easing:"sineIn"}}).start(),cc.audioEngine.stopMusic()},1500)},getScoreByChessType:function(){for(var e=0,t=0,a=0;a<8;a++)for(var r=0;r<8;r++){var s=this._cell[r][a];null!==s.status&&(s.status!==i.CELL_STATUS.WHITE?s.status===i.CELL_STATUS.BLACK&&(t+=1):e+=1)}return{whiteScore:e,blackScore:t}},updateScore:function(){var e=this.getScoreByChessType();this.whiteScoreLabel.string=e.whiteScore,this.blackScoreLabel.string=e.blackScore},onReplayClicked:function(){var e=this;this.playSound(this.clickSound),this.loading.active=!0,r.showRewardedAds({onRewardedAdCompleted:function(){return e.restartGame()},onRewardedAdClosed:function(){return e.restartGame()},onRewardedAdLoadFailure:function(){return e.restartGame()}})},restartGame:function(){cc.director.loadScene("landing"),window.isQuickPlay=!0},resetGame:function(){cc.director.loadScene("ingame")},playSound:function(e,t,a){void 0===t&&(t=!1),void 0===a&&(a=1);var i=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(e,t,i*a)}}),cc._RF.pop()},{"../Script/utils":"utils","./component/Cell":"Cell","./config/GlobalData":"GlobalData","./utils/AdsHelper":"AdsHelper"}],LandingScene:[function(e,t){"use strict";cc._RF.push(t,"f81c9Et825BE4flcrHLshzh","LandingScene");var a=e("./utils/AdsHelper"),i=e("./utils/AnalyticHelper");cc.Class({extends:cc.Component,properties:{clickSound:cc.AudioClip,bgmAudioSource:cc.AudioSource,bgmAudioClip:cc.AudioClip,playBtn:cc.Node,normalBtn:cc.Node,hardBtn:cc.Node,loading:cc.Node,background:cc.Node,topFrame:cc.Node,tutorialButtonFrame:cc.Node,centerButtonFrame:cc.Node,tutorialFrame:cc.Node},onLoad:function(){var e=this;this.scaleFactor=Math.min(cc.winSize.width/600,1),this.background.scale=Math.max(cc.winSize.width,cc.winSize.height)/600,this.topFrame.scale=this.scaleFactor,this.tutorialButtonFrame.scale=this.scaleFactor,this.centerButtonFrame.scale=this.scaleFactor,this.tutorialFrame.scale=this.scaleFactor,this.loading.scale=this.scaleFactor,LocalizationHelper.init(),i.gtaInit("321085","0033cb7f59e3cd9a32e9a1abd8807afa");var t={weblinkSource:i.getWeblinkSource(),gameName:i.getAppName()};i.gtaSetUserProperties(t),i.gtaPushEvent("gameSession",t),a.showHTML5Intro(function(){return e.afterSplash()})},afterSplash:function(){cc.audioEngine.playMusic(this.bgmAudioClip,!0),a.prepareRewardedAds()},start:function(){window.isQuickPlay&&(cc.audioEngine.playMusic(this.bgmAudioClip,!0),this.normalBtn.active=!0,this.hardBtn.active=!0,this.playBtn.active=!1)},onPlayButtonClicked:function(){var e=this;this.playSound(this.clickSound),setTimeout(function(){e.normalBtn.active=!0,e.hardBtn.active=!0,e.playBtn.active=!1},200)},onSelectMode:function(e,t){this.loading.active=!0,cc.sys.localStorage.setItem("gameMode",t),cc.director.loadScene("ingame"),this.playSound(this.clickSound),cc.audioEngine.stopMusic()},playSound:function(e){var t=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(e,!1,t)}}),cc._RF.pop()},{"./utils/AdsHelper":"AdsHelper","./utils/AnalyticHelper":"AnalyticHelper"}],LanguageData:[function(e,t){"use strict";cc._RF.push(t,"31e138UXBhB5qwuxOaE7JZ1","LanguageData");var a=e("polyglot.min"),i=null;function r(e){return window.i18n.languages[e]}function s(e){e&&(i?i.replace(e):i=new a({phrases:e,allowMissing:!0}))}window.i18n||(window.i18n={languages:{},curLang:""}),t.exports={init:function(e){if(e!==window.i18n.curLang){var t=r(e)||{};window.i18n.curLang=e,s(t),this.inst=i}},t:function(e,t){if(i)return i.t(e,t)},inst:i,updateSceneRenderers:function(){for(var e=cc.director.getScene().children,t=[],a=0;a<e.length;++a){var i=e[a].getComponentsInChildren("LocalizedLabel");Array.prototype.push.apply(t,i)}for(var r=0;r<t.length;++r){var s=t[r];s.node.active&&s.updateLabel()}for(var n=[],o=0;o<e.length;++o){var c=e[o].getComponentsInChildren("LocalizedSprite");Array.prototype.push.apply(n,c)}for(var l=0;l<n.length;++l){var d=n[l];d.node.active&&d.updateSprite(window.i18n.curLang)}}},cc._RF.pop()},{"polyglot.min":"polyglot.min"}],LocalizationHelper:[function(e,t){"use strict";cc._RF.push(t,"fe46fQs9fJFnZhJJkECJfLR","LocalizationHelper");var a=function(){function t(){this.languageData=null}var a=t.prototype;return a.init=function(){this.language=cc.sys.localStorage.getItem("reversi_lang"),this.language||(this.language=this._getBrowserLanguage()),cc.sys.localStorage.setItem("reversi_lang",this.language),this.languageData=e("LanguageData"),this.languageData.init(this.language)},a.getText=function(e){return this.languageData.t(e)},a.setLanguage=function(e){this.language=e,cc.sys.localStorage.setItem("reversi_lang",this.language),this.languageData.init(this.language),this.languageData.updateSceneRenderers()},a._getBrowserLanguage=function(){var e,t,a=window.navigator,i=["language","browserLanguage","systemLanguage","userLanguage"];if(Array.isArray(a.languages))for(e=0;e<a.languages.length;e++)if((t=a.languages[e])&&t.length)return t.slice(0,2);for(e=0;e<i.length;e++)if((t=a[i[e]])&&t.length)return t.slice(0,2);return null},t}();t.exports=new a,window.LocalizationHelper=e("LocalizationHelper"),cc._RF.pop()},{LanguageData:"LanguageData",LocalizationHelper:"LocalizationHelper"}],LocalizedLabel:[function(e,t){"use strict";cc._RF.push(t,"85fa0KsWHVCBofvyuY2la/x","LocalizedLabel");var a=e("LanguageData");cc.Class({extends:cc.Component,editor:{executeInEditMode:!0,menu:"i18n/LocalizedLabel"},properties:{dataID:{get:function(){return this._dataID},set:function(e){this._dataID!==e&&(this._dataID=e,this.updateLabel())}},_dataID:""},onLoad:function(){a.inst||a.init(),this.fetchRender()},fetchRender:function(){var e=this.getComponent(cc.Label);if(e)return this.label=e,void this.updateLabel()},updateLabel:function(){this.label?a.t(this.dataID)&&(this.label.string=a.t(this.dataID)):cc.error("Failed to update localized label, label component is invalid!")}}),cc._RF.pop()},{LanguageData:"LanguageData"}],LocalizedSprite:[function(e,t){"use strict";cc._RF.push(t,"ec55bdFcLtEn5n7fz3twVni","LocalizedSprite");var a=e("SpriteFrameSet");cc.Class({extends:cc.Component,editor:{executeInEditMode:!0,inspector:"packages://i18n/inspector/localized-sprite.js",menu:"i18n/LocalizedSprite"},properties:{spriteFrameSet:{default:[],type:a}},onLoad:function(){this.fetchRender()},fetchRender:function(){var e=this.getComponent(cc.Sprite);if(e)return this.sprite=e,void this.updateSprite(window.i18n.curLang)},getSpriteFrameByLang:function(e){for(var t=0;t<this.spriteFrameSet.length;++t)if(this.spriteFrameSet[t].language===e)return this.spriteFrameSet[t].spriteFrame},updateSprite:function(e){if(this.sprite){var t=this.getSpriteFrameByLang(e);!t&&this.spriteFrameSet[0]&&(t=this.spriteFrameSet[0].spriteFrame),this.sprite.spriteFrame=t}else cc.error("Failed to update localized sprite, sprite component is invalid!")}}),cc._RF.pop()},{SpriteFrameSet:"SpriteFrameSet"}],SoundButton:[function(e,t){"use strict";cc._RF.push(t,"24a54bdozpLr5Yhy4FCGR0/","SoundButton");var a=e("h5ad");cc.Class({extends:cc.Component,properties:{buttonSprite:cc.Sprite,buttonTextures:[cc.SpriteFrame],clickSound:cc.AudioClip},onLoad:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;this.buttonSprite.spriteFrame=this.buttonTextures[e],this.setSoundConfig(e)},onSoundButtonClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e);var t=1==e?0:1;cc.sys.localStorage.setItem("soundConfig",t),this.buttonSprite.spriteFrame=this.buttonTextures[t],this.setSoundConfig(t)},setSoundConfig:function(e){1==e?(cc.audioEngine.setMusicVolume(1),a.onUnmute()):(cc.audioEngine.setMusicVolume(0),a.onMute())}}),cc._RF.pop()},{h5ad:1}],SpriteFrameSet:[function(e,t){"use strict";cc._RF.push(t,"ecbd3Ze139EO6Y/mdovRqSS","SpriteFrameSet");var a=cc.Class({name:"SpriteFrameSet",properties:{language:"",spriteFrame:cc.SpriteFrame}});t.exports=a,cc._RF.pop()},{}],TutorialButton:[function(e,t){"use strict";cc._RF.push(t,"dc1e32XzSFJtaJ8cK5VbQ0A","TutorialButton"),cc.Class({extends:cc.Component,properties:{tutorialLayer:cc.Node,isShow:!1,clickSound:cc.AudioClip},onTutorialClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e),this.tutorialLayer.active=!this.isShow,this.isShow=!this.isShow}}),cc._RF.pop()},{}],"polyglot.min":[function(e,t,a){"use strict";cc._RF.push(t,"0c57bENkHNHF5R1+cLnLXbj","polyglot.min"),function(e,i){"function"==typeof define&&define.amd?define([],function(){return i(e)}):"object"==typeof a?t.exports=i(e):e.Polyglot=i(e)}(void 0,function(e){function t(e){e=e||{},this.phrases={},this.extend(e.phrases||{}),this.currentLocale=e.locale||"en",this.allowMissing=!!e.allowMissing,this.warn=e.warn||c}function a(e){var t,a,i,r={};for(t in e)if(e.hasOwnProperty(t))for(i in a=e[t])r[a[i]]=t;return r}function i(e){return e.replace(/^\s+|\s+$/g,"")}function r(e,t,a){var r;return null!=a&&e?i((r=e.split(d))[n(t,a)]||r[0]):e}function s(e){var t=a(h);return t[e]||t.en}function n(e,t){return u[s(e)](t)}function o(e,t){for(var a in t)"_"!==a&&t.hasOwnProperty(a)&&(e=e.replace(new RegExp("%\\{"+a+"\\}","g"),t[a]));return e}function c(t){e.console&&e.console.warn&&e.console.warn("WARNING: "+t)}function l(e){var t={};for(var a in e)t[a]=e[a];return t}t.VERSION="0.4.3",t.prototype.locale=function(e){return e&&(this.currentLocale=e),this.currentLocale},t.prototype.extend=function(e,t){var a;for(var i in e)e.hasOwnProperty(i)&&(a=e[i],t&&(i=t+"."+i),"object"==typeof a?this.extend(a,i):this.phrases[i]=a)},t.prototype.clear=function(){this.phrases={}},t.prototype.replace=function(e){this.clear(),this.extend(e)},t.prototype.t=function(e,t){var a,i;return"number"==typeof(t=null==t?{}:t)&&(t={smart_count:t}),"string"==typeof this.phrases[e]?a=this.phrases[e]:"string"==typeof t._?a=t._:this.allowMissing?a=e:(this.warn('Missing translation for key: "'+e+'"'),i=e),"string"==typeof a&&(t=l(t),i=o(i=r(a,this.currentLocale,t.smart_count),t)),i},t.prototype.has=function(e){return e in this.phrases};var d="||||",u={chinese:function(){return 0},german:function(e){return 1!==e?1:0},french:function(e){return e>1?1:0},russian:function(e){return e%10==1&&e%100!=11?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2},czech:function(e){return 1===e?0:e>=2&&e<=4?1:2},polish:function(e){return 1===e?0:e%10>=2&&e%10<=4&&(e%100<10||e%100>=20)?1:2},icelandic:function(e){return e%10!=1||e%100==11?1:0}},h={chinese:["fa","id","ja","ko","lo","ms","th","tr","zh"],german:["da","de","en","es","fi","el","he","hu","it","nl","no","pt","sv"],french:["fr","tl","pt-br"],russian:["hr","ru"],czech:["cs"],polish:["pl"],icelandic:["is"]};return t}),cc._RF.pop()},{}],utils:[function(e,t){"use strict";cc._RF.push(t,"27b29Ug+0xH9oNXSEcUoqUn","utils");var a=e("h5ad");t.exports={showAds:function(e,t,i){a.adBreak({type:e,beforeBreak:function(){t&&(cc.director.pause(),cc.audioEngine.pauseAll())},afterBreak:function(){t&&(cc.director.resume(),cc.audioEngine.resumeAll()),i&&i()},noBreak:function(){i&&i()}})},muteAds:function(){return a.onMute()},unMuteAds:function(){return a.onUnmute()},getResourceUrl:function(e){var t=cc.resources.getInfoWithPath(e),a=t.uuid;return t.nativeVer&&(a+="."+t.nativeVer),"./assets/resources/native/"+a.substr(0,2)+"/"+a+".png"}},cc._RF.pop()},{h5ad:1}]},{},["IngameScene","LandingScene","Cell","ComboBox","ComboBoxItem","HintButton","SoundButton","TutorialButton","GlobalData","utils","AdsHelper","AnalyticHelper","LocalizationHelper","LanguageData","LocalizedLabel","LocalizedSprite","SpriteFrameSet","polyglot.min"]);