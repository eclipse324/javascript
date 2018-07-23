var puzzle = {
  init: function(col, row){
    this.puzzleSet = {
      colX : col,
      rowY : row,
      totalNum : col * row,
      numArray : [],
      blankEl : '.blank',        
      puzzleTable : '#puzzle-table',
      puzzlePiece : '.colsBtn',
      puzzleChange : '#change-puzzle',
      puzzleRandom : '#change-puzzle-random'
    }    
    this.setarrMake();    
    this.arrMake();
    this.htmlMake();
    this.canClick();
    this.mixPuzzle();    
    this.addEvent();    
  },
  setarrMake : function(){    
    for (var i = 1; i < this.puzzleSet.totalNum; i++) {
      this.puzzleSet.numArray[i-1] = i;
    }
    this.puzzleSet.numArray.push('');    
  },
  arrMake : function() {
    var arrIndex = 0;
    var arr = this.puzzleSet.numArray;
    this.puzzleSet.numArray = []
    for (var i = 0; i < this.puzzleSet.colX; i++) {
      this.puzzleSet.numArray[i] = new Array(); 
      for (var j = 0; j < this.puzzleSet.rowY; j++) {
        this.puzzleSet.numArray[i][j] = arr[arrIndex];
        arrIndex++;
      }
    }
  },
  mixPuzzle : function(){
    var mode = this.puzzleSet.totalNum;
    var interval = setInterval(function() {
      var no = Math.floor(Math.random() * $('.can-click').length);
      var selectCanClickEl = $('.can-click')[no];
      selectCanClickEl.click();
    }, 100) 
    setTimeout(function() {
      clearInterval(interval)
      clickMix = false
    }, 100 * mode)
  },
  htmlMake : function(){
    var html ='';
    for (var i = 0; i < this.puzzleSet.colX; i++) {
      for (var j = 0; j < this.puzzleSet.rowY; j++) {
        if (this.puzzleSet.numArray[i][j] == '') {
          html += '<div class="colsBtn blank" data-x="'+ j + '" data-y="' + i + '" style="position:absolute; top:'+ 83*i +'px; left:'+ 83*j +'px">'+ this.puzzleSet.numArray[i][j] +'</div>'
        } else {
          html += '<div class="colsBtn" data-x="'+ j + '" data-y="' + i + '" style="position:absolute; top:'+ 83*i +'px; left:'+ 83*j +'px">'+ this.puzzleSet.numArray[i][j] +'</div>'
        }        
      }
    }
    $(this.puzzleSet.puzzleTable).html(html)
    $(this.puzzleSet.puzzleTable).css({'width':this.puzzleSet.colX*83, 'height': this.puzzleSet.rowY*83});
  },  
  canClick : function(){
    var blankX = $(this.puzzleSet.blankEl).data("x");
    var blankY = $(this.puzzleSet.blankEl).data("y");
    var btns = $('.colsBtn');
    for(var i = 0; i < this.puzzleSet.totalNum; i++) {
      if ($(btns[i]).data("x") == blankX && $(btns[i]).data("y") == blankY - 1) { // 위
        $(btns[i]).addClass('can-click');
      }
      else if ($(btns[i]).data("x") == blankX - 1 && $(btns[i]).data("y") == blankY) { // 왼쪽
        $(btns[i]).addClass('can-click')
      }
      else if ($(btns[i]).data("x") == blankX + 1 && $(btns[i]).data("y") == blankY) { // 오른쪽
        $(btns[i]).addClass('can-click')
      }
      else if ($(btns[i]).data("x") == blankX && $(btns[i]).data("y") == blankY + 1) { // 아래
        $(btns[i]).addClass('can-click')
      } else {
        $(btns[i]).removeClass('can-click')
      }
    }
    this.puzzleSet.canClickEl = $('.can-click');
  },
  addEvent: function(){
    var _this = this;
    $(this.puzzleSet.puzzlePiece).on('click', function(){
      _this.handleClicked.call(this, _this);      
      _this.canClick();
    })
   $(this.puzzleSet.puzzleChange).on('click', function(){
       _this.init(4,4);
    })
     $(this.puzzleSet.puzzleRandom).on('click', function(){
       var num = Math.floor(Math.random() * 6 + 2);
       _this.init(num,num);
    })
  },
  handleClicked: function(){
    var thisEl = $(this), 
        blankEl = $('.blank'),
        thisX = thisEl.data("x"),
        thisY = thisEl.data("y"),
        blankX = blankEl.data("x"),
        blankY = blankEl.data("y");

    if (thisX == blankX && thisY == blankY - 1){
      thisEl.animate({top: "+=83"}, 50)
      blankEl.animate({top: "-=83"}, 50)
      thisEl.data('y', blankY); 
      blankEl.data('y', thisY);
    }
    if (thisX == blankX + 1 && thisY == blankY) {
      thisEl.animate({left: "-=83"}, 50)
      blankEl.animate({left: "+=83"}, 50)
      thisEl.data('x', blankX); 
      blankEl.data('x', thisX);
    }     
    if (thisX == blankX - 1 && thisY == blankY) {
      thisEl.animate({left: "+=83"}, 50)
      blankEl.animate({left: "-=83"}, 50)
      thisEl.data('x', blankX); 
      blankEl.data('x', thisX);           
    }    
    if (thisX == blankX && thisY == blankY + 1) {
      thisEl.animate({top: "-=83"}, 50)
      blankEl.animate({top: "+=83"}, 50)
      thisEl.data('y', blankY); 
      blankEl.data("y", thisY);
    }
  }
}
puzzle.init(3,3);
