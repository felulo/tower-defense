/*-------------------------- Classe Sprite ----------------------------*/

function Sprite(largura,altura,imagem) {
    this._altura;
    this._largura;
    this._imagem;

    this.setAltura(altura);
    this.setLargura(largura);
    this.setImagem(imagem);
};

Sprite.prototype.getAltura = function () {
    return this._altura;
};

Sprite.prototype.getLargura = function () {
    return this._largura;
};

Sprite.prototype.getImagem = function () {
    return this._imagem;
};

Sprite.prototype.setAltura = function (altura) {
    this._altura = altura;
};

Sprite.prototype.setLargura = function (largura) {
    this._largura = largura;
};

Sprite.prototype.setImagem = function (imagem) {
    this._imagem = imagem;
};