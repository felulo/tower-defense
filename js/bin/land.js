/*-------------------------- Classe ChaoTerra ----------------------------*/

function ChaoTerra() {
    Tile.call(this);
    
    var array = [];
    
    array.push(new Sprite(42, 42, ImagensConfig.PegarImagem(0, 0, ImagensConfig.IMAGEM_MAPA)));
    this.setPodeAndar(true);
    
    this.setSprite(array);
    this.setSpriteAtual(0);
};

ChaoTerra.prototype = new Tile();
ChaoTerra.prototype.constructor = ChaoTerra;

ChaoTerra.prototype.setYVisaoIsometrica = function (YVisaoIsometrica) {
    this._yVisaoIsometrica = YVisaoIsometrica + (Tile.TAMANHO_HEIGHT - this.getSprite()[this.getSpriteAtual()].getAltura());
};

/*-------------------------- Classe ChaoGrama ----------------------------*/

function ChaoGrama() {
    Tile.call(this);
    
    var array = [];
    
    array.push(new Sprite(42, 42, ImagensConfig.PegarImagem(1, 0, ImagensConfig.IMAGEM_MAPA)));
    
    this.setPodeAndar(false);
    
    this.setSprite(array);
    this.setSpriteAtual(0);
}

ChaoGrama.prototype = new Tile();
ChaoGrama.prototype.constructor = ChaoGrama;