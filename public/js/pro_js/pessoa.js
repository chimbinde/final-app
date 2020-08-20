//const urlBase = "http://localhost:3000/";
const urlBase = "https://exameonline-api.tic00.com/";
const idpessoa = document.getElementById("idpessoa_").value;

//escolas();
//$("#escola").html("<option value='0'>aaaaaaaaa</option><option value='1'>bbbbbb</option>");

window.onload = () => {
    //  $("#escola").html(escolas());  
    escolas();
    paises();
    //  console.log(idpessoa);
    url = urlBase + 'pessoa/' + idpessoa;
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        beforeSend: function (xhr) {
            colocacao = '<div class="row" style=""><img style="width:70px; height:70px;margin: 0;';
            colocacao += 'position: absolute;top: 50%;left: 50%; margin-right: -50%;transform: translate(-50%, -50%)" src="/img/Spinner.gif"></div>';
            $(".divspiner").html(colocacao);
        },
        success: function (data) {

            // console.log(data.nome);
            $('#nome').val(data.nome);
            $('#apelido').val(data.apelido);
            $('#nome_c').html(data.nome);
            $('#apelido_c').html(data.apelido);
            $('#email').val(data.email);
            $('#email_c').html(data.email);
            // $('#escola').html('<option id="'+data.idescola+'">'+data.nomeescola+'</option>');
            $('#escola').val(data.idescola);
            var idpais = $('#idpais').val(data.idpais);
            // alert(data.homem);
            $('#idsexo').val(data.homem);
            //  $('#idescola').val(data.idescola);
            $('#password').val("*********************");

            var data1 = data.datanasc;
            var dataFormatada = data1.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');
            var arr = dataFormatada.split('-');
            $("#datanasc").val(arr[2] + '-' + arr[1] + '-' + arr[0].toString());

            var data1 = data.datanasc;
            var dataFormatada = data1.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');
            var arr = dataFormatada.split('-');
            $("#criado").html(arr[2] + '-' + arr[1] + '-' + arr[0].toString());

            var data1 = data.datanasc;
            var dataFormatada = data1.replace(/(\d*)-(\d*)-(\d*).*/, '$3-$2-$1');
            var arr = dataFormatada.split('-');
            $("#editado").html(arr[2] + '-' + arr[1] + '-' + arr[0].toString());

            $('#isestudante').val(data.isestudante);



            // idpais
            $('#divcontainer').css({ "display": "block" });
            $('#divcontainer2').css({ "display": "block" }); //iderror
            $('#iderror').css({ "display": "none" });
            $(".divspiner").html("");

            return;

        },
        error: function () {
            $('#divcontainer').css({ "display": "none" });
            $('#divcontainer2').css({ "display": "none" });
            $(".divspiner").html("");
            $('#iderror').css({ "display": "block" });
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
function escolas() {
    url = urlBase + 'escolas/';
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            $.each(data, function (i, item) {
                html += "<option idp=" + item.idprovincia + " value='" + item.idescola + "'selected='selected'>" + item.nomeescola + "</option>";
            });
            $("#escola").html(html);
            // console.log(html);
            return;
        }
    });
    return;

}

function atualizar_dados() {
    //alert( "Uaaaaa aaab");
    var idpessoa = $('#idpessoa').val();
    var nome = $('#nome').val();
    var apelido = $('#apelido').val();

    var email = $('#email').val();
    var idescola = $('#escola').val();
    var homem = $('#idsexo').val();

    var datanasc = $("#datanasc").val();
    var estudante = $('#isestudante').val();
    var idpais = $('#idpais').val();

    // var datacriado = $("#criado").html();
    // var dataeditado = $("#editado").html();
    //var idpessoa = $('#idpessoa_').val();
    //  var password = $('#password').val();

    var url = urlBase + 'pessoa/' + idpessoa;
    //var ativo="1";

    let dados = {
        idpessoa: idpessoa, nome: nome, apelido: apelido, homem: homem, email: email,
        isestudante: estudante, datanasc: datanasc, idpais: idpais, idescola: idescola
    }

    $.ajax({
        type: 'PUT',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(dados), // access in body
    }).done(function () {
        alert("2");
        // window.location.replace("/pessoa/info");

        console.log('SUCCESS');
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });

    return;

}





