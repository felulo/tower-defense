function Factory () { };

Factory._posicaoXInicial;
Factory._posicaoYInicial;

Factory.ConstruirMapa = function (mapa) {        
    for (var i = 0; i < Map.TAMANHO_HEIGHT; i++) {
        for (var j = 0; j < Map.TAMANHO_WIDTH; j++) {
            switch (mapa._mapa[i][j]) {
                case 0:
                case 1:
                case 2:
                    if (mapa._mapa[i][j] == 0 || mapa._mapa[i][j] == 2)
                        _tile = new ChaoTerra();
                    else if (mapa._mapa[i][j] == 1)
                        _tile = new ChaoGrama();
                    
                    _tile.setXVisaoNormal(j * Tile.TAMANHO_WIDTH);
                    _tile.setYVisaoNormal(i * Tile.TAMANHO_HEIGHT);
                    
                    _tile.setXVisaoIsometrica((j - i) * Tile.TAMANHO_WIDTH / 2 + Draw.getEspacoEsquerdo());
                    _tile.setYVisaoIsometrica((j + i) * Tile.TAMANHO_WIDTH / 4 + Draw.getEspacoTopo());
                    
                    if (mapa._mapa[i][j] == 2) {
                        Factory._posicaoXInicial = j;
                        Factory._posicaoYInicial = i;
                    }
                    
                    mapa._mapa[i][j] = _tile;
                    
                    break;
            }
        }
    }
};
    
Factory.ConstruirTorre = function (x, y, tipo) {
    switch (tipo) {
        case Building.ARCHER:
            _tile = new Archer();
            break;
        case Building.MAGE:
            _tile = new Mage();
            break;
    }
    
    _tile.setXVisaoNormal(y * Tile.TAMANHO_WIDTH);
    _tile.setYVisaoNormal(x * Tile.TAMANHO_HEIGHT);
    
    _tile.setXVisaoIsometrica((y - x) * Tile.TAMANHO_WIDTH / 2 + Draw.getEspacoEsquerdo());
    _tile.setYVisaoIsometrica((y + x) * Tile.TAMANHO_WIDTH / 4 + Draw.getEspacoTopo());
    
    _tile.setCentroAlcanceX(_tile.getXVisaoIsometrica() + (_tile.getSprite()[_tile.getSpriteAtual()].getLargura() / 2));
    _tile.setCentroAlcanceY(_tile.getYVisaoIsometrica() + (_tile.getSprite()[_tile.getSpriteAtual()].getAltura() / 2));
    
    return _tile;
};
    
Factory.ConstruirInimigo = function (tipo) {
    switch (tipo) {
        case Enemy.SOLDIER1:
            _tile = new Soldier1();
            break;
        case Enemy.SOLDIER2:
            _tile = new Soldier2();
            break;
    }
    
    _tile.setPosicaoX(Factory._posicaoXInicial);
    _tile.setPosicaoY(Factory._posicaoYInicial);
    
    _tile.setXVisaoNormal(_tile.getPosicaoX() * Tile.TAMANHO_WIDTH);
    _tile.setYVisaoNormal(_tile.getPosicaoY() * Tile.TAMANHO_HEIGHT);
    
    _tile.setDirecaoAtual(Enemy.DIRECAO_BAIXO);
    
    _tile.setXVisaoIsometrica((_tile.getPosicaoX() - _tile.getPosicaoY()) * Tile.TAMANHO_WIDTH / 2 + Draw.getEspacoEsquerdo());
    _tile.setYVisaoIsometrica((_tile.getPosicaoX() + _tile.getPosicaoY()) * Tile.TAMANHO_WIDTH / 4 + Draw.getEspacoTopo());
    
    return _tile;
};