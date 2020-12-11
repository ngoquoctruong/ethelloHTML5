window.__require=function e(s,t,i){function n(c,r){if(!t[c]){if(!s[c]){var a=c.split("/");if(a=a[a.length-1],!s[a]){var l="function"==typeof __require&&__require;if(!r&&l)return l(a,!0);if(o)return o(a,!0);throw new Error("Cannot find module '"+c+"'")}c=a}var u=t[c]={exports:{}};s[c][0].call(u.exports,function(e){return n(s[c][1][e]||e)},u,u.exports,e,s,t,i)}return t[c].exports}for(var o="function"==typeof __require&&__require,c=0;c<i.length;c++)n(i[c]);return n}({Cell:[function(e,s){"use strict";cc._RF.push(s,"65be15nfR9GbY7TfqQS5enR","Cell"),cc.Class({extends:cc.Component,properties:{button:cc.Button,chessSprite:cc.Sprite,chessTextures:[cc.SpriteFrame],wrongNode:cc.Node,position:cc.Vec2,status:null,positionLabel:cc.Label},setData:function(e,s){this.position.x=e,this.position.y=s},setChess:function(e){this.status=e,this.chessSprite.spriteFrame=this.chessTextures[e]},clearChess:function(){this.chessSprite.node.active=!1,this.status=null},animateWrongCell:function(){cc.tween(this.wrongNode).to(.25,{opacity:{value:255,easing:"sineIn"}}).delay(.25).to(.25,{opacity:{value:0,easing:"sineOut"}}).start()}}),cc._RF.pop()},{}],GlobalData:[function(e,s){"use strict";cc._RF.push(s,"b1aa52f9fhHlK3w1RgB2SUM","GlobalData");var t=cc.Enum({BLACK:0,WHITE:1}),i=cc.Enum({EASY:0,NORMAL:1,HARD:2});s.exports={CELL_STATUS:t,MODE_GAME:i},cc._RF.pop()},{}],IngameScene:[function(e,s){"use strict";cc._RF.push(s,"41ca6i+HA9Ooqx0Sr36WHSO","IngameScene");var t=e("./component/Cell"),i=e("./config/GlobalData");cc.Class({extends:cc.Component,properties:{gridNode:cc.Node,cellPrefab:cc.Prefab,gameInfoLabel:cc.Label,whiteScoreLabel:cc.Label,blackScoreLabel:cc.Label,dimBackground:cc.Node,dimLabel:cc.Label,dimLock:cc.BlockInputEvents,resultLayer:cc.Node,resultTitleLabel:cc.Label,resultPlayerScoreLabel:cc.Label,resultComputerScoreLabel:cc.Label,clickSound:cc.AudioClip,chessSound:cc.AudioClip,wrongSound:cc.AudioClip,winSound:cc.AudioClip,loseSound:cc.AudioClip,bgmAudioSource:cc.AudioSource},onLoad:function(){this.initGrid(),this.prepareChessBoard()},start:function(){cc.tween(this.bgmAudioSource).to(1,{volume:{value:.25,easing:"sineIn"}}).start(),this.startGame()},update:function(){},initGrid:function(){this._cell=new Array(8);for(var e=0;e<this._cell.length;e++)this._cell[e]=new Array(8);for(var s=7;s>=0;s--)for(var i=0;i<8;i++){var n=cc.instantiate(this.cellPrefab),o=n.getComponent(t);o.setData(i,s);var c=new cc.Component.EventHandler;c.target=this.node,c.component="IngameScene",c.handler="onCellClicked",c.customEventData=o,n.getComponent(cc.Button).clickEvents.push(c),this.gridNode.addChild(n),this._cell[i][s]=o}},prepareChessBoard:function(){this._cell[3][3].setChess(i.CELL_STATUS.BLACK),this._cell[4][4].setChess(i.CELL_STATUS.BLACK),this._cell[3][4].setChess(i.CELL_STATUS.WHITE),this._cell[4][3].setChess(i.CELL_STATUS.WHITE)},prepareCustomChessBoard:function(){this._cell[6][5].setChess(i.CELL_STATUS.BLACK),this._cell[1][6].setChess(i.CELL_STATUS.BLACK),this._cell[4][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][5].setChess(i.CELL_STATUS.WHITE),this._cell[5][5].setChess(i.CELL_STATUS.WHITE),this._cell[2][2].setChess(i.CELL_STATUS.WHITE),this._cell[5][2].setChess(i.CELL_STATUS.WHITE)},rollPlayerTurn:function(){return Math.random()<.5},animatePlayerTurnAnim:function(e,s){this.gameInfoLabel.string=e?"Your Turn":"Computer Turn",cc.tween(this.gameInfoLabel.node).to(.25,{scale:{value:1.2,easing:"sineIn"}}).to(.35,{scale:{value:1,easing:"sineOut"}}).call(function(){s&&s()}).start()},animateLostTurnAnim:function(e,s){var t=this;this.setChessBoardStatus(!1),this.dimLabel.string=e?"Player lost turn ":"Computer skip turn",cc.tween(this.dimBackground).to(.5,{opacity:{value:123,easing:"sineIn"}}).delay(1.5).to(.5,{opacity:{value:0,easing:"sineOut"}}).call(function(){t.setChessBoardStatus(!0),s&&s()}).start(),cc.tween(this.dimLabel.node).delay(.5).to(.35,{opacity:{value:255,easing:"sineIn"}}).delay(.5).to(.35,{opacity:{value:0,easing:"sineOut"}}).start()},startGame:function(){var e=this;this._isPlayerFirst=this.rollPlayerTurn(),this.animatePlayerTurnAnim(this._isPlayerFirst,function(){e._isPlayerFirst?e.processPlayerTurn():e.processComputerTurn()})},processPlayerTurn:function(){var e=this;if(this.isEndGame())return this.showResult();this.setChessBoardStatus(!0);var s=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE;0===this.getCellPossibility(s).length?this.animateLostTurnAnim(this._isPlayerFirst,function(){e.processComputerTurn()}):this._canPlayerPlay=!0},processComputerTurn:function(){var e=this;this.setChessBoardStatus(!1),this._canPlayerPlay=!1,setTimeout(function(){var s=e._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,t=e.getCellPossibility(s);if(0===t.length)return e.animateLostTurnAnim(!e._isPlayerFirst,function(){e.processPlayerTurn()});var n=cc.sys.localStorage.getItem("gameMode")||0;if(n===i.MODE_GAME.NORMAL){var o=t[Math.floor(Math.random()*t.length)].position,c=e.getPossessedChessByPosition(s,o);e._cell[o.x][o.y].setChess(s),e.updateCell(c,s)}else if(n===i.MODE_GAME.HARD){var r=t[0].position,a=e.getPossessedChessByPosition(s,r);e._cell[r.x][r.y].setChess(s),e.updateCell(a,s)}else{var l=t[Math.floor(Math.random()*t.length)].position,u=e.getPossessedChessByPosition(s,l);e._cell[l.x][l.y].setChess(s),e.updateCell(u,s)}cc.audioEngine.play(e.chessSound,!1,1),e.updateScore(),e.animatePlayerTurnAnim(!0,function(){e.processPlayerTurn(),e._canPlayerPlay=!0})},1500)},setChessBoardStatus:function(e){this.dimLock.node.active=!e},onCellClicked:function(e,s){var t=this;if(null===s.status&&this._canPlayerPlay){var n=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,o=this.getPossessedChessByPosition(n,s.position);if(o.length>0){if(s.setChess(n),this.updateScore(),cc.audioEngine.play(this.chessSound,!1,1),this.updateCell(o,n),this.isEndGame())return this.showResult();this.animatePlayerTurnAnim(!1,function(){t.processComputerTurn()})}else cc.audioEngine.play(this.wrongSound,!1,.6),s.animateWrongCell()}},updateCell:function(e,s){for(var t=0;t<e.length;t++)e[t].setChess(s)},getCellPossibility:function(e){for(var s=[],t=0;t<8;t++)for(var i=0;i<8;i++){var n=this._cell[i][t];if(null===n.status){var o=this.getPossessedChessByPosition(e,n.position);if(0!==o.length){var c={position:n.position,totalPossessedChess:o.length};s.push(c)}}}return s.sort(function(e,s){return s.totalPossessedChess-e.totalPossessedChess}),s},getPossessedChessByPosition:function(e,s){var t=this.getPossessedChessByDirection(e,s,cc.Vec2(-1,0)),i=this.getPossessedChessByDirection(e,s,cc.Vec2(1,0)),n=this.getPossessedChessByDirection(e,s,cc.Vec2(0,1)),o=this.getPossessedChessByDirection(e,s,cc.Vec2(0,-1)),c=this.getPossessedChessByDirection(e,s,cc.Vec2(1,1)),r=this.getPossessedChessByDirection(e,s,cc.Vec2(1,-1)),a=this.getPossessedChessByDirection(e,s,cc.Vec2(-1,-1)),l=this.getPossessedChessByDirection(e,s,cc.Vec2(-1,1));return[].concat(t,i,n,o,c,r,a,l)},getPossessedChessByDirection:function(e,s,t){var i=[],n=[],o=s.clone();for(o.addSelf(t);this.isInChessBoard(o);){var c=this._cell[o.x][o.y];if(null===c.status)break;if(c.status===e){if(0===i.length)break;if(n.push(c),1===n.length)break}else i.push(c);if(2===n.length&&i.length>0)break;o.addSelf(t)}return 0===n.length&&i.length>0&&(i.length=0),i},isInChessBoard:function(e){return e.x>=0&&e.x<8&&e.y>=0&&e.y<8},isEndGame:function(){for(var e=0;e<8;e++)for(var s=0;s<8;s++)if(null===this._cell[s][e].status)return!1;return!0},showResult:function(){var e=this,s=this._isPlayerFirst?i.CELL_STATUS.BLACK:i.CELL_STATUS.WHITE,t=this._isPlayerFirst?i.CELL_STATUS.WHITE:i.CELL_STATUS.BLACK,n=this.getScoreByChessType(),o=t===i.CELL_STATUS.WHITE?n.whiteScore:n.blackScore,c=s===i.CELL_STATUS.BLACK?n.blackScore:n.whiteScore;this.resultLayer.active=!0,c>o?(this.resultTitleLabel.string="YOU WIN",cc.audioEngine.play(this.winSound,!1,.75)):(this.resultTitleLabel.string="YOU LOSE",cc.audioEngine.play(this.loseSound,!1,.75)),this.resultPlayerScoreLabel.string="x"+c,this.resultComputerScoreLabel.string="x"+o,cc.tween(this.resultLayer).to(1.5,{opacity:{value:255,easing:"sineIn"}}).start(),cc.tween(this.bgmAudioSource).to(1,{volume:{value:0,easing:"sineIn"}}).call(function(){return e.bgmAudioSource.stop()}).start()},getScoreByChessType:function(){for(var e=0,s=0,t=0;t<8;t++)for(var n=0;n<8;n++){var o=this._cell[n][t];null!==o.status&&(o.status!==i.CELL_STATUS.WHITE?o.status===i.CELL_STATUS.BLACK&&(s+=1):e+=1)}return{whiteScore:e,blackScore:s}},updateScore:function(){var e=this.getScoreByChessType();this.whiteScoreLabel.string=e.whiteScore,this.blackScoreLabel.string=e.blackScore},onReplayClicked:function(){cc.director.loadScene("landing"),cc.audioEngine.play(this.clickSound,!1,1)}}),cc._RF.pop()},{"./component/Cell":"Cell","./config/GlobalData":"GlobalData"}],LandingScene:[function(e,s){"use strict";cc._RF.push(s,"f81c9Et825BE4flcrHLshzh","LandingScene"),cc.Class({extends:cc.Component,properties:{clickSound:cc.AudioClip,bgmAudioSource:cc.AudioSource},onPlayButtonClicked:function(e,s){var t=this;cc.sys.localStorage.setItem("gameMode",s),cc.director.loadScene("ingame"),cc.audioEngine.play(this.clickSound,!1,1),cc.tween(this.bgmAudioSource).to(1,{volume:{value:0,easing:"sineIn"}}).call(function(){return t.bgmAudioSource.stop()}).start()}}),cc._RF.pop()},{}]},{},["IngameScene","LandingScene","Cell","GlobalData"]);