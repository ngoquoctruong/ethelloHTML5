window.__require=function e(t,s,i){function n(c,a){if(!s[c]){if(!t[c]){var r=c.split("/");if(r=r[r.length-1],!t[r]){var l="function"==typeof __require&&__require;if(!a&&l)return l(r,!0);if(o)return o(r,!0);throw new Error("Cannot find module '"+c+"'")}c=r}var u=s[c]={exports:{}};t[c][0].call(u.exports,function(e){return n(t[c][1][e]||e)},u,u.exports,e,t,s,i)}return s[c].exports}for(var o="function"==typeof __require&&__require,c=0;c<i.length;c++)n(i[c]);return n}({Cell:[function(e,t){"use strict";cc._RF.push(t,"65be15nfR9GbY7TfqQS5enR","Cell"),cc.Class({extends:cc.Component,properties:{button:cc.Button,chessSprite:cc.Sprite,chessTextures:[cc.SpriteFrame],wrongNode:cc.Node,position:cc.Vec2,status:null,positionLabel:cc.Label},setData:function(e,t){this.position.x=e,this.position.y=t},setChess:function(e){this.status=e,this.chessSprite.spriteFrame=this.chessTextures[e]},showHint:function(){this.chessSprite.spriteFrame=this.chessTextures[2]},hideHint:function(){this.chessSprite.spriteFrame=null},clearChess:function(){this.chessSprite.node.active=!1,this.status=null},animateWrongCell:function(){cc.tween(this.wrongNode).to(.15,{opacity:{value:255,easing:"sineIn"}}).delay(.15).to(.15,{opacity:{value:0,easing:"sineOut"}}).start()}}),cc._RF.pop()},{}],GlobalData:[function(e,t){"use strict";cc._RF.push(t,"b1aa52f9fhHlK3w1RgB2SUM","GlobalData");var s=cc.Enum({BLACK:0,WHITE:1}),i=cc.Enum({EASY:0,NORMAL:1,HARD:2});t.exports={CELL_STATUS:s,MODE_GAME:i},cc._RF.pop()},{}],HintButton:[function(e,t){"use strict";cc._RF.push(t,"9c23b5XBMZLIaWulZ2Kj/+y","HintButton"),cc.Class({extends:cc.Component,properties:{buttonSprite:cc.Sprite,buttonTextures:[cc.SpriteFrame],clickSound:cc.AudioClip},onLoad:function(){var e=cc.sys.localStorage.getItem("hintConfig")||1;this.buttonSprite.spriteFrame=this.buttonTextures[e]},onButtonClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e);var t=1==(cc.sys.localStorage.getItem("hintConfig")||1)?0:1;cc.sys.localStorage.setItem("hintConfig",t),this.buttonSprite.spriteFrame=this.buttonTextures[t]}}),cc._RF.pop()},{}],IngameScene:[function(e,t){"use strict";cc._RF.push(t,"41ca6i+HA9Ooqx0Sr36WHSO","IngameScene");var s=e("./component/Cell"),i=e("./config/GlobalData");cc.Class({extends:cc.Component,properties:{gridNode:cc.Node,cellPrefab:cc.Prefab,gameInfoLabel:cc.Label,whiteScoreLabel:cc.Label,blackScoreLabel:cc.Label,dimBackground:cc.Node,dimLabel:cc.Label,dimLock:cc.BlockInputEvents,resultLayer:cc.Node,resultTitleLabel:cc.Label,resultPlayerScoreLabel:cc.Label,resultComputerScoreLabel:cc.Label,victoryNode:cc.Node,gameOverNode:cc.Node,clickSound:cc.AudioClip,chessSound:cc.AudioClip,wrongSound:cc.AudioClip,winSound:cc.AudioClip,loseSound:cc.AudioClip,bgmAudioClip:cc.AudioClip},onLoad:function(){this.initGrid(),this.prepareChessBoard()},start:function(){cc.audioEngine.playMusic(this.bgmAudioClip,!0),this.startGame()},initGrid:function(){this._cell=new Array(8);for(var e=0;e<this._cell.length;e++)this._cell[e]=new Array(8);for(var t=7;t>=0;t--)for(var i=0;i<8;i++){var n=cc.instantiate(this.cellPrefab),o=n.getComponent(s);o.setData(i,t);var c=new cc.Component.EventHandler;c.target=this.node,c.component="IngameScene",c.handler="onCellClicked",c.customEventData=o,n.getComponent(cc.Button).clickEvents.push(c),this.gridNode.addChild(n),this._cell[i][t]=o}},prepareChessBoard:function(){this._cell[3][3].setChess(i.CELL_STATUS.BLACK),this._cell[4][4].setChess(i.CELL_STATUS.BLACK),this._cell[3][4].setChess(i.CELL_STATUS.WHITE),this._cell[4][3].setChess(i.CELL_STATUS.WHITE)},prepareCustomChessBoard:function(){this._cell[6][5].setChess(i.CELL_STATUS.BLACK),this._cell[1][6].setChess(i.CELL_STATUS.BLACK),this._cell[4][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][5].setChess(i.CELL_STATUS.WHITE),this._cell[5][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][2].setChess(i.CELL_STATUS.WHITE),this._cell[5][2].setChess(i.CELL_STATUS.WHITE)},rollPlayerTurn:function(){return Math.random()<.5},animatePlayerTurnAnim:function(e,t){this.gameInfoLabel.string=e?"\u30d7\u30ec\u30fc\u30e4\u30fc":"\u30b3\u30f3\u30d4\u30e5\u30fc\u30bf\u30fc",cc.tween(this.gameInfoLabel.node).to(.25,{scale:{value:1.2,easing:"sineIn"}}).to(.35,{scale:{value:1,easing:"sineOut"}}).call(function(){t&&t()}).start()},animateLostTurnAnim:function(e,t){var s=this;this.setChessBoardStatus(!1),this.dimLabel.string=e?"\u3042\u306a\u305f\u306f\u30bf\u30fc\u30f3\u3092\u5931\u3063\u305f":"\u30b3\u30f3\u30d4\u30e5\u30fc\u30bf\u30fc\u30b9\u30ad\u30c3\u30d7\u30bf\u30fc\u30f3",cc.tween(this.dimBackground).to(.5,{opacity:{value:123,easing:"sineIn"}}).delay(1.5).to(.5,{opacity:{value:0,easing:"sineOut"}}).call(function(){s.setChessBoardStatus(!0),t&&t()}).start(),cc.tween(this.dimLabel.node).delay(.5).to(.35,{opacity:{value:255,easing:"sineIn"}}).delay(.5).to(.35,{opacity:{value:0,easing:"sineOut"}}).start()},startGame:function(){this._playerSkipTurnCount=0,this._isPlayerFirst=this.rollPlayerTurn(),this._isPlayerFirst?this.processPlayerTurn():this.processComputerTurn()},processPlayerTurn:function(){var e=this;if(this.isEndGame())return this.showResult();this.animatePlayerTurnAnim(!0),this.setChessBoardStatus(!0);var t=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,s=this.getCellPossibility(t);if(0===s.length){if(this._playerSkipTurnCount+=1,this._playerSkipTurnCount>1)return this.showResult();this.animateLostTurnAnim(!0,function(){e.processComputerTurn()})}else this._canPlayerPlay=!0,this._playerSkipTurnCount=0,1==(cc.sys.localStorage.getItem("hintConfig")||1)&&this.showPossibleCell(s)},processComputerTurn:function(){var e=this;this.setChessBoardStatus(!1),this.animatePlayerTurnAnim(!1),this._canPlayerPlay=!1;var t=this._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,s=this.getCellPossibility(t);if(0===s.length)return this._playerSkipTurnCount+=1,this._playerSkipTurnCount>1?this.showResult():this.animateLostTurnAnim(!1,function(){e.processPlayerTurn()});setTimeout(function(){e._playerSkipTurnCount=0;var n=cc.sys.localStorage.getItem("gameMode")||0;if(n===i.MODE_GAME.NORMAL){var o=Math.floor(Math.random()*s.length),c=s[o].position,a=e.getPossessedChessByPosition(t,c);e._cell[c.x][c.y].setChess(t),e.updateCell(a,t)}else if(n===i.MODE_GAME.HARD){var r=s[0].position,l=e.getPossessedChessByPosition(t,r);e._cell[r.x][r.y].setChess(t),e.updateCell(l,t)}else{var u=Math.floor(Math.random()*s.length),h=s[u].position,d=e.getPossessedChessByPosition(t,h);e._cell[h.x][h.y].setChess(t),e.updateCell(d,t)}e.playSound(e.chessSound),e.updateScore(),e.processPlayerTurn()},1500)},setChessBoardStatus:function(e){this.dimLock.node.active=!e},onCellClicked:function(e,t){if(null===t.status&&this._canPlayerPlay){var s=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,n=this.getPossessedChessByPosition(s,t.position);if(n.length>0){if(t.setChess(s),this.updateScore(),this.playSound(this.chessSound),this.updateCell(n,s),this.hidePossibleCell(),this.isEndGame())return this.showResult();this.processComputerTurn()}else this.playSound(this.wrongSound,!1,.6),t.animateWrongCell()}},updateCell:function(e,t){for(var s=0;s<e.length;s++)e[s].setChess(t)},getCellPossibility:function(e){for(var t=[],s=0;s<8;s++)for(var i=0;i<8;i++){var n=this._cell[i][s];if(null===n.status){var o=this.getPossessedChessByPosition(e,n.position);if(0!==o.length){var c={position:n.position,totalPossessedChess:o.length};t.push(c)}}}return t.sort(function(e,t){return t.totalPossessedChess-e.totalPossessedChess}),t},getPossessedChessByPosition:function(e,t){var s=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,0)),i=this.getPossessedChessByDirection(e,t,cc.Vec2(1,0)),n=this.getPossessedChessByDirection(e,t,cc.Vec2(0,1)),o=this.getPossessedChessByDirection(e,t,cc.Vec2(0,-1)),c=this.getPossessedChessByDirection(e,t,cc.Vec2(1,1)),a=this.getPossessedChessByDirection(e,t,cc.Vec2(1,-1)),r=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,-1)),l=this.getPossessedChessByDirection(e,t,cc.Vec2(-1,1));return[].concat(s,i,n,o,c,a,r,l)},getPossessedChessByDirection:function(e,t,s){var i=[],n=[],o=t.clone();for(o.addSelf(s);this.isInChessBoard(o);){var c=this._cell[o.x][o.y];if(null===c.status)break;if(c.status===e){if(0===i.length)break;if(n.push(c),1===n.length)break}else i.push(c);if(2===n.length&&i.length>0)break;o.addSelf(s)}return 0===n.length&&i.length>0&&(i.length=0),i},showPossibleCell:function(e){for(var t=0;t<e.length;t++){var s=e[t].position;this._cell[s.x][s.y].showHint()}},hidePossibleCell:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++){var s=this._cell[t][e];null===s.status&&s.hideHint()}},isInChessBoard:function(e){return e.x>=0&&e.x<8&&e.y>=0&&e.y<8},isEndGame:function(){for(var e=0;e<8;e++)for(var t=0;t<8;t++)if(null===this._cell[t][e].status)return!1;return!0},showResult:function(){var e=this;setTimeout(function(){e.setChessBoardStatus(!1);var t=e._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,s=e._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,n=e.getScoreByChessType(),o=s===i.CELL_STATUS.WHITE?n.whiteScore:n.blackScore,c=t===i.CELL_STATUS.BLACK?n.blackScore:n.whiteScore;e.resultLayer.active=!0,c>o?(e.victoryNode.active=!0,e.gameOverNode.active=!1,e.playSound(e.winSound,!1,.75)):c<o?(e.victoryNode.active=!1,e.gameOverNode.active=!0,e.playSound(e.loseSound,!1,.75)):(e.victoryNode.active=!1,e.gameOverNode.active=!1,e.playSound(e.loseSound,!1,.75)),e.resultPlayerScoreLabel.string=""+c,e.resultComputerScoreLabel.string=""+o,cc.tween(e.resultLayer).to(1.5,{opacity:{value:255,easing:"sineIn"}}).start(),cc.audioEngine.stopMusic()},1500),this.prepareAds()},getScoreByChessType:function(){for(var e=0,t=0,s=0;s<8;s++)for(var n=0;n<8;n++){var o=this._cell[n][s];null!==o.status&&(o.status!==i.CELL_STATUS.WHITE?o.status===i.CELL_STATUS.BLACK&&(t+=1):e+=1)}return{whiteScore:e,blackScore:t}},updateScore:function(){var e=this.getScoreByChessType();this.whiteScoreLabel.string=e.whiteScore,this.blackScoreLabel.string=e.blackScore},onReplayClicked:function(){var e=this;this.playSound(this.clickSound),this.unscheduleAllCallbacks(),this.scheduleOnce(this.restartGame.bind(this),.5);try{window.adBreak({type:"next",name:"game_restart",beforeBreak:function(){e.unscheduleAllCallbacks()}.bind(this),afterBreak:function(){e.restartGame(),e.isAdPrepared=!1}.bind(this)})}catch(t){cc.error(t),this.restartGame()}},restartGame:function(){cc.director.loadScene("landing"),window.isQuickPlay=!0},prepareAds:function(){this.isAdPrepared||(window.adBreak({type:"next",name:"menu_view"}),this.isAdPrepared=!0)},playSound:function(e,t,s){void 0===t&&(t=!1),void 0===s&&(s=1);var i=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(e,t,i*s)}}),cc._RF.pop()},{"./component/Cell":"Cell","./config/GlobalData":"GlobalData"}],LandingScene:[function(e,t){"use strict";cc._RF.push(t,"f81c9Et825BE4flcrHLshzh","LandingScene"),cc.Class({extends:cc.Component,properties:{clickSound:cc.AudioClip,bgmAudioSource:cc.AudioSource,bgmAudioClip:cc.AudioClip,playBtn:cc.Node,normalBtn:cc.Node,hardBtn:cc.Node,loading:cc.Node},onLoad:function(){if(window.adsbygoogle)this.initializeAd();else{var e=document.createElement("script");e.src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",e.setAttribute("data-ad-client","pub-3901483273906883"),e.setAttribute("data-adbreak-test","on"),e.async=!0,e.onload=e.onreadystatechange=this.initializeAd.bind(this),document.head.appendChild(e)}},start:function(){cc.audioEngine.playMusic(this.bgmAudioClip,!0),window.isQuickPlay&&(this.normalBtn.active=!0,this.hardBtn.active=!0,this.playBtn.active=!1)},onPlayButtonClicked:function(){var e=this;this.playSound(this.clickSound),setTimeout(function(){e.normalBtn.active=!0,e.hardBtn.active=!0,e.playBtn.active=!1},200)},onSelectMode:function(e,t){this.loading.active=!0,cc.sys.localStorage.setItem("gameMode",t),cc.director.loadScene("ingame"),this.playSound(this.clickSound),cc.audioEngine.stopMusic()},playSound:function(e){var t=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(e,!1,t)},initializeAd:function(){this.isAdInitialized||(this.isAdInitialized=!0,window.adBreak=window.adConfig=function(e){window.adsbygoogle.push(e)})}}),cc._RF.pop()},{}],SoundButton:[function(e,t){"use strict";cc._RF.push(t,"24a54bdozpLr5Yhy4FCGR0/","SoundButton"),cc.Class({extends:cc.Component,properties:{buttonSprite:cc.Sprite,buttonTextures:[cc.SpriteFrame],clickSound:cc.AudioClip},onLoad:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;this.buttonSprite.spriteFrame=this.buttonTextures[e],this.setSoundConfig(e)},onSoundButtonClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e);var t=1==e?0:1;cc.sys.localStorage.setItem("soundConfig",t),this.buttonSprite.spriteFrame=this.buttonTextures[t],this.setSoundConfig(t)},setSoundConfig:function(e){1==e?cc.audioEngine.setMusicVolume(1):cc.audioEngine.setMusicVolume(0)}}),cc._RF.pop()},{}],TutorialButton:[function(e,t){"use strict";cc._RF.push(t,"dc1e32XzSFJtaJ8cK5VbQ0A","TutorialButton"),cc.Class({extends:cc.Component,properties:{tutorialLayer:cc.Node,isShow:!1,clickSound:cc.AudioClip},onTutorialClicked:function(){var e=cc.sys.localStorage.getItem("soundConfig")||1;cc.audioEngine.play(this.clickSound,!1,e),this.tutorialLayer.active=!this.isShow,this.isShow=!this.isShow}}),cc._RF.pop()},{}]},{},["IngameScene","LandingScene","Cell","HintButton","SoundButton","TutorialButton","GlobalData"]);