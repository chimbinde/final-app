const urlBase = "http://localhost:3000/";
var tempo = new Number();
//=================================================================
tempo = 50;
window.onload = () => {
    var id = 1;
    load_categoriadisc();

    //1.verificar se tem testes pendentes
    //2 se nao _load categorias
    //3 se sim load execucao de este
    //4. inscrever  testes
    // startCountdown();
    let novo = 0;
    listar_avaliacao_aberta(novo);

}

function marcar_resposta(opcao) {
    /*
    html += 'onclick="marcar_resposta($(this));" class="toggle" id="1" name="' + item.idordem + '" value="'+ item.alternativa1 +'">' + item.alternativa1 + '</input></p>';

   */
    resposta = opcao.val();
    questoes_id = opcao.attr('ord');
    iddisciplinas = opcao.attr('iddis');
    iddocente = opcao.attr('iddocente');
    idavaliacao = opcao.attr('qid');


    idpessoa = $('#idpessoa').val();
    idavaliacao1 = $('#idavalia').val();
    vezes = $('#vezes').val();
    iddisc = $('#iddisc').val();
    //testar tempo_
    //==========================================================================
    //"ava_iddisciplinas/:ava_iddocente/:ava_id/:vezes/:idpessoa"
    url = urlBase + 'alunoavaliacao/tempo/' + iddisciplinas + '/' + iddocente + '/' + idavaliacao + '/' + vezes + '/' +idpessoa;
   // alert(url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;

            if((data[0].minutos>=0 )& (data[0].minutos <=120)){
                eliminar_resposta(iddisciplinas, iddocente ,questoes_id , vezes,idpessoa,resposta, idavaliacao);
                console.log("gravou.."+data[0].minutos);


                tempo = (120-data[0].minutos)*60;
                /*
                startCountdown();*/

            }else {
                console.log("fechou teste.."+data[0].minutos);
                fechar_sessao();
            }
           
        }
       
    });
   // console.log("Eureca 2..");
    //===================================================================================================
    // eliminar_resposta(iddisciplinas, iddocente ,questoes_id , vezes,idpessoa,resposta, idavaliacao);
}
function verificar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id, resposta) {
    url = urlBase + 'respostas/findquestao/' + iddisc + '/' + idpessoa + '/' + idavaliacao + '/' + vezes + '/' + questoes_id;
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            var j = 0;
            eliminar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id, resposta);

        },
        error: function (e) {
            adicionar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id, resposta);
            console.log("error");
        }
    });
}
function adicionar_resposta(iddisciplinas, iddocente, questoes_id, vezes, idpessoa, alternativa, idavaliacao) {
    // iddisciplinas, iddocente, questoes_id, vezes,idpessoa,alternativa,idavaliacao
    url = urlBase + 'respostas/';
    // alert(iddisciplinas+'-'+ iddocente+'-'+ idavaliacao+'-'+ questoes_id+'-'+ vezes+'-'+idpessoa+'-'+alternativa);
    let dados = {
        iddisciplinas: iddisciplinas, iddocente: iddocente, questoes_id: questoes_id,
        vezes: vezes, idpessoa: idpessoa, alternativa: alternativa, idavaliacao: idavaliacao
    }

    //console.log(dados);
    //return;
    $.ajax({
        type: 'POST',
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

function eliminar_resposta(iddisciplinas, iddocente, questoes_id, vezes, idpessoa, alternativa, idavaliacao) {

    //(iddisciplinas, iddocente ,questoes_id , vezes,idpessoa,resposta);

    url = urlBase + 'respostas/' + iddisciplinas + '/' + iddocente + '/' + idavaliacao + '/' + questoes_id + '/' + vezes + '/' + idpessoa;
    //alert(url);
    //return ;
    // data: JSON.stringify(dados), // access in body
    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json'
    }).done(function () {
        // alert("Inserido com sucesso..");

        console.log('SUCCESS');
        // window.location.replace("/");
    }).fail(function (msg) {

        console.log('FAIL');
    }).always(function (msg) {
        //iddisciplinas,iddocente, questoes_id, vezes, idpessoa, alternativa,idavaliacao
        adicionar_resposta(iddisciplinas, iddocente, questoes_id, vezes, idpessoa, alternativa, idavaliacao);
        console.log('ALWAYS');
    });

}
function listar_avaliacao_aberta(novo) {
    let id = $("#idpessoa").val();
    url = urlBase + 'alunoavaliacao/' + id;

    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            var exame;
            $.each(data, function (i, item) {
                i++;
                if (item.fechada == 0) {
                    j = 1;
                    exame = item;
                }
            });
            var horaAtual = new Date();

            if (j == 1) {
                // console.log(exame);
                $("#idavalia").val(exame.avaliacao_id);
                $("#vezes").val(exame.vezes);
                $("#iddisc").val(exame.iddisciplinas);

                carregar_questoes_avaliacao(exame, novo);
                incializar_questoes(exame, id);

                tempo = 60*60*2;
                startCountdown();
            }
        }
    });

    return '0'; s
}
function incializar_questoes(exame, idestudante) {
    url = urlBase + 'respostas/avaliacao/' + exame.avaliacao_id + '/' + exame.avaliacao_idpessoa + '/' + exame.avaliacao_iddisciplinas + '/' + exame.vezes + '/' + idestudante;
    //alert(url);
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

                if (item.alternativa == $("#p" + item.questoes_id).find("[id=1]").val()) {
                    $("#p" + item.questoes_id).find("[id=1]").prop("checked", true);
                    console.log("1");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=2]").val()) {
                    $("#p" + item.questoes_id).find("[id=2]").prop("checked", true);
                    console.log("2");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=3]").val()) {
                    $("#p" + item.questoes_id).find("[id=3]").prop("checked", true);
                    console.log("3");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=4]").val()) {
                    $("#p" + item.questoes_id).find("[id=4]").prop("checked", true);
                    console.log("4");
                }
                console.log("*>>>");
                console.log(item.alternativa);
            });
        }
    });
}
function carregar_questoes_avaliacao(exame, novo) {
    //bucar questoes do teste
    url = urlBase + 'questoes/avaliacao/' + exame.avaliacao_id + '/' + exame.avaliacao_idpessoa + '/' + exame.avaliacao_iddisciplinas;
    // alert(url);

    $("#perguntas").css({ display: "block" });

    iniciar_avaliacao(1, novo);

    //console.log("loadind.."+iddisc+'-'+ idpessoa+'-'+ idaval);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;

            $("#total").val(data.length);
            $("#current").val(1);
            $("#total_incice").html(data.length);
            $.each(data, function (i, item) {
                if (j == 0) block = ' style="display:block" '; else block = ' style="display:none" ';
                j = 1;

                html += '<div ord="' + item.idordem + '" id="p' + item.idordem + '" ' + block + '>';
                html += '<p><strong>[' + item.idordem + ']' + item.pergunta + '</strong></p>';

                html += '<p><input type="radio" qid="' + item.avaliacao_id + '"  iddocente="' + item.avaliacao_idpessoa + '" iddis="' + item.avaliacao_iddisciplinas + '" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="1" name="' + item.idordem + '" value="' + item.alternativa1 + '">' + item.alternativa1 + '</input></p>';
                html += '<p><input type="radio" qid="' + item.avaliacao_id + '" iddocente="' + item.avaliacao_idpessoa + '" iddis="' + item.avaliacao_iddisciplinas + '" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="2" name="' + item.idordem + '" value="' + item.alternativa2 + '">' + item.alternativa2 + '</input></p>';
                html += '<p><input type="radio" qid="' + item.avaliacao_id + '" iddocente="' + item.avaliacao_idpessoa + '" iddis="' + item.avaliacao_iddisciplinas + '" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="3" name="' + item.idordem + '" value="' + item.alternativa3 + '">' + item.alternativa3 + '</input></p>';
                html += '<p><input type="radio" qid="' + item.avaliacao_id + '"iddocente="' + item.avaliacao_idpessoa + '" iddis="' + item.avaliacao_iddisciplinas + '" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="4" name="' + item.idordem + '" value="' + item.alternativa4 + '">' + item.alternativa4 + '</input></p>';
                html += '</div>';
                i++;
            });
            // console.log(data);
            $("#card-perguntas").html(html);
        }
    });

}
function prox(op) {
    operacao = op;
    total = $("#total").val();
    currente = $("#current").val();
    // $('#p"'+currente+'"').css({display:"none;"});
    $("#p" + currente + "").css({ display: "none" });

    if (op == 1) {
        //console.log("2");
        currente++;
        if (currente > total) {
            currente = 1;
            //   console.log("5");
        }
    } else {
        //  console.log("3");
        currente--;
        if (currente < 1) {
            currente = total;
            //  console.log("4");
        }
    }
    console.log("-->");
    console.log(currente);



    $("#p" + currente + "").css({ display: "block" });
    $("#current").val(currente);
    $("#pag_").html(currente + " de ");
    //alert("rrrr");

    // $("#p2").css({display:"block;"});
    // $("#p2"+currente).css({display:"block;"});

}

function load_avaliacao(select) {

    let idpessoa = $("#idpessoa").val();
    let iddisc = $("#iddisciplinas").val();

    //alert(idpessoa+"@"+iddisciplina);
    url = urlBase + 'avaliacao/disc/' + iddisc;
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            console.log(data);
            $.each(data, function (i, item) {
                html += '<option id="idoption" iddisc="' + item.iddisciplinas + '" iddocente="' + item.idpessoa + '" value="' + item.id + '"  >' + item.descricao + '</option>';
                j = 1;
            });

            if (j == 1) $("#idavaliacoes").html(html);
            else $("#idavaliacoes").html("<option id='idoption' value='-1'>Selecione avaliacao</option>");
        }
    });

}
function iniciar_avaliacao(op, novo) {
    let opcao = "";
    let opcao_ = "";
    if (op === 1) {
        opcao = " none ";
        opcao_ = " block ";
        //criar uma avaliacao____
        //alert("id>>"+ $("#iddisciplinas").val()+'*'+$("#idpessoa").val());

        if (novo == 1) {

            if (($("#iddisciplinas").val() == -1) | ($("#idavaliacoes").val() == -1)) {
                //alert("deve selecionar a disciplina");        
                $("#iderror").html("Deve selecionar uma disciplina");
                $("#iderror").css({ display: "block" });
                return;
            } else {
                //.find("[id=idoption]")
                let avaliacao = $("#idavaliacoes").find("[id=idoption]");

                // console.log(avaliacao.html());
                let iddisciplinas = avaliacao.attr("iddisc");
                let iddocente = avaliacao.attr("iddocente");
                let avaliacao_id = avaliacao.val()
                let idaluno = $("#idpessoa").val();


                //console.log("@");
                //  console.log(iddisciplinas+'-'+iddocente+'-'+avaliacao_id+'-'+idaluno);
                //  return;
                criar_avaliacao(iddisciplinas, avaliacao_id, iddocente, idaluno);

            }
        }

    } else {
        //encerrar uma avaliacao____
        tempo=0;
        fechar_sessao();
        opcao = " block ";
        opcao_ = " none ";
    }

    // alert("iniciar avaliacao...");
    //esconde
    $("#categoria").css({ display: opcao });
    $("#disciplina").css({ display: opcao });
    $("#btn_iniciar").css({ display: opcao });
    $("#idavaliacoes_").css({ display: opcao });

    $("#btn_terminar").css({ display: opcao_ });
    $("#btn_terminar").css({ display: opcao_ });
    $("#perguntas").css({ display: opcao_ });



}
function criar_avaliacao(iddisc, idavalia, iddocente, idaluno) {
    //(iddisciplinas+'-'+iddocente+'-'+avaliacao_id+'-'+idaluno)
    var url = urlBase + 'alunoavaliacao';
    //  alert(iddisc+"-"+idavalia+"-"+idpessoa);
    let dados = {
        idpessoa: idaluno, iddisciplinas: iddisc, nota: "0", avaliacao_id: idavalia, id: idavalia, avaliacao_idpessoa: iddocente, avaliacao_iddisciplinas: iddisc, vezes: '0', inicio: '0',
        fim: '', fechada: "0"
    }
    // console.log(dados);
    // console.log("@@@");
    $.ajax({
        type: 'POST',
        url: url,
        contentType: 'application/json',
        data: JSON.stringify(dados), // access in body
    }).done(function (data) {
        let novo = 1;
        //  listar_avaliacao_aberta(novo);
        //aluno/pag_avaliacao
        // window.location.replace("http://stackoverflow.com");
        // similar behavior as clicking on a link
        window.location.href = "/aluno/pag_avaliacao";
        console.log('SUCCESS' + data);
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });
}
//=================================================================
function startCountdown() {

    if ((tempo - 1) >= -1) {
        var min = parseInt(tempo / 60);
        var seg = tempo % 60;
        if (min < 10) {
            min = "0" + min;
            min = min.substr(0, 2);

        }

        if (seg <= 9) {

            seg = "0" + seg;

        }
        // if (seg == 10) alert("Restam apenas 10 segundos");
        horaImprimivel = '00:' + min + ':' + seg;
        //ajuste no cess
        if(tempo<=300){
            if(tempo%2==0) $("#sessao").css({color:"#c40233"}); 
            else
            $("#sessao").css({color:"#ff6961"});
        }           
        else $("#sessao").css({color:"white"});

        $("#sessao").html(horaImprimivel);
        setTimeout('startCountdown()', 1000);
        tempo--;
    } else {
        //  window.open('../controllers/logout.php', '_self');

        fechar_sessao();
      //  alert("final de tudo..");
        return;
    }
}
function fechar_sessao() {
    //fechar todos exames abertos de todas disciplinas
    const id = $("#idpessoa").val();
    // alert("eureca..."+id);
    url = urlBase + 'alunoavaliacao/fechar/' + id;
    //,
    // data: JSON.stringify(dados), // access in body
    $.ajax({
        type: 'DELETE',
        url: url,
        contentType: 'application/json'
    }).done(function () {
        // alert("Inserido com sucesso..");
        console.log('SUCCESS');
        window.location.replace("/");
    }).fail(function (msg) {
        console.log('FAIL');
    }).always(function (msg) {
        console.log('ALWAYS');
    });

}
function load_categoriadisc() {
    url = urlBase + 'categoriadisc';
    // alert(url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            // var modal = sel;

            $.each(data, function (i, item) {
                j = 1;
                html += '<option value="' + item.idcategoriadisc + '">' + item.categoriadisc + '</option>';
            });
            if (j == 0)
                $("#select_categoria").html("<h1>sem disciplinas inscritas..</h1>");
            else
                $("#select_categoria").html(html);
            return;
        }
    });

}

function disciplina_inscrita(disc, valor) {
    // var inscritas = [];
    // disc = $(".disc");
    var j = 0;

    return j;
}


function load_disciplinas(select) {

    let id = $("#idpessoa").val();
    $("#idavaliacoes").html("<option value='-1' >selecione avaliacao</option>");
    lista = load_disciplinas_aluno(id);
    //  console.log(lista);
    let area = select.val();
    url = urlBase + 'disciplinas/area/' + area;
    return;

}
function load_disciplinas_aluno(id) {
    url = urlBase + 'alunodisc/disciplinas/' + id;
    var cat = $("#select_categoria").val();
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
                if (item.idcategoriadisc == cat)
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

