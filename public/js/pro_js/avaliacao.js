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
    listar_avaliacao_aberta();

}

function marcar_resposta(opcao) {
    /*
    html += 'onclick="marcar_resposta($(this));" class="toggle" id="1" name="' + item.idordem + '" value="'+ item.alternativa1 +'">' + item.alternativa1 + '</input></p>';

   */
    resposta = opcao.val();
    questoes_id = opcao.attr('ord');
    idpessoa = $('#idpessoa').val();
    idavaliacao = $('#idavalia').val();
    vezes = $('#vezes').val();
    iddisc = $('#iddisc').val();
    //testar tempo_
    

   // verificar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta);
    //eliminar e adicionar novo ...
    eliminar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta);
    //adicionar questao
   // adicionar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta) ;
    
}
function verificar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta)
{
    url = urlBase + 'respostas/findquestao/'+iddisc+'/'+idpessoa+'/'+idavaliacao+'/'+vezes+'/'+questoes_id;
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            var j = 0;
            eliminar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta);

        },
        error: function(e){
            adicionar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,resposta) ;
            console.log("error");
        }
    });
}
function adicionar_resposta(iddisciplinas, idpessoa, avaliacao_id, vezes, questoes_id, alternativa) {
    url = urlBase + 'respostas/'
    let dados = {
        iddisciplinas: iddisciplinas, idpessoa: idpessoa, avaliacao_id: avaliacao_id,
        vezes: vezes, questoes_id: questoes_id, alternativa: alternativa
    }
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

function eliminar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id, alternativa) {

    url = urlBase + 'respostas/' + iddisc + '/' + idpessoa + '/' + idavaliacao + '/' + vezes + '/' + questoes_id;
    // alert(url);

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
        adicionar_resposta(iddisc, idpessoa, idavaliacao, vezes, questoes_id,  alternativa);
        console.log('ALWAYS');
    });

}
function listar_avaliacao_aberta() {
    let id = $("#idpessoa").val();
    url = urlBase + 'alunoavaliacao/' + id;
    // alert(url);
    //return;
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
            var dinicio = new Date(exame.inicio);
            console.log(dinicio);
            // console.log("-------->");
            var horaAtual = new Date();
            console.log(exame);
            $("#idavalia").val(exame.avaliacao_id);
            $("#vezes").val(exame.vezes);
            $("#iddisc").val(exame.iddisciplinas);

            carregar_teste(exame.iddisciplinas, exame.idpessoa, exame.avaliacao_id);
            incializar_questoes(exame.iddisciplinas, exame.idpessoa, exame.avaliacao_id);
            //  console.log(exame.iddisciplinas+'-'+exame.idpessoa+'-'+exame.avaliacao_id);
            tempo = 10;
            startCountdown();
        }
    });

    return '0'; s
}
function incializar_questoes(iddisc, idpessoa, idaval) {
    //buscar respostas respondidas pelo estudante...
    // /respostas/avaliacao/:iddisc/:idpessoa/:idavaliacao/:vezes
    url = urlBase + 'respostas/avaliacao/' + iddisc + '/' + idpessoa + '/' + idaval + '/1';
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
                    //console.log("1");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=2]").val()) {
                    $("#p" + item.questoes_id).find("[id=2]").prop("checked", true);
                    //console.log("2");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=3]").val()) {
                    $("#p" + item.questoes_id).find("[id=3]").prop("checked", true);
                    // console.log("3");
                }
                if (item.alternativa == $("#p" + item.questoes_id).find("[id=4]").val()) {
                    $("#p" + item.questoes_id).find("[id=4]").prop("checked", true);
                    // console.log("4");
                }
                console.log(">>>");
            });
        }
    });
}
function carregar_teste(iddisc, idpessoa, idaval) {
    //bucar questoes do teste
    url = urlBase + 'questoes/avaliacao/' + idaval;

    $("#perguntas").css({ display: "block" });
    iniciar_avaliacao(1);

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
                //  console.log(block);
                html += '<div ord="' + item.idordem + '" id="p' + item.idordem + '" ' + block + '>';
                html += '<p><strong>[' + item.idordem + ']' + item.pergunta + '</strong></p>';

                html += '<p><input type="radio" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="1" name="' + item.idordem + '" value="' + item.alternativa1 + '">' + item.alternativa1 + '</input></p>';
                html += '<p><input type="radio" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="2" name="' + item.idordem + '" value="' + item.alternativa2 + '">' + item.alternativa2 + '</input></p>';
                html += '<p><input type="radio" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="3" name="' + item.idordem + '" value="' + item.alternativa3 + '">' + item.alternativa3 + '</input></p>';
                html += '<p><input type="radio" ord="' + item.idordem + '" onclick="marcar_resposta($(this));" class="toggle" id="4" name="' + item.idordem + '" value="' + item.alternativa4 + '">' + item.alternativa4 + '</input></p>';
                //  html +='<p><img src="/img/img7.jpg" class="img-fluid" alt="Responsive image"></p>';
                html += '</div>';

                i++;

            });


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
    $("#pag_").html(currente+" de ");
    //alert("rrrr");

    // $("#p2").css({display:"block;"});
    // $("#p2"+currente).css({display:"block;"});

}
function iniciar_avaliacao(op) {
    let opcao = "";
    let opcao_ = "";
    if (op === 1) {
        opcao = " none ";
        opcao_ = " block ";
    } else {
        opcao = " block ";
        opcao_ = " none ";
    }
    //esconde
    $("#categoria").css({ display: opcao });
    $("#disciplina").css({ display: opcao });
    $("#btn_iniciar").css({ display: opcao });

    $("#btn_terminar").css({ display: opcao_ });
    $("#btn_terminar").css({ display: opcao_ });
    $("#perguntas").css({ display: opcao_ });



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
        if (seg == 10) alert("Restam apenas 10 segundos");
        horaImprimivel = '00:' + min + ':' + seg;
        $("#sessao").html(horaImprimivel);
        setTimeout('startCountdown()', 1000);
        tempo--;
    } else {
        //  window.open('../controllers/logout.php', '_self');

        //  fechar_sessao();
        alert("final de tudo..");
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



    // console.log(x);



    //console.log("***" + disc);
    return j;
    for (i = 0; i < fLen; i++) {
        console.log(disc[i] + "-" + valor);
        if (valor === disc[i]) j = 1;
    }
    /*
        $.each(disc, function (i, item) {
            console.log(item+"-"+valor);
            if (valor === item) j = 1;
    
        }); */
    return j;
}


function load_disciplinas(select) {

    let id = $("#idpessoa").val();
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

