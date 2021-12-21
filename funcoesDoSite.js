/*
    Autor: Valdevir Matos Ribeiro    
*/

/*
MIT License
 *
 * Copyright (c) 2021 - SpeecheNet
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

function carregarCampanha() {
    let mesCampanha = mesDaCampanha();
    switch (mesCampanha) {
        case '1':
            document.getElementById('campanhaCorDoMes').innerHTML = "Janeiro XXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '01');
            break;
        case '2':
            document.getElementById('campanhaCorDoMes').innerHTML = "Fevereiro XXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '02');
            break;
        case '3':
            document.getElementById('campanhaCorDoMes').innerHTML = "Março XXXXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '03');
            break;
        case '4':
            document.getElementById('campanhaCorDoMes').innerHTML = "Abril XXXXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '04');
            break;
        case '5':
            document.getElementById('campanhaCorDoMes').innerHTML = "Maio XXXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '05');
            break;
        case '6':
            document.getElementById('campanhaCorDoMes').innerHTML = "Junho XXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '06');
            break;
        case '7':
            document.getElementById('campanhaCorDoMes').innerHTML = "Julho XXXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '07');
            break;
        case '8':
            document.getElementById('campanhaCorDoMes').innerHTML = "Agosto XXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '08');
            break;
        case '9':
            document.getElementById('campanhaCorDoMes').innerHTML = "Setembro XXXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '09');
            break;
        case '10':
            document.getElementById('campanhaCorDoMes').innerHTML = "Outubro XXXXX."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '10');
            break;
        case '11':
            document.getElementById('campanhaCorDoMes').innerHTML = "Novembro Azul! Proteja sua prostáta."
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '11');
            break;
        case '12':
            document.getElementById('campanhaUm').innerHTML="É Fake que vacinas causam AIDS.";
            imagemCampanha('imgCampanhaUm', '01');

            document.getElementById('campanhaDois').innerHTML="Proteja-se! Adote as regras sanitárias.";
            imagemCampanha('imgCampanhaDois', '02');

            document.getElementById('campanhaCorDoMes').innerHTML = "Dezembro Vermelho! Xô AIDS.";
            imagemCampanhaDoMes('imgCampanhaCorDoMes', '12');
            break;
    }
}

function imagemCampanha(imgTagID,numeroDaCampanha) {    
    switch (numeroDaCampanha) {
        case '01':
            imgSrcCampanha = "images/"+'imgCampanhaUm.png';
            break;
        case '02':
            imgSrcCampanha = "images/"+'imgCampanhaDois.png';
            break;        
    }    
    document.getElementById(imgTagID).src = imgSrcCampanha;
}

function imagemCampanhaDoMes(imgTagID, mes) {
    imgArr = ['janeiro_.png', 'fevereiro_.png', 'mar', 'abr', 'maio', 'jun', 'jul', 'ago', 'set', 'out', 'novembro_azul.png', 'dezembro_vermelho.png'];    
    switch (mes) {
        case '01':
            imgSrc = "images/" + imgArr[0];
            break;
        case '02':
            imgSrc = "images/" + imgArr[1];
            break;
        case '03':
            imgSrc = "images/" + imgArr[2];
            break;
        case '04':
            imgSrc = "images/" + imgArr[3];
            break;
        case '05':
            imgSrc = "images/" + imgArr[4];
            break;
        case '06':
            imgSrc = "images/" + imgArr[5];
            break;
        case '07':
            imgSrc = "images/" + imgArr[6];
            break;
        case '08':
            imgSrc = "images/" + imgArr[7];
            break;
        case '09':
            imgSrc = "images/" + imgArr[8];
            break;
        case '10':
            imgSrc = "images/" + imgArr[9];
            break;
        case '11':
            imgSrc = "images/" + imgArr[10];
            break;
        case '12':
            imgSrc = "images/" + imgArr[11];            
            break;
    }
    document.getElementById(imgTagID).src = imgSrc;    
}

function mesDaCampanha() {
    data = new Date;
    dia = data.getDate();
    mes = data.getMonth() + 1;
    ano = data.getFullYear();
    hora = data.getHours();
    minuto = data.getMinutes();
    if (mes < 10) {
        mes = "0" + String(mes);
    }
    return String(mes);
}

function formataDataDMY(data) {
    dia = data.getDate().toString().padStart(2, '0'),
        mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano = data.getFullYear();
    return dia + "/" + mes + "/" + ano;
}

function numeroRandomico(limite) {
    return Math.floor(Math.random() * limite);
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
