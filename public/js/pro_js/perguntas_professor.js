//const post = require('./../../../config/config');
//const post = require('./../config/config');
//const post=require('model/config');
const urlBase = "http://localhost:3000/";
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

  $("#idavaliacoes").html("<option value='-1' idd='-1' idava='-1' >Selecione um exame</option>");
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
     // console.log(tbl);
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

function carregar_questoes(select){
 // var select = $('#idavaliacoes').find("option:selected");

   let sel= select.find("option:selected");
   let avaliacao_id= sel.attr("idava");
   let iddisciplina=sel.attr("idd");
  let iddoc= $("#idpessoa").val()


   carregar_questoes_avaliacao(avaliacao_id, iddoc, iddisciplina, 1, 1,1);
 
}

function carregar_questoes_avaliacao(avaliacao_id, iddoc, iddisciplina, fechado, vezes, idaluno) {
  area_tematica(iddisciplina);

//alert(iddisciplina);
  //return;
  url = urlBase + 'questoes/avaliacao/' + avaliacao_id + '/' + iddoc + '/' + iddisciplina;
 // let aux=$("#aux").html();
  $.ajax({
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      url: url,
      contentType: "application/json",
      dataType: 'json',
      success: function (data) {
          html = '';
          var j = 0;
          var primeiro=0;
          $.each(data, function (i, item) {
              if(primeiro==1) val=' collapse '; else  val=' collapse show ';
              j = 1;
              primeiro=1;
              // //find("option:selected")
              html +=`<div class="card">
                      <div class="card-header" id="heading`+item.id+`">
                          <h5 class="mb-0">
                              <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse`+item.id+`"
                                  aria-expanded="true" aria-controls="collapse`+item.id+`">
                                  Pergunta [`+item.id+`]
                              </button>
                          </h5>
                      </div>

                      <div id="collapse`+item.id+`" class="`+val+`" aria-labelledby="heading`+item.id+`"
                          data-parent="#accordionExample">
                          <div class="card-body">
                             

                              <table class="table table-striped" iddisc="`+iddisciplina+`" avaliacao_id="`+avaliacao_id+`" id="`+item.id+`" idpessoa="`+iddoc+`">
                              <tr>
                                <td>
                                  <div class="form-group">
                                    <label for="comment"> Pergunta</label>
                                    <textarea class="form-control" rows="3" id="pergunta">`+item.pergunta+`</textarea>
                                  </div>
                                  <div class="form-group">
                                    <label for="comment"> Resposta:</label>
                                    <textarea class="form-control" rows="1" id="resposta">`+item.resposta+`</textarea>
                                  </div> 
                                  <div class="form-group">
                                    <label for="comment"> Opcao 1</label>
                                    <textarea class="form-control" rows="1" id="alternativa1">`+item.alternativa1+`</textarea>
                                  </div>
                                  <div class="form-group">
                                    <label for="comment">Opcao 2:</label>
                                    <textarea class="form-control" rows="1" id="alternativa2">`+item.alternativa2+`</textarea>
                                  </div>                                  
                                  <div class="form-group">
                                    <label for="comment"> Opcao 3:</label>
                                    <textarea class="form-control" rows="1" id="alternativa3">`+item.alternativa3+`</textarea>
                                  </div>
                                  <div class="form-group">
                                    <label for="comment">Opcao 4:</label>
                                    <textarea class="form-control" rows="1" id="alternativa4">`+item.alternativa4+`</textarea>
                                  </div>
                                  <div class="form-group" >
                                      <select idarea="`+item.id+`" class="form-control areatematica area`+item.id+`" id="areatematica_`+item.idareatematica+`" ><option value="-1" id="option0">Selecione area tematica..</option>;   
                                     `+ $("#aux").html()+`
                                      </select>
                                  </div>


                              </td>
                            </tr>
                            <tr  >
                              <td>
                                  <div class="form-group">
                                  <button onclick="editar_pergunta($(this));" class="btn form-control btn-info" rows="1" id="comment">salvar</button>
                                </div>
                              </td>
                              </tr>
                              </table>

                          </div>
                      </div>
                  </div>`;

              i++;
          });
          let id= data.length+1;
          html +=`<div class="card">
          <div class="card-header" id="heading`+id+`">
              <h5 class="mb-0">
                  <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse`+id+`"
                      aria-expanded="true" aria-controls="collapse`+id+`">
                      Pergunta [`+id+`]
                  </button>
              </h5>
          </div>

          <div id="collapse`+id+`" class="collapse" aria-labelledby="heading`+id+`"
              data-parent="#accordionExample">
              <div class="card-body">
                 

                  <table class="table table-striped"  iddisc="`+iddisciplina+`" avaliacao_id="`+avaliacao_id+`" id="`+id+`" idpessoa="`+iddoc+`">
                  <tr>
                    <td>
                      <div class="form-group">
                        <label for="comment"> Pergunta</label>
                        <textarea class="form-control" rows="3" id="pergunta"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="comment"> Resposta:</label>
                        <textarea class="form-control" rows="1" id="resposta"></textarea>
                      </div> 
                      <div class="form-group">
                        <label for="comment"> Opcao 1</label>
                        <textarea class="form-control" rows="1" id="alternativa1"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="comment">Opcao 2:</label>
                        <textarea class="form-control" rows="1" id="alternativa2"></textarea>
                      </div>                                  
                      <div class="form-group">
                        <label for="comment"> Opcao 3:</label>
                        <textarea class="form-control" rows="1" id="alternativa3"></textarea>
                      </div>
                      <div class="form-group">
                        <label for="comment">Opcao 4:</label>
                        <textarea class="form-control" rows="1" id="alternativa4"></textarea>
                      </div>
                      <div class="form-group" >
                      <select idarea="`+id+`" class="form-control areatematica area`+id+`" id="areatematica_`+id+`" ><option value="-1" id="option0">Selecione area tematica..</option>;   
                     `+ $("#aux").html()+`
                      </select>
                  </div>

                  </td>
                </tr>
                <tr>
                <td>
                    <div class="form-group">
                    <button onclick="nova_perqgunta($(this));" class="btn form-control btn-info" rows="1" id="comment">salvar</button>
                  </div>
                </td>
                </tr>
                  </table>

              </div>
          </div>
      </div>`;
          $("#accordionExample").html(html);
          marcar_id_area();
      }
  });

}
function  marcar_id_area(){

  //$("#aux").find("#areatematica");
  $(".areatematica").each( function (i, item) {
    i++;
    //   console.log(`select${i}:${this.value}`);
  //  console.log(this.id.replace('areatematica_','')+'-'+ this.value);
    this.value=this.id.replace('areatematica_','');
   // $(".areatematica").ind
  });
}
function nova_perqgunta(botao){
  let tabela= botao.parent().parent().parent().parent().parent();
  let iddisc = tabela.attr("iddisc");
  let avaliacao_id = tabela.attr("avaliacao_id");
  let idpessoa = tabela.attr("idpessoa");
  let id = tabela.attr("id");
  let pergunta = tabela.find("#pergunta").val();
  let resposta = tabela.find("#resposta").val();
  let alternativa1 =tabela.find("#alternativa1").val();
  let alternativa2 =tabela.find("#alternativa2").val();
  let alternativa3 =tabela.find("#alternativa3").val();
  let alternativa4 =tabela.find("#alternativa4").val();

  let idareatematica =$(".area"+id+"").val();
  url = urlBase + 'questoes';
  let dados = {
      iddisciplina: iddisc, idpessoa: idpessoa, pergunta: pergunta,id:id,avaliacao_id:avaliacao_id,
      resposta: resposta, alternativa1: alternativa1, alternativa2: alternativa2, 
      alternativa3: alternativa3,alternativa4: alternativa4, idareatematica:idareatematica
  } 

  //console.log(dados);
  //return;

  $.ajax({
      type: 'POST',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(dados), // access in body
  }).done(function () {
      console.log('SUCCESS');
      //  window.location.replace("/pessoa/loginpage");
  }).fail(function (msg) {
      console.log('FAIL');
  }).always(function (msg) {
      console.log('ALWAYS');
  }); 

  //console.log(tabela.find("#pergunta").html()+'>>>');
 // alert(tabela.find("#pergunta").val()+'>>>');
 // console.log(tabela.find("#pergunta").text()+'>>>');

  //let idareatematica =$(".area"+id+"").val();

  ////:questoesId/:idpessoa/:iddisciplina/:avaliacao_id"
  //alert(alternativa1+'>>'+idareatematica+'>>');

  //return;

}
function area_tematica(iddisc){

  url = urlBase + 'areatematica/'+iddisc;

  $.ajax({
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    url: url,
    contentType: "application/json",
    dataType: 'json',
    success: function (data) {
      html ='';

      var j = 0;
      $.each(data, function (i, item) {
        i++;
        html+='<option value="'+item.idareatematica+'" id="option'+item.idareatematica+'">'+item.areatematica+'</option>';
      });

      $("#aux").html(html);
   
    }
  });


}
function editar_pergunta(botao){

  let tabela= botao.parent().parent().parent().parent().parent();
  let iddisc = tabela.attr("iddisc");
  let avaliacao_id = tabela.attr("avaliacao_id");
  let idpessoa = tabela.attr("idpessoa");
  let id = tabela.attr("id");
  let pergunta = tabela.find("#pergunta").val();
  let resposta = tabela.find("#resposta").val();
  let alternativa1 =tabela.find("#alternativa1").val();
  let alternativa2 =tabela.find("#alternativa2").val();
  let alternativa3 =tabela.find("#alternativa3").val();
  let alternativa4 =tabela.find("#alternativa4").val();

  let idareatematica =$(".area"+id+"").val();

  url = urlBase + 'questoes/' + id + '/' + idpessoa + '/' + iddisc+'/'+avaliacao_id;
  // alert(iddisciplinas+'-'+ iddocente+'-'+ idavaliacao+'-'+ questoes_id+'-'+ vezes+'-'+idpessoa+'-'+alternativa);
  let dados = {
      iddisciplinas: iddisc, idpessoa: idpessoa, pergunta: pergunta,
      resposta: resposta, alternativa1: alternativa1, alternativa2: alternativa2, 
      alternativa3: alternativa3,alternativa4: alternativa4, idareatematica:idareatematica
  } 
  $.ajax({
      type: 'PUT',
      url: url,
      contentType: 'application/json',
      data: JSON.stringify(dados), // access in body
  }).done(function () {
      //alert("Inserido com sucesso..");
      console.log('SUCCESS');
      //  window.location.replace("/pessoa/loginpage");
  }).fail(function (msg) {
      console.log('FAIL');
  }).always(function (msg) {
      console.log('ALWAYS');
  }); 
}
function eliminar_avaliacao(botao) {ss

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

        if (j === 0) $("#idavaliacoes").html('<option idd="-1" idava="-1" value="-1" selected="selected">Selecione exame..</option>');
        else
          $("#idavaliacoes").html('<option idd="-1" idava="-1" value="-1" selected="selected">Selecione exame ..</option>' + html);
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

