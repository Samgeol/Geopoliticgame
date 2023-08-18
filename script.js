

window.addEventListener('load', carregar);

const poluicaoElemento = document.getElementById("poluicao");
const menu = document.getElementById("menu");
const menu2 = document.getElementById("menu2");
const circuloEl = document.getElementById('circulo');
const felicidade = document.getElementById('felicidade');
const industrias = document.getElementById('industrias');
const info = document.getElementById('info');
const divButtons = document.querySelector('.buttons');
const dinheiro = document.getElementById('dinheiro');
const ant = document.getElementById('ant');
const saude = document.getElementById('saude');
const hospitais = document.getElementById('hospitais');
const economia = document.getElementById('economia');
const construirHospital = document.getElementById('btn-hospitais');
let limiteMaxAntipoluidores = false;
let firstButtonClicked = false;
var valores = ['malta','alta', 'média', 'baixa'];
var Valordin = Math.floor(Math.random() * 10 + 1) * 100;
indiceeconomia = 3;
var nome;
var felicidadenum = "Baixa";
var numAntipoluidores = 0;
var poluicao = 150;
var custoConstrucao = 100;
var custoConstrucaoA = 500;
var custoConstrucaoS = 50;
var saudevalores = {
  'muito alta' : 30,
  alta: 20,
  média: 10,
  baixa: 0,
};

var economiaValores = {
  'muito alta': 30,
  alta: 16,
  média: 9,
  baixa: 3
};

var numindustria = economiaValores.baixa;
var indicesaude = valores.indexOf('baixa');
var numhospitais = saudevalores.baixa;

function felicidademundança(){
  if(options.slice(index,1)){
  if(numhospitais <=10){
    felicidadenum = "Baixa";
  }
  if(numhospitais >10 && numhospitais <= 20){
    felicidadenum = "Média";
  }
  if(numhospitais >20 && numhospitais <=30){
    felicidadenum = "Alta";
  }
}
}

function exibirInformacoes() {
  dinheiro.innerHTML = "R$💰 " + Valordin.toFixed(2).replace(".", ",");
  felicidade.innerHTML =  "Felicidade: " + felicidadenum;
  saude.innerHTML = "Saúde👨‍⚕️: " + valores[indicesaude];
  industrias.innerHTML = "Indústrias🧑🏾‍🏭: " + numindustria;
  hospitais.innerHTML = "Hospitais🏥: " + numhospitais;
  economia.innerHTML = "Economia📊: "+ valores[indiceeconomia];
  poluicaoElemento.innerHTML = "Poluição🚭: "+ poluicao;
  ant.innerHTML = "Anti-Poluidores🪁: "+ numAntipoluidores;
  divButtons.style.display = 'block';

  }
  
  function atualizarValores() {
    dinheiro.innerHTML = "R$ " + Valordin.toFixed(2).replace(".", ",");
    industrias.innerHTML = "" + numindustria;
    economia.innerHTML = ""+ valores[indiceeconomia];
    saude.innerHTML = "" + valores[indicesaude];
    hospitais.innerHTML = "" + numhospitais;
    poluicaoElemento.innerHTML = ""+ poluicao;
    ant.innerHTML = ""+ numAntipoluidores;
    
  }
  
 

function atualizarNome() {
  nome = prompt("Digite o nome do seu país");
  if (nome === null) {
    alert("Não é possível prosseguir, informe um nome");
    atualizarNome();
  } else if (nome.trim() === '') {
    alert("Não é possível prosseguir, informe um nome");
    atualizarNome();
  } else if (nome.length > 8) {
    alert("Não é possível prosseguir, o nome do seu país é grande demais");
    atualizarNome();
  } else {
    var circuloEl = document.getElementById('circulo');
    circuloEl.textContent = nome;
  
    divButtons.style.display = 'block';
    atualizarValores();
    exibirInformacoes(); 
    lightningStrike();
  }
  exibirInformacoes();
  localStorage.setItem('nome', nome);
}



circuloEl.addEventListener('click', function() {
  atualizarNome();
  setInterval(exibirInformacoes,1);
  setInterval(lightningStrike,3000);
  
  function aumentardinheiro() {
    Valordin += numindustria * 25;
    exibirInformacoes();
  }
  
  function aumentarPoluicao() {
    if (limiteMaxAntipoluidores === false) {
      poluicao += numindustria * 10;
      exibirInformacoes();
    }
    if (limiteMaxAntipoluidores === true) {
      return;
    }
    
    if (poluicao >= 3000){
      alert("VOCE PERDEU, A POPULAÇAO MORREU POR POLUIÇÃO DEMASIADA")
      reiniciar();
    }
  }
  
  setInterval(aumentardinheiro, 10000);
  setInterval(aumentarPoluicao, 3000);
});

var options = ["Lei impostos sobre Industrias"];
var currentFocus;
document.getElementById("inputText").addEventListener("input", function() {
  var val = this.value;

  closeAllLists();
  if (!val) { return false;}
  currentFocus = -1;
  var div = document.createElement("DIV");
  div.setAttribute("id", this.id + "autocomplete-list");
  div.setAttribute("class", "autocomplete-items");
  this.parentNode.appendChild(div);

  for (var i = 0; i < options.length; i++) {
    if (options[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
      var item = document.createElement("DIV");
      item.innerHTML = "<strong>" + options[i].substr(0, val.length) + "</strong>";
      item.innerHTML += options[i].substr(val.length);
      item.innerHTML += "<input type='hidden' value='" + options[i] + "'>";
      item.addEventListener("click", function() {
          document.getElementById("inputText").value = this.getElementsByTagName("input")[0].value;
          closeAllLists();
          performAction(this.getElementsByTagName("input")[0].value);
          var index = options.indexOf(this.getElementsByTagName("input")[0].value);
            if (index > -1) {
                options.splice(index, 1);
            }
      });
      div.appendChild(item);
    }
  }
});

document.getElementById("inputText").addEventListener("keydown", function(e) {
  var x = document.getElementById(this.id + "autocomplete-list");
  if (x) x = x.getElementsByTagName("div");
  if (e.keyCode == 40) { // down arrow key
    currentFocus++;
    addActive(x);
  } else if (e.keyCode == 38) { // up arrow key
    currentFocus--;
    addActive(x);
  } else if (e.keyCode == 13) { // enter key
    e.preventDefault();
    if (currentFocus > -1) {
      if (x) x[currentFocus].click();
    }
  }
});

function addActive(x) {
  if (!x) return false;
  removeActive(x);
  if (currentFocus >= x.length) currentFocus = 0;
  if (currentFocus < 0) currentFocus = (x.length - 1);
  x[currentFocus].classList.add("autocomplete-active");
}

function removeActive(x) {
  for (var i = 0; i < x.length; i++) {
    x[i].classList.remove("autocomplete-active");
  }
}

function closeAllLists(elmnt) {
  var x = document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < x.length; i++) {
    if (elmnt != x[i] && elmnt != document.getElementById("inputText")) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}

document.addEventListener("click", function (e) {
  closeAllLists(e.target);
});

function performAction(option) {
  switch(option) {
      case "Lei impostos sobre Industrias":
        Valordin -= 100;
        numindustria -= 2;
        poluicao -= 500;
        if(felicidadenum = "Baixa"){
          felicidadenum = "Média";
          if(felicidadenum = "Média"){
            felicidadenum = "Alta";
          }
        }
        
        if(poluicao < 0){
          poluicao = 0;
        }
          break;
      case "Option B":
          // Executa ação para a opção B
          console.log("Opção B selecionada!");
          break;
      case "Option C":
          // Executa ação para a opção C
          console.log("Opção C selecionada!");
          break;
      case "Option D":
          // Executa ação para a opção D
          console.log("Opção D selecionada!");
          break;
      default:
          // Executa ação padrão para outras opções
          console.log("Outra opção selecionada!");
          break;
  }
}

function aumentardinheiro() {
  setInterval(Valordin += numindustria * 25, 1);
}

function aumentarPoluicao() {
  if (limiteMaxAntipoluidores === false) {
    setInterval(poluicao += numindustria * 10,);
  }
  if (limiteMaxAntipoluidores === true) {
    return;
  }
  
}


function construirIndustria() {
  if (numindustria >= 30) {
    alert("Você já atingiu o limite máximo de indústrias!");
    return;
  }

  if (Valordin >= custoConstrucao) {
    Valordin -= custoConstrucao;
    adicionarIndustria();
  } else {
    alert("Você não tem dinheiro suficiente para construir uma indústria!");
  }

  atualizarEconomia();
  atualizarValores();
  exibirInformacoes();
}

function adicionarIndustria() {
  numindustria++;
  if (numindustria === economiaValores.baixa) {
    // do nothing
  } else if (numindustria === economiaValores.média) {
    alert("Você atingiu o nível médio de indústrias!");
  } else if (numindustria === economiaValores.alta) {
    alert("Você atingiu o nível alto de indústrias!");
  } else if (numindustria === economiaValores.alta) {
    alert("Você atingiu o nível máximo de indústrias!");
  }
  atualizarValores();
  exibirInformacoes();
}

function atualizarEconomia() {
  if (numindustria >= 30) {
    economia.innerHTML = "Economia: muito alta";
    indiceeconomia = valores.indexOf('malta');
  } else if (numindustria >= economiaValores.alta) {
    economia.innerHTML = "Economia: alta";
    indiceeconomia = valores.indexOf('alta');
  } else if (numindustria >= economiaValores.média) {
    economia.innerHTML = "Economia: média";
    indiceeconomia = valores.indexOf('média');
  } else if (numindustria >= economiaValores.baixa) {
    economia.innerHTML = "Economia: baixa";
    indiceeconomia = valores.indexOf('baixa');
  }

  indicesaude = valores.indexOf(saude.innerHTML.split(": ")[1]);

  atualizarValores();
  exibirInformacoes();
}


 

 function atualizarSaude() {
  if (numhospitais >= 30) {
    saude.innerHTML = "Saúde: malta (muito alta)";
    indicesaude = valores.indexOf('malta');
  } else if (numhospitais >= 20) {
    saude.innerHTML = "Saúde: alta";
    indicesaude = valores.indexOf('alta');
  } else if (numhospitais >= 10) {
    saude.innerHTML = "Saúde: média";
    indicesaude = valores.indexOf('média');
  } else {
    saude.innerHTML = "Saúde: baixa";
    indicesaude = valores.indexOf('baixa');
  }
  exibirInformacoes();
}

function construirHospitais() {
  if (numhospitais >= 30) {
    alert("Você já atingiu o limite máximo de hospitais!");
    return;
  }

  if (Valordin >= custoConstrucaoS) {
    Valordin -= custoConstrucaoS;
    adicionarHospital(); 
  } else {
    alert("Você não tem dinheiro suficiente para construir um hospital!");
  }

  atualizarSaude();
  atualizarValores();
  exibirInformacoes();
}


function adicionarHospital() {
  numhospitais++;
  if (numhospitais === saudevalores.alta) {
    alert("Você atingiu o nível alto de hospitais!");
  } else if (numhospitais === saudevalores.média) {
    alert("Você atingiu o nível médio de hospitais!");
  } else if (numhospitais === saudevalores['muito alta']) {
    alert("Você atingiu o nível máximo de hospitais!");
  }
  felicidademundança();
  atualizarValores();
  exibirInformacoes();
}
  
function construirAntipoluidor() {
  if (numAntipoluidores < 3) {
    if (Valordin >= custoConstrucaoA) {
      Valordin -= custoConstrucaoA;
      numAntipoluidores++;

      switch (numAntipoluidores) {
        case 1:
          poluicao -= 400;
          if (poluicao < 0) {
            poluicao = 0;
          }
          break;
        case 2:
          poluicao -= 400;
          if (poluicao < 0) {
            poluicao = 0;
          }
          break;
        case 3:
          poluicao = 0;
          limiteMaxAntipoluidores = true;
          break;
      }

      exibirInformacoes();
    } else {
      alert("Você não tem dinheiro suficiente para construir um anti-poluidor!");
    }
  } else {
    alert("Você já atingiu o limite máximo de anti-poluidores!");
  }
}

construirHospital.addEventListener('click', function() {
  construirHospitais();
  exibirInformacoes();
});



function salvar(){
  firstButtonClicked = true;
  localStorage.setItem('valores', JSON.stringify({
    options,
    firstButtonClicked,
    nome,
    Valordin,
    numindustria,
    indiceeconomia,
    indicesaude,
    numhospitais,
    poluicao,
    numAntipoluidores
  }));
  }

function carregar() {

  const item = localStorage.getItem('valores');
  if (item) {
    const nomeSalvo = localStorage.getItem('nome');
if (nomeSalvo) {
  nome = nomeSalvo;
  circuloEl.textContent = nome;
}
    const data = JSON.parse(item);
    options = data.options
    firstButtonClicked = data.firstButtonClicked
    Valordin = data.Valordin;
    numindustria = data.numindustria;
    indiceeconomia = data.indiceeconomia;
    indicesaude = data.indicesaude;
    numhospitais = data.numhospitais;
    poluicao = data.poluicao;
    numAntipoluidores = data.numAntipoluidores;
    exibirInformacoes();
      if (firstButtonClicked) {
    setInterval(lightningStrike, 3500);
    setInterval(aumentardinheiro, 10000);
    setInterval(aumentarPoluicao, 3000);
    setInterval(exibirInformacoes,1);
  }
  }
}


function reiniciar() {
  localStorage.clear();
  Valordin = Math.floor(Math.random() * 10 + 1) * 100;
  numindustria = economiaValores.baixa;
  indiceeconomia = 3;
  indicesaude = valores.indexOf('baixa');
  numhospitais = saudevalores.baixa;
  poluicao = 0;
  numAntipoluidores = 0;
  nome = "";
  circuloEl.textContent = "";
  divButtons.style.display = 'none';
  exibirInformacoes();
  location.reload();
}

function lightningStrike() {
  let chance = Math.floor(Math.random() * 30) + 1;
  
  if(chance === 1 && numindustria > 0 ){
    alert("caiu um raio na sua industria");
    numindustria -= 1;
  }else{
    numindustria === 0;
  }
  

  }


  function desapamenu(){
    if(menu.style.display === 'none'){
      menu.style.display = 'block';
    }else{
      menu.style.display = 'none';
    }
  }

  function desapamenu2(){
    if(menu2.style.display === 'none'){
      menu2.style.display = 'block';
    }else{
      menu2.style.display = 'none';
    }
  }


