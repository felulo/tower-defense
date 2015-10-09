var _mapaObj = new Map();

var _buildings = [];
var _enemys = [];

var _gold = 0;

var _segundos;
var _minutos;

var _time = "0:00";

var _play = false;
var _pause = false;

var _qtdeInterval = 0;

var _intervalUpdate;

function Atualizar() {
    //if (_enemys.length == 0)
        //clearInterval(_intervalUpdate);
    
    if (_qtdeInterval == 1) {
        for (var i = 0; i < _buildings.length; i++)
            for (var j = 0; j < _enemys.length; j++)
                if (_enemys[j] != null || _enemys[j] != undefined)
                    _buildings[i].Atirar(_enemys[j]);
    }
    
    if (_qtdeInterval == 24) {
        if (_segundos == 60) {
            _minutos++;
            _segundos = 0;
        } else
            _segundos++;
        
        AtualizarTempo();
        _qtdeInterval = 0;
        
        for (var k = 0; k < _enemys.length; k++)
            if (_enemys[k] != undefined || _enemys[k] != null)
                _enemys[k].VerificarMovimento(_mapaObj);
    }
    
    _qtdeInterval++;
}

function CriarConstrucoes() {
    Draw.LimparLayer(Draw.getLayerConstrucoes());
    
    _buildings.push(Factory.ConstruirTorre(8,9));
    _buildings.push(Factory.ConstruirTorre(9,3));
    _buildings.push(Factory.ConstruirTorre(5,4));
    _buildings.push(Factory.ConstruirTorre(13,11));
}

function CriarInimigos() {
    Draw.LimparLayer(Draw.getLayerUnidades());
    
    for (i = 0; i < 15; i++)
        _enemys.push(Factory.ConstruirInimigo(Math.floor((Math.random() * 2) + 1)));
}

function AtualizarGold() {
    var pGold = document.getElementById("gold");
    
    pGold.innerHTML = "Gold: $" + _gold;
}

function PreencherZeros (n, len, padding){
    var sign = '', s = n;
 
    if (typeof n === 'number') {
        sign = n < 0 ? '-' : '';
        s = Math.abs (n).toString ();
    }
 
    if ((len -= s.length) > 0) {
        s = Array (len + 1).join (padding || '0') + s;
    }
    
    return sign + s;
}

function AtualizarTempo() {
    var pTime = document.getElementById("time");
    
    _time = PreencherZeros(_minutos, 2) + ":" + PreencherZeros(_segundos, 2);
    
    pTime.innerHTML = "Time: " + _time;
}

function AdicionarEventsListeners() {
    document.getElementById("archerMenu").addEventListener("click", Menu.TratarCliques);
    document.getElementById("mageMenu").addEventListener("click", Menu.TratarCliques);
    
    document.getElementById("archerMenu").addEventListener("mouseover", Menu.MostrarInfoMove);
    document.getElementById("mageMenu").addEventListener("mouseover", Menu.MostrarInfoMove);
    
    document.getElementById("archerMenu").addEventListener("mouseout", Menu.MostrarInfoOut);
    document.getElementById("mageMenu").addEventListener("mouseout", Menu.MostrarInfoOut);
    
    document.getElementById("localDesenho").addEventListener("click", Menu.TratarCliques);
    
    document.getElementById("play").addEventListener("click", Menu.ComecarWave);
    
    window.addEventListener("keydown", Menu.TratarTeclado);
}

function IniciarJogo() {
    var t;
    
    if (!Loading._carregamentoCompleto) {
        t = setTimeout(function () {
            Loading.CarregarCore();
            IniciarJogo();
        }, 100);
    } else {
        clearTimeout(t);
        
        console.log("<---- Fim Carregamento Configurações... ---->");
        
        Draw.setLayerMapa(new Kinetic.Layer());
        Draw.setLayerUnidades(new Kinetic.Layer());
        Draw.setLayerConstrucoes(new Kinetic.Layer());
        Draw.setLayerTiros(new Kinetic.Layer());
        Draw.setLayerPreview(new Kinetic.Layer());
        
        Draw.getStage().add(Draw.getLayerMapa());
        Draw.getStage().add(Draw.getLayerPreview());
        Draw.getStage().add(Draw.getLayerUnidades());
        Draw.getStage().add(Draw.getLayerConstrucoes());
        Draw.getStage().add(Draw.getLayerTiros());
        
        Draw.setEspacoEsquerdo((Draw.TAMANHO_STAGE_WIDTH - (Tile.TAMANHO_WIDTH))/2);
        Draw.setEspacoTopo(20);
        
        Draw.setColocarConstrucao(false);
        Draw.setConstrucao(undefined);
        
        console.log("*************************** CREATE ****************************");
        console.log("<---- Criando Mapa... ---->");
        
        Factory.ConstruirMapa(_mapaObj);
        
        console.log("<---- Fim Criação do Mapa... ---->");
        console.log("<---- Criando Inimigos... ---->");
        
        CriarInimigos();
        
        console.log("<---- Fim Criação de Inimigos... ---->");
        
        console.log("**************************** DRAW *****************************");
        console.log("<---- Desenhando... ---->");
        
        Draw.DesenharMapa(_mapaObj);
        Draw.DesenharTodosInimigos(_enemys);
        
        Draw.getLayerLoading().hide();
        Draw.getStage().draw();
        
        Menu.MostrarInformacoesGerais();
        
        console.log("<---- Fim de Desenho... ---->");
        
        console.log("************************** LISNENERS **************************");
        console.log("<---- Adicionando Listeners... ---->");
        
        AdicionarEventsListeners();
        
        console.log("<---- Fim da Adição de Listeners... ---->");
    }
}

window.addEventListener("load", function() {
    Loading._carregamentoCompleto = false;
    Menu._objetoAlcanceAtivo = undefined;
    
    _gold = 100;
    
    _segundos = 0;
    _minutos = 0;
    _time = "00:00";
   
    AtualizarGold();
    AtualizarTempo();
    
    Draw.setStage(new Kinetic.Stage({
        container: "canvas",
        width: Draw.TAMANHO_STAGE_WIDTH,
        height: Draw.TAMANHO_STAGE_HEIGHT
    }));
    
    Draw.CriarTelaCarregamento();
    Draw.getStage().draw();
    
    console.log("*************************** LOADING ***************************");
    console.log("<---- Início Carregamento Configurações... ---->");
    IniciarJogo();
});