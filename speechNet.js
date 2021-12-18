/*
    Autor: Valdevir Matos Ribeiro    
*/

/*
MIT License
 *
 * Copyright (c) 2019 Softblue
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//variáveis globais
let speechNet = new SpeechSynthesisUtterance();
let globalVoz = speechSynthesis.voice;
let globalVolume = 0.5;
let globalRate = 1.0;
let globalPitch = 1.0;
let PLAYSTOP = 0;
let globalTexto;
let posicaoDoTexto = 0;

const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

function contaPalavras(textoCapturado) {
    return textoCapturado.trim().split(/\s+/).length;
}

function capturaTexto(indiceDoTexto) {
    let contador;
    let arrayTexto = Array();
    arrayTexto[0] = document.getElementById('tituloPrincipal').textContent;
    arrayTexto[0] = removeEspacoExtra(arrayTexto[0]);    
    let quantidadeDeArticle = document.getElementsByTagName('article').length;
    for (contador = 0; contador < quantidadeDeArticle; contador++) {
        arrayTexto[contador + 1] = removeEspacoExtra(document.getElementsByTagName('article')[contador].textContent);
    }
    if (indiceDoTexto < 0) {
        indiceDoTexto = 0
        posicaoDoTexto = 0
    }

    if (indiceDoTexto > contador) {
        indiceDoTexto -= indiceDoTexto;
        posicaoDoTexto = indiceDoTexto;
    }

    if (indiceDoTexto == 0) {
        posicaoDoTexto = indiceDoTexto
        globalTexto = arrayTexto[indiceDoTexto];
    } else {
        posicaoDoTexto = indiceDoTexto;
        globalTexto = arrayTexto[indiceDoTexto];
    }
    speech();
}

function habilitaPlugin() {
    let statusPlugin = document.getElementById('plugin').style.visibility;
    if (statusPlugin == "" || statusPlugin == "hidden") {
        document.getElementById('plugin').style.visibility = "visible";
        //document.getElementById('telaDeLeitura').style.visibility = "visible";
        document.getElementById('configuracoes').style.visibility = "hidden";
        speechSynthesis.resume();
    }
    else {
        document.getElementById('plugin').style.visibility = "hidden";
        //document.getElementById('telaDeLeitura').style.visibility = "hidden";
        speechSynthesis.cancel();
    }
}

function habilitaPluginConfiguracoes() {
    let statusPlugin = document.getElementById('configuracoes').style.visibility;
    if (statusPlugin == "" || statusPlugin == "hidden") {
        document.getElementById('configuracoes').style.visibility = "visible";
        document.getElementById('plugin').style.visibility = "hidden";
        //document.getElementById('telaDeLeitura').style.visibility = "hidden";
        speechSynthesis.cancel();
    }
    else {
        document.getElementById('configuracoes').style.visibility = "hidden";
        document.getElementById('plugin').style.visibility = "visible";
        //document.getElementById('telaDeLeitura').style.visibility = "visible";
        speechSynthesis.resume();
    }
}

function aplicarConfiguracoes() {
    speechSynthesis.resume();
    habilitaPluginConfiguracoes();
    speech();
}

function speech() {
    speechNet.voice = globalVoz;
    speechNet.volume = globalVolume;
    speechNet.rate = globalRate;
    speechNet.pitch = globalPitch;
    speechNet.text = globalTexto;
    speechSynthesis.speak(speechNet);
}

if (window.addEventListener) {
    window.addEventListener('message', acao, false);
} else {
    //To Do
}

function acao(e) {

    let valorDoVolume = "";
    if (e.data.charAt(0) === "v" && e.data.charAt(1) === "o") {
        for (contador = 2; contador <= (e.data.length - 1); contador++) {
            valorDoVolume = valorDoVolume + (e.data.charAt(contador));
        }
        volumeDaLeitura(valorDoVolume);
    }

    let valorDaVelocidade = "";
    if (e.data.charAt(0) === "v" && e.data.charAt(1) === "e") {
        for (contador = 2; contador <= (e.data.length - 1); contador++) {
            valorDaVelocidade = valorDaVelocidade + (e.data.charAt(contador));
        }
        velocidadeDeLeitura(valorDaVelocidade);
    }

    let posicaoDaVozNaLista = "";
    if (e.data.charAt(0) === "v" && e.data.charAt(1) === "z") {
        for (contador = 2; contador < 4; contador++) {
            posicaoDaVozNaLista = posicaoDaVozNaLista + e.data.charAt(contador);
        }
        alteraVoz(parseInt(posicaoDaVozNaLista) - 1);
    }

    let corEscolhida = "";
    if (e.data.charAt(0) === "c" && e.data.charAt(1) === "o") {
        for (contador = 2; contador < 9; contador++) {
            corEscolhida = corEscolhida + e.data.charAt(contador);
        }
        alteraCores(corEscolhida);
    }

    switch (e.data) {
        case 'lerparar':
            if (speechSynthesis.paused) {
                speechSynthesis.resume(speechNet);
                PLAYSTOP = 1;
                break;
            }
            if (PLAYSTOP == 0) {
                speech();
                PLAYSTOP = 1;
            } else {
                speechSynthesis.cancel();
                PLAYSTOP = 0;
            }
            break;
        case 'pausar':
            speechSynthesis.pause(speechNet);
            break;
        case 'retroceder':
            speechSynthesis.cancel();
            capturaTexto(posicaoDoTexto - 1);
            break;
        case 'avancar':
            speechSynthesis.cancel();
            capturaTexto(posicaoDoTexto + 1);
            break;
        case 'novaConfiguracao':
            habilitaPluginConfiguracoes();
            break;
    }
}

function velocidadeDeLeitura(velocidade) {
    globalRate = parseFloat(velocidade);
}

function volumeDaLeitura(volume) {
    globalVolume = parseFloat(volume);
}

function alteraVoz(posicaoDaVoz) {
    let vozes = [];
    vozes = speechSynthesis.getVoices();
    for (contarVozes = 0; contarVozes < vozes.length; contarVozes++) {
        if (contarVozes == posicaoDaVoz) {
            globalVoz = vozes[contarVozes];
        }
    }
}

function alteraCores(codigoDaCorEscolhida) {
    document.body.style.background = codigoDaCorEscolhida;
    document.getElementById("footer").style.background = codigoDaCorEscolhida;
}

function numeroRandomico(limit) {
    return Math.floor(Math.random() * limit);
}

function removeEspacoExtra(string) {
    var returnString = "";
    var stringArray = string.split(/\s+/);
    for (var contador = 0; contador < stringArray.length; contador++) {
        if (stringArray[contador] !== "") {
            if (contador === stringArray.length - 1) {
                returnString += stringArray[contador];
            }
            else {
                returnString += stringArray[contador] + " ";
            }
        }
    }
    return returnString;
}

function removeLeadingAndTrailingWhitespace(inputString) {

    if (typeof inputString === "string") {

        var firstNonWhite = inputString.search(/\S/);
        if (firstNonWhite !== -1) {
            for (var i = inputString.length - 1; i >= 0; i--) {
                if (inputString.charAt(i).search(/\S/) !== -1) {
                    inputString = inputString.substring(firstNonWhite, i + 1);
                    break;
                }
            }
        }
    }
    return inputString;
}

function removeTrailingWhitespace(inputString) {

    if (typeof inputString === "string") {

        for (var i = inputString.length - 1; i >= 0; i--) {

            if (inputString.charAt(i).search(/\S/) !== -1) {
                inputString = inputString.substring(0, i + 1);
                break;
            }
        }
    }
    return inputString;
}
// Example:
// randomImage(randomBannerID, ['0.gif',50,50,'1.gif',25,25,'2.gif',50,25]); 

// * Dependencies * 
// this function requires the following snippet:
// JavaScript/Randomizers/numeroRandomico

function randomImage(imgTagID, imgArr) {
    var imgSrc, imgW, imgH, r;
    r = numeroRandomico(imgArr.length / 3);

    imgSrc = imgArr[r * 3];
    imgW = imgArr[(r * 3) + 1];
    imgH = imgArr[(r * 3) + 2];

    document.getElementById(imgTagID).src = imgSrc;
    document.getElementById(imgTagID).width = imgW;
    document.getElementById(imgTagID).height = imgH;
}/*
   * Dependencies *
   this function requires the following snippets:
   JavaScript/images/switchImage
  
   BODY Example:
   <body onLoad="mySlideShow1.play(); mySlideShow2.play();">
   <img src="originalImage1.gif" name="slide1">
   <img src="originalImage2.gif" name="slide2">
  
   SCRIPT Example:
   var mySlideList1 = ['image1.gif', 'image2.gif', 'image3.gif'];
   var mySlideShow1 = new SlideShow(mySlideList1, 'slide1', 3000, "mySlideShow1");
   var mySlideList2 = ['image4.gif', 'image5.gif', 'image6.gif'];
   var mySlideShow2 = new SlideShow(mySlideList2, 'slide2', 1000, "mySlideShow2");
  */

function SlideShow(slideList, image, speed, name) {
    this.slideList = slideList;
    this.image = image;
    this.speed = speed;
    this.name = name;
    this.current = 0;
    this.timer = 0;
}
SlideShow.prototype.play = SlideShow_play;

function SlideShow_play() {
    if (this.current++ === this.slideList.length - 1) {
        this.current = 0;
    }
    switchImage(this.image, this.slideList[this.current]);
    clearTimeout(this.timer);
    this.timer = setTimeout(this.name + '.play()', this.speed);

} function switchImage(imgName, imgSrc) {
    if (document.images) {
        if (imgSrc !== "none") {
            document.images[imgName].src = imgSrc;
        }
    }
}
