//const urlBase = "http://localhost:3000/"
const urlBase = "https://exameonline-api.tic00.com/";
//const idpessoa = document.getElementById("idpessoa_").value;

//escolas();
//$("#escola").html("<option value='0'>aaaaaaaaa</option><option value='1'>bbbbbb</option>");

window.onload = () => {
    //  $("#escola").html(escolas());  
    //carregar todos pais
    paises();
    //carregar escola 
    paises_escola();

    escolas(165);
    //  console.log(idpessoa);
}
function atualizou_pais_escola(select) {
    var idpais = select.val();
    //  alert("oooo"+idpais );
    load_provincias_escola(idpais);
}
function atualizou_pais_natural(select) {
    var idpais = select.val();
     // alert("oooo"+idpais );
   load_provincias_naturalidade(idpais);
}
function atualizou_provincia_escola(select) {
    var idprovincia = select.val();
    //  alert("oooo"+idprovincia );
    escolas(idprovincia);
}

function paises_escola() {
    url = urlBase + 'pais/';
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            $.each(data, function (i, item) {
                html += "<option  value='" + item.idpais + "' selected='selected'>" + item.nomepais + "</option>";
            });
            $("#idpaisescola").html(html);
            return;
        }
    });
    return;

}


function load_provincias_naturalidade(id_pais) {
    url = urlBase + 'provincia/pais/' + id_pais;
    //alert(url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            j = 0;
            html = '';
            $.each(data, function (i, item) {
                html += "<option value='" + item.idprovincia + "' idp='" + item.pais_idpais + "' selected='selected'>" + item.nomeprovincia + "</option>";
                j = 1;
            });
            if (j === 0) {

                //  alert("opha"+j);
                html += "<option  value='-1' selected='selected'>Sem opcao selecionda...</option>";
            }


            $("#idprovincianatural").html(html);

            return;
        }
    });

}

function load_provincias_escola(id_pais) {
    url = urlBase + 'provincia/pais/' + id_pais;
    //alert(url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            j = 0;
            html = '';
            $.each(data, function (i, item) {
                html += "<option value='" + item.idprovincia + "' idp='" + item.pais_idpais + "' selected='selected'>" + item.nomeprovincia + "</option>";
                j = 1;
            });
            if (j === 0) {

                //  alert("opha"+j);
                html += "<option  value='-1' selected='selected'>Sem opcao selecionda...</option>";

                $("#escola").html("<option  value='-1' selected='selected'>Sem opcao selecionada</option>");
            }


            $("#idprovinciaescola").html(html);

            return;
        }
    });

}

function paises() {
    url = urlBase + 'pais/';
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            $.each(data, function (i, item) {
                html += "<option  value='" + item.idpais + "' selected='selected'>" + item.nomepais + "</option>";
            });
            $("#idpais").html(html);
            return;
        }
    });
    return;

}
function escolas(idprovincia) {
    url = urlBase + 'escolas/provincia/' + idprovincia;
    // alert('>>>>'+url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            $.each(data, function (i, item) {
                j = 1;
                html += "<option idp=" + item.idprovincia + " value='" + item.idescola + "'selected='selected'>" + item.nomeescola + "</option>";
            });

            if (j === 0) {
                html += "<option  value='-1' selected='selected'>Sem opcao selecionda...</option>";
            }
            $("#escola").html(html);
            // console.log(html);
            return;
        }
    });
    return;

}

function submeter_novos_dados() {
    //alert( "Uaaaaa aaab");
    var idpessoa = 0;
    var nome = $('#nome').val();
    var apelido = $('#apelido').val();

    var email = $('#email').val();
    var idescola = $('#escola').val();
    var homem = $('#idsexo').val();

    var datanasc = $("#datanasc").val();
    var estudante = 1;
    var idpais = $('#idpais').val();
    var password = $('#password').val();

    var idprovincia = $('#idprovincianatural').val();

    var dt = new Date();
    var datacriada=dt;
    var dataeditado=dt;

    var url = urlBase + 'pessoa';
    var ativo="1";

   // alert("sss"+idprovincia);
   // return;
    let dados = {
        idpessoa: idpessoa, nome: nome, apelido: apelido, homem: homem, email: email,
        isestudante: estudante, datanasc: datanasc, idpais: idpais, idescola: idescola,
        password: password,datacriada:datacriada, dataeditado:dataeditado,idprovincia :idprovincia,
        ativo:ativo 
    }
    
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(dados), // access in body
    }).done(function () {
       // alert("2");
        // window.location.replace("/pessoa/info");
        alert("Inserido com sucesso..");
        console.log('SUCCESS');
        window.location.replace("/pessoa/loginpage");
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });

    return;

}





