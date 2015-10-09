function Draw() { };

Draw._stage;

Draw._layerLoading;
Draw._layerMapa;
Draw._layerTiros;
Draw._layerUnidades;
Draw._layerConstrucoes;
Draw._layerPreview;

Draw._espacoEsquerdo;
Draw._espacoTopo;

Draw._construcao;
Draw._tipoConstrucao;
Draw._colocarConstrucao;

Draw._mostrarAlcance = false;
Draw._objetoAlcanceAtivo;

Draw.TAMANHO_STAGE_WIDTH   = 746;
Draw.TAMANHO_STAGE_HEIGHT  = 416;

Draw.getStage = function () {
    return Draw._stage;
};

Draw.getLayerLoading = function () {
    return Draw._layerLoading;
};

Draw.getLayerMapa = function () {
    return Draw._layerMapa;
};

Draw.getLayerUnidades = function () {
    return Draw._layerUnidades;
};

Draw.getLayerTiros = function () {
    return Draw._layerTiros;
};

Draw.getLayerConstrucoes = function () {
    return Draw._layerConstrucoes;
};

Draw.getLayerPreview = function () {
    return Draw._layerPreview;
};

Draw.getEspacoEsquerdo = function () {
    return Draw._espacoEsquerdo;
};

Draw.getEspacoTopo = function () {
    return Draw._espacoTopo;
};

Draw.getColocarConstrucao = function () {
    return Draw._colocarConstrucao;
};

Draw.getConstrucao = function () {
    return Draw._construcao;
};

Draw.getTipoConstrucao = function () {
    return Draw._tipoConstrucao;
};

Draw.setStage = function (stage) {
    Draw._stage = stage;
};

Draw.setLayerLoading = function (layerLoading) {
    Draw._layerLoading= layerLoading;
};

Draw.setLayerMapa = function (layerMapa) {
    Draw._layerMapa = layerMapa;
};

Draw.setLayerUnidades = function (layerUnidades) {
    Draw._layerUnidades = layerUnidades;
};

Draw.setLayerTiros = function (layerTiros) {
    Draw._layerTiros = layerTiros;
};

Draw.setLayerPreview = function (layerPreview) {
    Draw._layerPreview = layerPreview;
};

Draw.setLayerConstrucoes = function (layerConstrucoes) {
    Draw._layerConstrucoes = layerConstrucoes;
};

Draw.setEspacoEsquerdo = function (espacoEsquerdo) {
    Draw._espacoEsquerdo = espacoEsquerdo;
};

Draw.setEspacoTopo = function (espacoTopo) {
    Draw._espacoTopo = espacoTopo;
};

Draw.setColocarConstrucao = function (colocarConstrucao) {
    Draw._colocarConstrucao = colocarConstrucao;
};

Draw.setConstrucao = function (construcao) {
    Draw._construcao = construcao;  
};

Draw.setTipoConstrucao = function (tipoConstrucao) {
    Draw._tipoConstrucao = tipoConstrucao;  
};

Draw.LimparTela = function () {
    Draw.getStage().clear();
};

Draw.LimparLayer = function (layer) {
    layer.clear();
};

Draw.CriarTelaCarregamento = function () {
    Draw.setLayerLoading(new Kinetic.Layer());
    Draw.getStage().add(Draw.getLayerLoading());
    
    var rect = new Kinetic.Rect({
          x: 0,
          y: 0,
          width: Draw.TAMANHO_STAGE_WIDTH,
          height: Draw.TAMANHO_STAGE_HEIGHT,
          fill: "#8c8c8c"
    });
    
    Draw.getLayerLoading().add(rect);
    
    var textLoading = new Kinetic.Text({
        x: 20,
        y: Draw.TAMANHO_STAGE_HEIGHT - 20,
        text: "Loading...",
        fontSize: 20,
        fontFamily: "Tahoma",
        textFill: "white",
        align: "left",
        verticalAlign: "bottom"
    });
    
    Draw.getLayerLoading().add(textLoading);
};

Draw.DesenharTelaCarregamento = function () {
    Draw.getLayerLoading().setZIndex(10);
    Draw.getLayerLoading().show();
    
    Draw.getStage().draw();
}

Draw.DesenharMapa = function (mapa) {
    Draw.LimparLayer(Draw.getLayerMapa());
    
    for (var i = 0; i < Map.TAMANHO_HEIGHT; i++) {
        for (var j = 0; j < Map.TAMANHO_WIDTH; j++) {
            var image = new Kinetic.Image({
                x: mapa._mapa[i][j].getXVisaoIsometrica(),
                y: mapa._mapa[i][j].getYVisaoIsometrica(),
                image: mapa._mapa[i][j].getSprite()[mapa._mapa[i][j].getSpriteAtual()].getImagem()
            });
            
            image.pai = mapa._mapa[i][j];
            
            if (mapa._mapa[i][j] instanceof ChaoGrama) {
                image.on("mousemove", function () {
                    
                    if (Draw.getColocarConstrucao())
                        Draw.MostrarConstrucao(this.pai.getYVisaoNormal() / Tile.TAMANHO_HEIGHT, this.pai.getXVisaoNormal() / Tile.TAMANHO_WIDTH);
                });
            }
            
            Draw.getLayerMapa().add(image);
        }
    }
};

Draw.DesenharTiro = function (torre) {
    tiro = new Kinetic.Image({
        x: torre.getXVisaoIsometrica(),
        y: torre.getYVisaoIsometrica(),
        image: torre.getSpriteTiro()[torre.getSpriteTiroAtual()].getImagem()
    });
    
    return tiro;
};

Draw.DesenharTodosInimigos = function (inimigos) {
    for (var i = 0; i < inimigos.length; i++)
        Draw.DesenharInimigo(inimigos[i]);
};

Draw.DesenharInimigo = function (inimigo) {
    //  Imagem Inimigo
    var image = new Kinetic.Image({
        x: inimigo.getXVisaoIsometrica(),
        y: inimigo.getYVisaoIsometrica(),
        image: inimigo.getSprite()[inimigo.getSpriteAtual()].getImagem()
    });
    
    Draw.getLayerUnidades().add(image);
    
    inimigo.setObjetoTela(image);
    
    //  Barra Vida
    var barraVida = new Kinetic.Group({
        x: inimigo.getXVisaoIsometrica() + 10,
        y: inimigo.getYVisaoIsometrica(),
        name: "barraVida"
    });
    
    var vidaTotal = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: 22,
        height: 3,
        fill: "black",
        stroke: "black",
        strokeWidth: 1
    });
    
    var vidaAtual = new Kinetic.Rect({
        x: 1,
        y: 1,
        width: 20,
        height: 1,
        fill: "red",
        name: "vidaAtual"
    });
    
    barraVida.add(vidaTotal);
    barraVida.add(vidaAtual);
        
    Draw.getLayerUnidades().add(barraVida);
    
    inimigo.setObjetoTelaVida(barraVida);
};

Draw.MostrarConstrucao = function (x, y) {
    if (Draw.getConstrucao() == undefined) {
        Draw.setConstrucao(Factory.ConstruirTorre(x,y,Draw.getTipoConstrucao()));
        
        var image = new Kinetic.Image({
            x: Draw.getConstrucao().getXVisaoIsometrica(),
            y: Draw.getConstrucao().getYVisaoIsometrica(),
            image: Draw.getConstrucao().getSprite()[Draw.getConstrucao().getSpriteAtual()].getImagem(),
            alpha: 0.4
        });
        
        Draw.getConstrucao().setObjetoTela(image);
        
        Draw.getLayerPreview().add(image);
        
        Menu.MostrarInformacoesTorre(Draw.getTipoConstrucao());
    } else {
        Draw.getConstrucao().setXVisaoNormal(y * Tile.TAMANHO_WIDTH);
        Draw.getConstrucao().setYVisaoNormal(x * Tile.TAMANHO_HEIGHT);
        
        Draw.getConstrucao().setXVisaoIsometrica((y - x) * Tile.TAMANHO_WIDTH / 2 + Draw.getEspacoEsquerdo());
        Draw.getConstrucao().setYVisaoIsometrica((y + x) * Tile.TAMANHO_WIDTH / 4 + Draw.getEspacoTopo());
        
        Draw.getConstrucao().setCentroAlcanceX(Draw.getConstrucao().getXVisaoIsometrica() + (Draw.getConstrucao().getSprite()[Draw.getConstrucao().getSpriteAtual()].getLargura() / 2));
        Draw.getConstrucao().setCentroAlcanceY(Draw.getConstrucao().getYVisaoIsometrica() + (Draw.getConstrucao().getSprite()[Draw.getConstrucao().getSpriteAtual()].getAltura() / 2));
        
        Draw.getConstrucao().getObjetoTela().setPosition(Draw.getConstrucao().getXVisaoIsometrica(), Draw.getConstrucao().getYVisaoIsometrica());
    }
    
    Draw.getConstrucao().getObjetoTela().getLayer().draw();
};

Draw.RemoverConstrucao = function () {
    Draw.getConstrucao().getObjetoTela().getLayer().remove(Draw.getConstrucao().getObjetoTela());
    Draw.getLayerPreview().draw();
    
    Draw.setConstrucao(undefined);
    
    Draw.setColocarConstrucao(false);
    
    Menu.RemoverInformacoes();
};

Draw.ColocarConstrucao = function () {
    Draw.getConstrucao().getObjetoTela().setAlpha(1);
    Draw.getConstrucao().getObjetoTela().moveTo(Draw.getLayerConstrucoes());
    
    var areaAlcance = new Kinetic.Circle({
        x: Draw.getConstrucao().getCentroAlcanceX(),
        y: Draw.getConstrucao().getCentroAlcanceY(),
        radius: Draw.getConstrucao().getAlcanceTiro() * BuildingRanged.CONSTANTE_ALCANCE,
        fill: "#cecece",
        stroke: "#000000",
        alpha: 0.3,
        strokeWidth: 1
    });
    
    areaAlcance.setScale(1,1/2);
    areaAlcance.hide();
    
    Draw.getConstrucao().getObjetoTela().pai = Draw.getConstrucao();
    
    Draw.getConstrucao().setObjetoTelaAlcance(areaAlcance);
    Draw.getLayerPreview().add(areaAlcance);
    
    Draw.getConstrucao().getObjetoTela().on("click", function () {
        this.pai.getObjetoTelaAlcance().show();
        Draw.getLayerPreview().draw();
        
        Menu.MostrarInformacoesTorre(this.pai);
        Draw._objetoAlcanceAtivo = this.pai.getObjetoTelaAlcance();
    });
    
    _buildings.push(Draw.getConstrucao());
    
    _gold -= parseInt(Draw.getConstrucao().getPrecoCompra());
    AtualizarGold();
    
    Menu.RemoverInformacoes();
    
    Draw.setConstrucao(undefined);
    Draw.getLayerConstrucoes().draw();
};