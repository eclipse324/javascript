var puzzle = {
  init: function(col, row){
    this.puzzleSet = {
      colX : col,
      rowY : row,
      totalNum : col * row,
      numArray: [],
      blankEl : '.blank',
      puzzleTable : '#puzzle-table',
      puzzlePiece : '.colsBtn',
    }    
    this.setarrMake();    
    this.shuffleArray();
    this.arrMake();
    this.htmlMake();    
    this.addEvent();
  },
  setarrMake : function(){    
    for (var i = 1; i < this.puzzleSet.totalNum; i++) {
      this.puzzleSet.numArray[i-1] = i;
    }
    this.puzzleSet.numArray.push('');        
    console.log(this.puzzleSet.numArray)
  },
  shuffleArray: function() {
    var arr = this.puzzleSet.numArray;
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }    
    console.log(this.puzzleSet.numArray)
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
    console.log(this.puzzleSet.numArray)
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
  addEvent: function(){
    var _this = this;
    $(this.puzzleSet.puzzlePiece).on('click', function(){
       _this.handleClicked.call(this, _this);
    })
  },
  handleClicked: function(){
    console.log('ok');
    var thisEl = $(this), 
        blankEl = $('.blank'),
        thisX = thisEl.data("x"),
        thisY = thisEl.data("y"),
        blankX = blankEl.data("x"),
        blankY = blankEl.data("y");
        
    if (thisX == blankX && thisY == blankY - 1){
      thisEl.animate({top: "+=83"}, 300)
      blankEl.animate({top: "-=83"}, 300)
      thisEl.data('y', blankY); 
      blankEl.data('y', thisY);
    }
    if (thisX == blankX + 1 && thisY == blankY) {
      thisEl.animate({left: "-=83"}, 300)
      blankEl.animate({left: "+=83"}, 300)
      thisEl.data('x', blankX); 
      blankEl.data('x', thisX);
    }     
    if (thisX == blankX - 1 && thisY == blankY) {
      thisEl.animate({left: "+=83"}, 300)
      blankEl.animate({left: "-=83"}, 300)
      thisEl.data('x', blankX); 
      blankEl.data('x', thisX);     
      
    }    
    if (thisX == blankX && thisY == blankY + 1) {
      thisEl.animate({top: "-=83"}, 300)
      blankEl.animate({top: "+=83"}, 300)
      thisEl.data('y', blankY); 
      blankEl.data("y", thisY);
    }
    console.log($(puzzlePiece).data('x'));
  }
}
puzzle.init(3,3);

