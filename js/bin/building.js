/*-------------------------- Classe Building ----------------------------*/

function Building() {
    Tile.call(this);
    
    this._tipoAtaque;
    this._ataqueTerreno;
    this._danoBase;
    
    this._tempoReposicao;
    
    this._precoCompra;
    this._precoVenda;
    
    this._unidades;
    
    this._objetoTela;
    
    this._tipoConstrucao;
    
    Building.TIPO_ATAQUE_MELEE  = 1;
    Building.TIPO_ATAQUE_RANGED = 2;
    
    Building.ATAQUE_TERRENO_CHAO        = 1;
    Building.ATAQUE_TERRENO_AEREO_CHAO  = 2;
    
    Building.TEMPO_REPOSICAO_MUITO_DEVAGAR  = 1;
    Building.TEMPO_REPOSICAO_DEVAGAR        = 2;
    Building.TEMPO_REPOSICAO_REGULAR        = 3;
    Building.TEMPO_REPOSICAO_RAPIDO         = 4;
    Building.TEMPO_REPOSICAO_MUITO_RAPIDO   = 5;
    
    Building.ARCHER = 1;
    Building.MAGE   = 2;
};

Building.prototype = new Tile();
Building.prototype.constructor = Building;

Building.prototype.getTipoAtaque = function () {
    return this._tipoAtaque;
};

Building.prototype.getTipoConstrucao = function () {
    return this._tipoConstrucao;
};

Building.prototype.getAtaqueTerreno = function () {
    return this._ataqueTerreno;  
};

Building.prototype.getDanoBase = function () {
    return this._danoBase;
};

Building.prototype.getTempoReposicao = function () {
    return this._tempoReposicao;    
};

Building.prototype.getPrecoCompra = function () {
    return this._precoCompra;
};

Building.prototype.getPrecoVenda = function () {
    return this._precoVenda;
};

Building.prototype.getUnidades = function () {
    return this._unidades;
}

Building.prototype.getObjetoTela = function () {
    return this._objetoTela;
};

Building.prototype.setTipoAtaque = function (tipoAtaque) {
    this._tipoAtaque = tipoAtaque;
};

Building.prototype.setTipoConstrucao = function (tipoConstrucao) {
    this._tipoConstrucao = tipoConstrucao;
};

Building.prototype.setAtaqueTerreno = function (ataqueTerreno) {
    this._ataqueTerreno = ataqueTerreno;
};

Building.prototype.setDanoBase = function (danoBase) {
    this._danoBase = danoBase;
};

Building.prototype.setTempoReposicao = function (tempoReposicao) {
    this._tempoReposicao = tempoReposicao;
};

Building.prototype.setPrecoCompra = function (precoCompra) {
    this._precoCompra = precoCompra
};

Building.prototype.setPrecoVenda = function (precoVenda) {
    this._precoVenda = precoVenda;
};

Building.prototype.setUnidades = function (arrayUnidades) {
    this._unidades = arrayUnidades;
};

Building.prototype.setObjetoTela = function (objetoTela) {
    this._objetoTela = objetoTela;
};

/*-------------------------- Classe BuildingMelee ----------------------------*/

function BuildingMelee() {
    Building.call(this);
    
    this._quantidadeVida;
    this._armaduraFisica;
    
    this.setTipoAtaque(Building.TIPO_ATAQUE_MELEE);
    this.setAtaqueTerreno(Building.ATAQUE_TERRENO_CHAO);
};

BuildingMelee.prototype = new Building();
BuildingMelee.prototype.constructor = BuildingMelee;

BuildingMelee.prototype.getQuantidadeVida = function () {
    return this._quantidadeVida;    
};

BuildingMelee.prototype.getArmaduraFisica = function () {
    return this._armaduraFisica;    
};

BuildingMelee.prototype.setQuantidadeVida = function (quantidadeVida) {
    this._quantidadeVida = quantidadeVida;    
};

BuildingMelee.prototype.setArmaduraFisica = function (armaduraFisica) {
    this._armaduraFisica = armaduraFisica;    
};

/*-------------------------- Classe BuildingRanged ----------------------------*/

function BuildingRanged() {
    Building.call(this);
    
    this._alcanceTiro;
    
    this._spriteTiro;
    this._spriteTiroAtual;
    
    this._atirou;
    this._tiros;
    
    this._centroAlcanceX;
    this._centroAlcanceY;
    
    this._qtdeTiros;
    
    this._objetoTelaAlcance;
    
    BuildingRanged.ALCANCE_TIRO_PEQUENO = 1;
    BuildingRanged.ALCANCE_TIRO_REGULAR = 2;
    BuildingRanged.ALCANCE_TIRO_GRANDE  = 3;
    
    BuildingRanged.CONSTANTE_ALCANCE = 40;
    
    this.setTipoAtaque(Building.TIPO_ATAQUE_RANGED);
    this.setAtaqueTerreno(Building.ATAQUE_TERRENO_AEREO_CHAO);
    
    this.setAtirou(false);
    this.setTiros([]);
};

BuildingRanged.prototype = new Building();
BuildingRanged.prototype.constructor = BuildingRanged;

BuildingRanged.prototype.getAlcanceTiro = function () {
    return this._alcanceTiro;
};

BuildingRanged.prototype.getAtirou = function () {
    return this._atirou;
};
    
BuildingRanged.prototype.getSpriteTiro = function () {
    return this._spriteTiro;
};

BuildingRanged.prototype.getSpriteTiroAtual = function () {
    return this._spriteTiroAtual;
};

BuildingRanged.prototype.getCentroAlcanceX = function () {
    return this._centroAlcanceX;
};

BuildingRanged.prototype.getCentroAlcanceY = function () {
    return this._centroAlcanceY;
};

BuildingRanged.prototype.getTiros = function () {
    return this._tiros;
};

BuildingRanged.prototype.getObjetoTelaAlcance = function () {
    return this._objetoTelaAlcance;
};

BuildingRanged.prototype.getQtdeTiros = function () {
    return this._qtdeTiros;
};

BuildingRanged.prototype.setAlcanceTiro = function (alcanceTiro) {
    this._alcanceTiro = alcanceTiro;
};

BuildingRanged.prototype.setAtirou = function (atirou) {
    this._atirou = atirou;
};

BuildingRanged.prototype.setSpriteTiro = function (spriteTiro) {
    this._spriteTiro = spriteTiro;
};

BuildingRanged.prototype.setSpriteTiroAtual = function (spriteTiroAtual) {
    this._spriteTiroAtual = spriteTiroAtual;
};

BuildingRanged.prototype.setCentroAlcanceX = function (centroAlcanceX) {
    this._centroAlcanceX = centroAlcanceX;
};

BuildingRanged.prototype.setCentroAlcanceY = function (centroAlcanceY) {
    this._centroAlcanceY = centroAlcanceY;
};

BuildingRanged.prototype.setTiros = function (tiros) {
    this._tiros = tiros;
};

BuildingRanged.prototype.setObjetoTelaAlcance = function (objetoTelaAlcance) {
    this._objetoTelaAlcance = objetoTelaAlcance;
};

BuildingRanged.prototype.setQtdeTiros = function (qtdeTiros) {
    this._qtdeTiros = qtdeTiros;
};

BuildingRanged.prototype.Atirar = function (person, imagem) {        
    var curva;
    var calculoElipse;
    
    var a, b, x, y;
    
    if (this.getTiros().length <= (this.getQtdeTiros() - 1)) {            
        if ((this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE) > ((this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE) / 2)) {
            a = this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE;
            b = ((this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE) / 2);
        } else {
            a = ((this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE) / 2);
            b = this.getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE;
        }
        
        x = person.getCentroX();
        y = person.getCentroY();
        
        calculoElipse = ((x - this.getCentroAlcanceX()) * (x - this.getCentroAlcanceX())) / (a*a);
        calculoElipse += ((y - this.getCentroAlcanceY()) * (y - this.getCentroAlcanceY())) / (b*b);
        
        if (calculoElipse <= 1) {
            this.setAtirou(true);
            
            var dano = this.getDanoBase() - person.getArmadura();
            this.getTiros().push(new Shoot(this.getCentroAlcanceX(), this.getCentroAlcanceY() - 20, person, this, dano));            
        } 
    }
};

/*-------------------------- Classe Archer ----------------------------*/

function Archer() {
    BuildingRanged.call(this);
    
    this.setNomeTile(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[0]);
    this.setDanoBase(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[1]);
    
    this.setAlcanceTiro(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[2]);
    this.setTempoReposicao(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[3]);
    
    this.setQtdeTiros(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[4]);
    
    this.setPrecoCompra(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[5]);
    this.setPrecoVenda(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO)[6]);
    
    var array = [];
    
    var sprite = TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO);
    sprite = sprite[sprite.length - 1];
    
    array.push(new Sprite(42, 76, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_TORRE)));
    
    this.setSprite(array);
    this.setSpriteAtual(0);
    
    var arrayTiro = [];
    
    sprite = TorresConfig.PegarInfoTorre(TorresConfig.TORRE_ARQUEIRO);
    sprite = sprite[sprite.length - 2];
    
    arrayTiro.push(new Sprite(18, 3, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_TIRO)));
    
    this.setSpriteTiro(arrayTiro);
    this.setSpriteTiroAtual(0);
    
    this.setTipoConstrucao(Building.ARCHER);
};

Archer.prototype = new BuildingRanged();
Archer.prototype.constructor = Archer;

Archer.prototype.setYVisaoIsometrica = function (YVisaoIsometrica) {
    this._yVisaoIsometrica = YVisaoIsometrica + (Tile.TAMANHO_HEIGHT - this.getSprite()[this.getSpriteAtual()].getAltura());
};

/*-------------------------- Classe Mage ----------------------------*/

function Mage() {
    BuildingRanged.call(this);
    
    this.setNomeTile(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[0]);
    this.setDanoBase(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[1]);
    
    this.setAlcanceTiro(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[2]);
    this.setTempoReposicao(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[3]);
    
    this.setQtdeTiros(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[4]);
    
    this.setPrecoCompra(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[5]);
    this.setPrecoVenda(TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO)[6]);
    
    var array = [];
    
    var sprite = TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO);
    sprite = sprite[sprite.length - 1];
    
    array.push(new Sprite(42, 72, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_TORRE)));
    
    this.setSprite(array);
    this.setSpriteAtual(0);
    
    var arrayTiro = [];
    
    sprite = TorresConfig.PegarInfoTorre(TorresConfig.TORRE_MAGO);
    sprite = sprite[sprite.length - 2];
    
    arrayTiro.push(new Sprite(8, 8, ImagensConfig.PegarImagem(sprite, 0, ImagensConfig.IMAGEM_TIRO)));
    
    this.setSpriteTiro(arrayTiro);
    this.setSpriteTiroAtual(0);
    
    this.setTipoConstrucao(Building.MAGE);
}

Mage.prototype = new BuildingRanged();
Mage.prototype.constructor = Mage;

Mage.prototype.setYVisaoIsometrica = function (YVisaoIsometrica) {
    this._yVisaoIsometrica = YVisaoIsometrica + (Tile.TAMANHO_HEIGHT - this.getSprite()[this.getSpriteAtual()].getAltura());
};