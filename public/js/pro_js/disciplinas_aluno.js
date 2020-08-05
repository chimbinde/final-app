const urlBase = "http://localhost:3000/";

window.onload = () => {
    var id = 1;
    load_disciplinas_aluno(id);

}
function load_modal(select) {
    //   alert("modal loading...");
    load_categoriadisc(select);
    let id=$("#idpessoa").val();
    load_disciplinas_edit(id);
}
function load_categoriadisc(sel) {
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
            var modal = sel;
            //    console.log(modal.find( "#select_categoria").html());
            //  $("#select_idcategoria").html("<h1>shfgkhjghjgkghk..</h1>");

            //  return;
            $.each(data, function (i, item) {
                j = 1;
                html += '<option value="' + item.idcategoriadisc + '">' + item.categoriadisc + '</option>';
                // console.log(item.categoriadisc);
            });
            if (j == 0)
                $("#select_categoria").html("<h1>sem disciplinas inscritas..</h1>");
            else
                $("#select_categoria").html(html);
            return;
        }
    });

}
function load_disciplinas(select) {
   // alert(select.val() + "*" + $("#idpessoa").val());
  //  return;
    let area = select.val();
    url = urlBase + 'disciplinas/area/' + area;
    // alert(url);
    
    //=================================
    $.ajax({
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: function (data) {
            html = '';
            var j = 0;
            $.each(data, function (i, item) {
               if(disciplina_inscrita(item.nomedisc)==0){
                    html += '<option value="' + item.iddisciplinas + '">' + item.nomedisc + '</option>';
                    j = 1;
                } 
            });
           // console.log(html);
            if (html === '')
                $("#iddisciplinas").html('<option value="-1">sem disciplinas ...</option>');
            else
                $("#iddisciplinas").html(html);
            return; 
        }
    });
}
function load_disciplinas_edit(id){
   
        url = urlBase + 'alunodisc/disciplinas/'+id;
        // alert(url);
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
                    j = 1;
                    html += '<tr><td>' + item.iddisciplinas + ' </td>'; 
                    html += '<td>' + item.nomedisc + ' </td>'; 
                    html += '<td>' + item.anocadastro + ' </td>'; 
                    html += '<td><button class="btn btn-secondary"></bitton>del </td></tr>';     
                });
                if (j == 0)
                    $("#lista_conteudo").html("<tr><td colspan='3'>sem disciplinas inscritas..</td></tr>");
                else
                    $("#lista_conteudo").html(html);
                return;
            }
        });

}
function disciplina_inscrita(valor){
    var inscritas = [];
    disc = $(".disc");
    var j=0;
    $.each(disc, function (i, item) {
        //console.log(item.textContent+"-"+valor);
        if(valor===item.textContent) j=1; 
        
    });
    return j;
}
function load_disciplinas_aluno(id) {

    url = urlBase + 'alunodisc/disciplinas/'+id;
    // alert(url);
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
                j = 1;
                html += '<div class="col-12 col-sm-6 col-md-3" >';
                html += '<div class="card" >';
                html += '<img class="card-img-top" style="max-height: 200px;min-height: 200px" src="/img/dis' + item.iddisciplinas + '.jpg" alt="Card image cap">';
                html += '<div class="card-body card-body-cascade">';
                html += '<h4 class="card-title "><strong  class="disc" idd="' + item.iddisciplinas + '" >' + item.nomedisc + '</strong></h4>';
                html += '<p class="card-text" style="font-size: small;"> <strong>Inscrito no ano ' + item.anocadastro + '</strong>' + item.descr + '</p>';
                html += '<a href="#" class="btn btn-secondary" style="border-radius: 15px 50px 30px;">Button</a>';
                html += '</div>';
                html += ' </div>'
                html += '</div>';

            });
            if (j == 0)
                $("#lista_disciplinas").html("<h1>sem disciplinas inscritas..</h1>");
            else
                $("#lista_disciplinas").html(html);
            return;
        }
    });
    return;

}