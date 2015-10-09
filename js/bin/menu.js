function Menu () { };

Menu._mostrarInfo = false;

Menu.TratarCliques = function (e) {
    if (Draw._mostrarAlcance) {
        vetor = Draw.getLayerPreview().getChildren();
        
        for (var i = 0; i < vetor.length; i++)
            vetor[i].hide();
        
        Draw.getLayerPreview().draw();
        Draw._mostrarAlcance = false;
        
        Menu.RemoverInformacoes();
        Draw._objetoAlcanceAtivo = undefined;
    }
    
    if (Draw._objetoAlcanceAtivo != undefined)
        Draw._mostrarAlcance = true;
    
    if (e.currentTarget == document.getElementById("localDesenho")) {
        if (Draw.getColocarConstrucao() && _mapaObj.VerificarPodeColocarConstrucao(Draw.getConstrucao().getYVisaoNormal() / Tile.TAMANHO_HEIGHT,
                                                    Draw.getConstrucao().getXVisaoNormal() / Tile.TAMANHO_WIDTH)) {
            Draw.ColocarConstrucao();
            Draw.setColocarConstrucao(false);
        }
    } else {
        var tipo;
        
        if (e.currentTarget == document.getElementById("archerMenu")) {
            tipo = TorresConfig.TORRE_ARQUEIRO;
            Draw.setTipoConstrucao(Building.ARCHER);
        } else if (e.currentTarget == document.getElementById("mageMenu")) {
            tipo = TorresConfig.TORRE_MAGO;
            Draw.setTipoConstrucao(Building.MAGE);
        }
        
        if (_gold - TorresConfig.PegarInfoTorre(tipo)[5] >= 0) {
            Menu.MostrarInformacoesTorre(tipo);
            Draw.setColocarConstrucao(true);
        }
    }
};

Menu.MostrarInfoMove = function (e) {
    if (e.currentTarget == document.getElementById("archerMenu") && !Menu._mostrarInfo && !Draw.getColocarConstrucao()) {
        Menu._mostrarInfo = true;
        Menu.MostrarInformacoesTorre(TorresConfig.TORRE_ARQUEIRO);
    } else if (e.currentTarget == document.getElementById("mageMenu")  && !Menu._mostrarInfo && !Draw.getColocarConstrucao()) {
        Menu._mostrarInfo = true;
        Menu.MostrarInformacoesTorre(TorresConfig.TORRE_MAGO);
    }
};

Menu.MostrarInfoOut = function (e) {
    if (e.currentTarget == document.getElementById("archerMenu") && Menu._mostrarInfo && !Draw.getColocarConstrucao()) {
        Menu._mostrarInfo = false;
        Menu.RemoverInformacoes();
    } else if (e.currentTarget == document.getElementById("mageMenu")  && Menu._mostrarInfo && !Draw.getColocarConstrucao()) {
        Menu._mostrarInfo = false;
        Menu.RemoverInformacoes();
    }
};

Menu.TratarTeclado = function (e) {
    if (e.keyCode == 27 && Draw.getColocarConstrucao())
        Draw.RemoverConstrucao();
    
    if (e.keyCode == 27 && Draw._mostrarAlcance) {
        Draw._objetoAlcanceAtivo.hide();
        Draw._mostrarAlcance = false;
    }
};

Menu.MostrarInformacoesGerais = function () {
    var divInfo = document.getElementById("informacoes");
    
    divInfo.innerHTML = '<div><a id="play">Play</a></div>';
};

Menu.MostrarInformacoesTorre = function (tipo) {
    var divInfo = document.getElementById("informacoes");
    
    var imagem_src;
    
    var custo_compra;
    var custo_venda;
    
    var nome;
    var dano;
    var alcance;
    var velocidade;
    var qtde_tiro;
    
    if (!isNaN(tipo)) {
        if (TorresConfig.PegarInfoTorre(tipo) != undefined) {
            imagem_src = TorresConfig.PegarInfoTorre(tipo);
            
            imagem_src = imagem_src[imagem_src.length - 1];
            imagem_src = ImagensConfig.PegarImagem(imagem_src, 0, ImagensConfig.IMAGEM_TORRE).src;
            
            custo_compra = TorresConfig.PegarInfoTorre(tipo)[5];
            custo_venda = TorresConfig.PegarInfoTorre(tipo)[6];
            
            nome = TorresConfig.PegarInfoTorre(tipo)[0];
            dano = TorresConfig.PegarInfoTorre(tipo)[1];
            alcance = TorresConfig.PegarInfoTorre(tipo)[2];
            velocidade = TorresConfig.PegarInfoTorre(tipo)[3];
            qtde_tiro = TorresConfig.PegarInfoTorre(tipo)[4];
            
            divInfo.innerHTML = '<div id="esquerda"><img src="' + imagem_src + '"></img><p>Custo - ' + custo_compra + '</p><p>Venda - ' + custo_venda + '</p></div>' +
                '<div id="conteudo"><h4>' + nome + '</h4><p>Dano - ' + dano + '</p><p>Alcance - ' + alcance + '</p><p>Velocidade - ' + velocidade + '</p><p>Qtde Tiros - ' + qtde_tiro + '</p></div>';
        }
    } else if (tipo instanceof Building) {
        imagem_src = tipo.getObjetoTela().getImage().src;
        
        custo_venda = tipo.getPrecoVenda();
        
        nome = tipo.getNomeTile();
        dano = tipo.getDanoBase();
        alcance = tipo.getAlcanceTiro();
        velocidade = tipo.getTempoReposicao();
        qtde_tiro = tipo.getQtdeTiros();
        
        divInfo.innerHTML = '<div id="esquerda"><img src="' + imagem_src + '"></img><p>Venda - ' + custo_venda + '</p></div>' +
            '<div id="direita"><a id="sell">Sell</a></div>' +
            '<div id="conteudo"><h4>' + nome + '</h4><p>Dano - ' + dano + '</p><p>Alcance - ' + alcance + '</p><p>Velocidade - ' + velocidade + '</p><p>Qtde Tiros - ' + qtde_tiro + '</p></div>';
        
        var sell_btn = document.getElementById("sell");
        
        sell_btn.addEventListener("click", function () {
            _gold += parseInt(custo_venda);
            AtualizarGold();
            
            Draw.getLayerPreview().remove(tipo.getObjetoTelaAlcance());
            Draw.getLayerPreview().draw();
            
            Draw.getLayerConstrucoes().remove(tipo.getObjetoTela());
            Draw.getLayerConstrucoes().draw();
            
            for (var i = 0; i < _buildings.length; i++)
                if (_buildings[i] == tipo)
                    _buildings.splice(i,1);
            
            Menu.RemoverInformacoes();
        });
    }
};

Menu.RemoverInformacoes = function () {
    var divInfo = document.getElementById("informacoes");
    
    Menu.MostrarInformacoesGerais();
};

Menu.ComecarWave = function () {
    console.log(_play, _pause);
    if (!_play && !_pause) {
        console.log("**************************** LOOP *****************************");
        console.log("<---- Início do Loop Principal ---->");
        
        _play = true;
        _intervalUpdate = setInterval(Atualizar, 1000/24);
    } else if (_play && !_pause) {
        _pause = true;
        
        clearInterval(_intervalUpdate);
    } else {
        _pause = false;
        
        _intervalUpdate = setInterval(Atualizar, 1000/24);
    }
};