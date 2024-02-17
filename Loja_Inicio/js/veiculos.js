import {BASEURL} from "./const.js";

function rowVeic(vVeiculo){
    return `
        <tr>
            <td>${vVeiculo.id}</td>
            <td>${vVeiculo.descricao}</td>
            <td>${vVeiculo.portas}</td>
            <td>${vVeiculo.cor}</td>
            <td> 
            <button type="button" class="btn btn-primary btn-alterar" data-id=${vVeiculo.id} >Alterar</button> 
            <button type="button" class="btn btn-danger btn-excluir" data-id=${vVeiculo.id}>Excluir</button>
          </td>
        </tr>
    `;
}

function carregaVeiculos(){
    const tabVeic = document.querySelector("tbody");
    tabVeic.innerHTML = "";
    fetch(`${BASEURL}/veiculos`)
    .then(result => result.json())
    .then(veiculos => {
        veiculos.forEach(veic => {
            tabVeic.innerHTML += rowVeic(veic);            
        }); 
        associaEventos();
    });
}

carregaVeiculos();

function associaEventos(){
    const frmVeic = document.querySelector("#frmVeic");
    frmVeic.onsubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData(e.target);
        let veic = {};

        formData.forEach((value,key) => veic[key] = value);
       
        if(frmVeic.dataset.id)
          veic.id = frmVeic.dataset.id;
        
        let dados = JSON.stringify(veic);

        fetch(`${BASEURL}/veiculos`,
        {
            headers:{
                "Content-Type": "application/json"
            },
            method:"post",
            body:dados
        })
        .then(request => request.text())
        .then(resp => {
            
            if(resp.toUpperCase() == "OK"){
                window.location.reload(); 
                carregaVeiculos();               
                console.log(resp);
            } else {
                alert("Erro ao enviar formulario " + resp);
            }
        })
    }

    let btnsAlterar = document.querySelectorAll(".btn-alterar");
    btnsAlterar.forEach(btn => {
        btn.onclick = (e) => {

            let id = e.target.dataset.id;

            fetch(`${BASEURL}/veiculos/${id}`)
            .then(res => res.json())
            .then(veics => {
                let veic = veics[0];
                let frmVeic = document.querySelector("#frmVeic");
                frmVeic.querySelector("#inpDescricao").value = veic.descricao;
                frmVeic.querySelector("#inpPortas").value = veic.portas;
                frmVeic.querySelector("#inpCor").value = veic.cor;

                frmVeic.dataset.id = veic.id;

                let cadastroVeiculo = document.querySelector("#frmCadastroVeiculo");
                $(cadastroVeiculo).modal("show");
                console.log(cadastroVeiculo);
            });
            
        }
    });

    let btnsExcluir = document.querySelectorAll(".btn-excluir");
    btnsExcluir.forEach(btn => {
        btn.onclick = (e) => {

            $("#frmExcluirVeiculo").modal("show");

            let btnExcluirModal = document.querySelector("#btnExcluirModal");
            btnExcluirModal.dataset.id = e.target.dataset.id;

            btnExcluirModal.onclick = (e) => {
                
                let id = e.target.dataset.id;

                fetch(`${BASEURL}/veiculos/${id}`,
                { 
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "DELETE"             
                })
                .then(request => request.text())                   
                .then(resp => {
                    if(resp.toUpperCase() == "OK"){
                        window.location.reload();
                        $("#frmExcluirVeiculo").modal("hide");
                        
                    }
                });
            }         
        }
    }); 
}