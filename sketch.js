//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro/2;

//velocidade da bolinha
let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 80;

//variaveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente= 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//variavel de colisao
let colidiu = false;

//placar do jog0
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

//variaveis botao som
let imagemSom;
let botaoSomX = 40;
let botaoSomY = 5;
let larguraBotaoX = 25;
let larguraBotaoY = 25;
let som = false;
let botaoSomMudoX = 10
let botaoSomMudoY = 5
let larguraSomMudoX = 25
let larguraSomMudoY = 25

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  imagemSom = loadImage("icone-som.png");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  //movimentaRaqueteOponentePC();
  movimentaRaqueteOponenteMultiPlayer();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  bolinhaNaoFicaPresa();
  mostraIconeSom();
}

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function mostraRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function movimentaMinhaRaquete() {
  if (keyIsDown(87)) {
    if (yRaquete > 0) {
         yRaquete -= 10;
        }
  }
  if (keyIsDown(83)) {
    if (yRaquete < 400 - raqueteAltura) {
     yRaquete += 10; 
    }    
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento
     && yBolinha - raio < yRaquete + raqueteAltura
     && yBolinha + raio > yRaquete) {
    velocidadeXBolinha *= -1;
  }
}

function verificaColisaoRaquete(x, y) {
  colidiu = collideRectCircle(x, y, raqueteComprimento, raqueteAltura, xBolinha, yBolinha, raio);
  if (colidiu) {
    velocidadeXBolinha *= -1;
    if(som){
       raquetada.play();
       }
    
  }
}

function movimentaRaqueteOponentePC() {
  velocidadeYOponente = yBolinha - yRaqueteOponente - raqueteComprimento /2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar;
  calculaChanceDeErrar();
}

function movimentaRaqueteOponenteMultiPlayer() {
  if (keyIsDown(UP_ARROW)) {
    if (yRaqueteOponente > 0) {
         yRaqueteOponente -= 10;
        }
  }
  if (keyIsDown(DOWN_ARROW)) {
    if (yRaqueteOponente < 400 - raqueteAltura) {
     yRaqueteOponente += 10; 
    }    
  }
}

function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }  
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0))
  rect(250, 10, 40, 20);
  fill(255);
  text(meusPontos, 270, 26);
  fill(color(255, 140, 0));
  rect(350, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 370, 26);
}

function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    if(som){
       ponto.play();
       }
    
  }
  if (xBolinha < 10) {
    pontosDoOponente += 1;
    if(som){
       ponto.play();
       }
  }
}

//correcao de bug bolinha presa

function bolinhaNaoFicaPresa() {
    if (xBolinha - raio < 0){
      xBolinha = 40
    }
}

//icone som
function mostraIconeSom(){
  image(imagemSom, botaoSomX, botaoSomY, larguraBotaoX, larguraBotaoY);
}
function mostraIconeSom(){
  image(imagemSom, botaoSomX, botaoSomY, larguraBotaoX, larguraBotaoY);
}
function mouseClicked() {
  if(mouseX >= botaoSomX && mouseX <= botaoSomX + larguraBotaoX && mouseY >= botaoSomY && mouseY <= botaoSomY + larguraBotaoY){
    if(som){
      trilha.pause();
      som = false;
    } else {
      trilha.loop();
      som = true;
    }
  }
  
}
