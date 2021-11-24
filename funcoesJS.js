/*
    Autor: Valdevir Matos Ribeiro
        
*/

//variáveis globais
let globalTexto;

function fecharPagina(){
  speechSynthesis.cancel();
}

function capturaTexto() {
  let contador;
  globalTexto = document.getElementById("Principal").textContent;
  let quantidadeDeArticle = document.getElementsByTagName('article').length;
  for (contador = 0; contador < quantidadeDeArticle; contador++) {
    globalTexto = globalTexto + document.getElementsByTagName('article')[contador].textContent;    
    speech();
  }
}

function contaPalavras() {
  let tamanhoTexto;
  globalTexto = globalTexto.trim();
  let quantidadeDePalavras = globalTexto.split(" ");
  tamanhoTexto = quantidadeDePalavras.length;
}

function habilitaPlugin() {    
  let statusPlugin = document.getElementById('plugin').style.visibility;

  if (statusPlugin == "" || statusPlugin == "hidden") {
    document.getElementById('plugin').style.visibility = "visible";
    document.getElementById('configuracoes').style.visibility = "hidden";
    speechSynthesis.resume();
  }
  else {
    document.getElementById('plugin').style.visibility = "hidden";
    speechSynthesis.cancel();
  }
}

function habilitaPluginConfiguracoes() {
  let statusPlugin = document.getElementById('configuracoes').style.visibility;
  if (statusPlugin == "" || statusPlugin == "hidden") {
    document.getElementById('configuracoes').style.visibility = "visible";
    document.getElementById('plugin').style.visibility = "hidden";
    speechSynthesis.cancel();
  }
  else {
    document.getElementById('configuracoes').style.visibility = "hidden";
    document.getElementById('plugin').style.visibility = "visible";
    speechSynthesis.resume();
  }
}

function aplicarConfiguracoes(){
  speechSynthesis.resume();
  habilitaPluginConfiguracoes();
  speech();  
}











