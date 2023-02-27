//Variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 30;
let raio = diametro/2

//Velocidade da bolinha
let velocidadeXBolinha = 6
let velocidadeYBolinha = 6

//Variáveis da Raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 80;

//Variáveis da Raquete do Oponente
let xRaqueteOponente = 585;
let yRaqueteOponenete = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar
let meusPontos = 0;
let pontosOponente = 0;

//Sons do Jogo
let raquetada;
let ponto;
let trilha;

//Chance de errar
let chanceDeErrar = 0;

function preload(){
    trilha = loadSound('trilha.mp3');
    ponto = loadSound('ponto.mp3');
    raquetada = loadSound('raquetada.mp3');
}

function setup(){
    createCanvas(600,400);
    trilha.loop();
}

function draw(){
    background(0);
    mostraBolinha();
    movimentoBolinha();
    verificaColisaoBorda();
    mostraRaquete();
    movimentoRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaqueteBiblioteca();
    mostraRaqueteOponenete();
    movimentoRaqueteOponente();
    verificaColisaoRaqueteOponenteBiblioteca();
    mostrarPlacar();
    marcaPonto();
}

function mostraBolinha(){
    circle(xBolinha,yBolinha,diametro);
}

function movimentoBolinha(){
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda(){
    if(xBolinha + raio > width || xBolinha - raio < 0){
        velocidadeXBolinha *= -1;
    }
    if(yBolinha + raio > height || yBolinha - raio < 0){
        velocidadeYBolinha *= -1;
    }
}

function mostraRaquete(){
    rect(xRaquete, yRaquete, wRaquete, hRaquete);
}

function movimentoRaquete(){
    if (keyIsDown(UP_ARROW)){
        yRaquete -= 10;
    }
    if(keyIsDown(DOWN_ARROW)){
        yRaquete += 10;
    }
}

function verificaColisaoRaquete(){
    if(xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete){
        velocidadeXBolinha *= -1;
    }
}

function verificaColisaoRaqueteBiblioteca(){
    colidiu = collideRectCircle(xRaquete, yRaquete, wRaquete, hRaquete, xBolinha, yBolinha, raio);
    if(colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function mostraRaqueteOponenete(){
    rect( xRaqueteOponente, yRaqueteOponenete, wRaquete, hRaquete);
}

function movimentoRaqueteOponente(){
    velocidadeYOponente = yBolinha - yRaqueteOponenete - wRaquete / 2 - chanceDeErrar;
    yRaqueteOponenete += velocidadeYOponente
    
    if(pontosOponente >meusPontos){
        chanceDeErrar = 100;
    }
    if(pontosOponente < meusPontos && chanceDeErrar > 50){
        chanceDeErrar -= 3;
    }
}

function verificaColisaoRaqueteOponenteBiblioteca(){
    colidiu = collideRectCircle(xRaqueteOponente, yRaqueteOponenete, wRaquete, hRaquete, xBolinha, yBolinha, raio);
    if(colidiu){
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

function mostrarPlacar(){
    stroke(255);
    textAlign(CENTER);
    textSize(17);
    fill(color(255,140,0));
    rect(150,10,40,20);
    fill(255);
    text(meusPontos, 170, 26);
    fill(color(255,140,0));
    rect(450,10,40,20);
    fill(255);
    text(pontosOponente, 470, 26);
}

function marcaPonto(){
    if(xBolinha > 585){
        meusPontos += 1;
        ponto.play();
    }
    if(xBolinha < 13){
        pontosOponente += 1;
        ponto.play();
    }
}



