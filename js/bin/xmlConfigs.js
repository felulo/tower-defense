function Config() { };

/*-------------------------- Classe Torres ----------------------------*/

function TorresConfig() { };

TorresConfig._array = [];

TorresConfig.TORRE_ARQUEIRO   = 1;
TorresConfig.TORRE_MAGO       = 2;

TorresConfig.ArmazenarInfoTorre = function(Tipo, Torre) {
    var _arr = [Tipo, Torre, true];
    
    TorresConfig._array.push(_arr);
};

TorresConfig.PegarInfoTorre = function(Tipo) {
    for (var i = 0; i < TorresConfig._array.length; i++)
        if (TorresConfig._array[i][0] == Tipo)
            return TorresConfig._array[i][1];
    
    return undefined;
};
    
TorresConfig.VerificarCarregamentoInfoTorres = function() {
    for (var i = 0; i < TorresConfig._array.length; i++)
        if (!TorresConfig._array[i][2])
            return false;
    
    return (TorresConfig._array.length > 0) ? true : false;
};

/*-------------------------- Classe Unidades ----------------------------*/

function UnidadesConfig() { };

UnidadesConfig._array = [];

UnidadesConfig.UNIDADE_SOLDADO1      = 1;
UnidadesConfig.UNIDADE_SOLDADO2     = 2;

UnidadesConfig.ArmazenarInfoUnidade = function(Tipo,Unidade) {
    var _arr = [Tipo, Unidade, true];
    
    UnidadesConfig._array.push(_arr);
};

UnidadesConfig.PegarInfoUnidade = function(Tipo) {
    for (var i = 0; i < UnidadesConfig._array.length; i++)
        if (UnidadesConfig._array[i][0] == Tipo)
            return UnidadesConfig._array[i][1];
    
    return undefined;
};
    
UnidadesConfig.VerificarCarregamentoInfoUnidades = function() {
    for (var i = 0; i < UnidadesConfig._array.length; i++)
        if (!UnidadesConfig._array[i][2])
            return false;
    
    return (UnidadesConfig._array.length > 0) ? true : false;
};

/*-------------------------- Classe Mapa ----------------------------*/

function MapaConfig() { };

MapaConfig.UNIDADE_SOLDADO    = 1;
MapaConfig.UNIDADE_ORC        = 2;

MapaConfig._array = [];

MapaConfig.ArmazenarInfoMapa = function(Tipo, Tile) {
    var _arr = [Tipo, Tile, true];
    
    MapaConfig._array.push(_arr);
};

MapaConfig.PegarInfoTile = function(Tipo) {
    for (var i = 0; i < MapaConfig._array.length; i++)
        if (MapaConfig._array[i][0] == Tipo)
            return MapaConfig._array[i][1];
    
    return undefined;
};
    
MapaConfig.VerificarCarregamentoInfoTile = function() {
    for (var i = 0; i < MapaConfig._array.length; i++)
        if (!MapaConfig._array[i][2])
            return false;
    
    return (MapaConfig._array.length > 0) ? true : false;
};

/*-------------------------- Classe Imagens ----------------------------*/

function ImagensConfig() { };

ImagensConfig._array = [];

ImagensConfig.IMAGEM_TORRE    = 1;
ImagensConfig.IMAGEM_UNIDADE  = 2;
ImagensConfig.IMAGEM_TIRO     = 3;
ImagensConfig.IMAGEM_MAPA     = 4;

ImagensConfig.ArmazenarImagem = function(ArrayImagens, Tipo) {
    var _arr = [];
    
    _arr.push(ImagensConfig._array.length);
    
    for (var i = 0; i < ArrayImagens.length; i++) {
        var _arrAux = [_arr.length - 1, ArrayImagens[i], false];
        
        _arrAux[1].pai = _arrAux;
        _arrAux[1].onload = function() {
            this.pai[2] = true;
        };

        _arr.push(_arrAux);
    }
    
    _arr.push(Tipo);
    
    ImagensConfig._array.push(_arr);
};

ImagensConfig.PegarImagem = function(Sprite, Indice, Tipo) {
    var posImagem = -1;
    
    for (var i = 0; i < ImagensConfig._array.length; i++) {
        if (ImagensConfig._array[i][ImagensConfig._array[i].length - 1] == Tipo) {
            posImagem++;
            
            if (posImagem == Sprite) {
                
                return ImagensConfig._array[i][Indice + 1][1];
            }
        }
    }
    
    return undefined;
};
    
ImagensConfig.VerificarCarregamentoImagens = function() {    
    for (var i = 0; i < ImagensConfig._array.length; i++)
        for (var j = 1; j < ImagensConfig._array[i].length - 1; j++) {
            
            if (!ImagensConfig._array[i][j][2])
                return false;
        }
    
    return (ImagensConfig._array.length > 0) ? true : false;
};