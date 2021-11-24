/*
    Autor: Valdevir Matos Ribeiro
    
*/

//variáveis globais
let globalVoz = speechSynthesis.voice;
let globalVolume = 0.5;
let globalRate = 1.0;
let globalPitch = 1.0;
let speech4n2 = new SpeechSynthesisUtterance();
let PLAYSTOP = 0;


function speech() {
    speech4n2.voice = globalVoz;
    speech4n2.volume = globalVolume;
    speech4n2.rate = globalRate;
    speech4n2.pitch = globalPitch;
    speech4n2.text = globalTexto;
    speechSynthesis.speak(speech4n2);

}


if (window.addEventListener) {
    window.addEventListener('message', acao, false);
} else {
    //To Do
};

function acao(e) {

    let valorDoVolume = "";
    if (e.data.charAt(0) == "v" && e.data.charAt(1) == "o") {
        for (contador = 2; contador <= (e.data.length - 1); contador++) {
            valorDoVolume = valorDoVolume + (e.data.charAt(contador));
        }
        volumeDaLeitura(valorDoVolume);
    }

    let valorDaVelocidade = "";
    if (e.data.charAt(0) == "v" && e.data.charAt(1) == "e") {
        for (contador = 2; contador <= (e.data.length - 1); contador++) {
            valorDaVelocidade = valorDaVelocidade + (e.data.charAt(contador));
        }
        velocidadeDeLeitura(valorDaVelocidade);
    }

    let posicaoDaVozNaLista = "";
    if (e.data.charAt(0) == "v" && e.data.charAt(1) == "z") {
        for (contador = 2; contador < 4; contador++) {
           posicaoDaVozNaLista = posicaoDaVozNaLista + e.data.charAt(contador);
        }        
        alteraVoz(parseInt(posicaoDaVozNaLista) - 1);
    }


    switch (e.data) {
        case 'lerparar':
            if (speechSynthesis.paused) {
                speechSynthesis.resume(speech4n2);
                break;
            }
            if (PLAYSTOP === 0) {
                speech();
                PLAYSTOP = 1;
            } else {
                speechSynthesis.cancel();
                PLAYSTOP = 0;
            }
            break;
        case 'pausar':
            speechSynthesis.pause(speech4n2);
            break;
        case 'retroceder':
            speechSynthesis.resume(speech4n2);
            break;
        case 'avancar':
            speechSynthesis.resume(speech4n2);
            break;
        case 'configuracoes':
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






