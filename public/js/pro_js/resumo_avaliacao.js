//const post = require('./../../../config/config');
//const post = require('./../config/config');
//const post=require('model/config');
const urlBase = "http://localhost:3000/";
window.onload = () => {
    var id = 1;
    // alert(post.getURL());
    load_disciplinas();
    //  alert("eureca..");

}

function load_disciplinas() {

    let id = $("#idpessoa").val();

    // alert(id); 
    //return;
    $("#idavaliacoes").html("<option value='-1' >selecione avaliacao</option>");
    lista = load_disciplinas_aluno(id);
    return;

}
function load_avaliacao(select) {
    let id = $("#idpessoa").val();
    iddisciplinas = select.val();
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
          //  console.log('<<' + iddisciplinas + '>>');
            $.each(data, function (i, item) {
                i++;

                if (item.iddisciplinas == iddisciplinas) {
                    j = 1;
                    html += '<option  fechado="' + item.fechada + '" idaluno="' + item.idpessoa + '" vezes="' + item.vezes + '" iddoc="' + item.avaliacao_idpessoa + '"  idd="' + item.iddisciplinas + '" idava="' + item.avaliacao_id + '" value="' + item.iddisciplinas + '" class="disc_"><strong> [' + item.vezes + '] </strong>' + item.descricao + '</option>';
                }
            });
            // console.log(html);
            if (j == 1) {

                if (j === 0) $("#idavaliacoes").html('<option value="-1" selected="selected">Selecione a disciplina..</option>');
                else
                    $("#idavaliacoes").html(html);
            }
        }
    });

}
function load_correccao(select) {
    let questao = select.find("option:selected");

    let fechado = questao.attr("fechado");
    let idaluno = $("#idpessoa").val();
    let vezes = questao.attr("vezes");
    let iddoc = questao.attr("iddoc");
    let iddisciplina = questao.attr("idd");
    let avaliacao_id = questao.attr("idava");

    console.log(fechado + '-' + idaluno + '-' + vezes + '-' + iddoc + '-' + iddisciplina + '-' + avaliacao_id);
    //if(fechado==0) return;
    carregar_questoes_avaliacao(avaliacao_id, iddoc, iddisciplina, fechado, vezes, idaluno);
    incializar_questoes(avaliacao_id, iddoc,iddisciplina, vezes, idaluno);
    //exame.avaliacao_id=avaliacao_id;
    //exame.avaliacao_idpessoa =iddoc;
    //exame.avaliacao_iddisciplinas=iddisciplina;
    // console.log(exame);
}
function incializar_questoes(avaliacao_id, iddoc,iddisciplina, vezes, idestudante) {
    url = urlBase + 'respostas/avaliacao/' + avaliacao_id + '/' +  iddoc + '/' + iddisciplina + '/' +  vezes + '/' + idestudante;
 
   // alert(url);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            var acertadas=0;
            $.each(data, function (i, item) {
                j = 1;
               // console.log( $("#p" + item.questoes_id).find("[id=alt1]").attr('rep'));
    
                let color="";
                let background="";

                if (item.alternativa === $("#p" + item.questoes_id).find("[id=alt1]").attr('rep')) {

                    if (item.alternativa ===$("#p" + item.questoes_id).find("[id=alt5]").val()){
                        color="#17A589";
                        background="#E8F8F5";
                        acertadas++;
                    }else{
                        color="#CD6155";
                        background="#F9EBEA";
                    }  

                    $("#p" + item.questoes_id).find("[id=alt1]").css({background:background,color:color});
                    console.log("1");
                }
                if (item.alternativa === $("#p" + item.questoes_id).find("[id=alt2]").attr('rep')) {
                    if (item.alternativa ===$("#p" + item.questoes_id).find("[id=alt5]").val()){
                        color="#17A589";
                        background="#E8F8F5";
                        acertadas++;
                    }else{
                        color="#CD6155";
                        background="#F9EBEA";
                    }  
                   
                    $("#p" + item.questoes_id).find("[id=alt2]").css({background:background,color:color});
                    console.log("2");
                }
                if (item.alternativa === $("#p" + item.questoes_id).find("[id=alt3]").attr('rep')) {
                    if (item.alternativa ===$("#p" + item.questoes_id).find("[id=alt5]").val()){
                        color="#17A589";
                        background="#E8F8F5";
                        acertadas++;
                    }else{
                        color="#CD6155";
                        background="#F9EBEA";
                    } 
                   
                    $("#p" + item.questoes_id).find("[id=alt3]").css({background:background,color:color});
                    console.log("3");
                }
                if (item.alternativa === $("#p" + item.questoes_id).find("[id=alt4]").attr('rep')) {
                    if (item.alternativa ===$("#p" + item.questoes_id).find("[id=alt5]").val()){
                        color="#17A589";
                        background="#E8F8F5";
                        acertadas++;
                    }else{
                        color="#CD6155";
                        background="#F9EBEA";
                    } 
                    $("#p" + item.questoes_id).find("[id=alt4]").css({background:background,color:color});
                    console.log("4");
                } 
                console.log("*>>>");
              //  console.log(item.alternativa);
            });
            //`+$("#total_numeros").val()+` acertadas
            let total =$("#total_numeros").val();
            let percent= 100*acertadas/total;

            let classe='';
            if(percent<50) classe=' bg-danger '; else classe=' bg-success ';

            let esta=` <div class="progress-bar `+classe+` " role="progressbar" style="width: `+percent+`%;" aria-valuenow="7" aria-valuemin="0" aria-valuemax="100">`+percent+`%</div> `;
            $("#estatistica").html(esta);
        }
    });
}
function carregar_questoes_avaliacao(avaliacao_id, iddoc, iddisciplina, fechado, vezes, idaluno) {
    //bucar questoes do teste
    url = urlBase + 'questoes/avaliacao/' + avaliacao_id + '/' + iddoc + '/' + iddisciplina;
    // alert(url);
    // $("#perguntas").css({ display: "block" });
    // iniciar_avaliacao(1, novo);
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            console.log(data);
            $("#total_numeros").val(data.length);
            $.each(data, function (i, item) {

                j = 1;
                var letra = '';
               // console.log($.trim(item.alternativa1)+'-'+$.trim(item.resposta));
                if ($.trim(item.alternativa1) == $.trim(item.resposta)) {
                    letra = '[a]';
                  //  console.log("<<<a");
                }
              //  console.log(item.alternativa2+'-'+item.resposta);
               if (item.alternativa2 == item.resposta) 
                { 
                    letra = '[b]'; 
                   // console.log("<<<b");
                 }
              //   console.log(item.alternativa3+'-'+item.resposta);
                if (item.alternativa3 == item.resposta) 
                { 
                    letra = '[c]'; 
                  //  console.log("<<<c");
                }
              //  console.log(item.alternativa4+'-'+item.resposta);
                if (item.alternativa4 == item.resposta) 
                 { 
                    letra = '[d]'; 
                   // console.log("<<<d");
                   
                }
                

                html += '<tr id="p' + item.idordem + '">';
                html += '<td>';
                html += '<p><strong>[' + item.idordem + ']' + item.pergunta + '</strong></p>';

                html += '<p id="alt1" rep="'+ item.alternativa1 +'" >[a] ' + item.alternativa1 + '</p>';
                html += '<p id="alt2" rep="'+ item.alternativa2 +'" >[b] ' + item.alternativa2 + '</p>';
                html += '<p id="alt3" rep="'+ item.alternativa3 +'" >[c] ' + item.alternativa3 + '</p>';
                html += '<p id="alt4" rep="'+ item.alternativa4 +'" >[d] ' + item.alternativa4 + '</p>';
                html += '<input type="hidden" id="alt5" value="'+ item.resposta +'" ></input>';
                html += '<p style="color:blue;"><strong>Alternativa correcta:</strong> ' + letra + ' ' + item.resposta + '</p>';
                html += '</td>';
                html += '</tr>';
                i++;
            });
            html += '<tr><td id="estatistica"></td></tr>';
            // console.log(data);
            $("#tblRespostas").html(html);
        }
    });

}
function load_disciplinas_aluno(id) {
    url = urlBase + 'alunodisc/disciplinas/' + id;
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
                //  if (item.idcategoriadisc == cat)
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