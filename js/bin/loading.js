function Loading() { };

Loading.CARREGAR_CONFIG = 0; 
Loading.CARREGAR_IMAGEM = 1;

Loading._statusXMLLoader = false;
Loading._carregamentoVetor = [0,0];
Loading._carregamentoCompleto;

Loading.xmlLoader = function (url, tipo) {
    var xmlhttp;
    
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest(); // code for IE7+, Firefox, Chrome, Opera, Safari
    else
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    
    xmlhttp.open("GET",url,true);
    xmlhttp.send();
    xmlhttp.tipo = tipo;
    xmlhttp.onreadystatechange = function () {
        var xmlDoc;
        
        if (xmlhttp.readyState == 4) { 
            if (xmlhttp.status == 200) {
                xmlDoc = xmlhttp.responseXML;
                
                Loading._carregamentoVetor[xmlhttp.tipo] = xmlDoc;
                
                Loading._statusXMLLoader = false;
            } 
        } 
    };
};


Loading.CarregarCore = function() {
    if (!Loading._statusXMLLoader && Loading._carregamentoVetor[Loading.CARREGAR_CONFIG] == 0) {
        console.log("<---- Carregar XML... ---->");
        
        Loading._statusXMLLoader = true;
        Loading.xmlLoader("config//config.xml", Loading.CARREGAR_CONFIG);
    }
    
    if (!Loading._statusXMLLoader && Loading._carregamentoVetor[Loading.CARREGAR_IMAGEM] == 0) {        
        Loading._statusXMLLoader = true;
        Loading.xmlLoader("imagens//imagens.xml", Loading.CARREGAR_IMAGEM);
    }
        
    if (!Loading._statusXMLLoader &&
        !Loading._carregamentoVetor[Loading.CARREGAR_IMAGEM] == 0 && !Loading._carregamentoVetor[Loading.CARREGAR_CONFIG] == 0 &&
        (ImagensConfig._array.length < 1) && (ImagensConfig._array.length < 1) &&
        (ImagensConfig._array.length < 1) && (ImagensConfig._array.length < 1)) {
        console.log("<---- XML Encerrado ---->");
        console.log("<---- Carregar Configurações... ---->");
        
        Loading.CarregarImagens();
        Loading.CarregarTorres();
        Loading.CarregarTileMapa();
        Loading.CarregarUnidades();
    }
    
    if (!Loading._statusXMLLoader && ImagensConfig.VerificarCarregamentoImagens() && TorresConfig.VerificarCarregamentoInfoTorres() &&
        UnidadesConfig.VerificarCarregamentoInfoUnidades() && MapaConfig.VerificarCarregamentoInfoTile())
        Loading._carregamentoCompleto = true;
    else
        Loading._carregamentoCompleto = false;
};

Loading.CarregarImagens = function() {
    var _image;
    var xml = Loading._carregamentoVetor[Loading.CARREGAR_IMAGEM];
    
    for (var i = 0; i < xml.getElementsByTagName("caminho").length; i++) {
        var array = [];
        
        for (var j = 0; j < xml.getElementsByTagName("caminho")[i].parentNode.childNodes.length; j++) {
            if (!(xml.getElementsByTagName("caminho")[i].parentNode.childNodes[j] instanceof Text)) {
                _image = new Image();
                
                _image.src = xml.getElementsByTagName("caminho")[i].parentNode.childNodes[j].childNodes[0].nodeValue;
                array.push(_image); 
            }
        }
        
        ImagensConfig.ArmazenarImagem(array, xml.getElementsByTagName("caminho")[i].parentNode.parentNode.getAttribute("tipo"));
        
        if (j > 3)
            i += parseInt(j / 2) - 1;
    }
};

Loading.CarregarTorres = function () {
    var array;
    var xml = Loading._carregamentoVetor[Loading.CARREGAR_CONFIG];
    
    for (var i = 0; i < xml.getElementsByTagName("torre").length; i++) {
        array = new Array();
        
        array.push(xml.getElementsByTagName("torre")[i].firstChild.nextSibling.childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("dano")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("alcance")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("velocidade")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("quantidade_tiros")[i].childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("custo_compra")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("custo_venda")[i].childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("torre")[i].lastChild.previousSibling.previousSibling.previousSibling.childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("torre")[i].lastChild.previousSibling.childNodes[0].nodeValue);
        
        TorresConfig.ArmazenarInfoTorre(xml.getElementsByTagName("torre")[i].getAttribute("tipo"), array);
    }
};

Loading.CarregarTileMapa = function () {
    var array;
    var xml = Loading._carregamentoVetor[Loading.CARREGAR_CONFIG];
    
    for (var i = 0; i < xml.getElementsByTagName("tile").length; i++) {
        array = new Array();
        
        array.push(xml.getElementsByTagName("pode_andar")[i].childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("tile")[i].lastChild.previousSibling.childNodes[0].nodeValue);
        
        MapaConfig.ArmazenarInfoMapa(xml.getElementsByTagName("tile")[i].getAttribute("tipo"), array);
    }
};

Loading.CarregarUnidades = function () {
    var array;
    var xml = Loading._carregamentoVetor[Loading.CARREGAR_CONFIG];
    
    for (var i = 0; i < xml.getElementsByTagName("unidade").length; i++) {
        array = new Array();
        
        array.push(xml.getElementsByTagName("unidade")[i].firstChild.nextSibling.childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("vida")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("armadura")[i].childNodes[0].nodeValue);
        array.push(xml.getElementsByTagName("custo_morte")[i].childNodes[0].nodeValue);
        
        array.push(xml.getElementsByTagName("unidade")[i].lastChild.previousSibling.childNodes[0].nodeValue);
        UnidadesConfig.ArmazenarInfoUnidade(xml.getElementsByTagName("unidade")[i].getAttribute("tipo"), array);
    }
};