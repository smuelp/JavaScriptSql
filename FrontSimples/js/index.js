const btnListar = document.querySelector("#btnListar");
const lstVeiculos = document.querySelector("#lstVeiculos");

let listar = async function(){
    let resp = await fetch("http://localhost:3000/veiculos");
    let veiculos = await resp.json();
    veiculos.forEach(veic => {       
        let li = document.createElement("li");
        li.textContent = `${veic.descricao} - ${veic.valor}`;
        lstVeiculos.appendChild(li);
    });
};

listar();