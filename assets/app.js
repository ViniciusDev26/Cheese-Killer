const nomeJogador = prompt('Digite seu nome');
const player = document.querySelector('#player');

player.innerHTML = nomeJogador;
 //placar
 let placar = document.querySelector('.pontuacao');
 let vidas = document.querySelector('.vida');
 let count = 0;
 let countLife = 3;

 let balaRestante = 11; // Quantidade inicial de balas
 const maxBalas = 11;   // Máximo de balas que o jogador pode carregar
 let recarregando = false; // Estado para verificar se o jogador está recarregando
 

 const ALTURA_JOGO = 300;
 const LARGURA_JOGO = 700; 
 const ding = new Audio();
 ding.src = 'sounds/784428__erokia__msfxp13-43_3-ambient-90-bpm.wav'
 ding.preload = 'auto';
    
 const death = new Audio();
 death.src = 'sounds/506587__mrthenoronha__kill-enemy-2-8-bit.wav'
 death.preload = 'auto'

 const kill = new Audio();
 kill.src = 'sounds/506585__mrthenoronha__kill-enemy-4-8-bit.wav'
 kill.preload = 'auto'


     class Sprite{
         constructor(x,y,largura,altura,imagem){
             this.x = x;
             this. y = y;
             this.largura = largura;
             this.altura = altura;
             this.imagem = imagem;
         }

         desenha(ctx){
             if(this.imagem){
                 ctx.drawImage(this.imagem,this.x,this.y,this.largura,this.altura);
             }else{
                 ctx.strokeRect(this.x,this.y,this.largura,this.altura);
             }
            
         }

         get centro(){
             return {
                 x: this.x + this.largura/2,
                 y: this.y + this.altura/2
             };
         }
         //verificar se essa sprite atingiu outra
         colision(outraSprite){
             let a = Math.abs(outraSprite.centro.x - this.centro.x);
             let b = Math.abs(outraSprite.centro.y - this.centro.y)
             let d = Math.sqrt(a**2 + b**2);
             let r1 = this.altura/2;
             let r2 = outraSprite.altura /2;

             //expressão 
             // if(d <= r1 + r2){
             //     return true;
             // }else{
             //     return false;
             // }

             // expressão booleana n precisa de um retorno true ou falso
             return d <= r1 + r2;
         }   

     }
     
     class Meteoro extends Sprite{
         constructor(meteoroImg){
             super(LARGURA_JOGO,Math.random() * ALTURA_JOGO - 40,30,30,meteoroImg);
             this.velocidadeX = -2 * Math.random() - 1;
         }

         //atualiza movimento do meteoro
         atualizar(){
             this.x += this.velocidadeX;

             if(this.x + this.largura < 0){
                 this.x = LARGURA_JOGO;
                 this.y = Math.random() * (ALTURA_JOGO - 30);
             }
         }

         destruir(){
             this.x = LARGURA_JOGO;
             this.y = Math.random() * (ALTURA_JOGO - 30);
         }
     }

     class Shot extends Sprite{
         constructor(cheese,shotImg){
             super(cheese.centro.x,cheese.centro.y,15,15,shotImg);
             this.velocidadeX = 6;
         }

         atualizar(){
             this.x += this.velocidadeX;
             if(this.x > LARGURA_JOGO){
                 this.podeSerDestruido = true;
             }
         }
     }


 let canvasEl = document.querySelector('#game');
 let ctx = canvasEl.getContext('2d');

 let imagem = new Image();
 imagem.src = 'image/download-removebg-preview.png'

 let shotImg = new Image();
 shotImg.src = 'image/r89tgjxet0y11.gif'

 let meteoroImg = new Image();
 meteoroImg.src ='image/images-removebg-preview.png'

 ctx.imageSmoothingEnabled = false;

 let cheese = new Sprite(50,50,64,64,imagem);
 let allMeteor = [];  
 let allShots = [];

 allMeteor.push(new Meteoro(meteoroImg));
 allMeteor.push(new Meteoro(meteoroImg));
 allMeteor.push(new Meteoro(meteoroImg));


 imagem.addEventListener('load',()=>{
    desenhaJogo();
    salvarDados();

 });

 canvasEl.addEventListener('mousemove',(e)=>{
     cheese.x = e.offsetX - cheese.largura/2;
     cheese.y = e.offsetY - cheese.altura/2;
     desenhaJogo();
 });

 function desenhaJogo(){

     
     ding.play();
     // apaga o canvas
     ctx.clearRect(0,0,canvasEl.width, canvasEl.height);

     //desenha o queijo
     cheese.desenha(ctx);

     /* for tradicional
     // for(let i = 0; i < allMeteor.length;i++){
     //     allMeteor[i].desenha(ctx);
     // }

     //for of cria uma variavel e percorre o vetor de acordo com ela
     // for(let meteoros of allMeteor){
     //     meteoros.desenha(ctx);
     // }

     //forEach
     */
     allMeteor.forEach(meteoro => meteoro.desenha(ctx));


     allShots.forEach(shot => shot.desenha(ctx));

 }

 function atualizaInimigos(){
      //atualiza a posição dos meteoros
      for(let meteoros of allMeteor){
         meteoros.atualizar(ctx);
     }
 
 }
 function atualizaTiros(){
       //atualizar posição dos tiros
       for(let shot of allShots){
         shot.atualizar();
     }

     for(let i = 0; i < allShots.length;i++){
         if(allShots[i].podeSerDestruido){
             allShots.splice(i,1);

             console.log(`Tiros na lista ${allShots.length}`)
         }
     }

    
 }

 function verificaColision(){
     
     //verificar se meteoro atingiu o jogador
     for(let meteoros of allMeteor){
         const atingiuCheese = meteoros.colision(cheese);
         if(atingiuCheese){
             meteoros.destruir();
             const pain = new Audio();
             pain.src = 'sounds/29617__erdie__pain-male2.ogg'
             pain.preload = 'auto';
             pain.play();
             countLife--;
             vidas.innerHTML = countLife;
             
             if(countLife <= 0){
                 reiniciarJogo();
                 break;
             }
             
         }

     }

     // verificar colisão tiros e meteoros
     for(let meteoro of allMeteor){
         for(let tiro of allShots){
             const tiroAtingiuMeteoro = tiro.colision(meteoro);
             if(tiroAtingiuMeteoro){
                tiro.podeSerDestruido = true;
                meteoro.destruir();
                death.currentTime = 0; // Reinicia o áudio para o início
                death.play(); 
                count++;
                placar.innerHTML = count;
                if(count % 30 === 0){
                    meteoro.velocidadeX *= 1.5;
                }
             }
         }
     }
 }
 function reiniciarJogo(){
    fimDoJogo();
     countLife = 3;
     count = 0;
     vidas.innerHTML = countLife;
     placar.innerHTML = count;

       // Reposiciona os meteoros
     allMeteor.forEach(meteoro => meteoro.destruir());

     // Limpa os tiros
     allShots = [];

     // Redesenha o jogo
     desenhaJogo();

     // (Opcional) Mostre uma mensagem de reinício
     alert('You died, the game will restart!');
 }

 function atualizaLogicaDoJogo(){
     atualizaInimigos();
     atualizaTiros();
     verificaColision();


     //redesenha o jogo 
     desenhaJogo();
 }

 setInterval(atualizaLogicaDoJogo,33);

 function darTiro(){
    if (balaRestante > 0 && !recarregando) {
        let tiro = new Shot(cheese,shotImg);
        allShots.push(tiro);
        kill.play();
        balaRestante--; 
        atualizarPlacarBalas();

    }else if(balaRestante === 0 && !recarregando){
        console.log("Sem balas! Recarga necessária.");
        iniciarRecarga();
    }
}
 

 document.body.addEventListener('keydown', e =>{
     if(e.key == ' '){
         e.preventDefault();
         darTiro();
     }
 });

 function atualizarPlacarBalas(){
        const placarBalas = document.querySelector('.allBalas');
        placarBalas.innerHTML = balaRestante;
 }

 function iniciarRecarga(){
    recarregando = true;
    console.log("Recarregando...");

    setTimeout(() =>{
        balaRestante = maxBalas;
        recarregando = false;
        atualizarPlacarBalas();
        console.log("Recarga completa!");
    },2000);
    
    
 }

function salvarDados(){
    localStorage.setItem('pontos',count);
}

function salvarPontuacao(nome,pontos){
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];
    ranking.push({nome, pontos});
    ranking.sort((a,b) => b.pontos - a.pontos);
    localStorage.setItem('ranking', JSON.stringify(ranking));


}   

function fimDoJogo(){
   
    salvarPontuacao(nomeJogador,count);
    alert('Pontuação salva, confira no ranking!');
    window.location.href = "ranking.html";
}