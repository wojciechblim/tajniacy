function Team(color){
  this.color = color;
  this.points = 0;
  this.players = [];
}

Team.prototype = {
  addPlayer(player){
    this.players.push(player);
  }
}

function Player(name){
  this.name = name;
}

function random(max){
  return Math.floor(Math.random()*max);
}

function Tile(model){
  this.model = model;
  this.el = document.createElement("div");
  const text = document.createTextNode(model.text);
  this.el.appendChild(text);
  this.el.style.height = "300px";
  this.el.style.width = "200px";
  this.el.style.float = "left";
  this.el.style.margin = "20px";
  this.el.style.border = "solid";
  this.el.style.textAlign = "center";

  this.el.addEventListener('click',event=>{
    alert(this.model.color);
  });
}

Tile.prototype = {
  render(){
    return this.el;
  }
}

function TileModel(text,color){
    //jeszcze nie wykorzystane id
    this.id = Math.random();
    this.text = text;
    this.color = color;
    this.events = {};
}

TileModel.prototype = {
  on: function(eventName,callback){
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback);
  },
  off: function(eventName,callback){
    if(this.events[eventName]){
      for(var i = 0;i<this.events[eventName].length;i++){
        if(this.events[eventName][i]===callback){
          this.events[eventName].splice(i,1);
          break;
        }
      }
    }
  },
  emit: function(eventName, data){
    const event = this.events[eventName];
    if(event){
      event.forEach(callback => {
        callback(data);
      });
    }
  }

}


function AppView(board){
  this.el = document.createElement("div");
  board.appendChild(this.el);
  //this.form = document.createElement("input");
  //this.form.setAttribute("type","text");
  //this.el.appendChild(this.form);
  //jest stała liczba kolorów kart w grze
  this.colors = ["red","red","red","blue","blue","blue","grey","grey","black"];
  this.tiles = ["gniazdo","schody","burak","pakistan","kostka","myszka","kosa","osiem","przepaść"];
  this.tileModels = [];
}

AppView.prototype = {
  render(){
    this.tiles.forEach(tile => {
      const colorNumber = random(this.colors.length);
      const model = new TileModel(tile,this.colors[colorNumber]);
      this.tileModels.push(model);
      this.el.appendChild(new Tile(model).render())
      this.colors.splice(colorNumber,1);
    });
    return this.el;
  },
}

document.addEventListener("DOMContentLoaded", event =>{
  const game = new AppView(document.body);
  game.render();
});
