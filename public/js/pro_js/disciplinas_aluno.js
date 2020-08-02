const urlBase = "http://localhost:3000/";

window.onload = () => {
    var id = 1;
    load_disciplinas_aluno(id);

}
function load_modal(select){
    alert("modal loading...");
    load_categoriadisc();

}
function load_categoriadisc(){
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
             console.log(data);
             $.each(data, function (i, item) {
                 j = 1;
                 html += '<option value="1">nk;n;l;lm;m</option>';
          
 
             });
             if (j == 0) 
                 $("#select_idcategoria").html("<h1>sem disciplinas inscritas..</h1>");
             else
                  $("#select_idcategoria").html(html);
             return;
         }
     });
    
}
function selecionar_operacao(select){
    /*
    if(select.html()=='lista'){
        $("$cardbody_sel").css({"display":none});
        $("$cardbody_lista").css({"display":none});
    }else{
        $("$cardbody_sel").css({"display":none});
        $("$cardbody_lista").css({"display":none});

    } */

}
function load_disciplinas_aluno(id) {

    url = urlBase + 'alunodisc/disciplinas/1';
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
                html += '<div class="col-12 col-sm-6 col-md-3">';
                html += '<div class="card" >';
                html += '<img class="card-img-top" style="max-height: 200px;min-height: 200px" src="/img/dis'+item.iddisciplinas+'.jpg" alt="Card image cap">';
                html += '<div class="card-body card-body-cascade">';
                html += '<h4 class="card-title"><strong>'+item.nomedisc+'</strong></h4>';
                html += '<p class="card-text" style="font-size: small;"> <strong>Inscrito no ano '+item.anocadastro+'</strong>'+item.descr+'</p>';
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