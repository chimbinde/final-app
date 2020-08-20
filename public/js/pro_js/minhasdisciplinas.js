//const urlBase = "http://localhost:3000/";
const urlBase = "https://exameonline-api.tic00.com/";
window.onload = () => {
    var id = 1;
    load_disciplinas();
}
function load_disciplinas() {

    let id = $("#idpessoa").val();
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
            var k = 1;
            html += `<div class="row">`;
            $.each(data, function (i, item) {
                j = 1;
                html += `
                <div class="col-sm-3 ">
                    <div class="info-box">
                        <span class="info-box-icon bg-secondary elevation-1"><i class="`+Icones(item.iddisciplinas)+`"></i></span>
                        <div class="info-box-content">
                            <span class="info-box-text">`+item.nomedisc+`</span>
                            <span class="info-box-number">
                            `+item.iddisciplinas+`
                            <small></small>
                            </span>
                        </div>
                    </div>
                </div>
               `;
                if (k == 4) {
                    k = 1;
                    html += `</div><div class="row">`;
                }
                k++; i++;

            });
            j = 1;
            html += `</div>`;
            $("#div_conteudo").html(html);
            return '1';
        }
    });
    return '0';
}

function Icones(num) {
    if (num == 1) {
        return "fas fa-cog";
    }
    if (num == 2) {
        return "fas fa-thumbs-up";
    }
    if (num == 3) {
        return "fas fa-shopping-cart";
    }
    if (num == 4) {
        return "fas fa-users";
    }

    return "fas fa-users";

}