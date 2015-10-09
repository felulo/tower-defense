function Tile() {
    this._xVisaoNormal;
    this._yVisaoNormal;
    
    this._xVisaoIsometrica;
    this._yVisaoIsometrica;
    
    this._podeAndar;
    
    this._nomeTile;
    
    this._sprite;
    this._spriteAtual;
    
    Tile.TAMANHO_WIDTH  = 42;
    Tile.TAMANHO_HEIGHT = 42;
};

Tile.prototype.getXVisaoNormal = function () {
    return this._xVisaoNormal;
};

Tile.prototype.getYVisaoNormal = function () {
    return this._yVisaoNormal;
};

Tile.prototype.getXVisaoIsometrica = function () {
    return this._xVisaoIsometrica;
};

Tile.prototype.getYVisaoIsometrica = function () {
    return this._yVisaoIsometrica;
};

Tile.prototype.getPodeAndar = function () {
    return this._podeAndar;
};

Tile.prototype.getNomeTile = function () {
    return this._nomeTile;
};

Tile.prototype.getSprite = function () {
    return this._sprite;
};

Tile.prototype.getSpriteAtual = function () {
    return this._spriteAtual;
};

Tile.prototype.setXVisaoNormal = function (xVisaoNormal) {
    this._xVisaoNormal = xVisaoNormal;
};

Tile.prototype.setYVisaoNormal = function (yVisaoNormal) {
    this._yVisaoNormal = yVisaoNormal;
};

Tile.prototype.setXVisaoIsometrica = function (xVisaoIsometrica) {
    this._xVisaoIsometrica = xVisaoIsometrica;
};

Tile.prototype.setYVisaoIsometrica = function (yVisaoIsometrica) {
    this._yVisaoIsometrica = yVisaoIsometrica;
};

Tile.prototype.setPodeAndar = function (podeAndar) {
    this._podeAndar = podeAndar;
};

Tile.prototype.setNomeTile = function (nomeTile) {
    this._nomeTile = nomeTile;
};

Tile.prototype.setSprite = function (sprite) {
    this._sprite = sprite;
};

Tile.prototype.setSpriteAtual = function (spriteAtual) {
    this._spriteAtual = spriteAtual;
};