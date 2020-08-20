//const post = require('./../../../config/config');
//const post = require('./../config/config');
//const post=require('model/config');
//const urlBase = "http://localhost:3000/";
const urlBase = "https://exameonline-api.tic00.com/";
window.onload = () => {
  var id = 1;
  load_disciplinas();
  tbl_avaliacoes();
  // alert(post.getURL());
  //  load_disciplinas();
  //alert("eureca..");

}
function load_disciplinas() {

  let id = $("#idpessoa").val();

  $("#idavaliacoes").html("<option value='-1' idd='-1' idava='-1' >Nova Avaliacao</option>");
  lista = load_disciplinas_professor(id);
  return;

}
function load_disciplinas_professor(id) {
  url = urlBase + 'profdisc/professor/' + id;
  $.ajax({
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    url: url,
    contentType: "application/json",
    dataType: 'json',
    success: function (data) {
      html = '';
      var j = 0;
      var k = 0;
      $.each(data, function (i, item) {
        j = 1;
        html += '<option value="' + item.iddisciplinas + '" class="disc_">' + item.nomedisc + '</input>';
        k++;
      });
      if (j === 0) $("#iddisciplinas").html('<option value="-1" selected="selected">Selecione a disciplina..</option>');
      else
        $("#iddisciplinas").html(html);
      return '1';
    }
  });
  return '0';
}

function tbl_avaliacoes() {
  let id = $("#idpessoa").val();

  url = urlBase + 'avaliacao/disciplina_professor/' + id;
  $.ajax({
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    url: url,
    contentType: "application/json",
    dataType: 'json',
    success: function (data) {
      html = '';
      var j = 0;
      var exame;
      let tbl = '<tr id="linha_pesquisa" >' + $("#linha_pesquisa").html() + '</tr>';
      console.log(tbl);
      $.each(data, function (i, item) {
        i++;
        html += '<tr id="' + item.id + '" idp="' + item.idpessoa + '" iddisc="' + item.iddisciplinas + '"><td><div class="row"><div class="col-sm-10">' + item.descricao + '<strong>[' + item.nomedisc + ']</strong></div>';
        html += '<div class="col-sm-2">';
        html += '<a href="#" onclick="eliminar_avaliacao($(this));" class="btn btn-secondary a-btn-slide-text">';
        html += '<i class="nav-icon fas fa-trash"></i></a>';
        html += '</div><div></td></tr>';
      });
      $("#tblavaliacoes").html(tbl + html);
    }
  });

}
function eliminar_avaliacao(botao) {

  let linha = botao.parent().parent().parent().parent();
  let idpessoa = linha.attr("idp");
  let id = linha.attr("id");
  let iddisc = linha.attr("iddisc");

  url = urlBase + 'avaliacao/' + id + '/' + iddisc + '/' + idpessoa;

  let colocacao = '<div class="row" style=""><img style="width:70px; height:70px;margin: 0;';
  colocacao += 'position: absolute;top: 50%;left: 50%; margin-right: -50%;transform: translate(-50%, -50%)" src="/img/Spinner.gif"></div>';
  $(".divspiner").html(colocacao);
  $.ajax({
    type: 'DELETE',
    url: url,
    contentType: 'application/json'
  }).done(function () {

    console.log('SUCCESS');
    $(".divspiner").html('');
    $("#sucesso_box").css({ "border-left": "5px solid #17A589", background: "#E8F8F5", color: "#17A589" });
    $("#sucesso_box").html("Eliminado com sucesso");
  }).fail(function (msg) {
    console.log('FAIL');
  }).always(function (msg) {
    console.log('ALWAYS');
  });
}
function load_avaliacao(select) {
  let id = $("#idpessoa").val();
  iddisciplinas = select.val();
  url = urlBase + 'avaliacao/disciplina/' + id + '/' + iddisciplinas;

  $.ajax({
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    url: url,
    contentType: "application/json",
    dataType: 'json',
    success: function (data) {
      html = '';
      var j = 0;
      var exame;
      //  console.log('<<' + iddisciplinas + '>>');
      $.each(data, function (i, item) {
        i++;

        if (item.iddisciplinas == iddisciplinas) {
          j = 1;
          html += '<option   idd="' + item.iddisciplinas + '" idava="' + item.id + '" value="' + item.iddisciplinas + '" class="disc_"><strong> [' + item.id + '] </strong>' + item.descricao + '</option>';
        }
      });
      // console.log(html);
      if (j == 1) {

        if (j === 0) $("#idavaliacoes").html('<option idd="-1" idava="-1" value="-1" selected="selected">Nova Avaliacao</option>');
        else
          $("#idavaliacoes").html('<option idd="-1" idava="-1" value="-1" selected="selected">Nova Avaliacao</option>' + html);
      }
    }
  });

}
function salvar_dados() {
  $("#card_edit").css({ display: "none" });
  $("#card_lista").css({ display: "block" });

  let iddisciplina = $('#iddisciplinas').val();
  let idprofessor = $("#idpessoa").val();
  let avaliacao_id = $('#idavaliacoes').val();
  let descricao1 = $('#txtDescricao').val();
  // alert("aaa"+descricao);
  //return;
  if (avaliacao_id == -1) {

    adicionar_avaliacao(iddisciplina, idprofessor, descricao1);

  } else {
    // alert("edicao");
    editar_avaliacao(iddisciplina, idprofessor, descricao1, avaliacao_id);
  }
  //alert(idprofessor + "-" + iddisciplina + "-" + avaliacao_id);

}

function editar_avaliacao(iddisciplina, idprofessor, descricao1, id1) {
  let dados = {
    iddisciplinas: iddisciplina, idpessoa: idprofessor, descricao: descricao1, id: id1
  }
  url = urlBase + 'avaliacao/' + id1 + '/' + iddisciplina + '/' + idprofessor;

  //alert(url);
  // console.log(dados);
  //return;
  let colocacao = '<div class="row" style=""><img style="width:70px; height:70px;margin: 0;';
  colocacao += 'position: absolute;top: 50%;left: 50%; margin-right: -50%;transform: translate(-50%, -50%)" src="/img/Spinner.gif"></div>';
  $(".divspiner").html(colocacao);
  $.ajax({
    type: 'PUT',
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(dados) // access in body
  }).done(function () {
    //alert("Inserido com sucesso..");
    console.log('SUCCESS');
    $(".divspiner").html('');
    $("#sucesso_box").css({ "border-left": "5px solid #17A589", background: "#E8F8F5", color: "#17A589" });
    $("#sucesso_box").html("Actualizado com sucesso");
  }).fail(function (msg) {
    console.log('FAIL');
  }).always(function (msg) {
    console.log('ALWAYS');
  });

}
function adicionar_avaliacao(iddisciplina, idprofessor, descricao1) {
  let dados = {
    iddisciplinas: iddisciplina, idpessoa: idprofessor, descricao: descricao1
  }
  url = urlBase + 'avaliacao';
  let colocacao = '<div class="row" style=""><img style="width:70px; height:70px;margin: 0;';
  colocacao += 'position: absolute;top: 50%;left: 50%; margin-right: -50%;transform: translate(-50%, -50%)" src="/img/Spinner.gif"></div>';
  $(".divspiner").html(colocacao);
  $.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json',
    data: JSON.stringify(dados), // access in body
  }).done(function () {
    //alert("Inserido com sucesso..");
    console.log('SUCCESS');
    $(".divspiner").html('');

    $("#sucesso_box").css({ "border-left": "5px solid #17A589", background: "#E8F8F5", color: "#17A589" });
    $("#sucesso_box").html("Inserido com sucesso");
  }).fail(function (msg) {
    console.log('FAIL');
  }).always(function (msg) {
    console.log('ALWAYS');
  });

}
function operacao_enviada(select) {

  var select = $('#idavaliacoes').find("option:selected");
  let iddisciplina = select.attr('idd');
  let avaliacao_id = select.attr('idava');
  let idpessoa = $('#idpessoa').val();

  $("#card_edit").css({ display: "block" });
  $("#card_lista").css({ display: "none" });

  if (avaliacao_id == -1) {
    $("#txtCodigo").val("0000");

  } else {
    //alert("antiga avaliacao");
    load_campos_avaliacao(iddisciplina, idpessoa, avaliacao_id);
  }
  //console.log('>>'); 
}

function load_campos_avaliacao(iddisciplina, idpessoa, avaliacao_id) {
  let id = idpessoa;
  let iddisciplinas = iddisciplina;
  url = urlBase + 'avaliacao/disciplina/' + id + '/' + iddisciplinas;

  $.ajax({
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    url: url,
    contentType: "application/json",
    dataType: 'json',
    success: function (data) {
      html = '';
      var j = 0;

      $.each(data, function (i, item) {
        i++;
        if (item.id == avaliacao_id) {
          j = 1;
          $("#txtDescricao").val(item.descricao);
        }
      });
    }
  });

}

