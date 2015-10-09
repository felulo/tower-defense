/*-------------------------- Classe Enemy ----------------------------*/

function Enemy() {
    this._posicaoX;
    this._posicaoY;
    
    this._armadura;
    
    this._vida;
    this._vidaTotal;
    
    this._custoMorte;
    
    this._objetoTela;
    this._objetoTelaVida;
    
    this._direcaoAtual;
    
    Enemy.DIRECAO_CIMA      = 1; 
    Enemy.DIRECAO_BAIXO     = 2;
    Enemy.DIRECAO_ESQUERDA  = 3;
    Enemy.DIRECAO_DIREITA   = 4;
    
    Enemy.SOLDIER1   = 1;
    Enemy.SOLDIER2   = 2;
};

Enemy.prototype = new Tile();
Enemy.prototype.constructor = Enemy;

Enemy.prototype.getPosicaoX = function () {
    return this._posicaoX;
};

Enemy.prototype.getPosicaoY = function () {
    return this._posicaoY;
};

Enemy.prototype.getDirecaoAtual = function () {
    return this._direcaoAtual;
};

Enemy.prototype.getArmadura = function () {
    return this._armadura;
};
    
Enemy.prototype.getCentroX = function () {
    return this.getXVisaoIsometrica() + (Tile.TAMANHO_WIDTH / 2);
};

Enemy.prototype.getCentroY = function () {
    return this.getYVisaoIsometrica() + (Tile.TAMANHO_HEIGHT - this.getSprite()[this.getSpriteAtual()].getAltura()) / 2;
};

Enemy.prototype.getVida = function () {
    return this._vida;
};

Enemy.prototype.getVidaTotal = function () {
    return this._vidaTotal;
};

Enemy.prototype.getCustoMorte = function () {
    return this._custoMorte;
};

Enemy.prototype.getObjetoTela = function () {
    return this._objetoTela;
};

Enemy.prototype.getObjetoTelaVida = function () {
    return this._objetoTelaVida;
};

Enemy.prototype.setYVisaoIsometrica = function (YVisaoIsometrica) {
    this._yVisaoIsometrica = YVisaoIsometrica + (Tile.TAMANHO_HEIGHT - this.getSprite()[this.getSpriteAtual()].getAltura());
};

Enemy.prototype.setPosicaoX = function (posicaoX) {
    this._posicaoX = posicaoX;
};

Enemy.prototype.setPosicaoY = function (posicaoY) {
    this._posicaoY = posicaoY;
};

Enemy.prototype.setArmadura = function (armadura) {
    this._armadura = armadura;
};

Enemy.prototype.setDirecaoAtual = function (direcaoAtual) {
    this._direcaoAtual = direcaoAtual;
};

Enemy.prototype.setVida = function (vida) {
    if (vida < 0)
        this._vida = 0;
    else
        this._vida = vida;
};

Enemy.prototype.setVidaTotal = function (vidaTotal) {
    this._vidaTotal = vidaTotal;
};

Enemy.prototype.setCustoMorte = function (custoMorte) {
    this._custoMorte = custoMorte;
};

Enemy.prototype.setObjetoTela = function (objTela) {
    this._objetoTela = objTela;
};
    
Enemy.prototype.setObjetoTelaVida = function (objTelaVida) {
    this._objetoTelaVida = objTelaVida;
};

Enemy.prototype.Mover = function (direcao) {    
    switch(direcao) {
        case Enemy.DIRECAO_ESQUERDA:                
            this.setPosicaoX(this.getPosicaoX() - 1);
            this.setSpriteAtual(1);
            this.setDirecaoAtual(Enemy.DIRECAO_ESQUERDA);
            
            break;
        case Enemy.DIRECAO_DIREITA:
            this.setPosicaoX(this.getPosicaoX() + 1);
            this.setSpriteAtual(3);
            this.setDirecaoAtual(Enemy.DIRECAO_DIREITA);
            
            break;
        case Enemy.DIRECAO_CIMA:
            this.setPosicaoY(this.getPosicaoY() - 1);
            this.setSpriteAtual(2);
            this.setDirecaoAtual(Enemy.DIRECAO_CIMA);
            
            break;
        case Enemy.DIRECAO_BAIXO:
            this.setPosicaoY(this.getPosicaoY() + 1);
            this.setSpriteAtual(0);
            this.setDirecaoAtual(Enemy.DIRECAO_BAIXO);
            
            break;
    }
    
    this.setXVisaoIsometrica((this.getPosicaoX() - this.getPosicaoY()) * Tile.TAMANHO_WIDTH / 2 + Draw.getEspacoEsquerdo());
    this.setYVisaoIsometrica((this.getPosicaoX() + this.getPosicaoY()) * Tile.TAMANHO_WIDTH / 4 + Draw.getEspacoTopo());
    
    this.getObjetoTela().setPosition(this.getXVisaoIsometrica(), this.getYVisaoIsometrica());
    this.getObjetoTelaVida().setPosition(this.getXVisaoIsometrica() + 10, this.getYVisaoIsometrica());
    
    this.getObjetoTela().setImage(this.getSprite()[this.getSpriteAtual()].getImagem());
    
    this.getObjetoTela().getLayer().draw();
};

Enemy.prototype.VerificaPersonagem = function (x,y) {
    for (var o = 0; o < _enemys.length; o++)
        if (_enemys[o].getPosicaoY() == x && _enemys[o].getPosicaoX() == y)
            return false;
    
    return true;
};

Enemy.prototype.VerificarMovimento = function (mapa) {
    var x,y;
    
    x = this.getPosicaoX();
    y = this.getPosicaoY();
    
    switch (this.getDirecaoAtual()) {
        case Enemy.DIRECAO_ESQUERDA:
            if ((y - 1) >= 0 && mapa._mapa[y - 1][x].getPodeAndar() && this.VerificaPersonagem(y - 1,x)) {
                this.Mover(Enemy.DIRECAO_CIMA);
            } else if ((y + 1) < Map.TAMANHO_HEIGHT && mapa._mapa[y + 1][x].getPodeAndar() && this.VerificaPersonagem(y + 1,x)) {
                this.Mover(Enemy.DIRECAO_BAIXO);
            } else if ((x - 1) >= 0 && mapa._mapa[y][x - 1].getPodeAndar() && this.VerificaPersonagem(y,x - 1)) {
                this.Mover(Enemy.DIRECAO_ESQUERDA);
            }
            
            break;
        case Enemy.DIRECAO_DIREITA:
            if ((y - 1) >= 0 && mapa._mapa[y - 1][x].getPodeAndar() && this.VerificaPersonagem(y - 1,x)) {
                this.Mover(Enemy.DIRECAO_CIMA);
            } else if ((y + 1) < Map.TAMANHO_HEIGHT && mapa._mapa[y + 1][x].getPodeAndar() && this.VerificaPersonagem(y + 1,x)) {
                   this.Mover(Enemy.DIRECAO_BAIXO);
            } else if ((x + 1) < Map.TAMANHO_WIDTH && mapa._mapa[y][x + 1].getPodeAndar() && this.VerificaPersonagem(y,x + 1)) {
                this.Mover(Enemy.DIRECAO_DIREITA); 
            }
            
            break;
        case Enemy.DIRECAO_CIMA:
            if ((y - 1) >= 0 && mapa._mapa[y - 1][x].getPodeAndar() && this.VerificaPersonagem(y - 1,x)) {
                this.Mover(Enemy.DIRECAO_CIMA);
            } else if ((x - 1) >= 0 && mapa._mapa[y][x - 1].getPodeAndar() && this.VerificaPersonagem(y,x - 1)) {
                this.Mover(Enemy.DIRECAO_ESQUERDA);
            } else if ((x + 1) < Map.TAMANHO_WIDTH && mapa._mapa[y][x + 1].getPodeAndar() && this.VerificaPersonagem(y,x + 1)) {
                this.Mover(Enemy.DIRECAO_DIREITA); 
            }
            
            break;
        case Enemy.DIRECAO_BAIXO:
            if ((y + 1) < Map.TAMANHO_HEIGHT && mapa._mapa[y + 1][x].getPodeAndar() && this.VerificaPersonagem(y + 1,x)) {
                this.Mover(Enemy.DIRECAO_BAIXO);
            } else if ((x - 1) >= 0 && mapa._mapa[y][x - 1].getPodeAndar() && this.VerificaPersonagem(y,x - 1)) {
                this.Mover(Enemy.DIRECAO_ESQUERDA);
            } else if ((x + 1) < Map.TAMANHO_WIDTH && mapa._mapa[y][x + 1].getPodeAndar() && this.VerificaPersonagem(y,x + 1)) {
                this.Mover(Enemy.DIRECAO_DIREITA);
            }
            
            break;
    }
};

/*-------------------------- Classe Soldier ----------------------------*/

function Soldier1() {
    Enemy.call(this);
    
    var array = [];
    
    var sprite = UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO1);
    
    sprite = sprite[sprite.length - 1];
    
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 1, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 2, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 3, ImagensConfig.IMAGEM_UNIDADE)));
    
    this.setSprite(array);
    this.setSpriteAtual(0);
    
    this.setNomeTile(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO1)[0]);
    this.setVidaTotal(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO1)[1]);
    this.setVida(this.getVidaTotal());
    
    this.setArmadura(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO1)[2]);
    
    this.setCustoMorte(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO1)[3]);
};

Soldier1.prototype = new Enemy();
Soldier1.prototype.constructor = Soldier1;

/*-------------------------- Classe Soldier2 ----------------------------*/

function Soldier2() {
    Enemy.call(this);
    
    var array = [];
    var sprite = UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO2);
    
    sprite = sprite[sprite.length - 1];
    
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 1, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 2, ImagensConfig.IMAGEM_UNIDADE)));
    array.push(new Sprite(42, 58, ImagensConfig.PegarImagem(sprite, 3, ImagensConfig.IMAGEM_UNIDADE)));
    
    this.setSprite(array);
    this.setSpriteAtual(0);
    
    this.setNomeTile(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO2)[0]);
    this.setVidaTotal(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO2)[1]);
    this.setVida(this.getVidaTotal());
    
    this.setArmadura(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO2)[2]);
    
    this.setCustoMorte(UnidadesConfig.PegarInfoUnidade(UnidadesConfig.UNIDADE_SOLDADO2)[3]);
};

Soldier2.prototype = new Enemy();
Soldier2.prototype.constructor = Soldier2;