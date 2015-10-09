function Shoot(x, y, person, torre, dano) {
    this._curve;
    
    this._imagemTiro;
    this._torrePai;
    this._personagemAlvo;
    
    this._x;
    this._y;
    this._xTo;
    this._yTo;
    
    this._dano;
    this._flagDano = false;
    
    this.setImagemTiro(Draw.DesenharTiro(torre));
    this.setPersonagemAlvo(person);
    this.setTorrePai(torre);
    
    this.setDano(dano);
    
    this.setX(x);
    this.setY(y);
    this.setXTo(person.getCentroX());
    this.setYTo(person.getCentroY());
    
    Draw.getLayerTiros().add(this.getImagemTiro());
    
    if (this.getY() < this.getYTo())
        this._curve = new CurveAnimator([this.getX(), this.getY()], [this.getXTo(), this.getYTo()], null, [this.getXTo(), this.getY()]);
    else
        this._curve = new CurveAnimator([this.getX(), this.getY()], [this.getXTo(), this.getYTo()], [this.getX(), this.getYTo()], null);
    
    this._curve.animate(.5, this, 0);
}

Shoot.prototype.getX = function () {
    return this._x;
};

Shoot.prototype.getY = function () {
    return this._y;
};

Shoot.prototype.getDano = function () {
    return this._dano;
};

Shoot.prototype.getImagemTiro = function () {
    return this._imagemTiro;
};

Shoot.prototype.getTorrePai = function () {
    return this._torrePai;
};

Shoot.prototype.getPersonagemAlvo = function () {
    return this._personagemAlvo;
};

Shoot.prototype.getXTo = function () {
    return this._xTo;
};

Shoot.prototype.getYTo = function () {
    return this._yTo;
};

Shoot.prototype.setX = function (x) {
    this._x = x;
};

Shoot.prototype.setY = function (y) {
    this._y = y;
};

Shoot.prototype.setDano = function (dano) {
    this._dano = dano;
};

Shoot.prototype.setTorrePai = function (torrePai) {
    this._torrePai = torrePai;
};

Shoot.prototype.setPersonagemAlvo = function (personagemAlvo) {
    this._personagemAlvo = personagemAlvo;
};

Shoot.prototype.setImagemTiro = function (imagemTiro) {
    this._imagemTiro = imagemTiro;
};

Shoot.prototype.setXTo = function (xTo) {
    this._xTo = xTo;
};

Shoot.prototype.setYTo = function (yTo) {
    this._yTo = yTo;
};

Shoot.prototype.AnimaFlecha = function (ponto,angulo) {
    this.getImagemTiro().setPosition(ponto.x, ponto.y);
    this.getImagemTiro().setRotationDeg(angulo);
    
    this.getImagemTiro().getLayer().draw();
    
    if ((ponto.x >= (this.getXTo() - 3) && ponto.x <= (this.getXTo() + 3)) && (ponto.y >= (this.getYTo() - 3) && ponto.y <= (this.getYTo() + 3))) {
        try {
            if (this.getImagemTiro() != undefined)
                this.getImagemTiro().getLayer().remove(this.getImagemTiro());
        } catch (err) {}
        
        //this.getTorrePai().setAtirou(false);
        if (!this._flagDano) {
            this._flagDano = true;
            this.getPersonagemAlvo().setVida(this.getPersonagemAlvo().getVida() - (this.getDano() < 0 ? 0 : this.getDano()));
        }
        
        for (var j = 0; j < this.getTorrePai().getTiros().length; j++)
            if (this.getTorrePai().getTiros()[j] == this) {
                this.getTorrePai().getTiros().splice(j,1);
                break;
            }
        
        if (this.getPersonagemAlvo().getVida() == 0) {
            this.getPersonagemAlvo().getObjetoTela().getLayer().remove(this.getPersonagemAlvo().getObjetoTela());
            this.getPersonagemAlvo().getObjetoTelaVida().getLayer().remove(this.getPersonagemAlvo().getObjetoTelaVida());
            
            Draw.getLayerUnidades().draw();
            
            _gold += parseInt(this.getPersonagemAlvo().getCustoMorte());
            AtualizarGold();
            
            for (var i = 0; i < _enemys.length; i++) {
                if (_enemys[i] == this.getPersonagemAlvo()) {
                    _enemys.splice(i,1);
                    break;
                }
            }
        } else {                
            width = ((this.getPersonagemAlvo().getVida() - (this.getTorrePai().getDanoBase() - this.getPersonagemAlvo().getArmadura())) * 20) / this.getPersonagemAlvo().getVidaTotal();
            
            if (width < 0)
                this.getPersonagemAlvo().getObjetoTelaVida().getChildren()[1].setWidth(0);
            else
                this.getPersonagemAlvo().getObjetoTelaVida().getChildren()[1].setWidth(width);
            
            this.getPersonagemAlvo().getObjetoTelaVida().getLayer().draw();
        }
    }
};