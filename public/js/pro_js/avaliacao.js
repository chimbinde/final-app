const urlBase = "http://localhost:3000/";
var tempo = new Number();
//=================================================================
tempo = 30;
window.onload = () => {
    var id = 1;
    load_categoriadisc();

    //1.verificar se tem testes pendentes
    //2 se nao _load categorias
    //3 se sim load execucao de este
    //4. inscrever  testes
 

    // startCountdown();
}
function listar_avaliacao_aberta(id) {
    let id = $("#idpessoa").val();
    

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
        horaImprimivel = '00:' + min + ':' + seg;
        $("#sessao").html(horaImprimivel);
        setTimeout('startCountdown()', 1000);
        tempo--;
    } else {
        //  window.open('../controllers/logout.php', '_self');
        alert("final de tudo..");
        return;
    }
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



    console.log("***" + disc);
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

     console.log(lista);
    let area = select.val();
    url = urlBase + 'disciplinas/area/' + area;

    return;

}
function load_disciplinas_aluno(id) {
    url = urlBase + 'alunodisc/disciplinas/' + id;
    var cat=$("#select_categoria").val();
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            var k=0;
            $.each(data, function (i, item) {
                j = 1;
                if(item.idcategoriadisc==cat)
                    html += '<option value="'+item.iddisciplinas+'" class="disc_">'+item.nomedisc +'</input>';
                k++;
            });
            if(j===0) $("#iddisciplinas").html('<option value="-1" selected="selected">Selecione a disciplina..</option>');
              else 
              $("#iddisciplinas").html(html);

            return '1';
        }
    });
    return '0';
}

