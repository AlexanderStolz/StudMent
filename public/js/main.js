var xmlHttp;

function createXMLHttpRequest() {
    if (window.ActiveXObject) {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    else if (window.XMLHttpRequest) {
        xmlHttp = new XMLHttpRequest();
    }
}

function getSelectSubject() {
    index = document.getElementById("subjectList").value;
}

function getTable() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("searchMentorTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function fillTable() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var table = document.getElementById("searchMentorTable");
            var mentoren = xmlHttp.responseXML.getElementsByTagName("mentor");
            for (i = 0; i < mentoren.length; i++) {
                var name = mentoren[i].getElementsByTagName("name")[0].firstChild.data;
                var id = mentoren[i].getElementsByTagName("id")[0].firstChild.data;
                var faecher = mentoren[i].getElementsByTagName("fach");
                for (j = 0; j < faecher.length; j++) {
                    var fach = faecher[j].firstChild.data;
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var node = document.createTextNode(fach);
                    td.appendChild(node);
                    td.setAttribute("class", "fach");
                    tr.appendChild(td);
                    td = document.createElement("td");
                    node = document.createTextNode(name);
                    td.appendChild(node);
                    tr.appendChild(td);
                    tr.setAttribute("mid", id);
                    tr.onclick = getMentor;
                    table.appendChild(tr);
                }
            }
        }
    }
}

function fillDetailTable() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var vorname = xmlHttp.responseXML.getElementsByTagName("vorname")[0].firstChild.data;
            var name = xmlHttp.responseXML.getElementsByTagName("name")[0].firstChild.data;
            document.getElementById("detailName").innerText = vorname + " " + name;
            var email = xmlHttp.responseXML.getElementsByTagName("email")[0].firstChild.data;
            document.getElementById("detailEmail").innerText = email;
            var faecher = xmlHttp.responseXML.getElementsByTagName("fach");
            var fach = document.getElementById("detailFach").innerText;
            for (i = 0; i < faecher.length; i++) {
                if (faecher[i].getElementsByTagName("title")[0].firstChild.data == fach) {
                    var von, bis;
                    var montag = faecher[i].getElementsByTagName("montag")[0];
                    if(montag){
                        von = montag.getElementsByTagName("von")[0].firstChild.data;
                        bis = montag.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailMontag").innerText = von + " - " + bis + "Uhr";
                    } else {
                        document.getElementById("detailMontag").innerText = "nicht verfügbar";
                    }
                    var diensatg = faecher[i].getElementsByTagName("dienstag")[0];
                    if(diensatg){
                        von = diensatg.getElementsByTagName("von")[0].firstChild.data;
                        bis = diensatg.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailDienstag").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailDienstag").innerText = "nicht verfügbar";
                    }
                    var mittwoch = faecher[i].getElementsByTagName("mittwoch")[0];
                    if(mittwoch){
                        von = mittwoch.getElementsByTagName("von")[0].firstChild.data;
                        bis = mittwoch.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailMittwoch").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailMittwoch").innerText = "nicht verfügbar";
                    }
                    var donnerstag = faecher[i].getElementsByTagName("donnerstag")[0];
                    if(donnerstag){
                        von = donnerstag.getElementsByTagName("von")[0].firstChild.data;
                        bis = donnerstag.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailDonnerstag").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailDonnerstag").innerText = "nicht verfügbar";
                    }
                    var freitag = faecher[i].getElementsByTagName("mittwoch")[0];
                    if(freitag){
                        von = freitag.getElementsByTagName("von")[0].firstChild.data;
                        bis = freitag.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailFreitag").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailFreitag").innerText = "nicht verfügbar";
                    }
                    var samstag = faecher[i].getElementsByTagName("samstag")[0];
                    if(samstag){
                        von = samstag.getElementsByTagName("von")[0].firstChild.data;
                        bis = samstag.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailSamstag").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailSamstag").innerText = "nicht verfügbar";
                    }
                    var sonntag = faecher[i].getElementsByTagName("sonntag")[0];
                    if(sonntag){
                        von = sonntag.getElementsByTagName("von")[0].firstChild.data;
                        bis = sonntag.getElementsByTagName("bis")[0].firstChild.data;
                        document.getElementById("detailSonntag").innerText = von + " - " + bis + "Uhr";
                    }else {
                        document.getElementById("detailSonntag").innerText = "nicht verfügbar";
                    }
                }
            }
        }
    }
}

function getMentors() {
    createXMLHttpRequest();
    var url = "mentoren.xml?timestamp=" + new Date().getTime();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = fillTable;
    xmlHttp.send(null);
}

function getMentor() {
    if (event.srcElement.tagName === "TD") {
        var parent = $(event.srcElement).parent();
        var id = parent.attr('mid');
        var fach = parent.children(".fach").text();
        var isSame = fach == document.getElementById("detailFach").innerText;
        document.getElementById("detailFach").innerText = fach;

        createXMLHttpRequest();
        var url = "mentor_" + id + ".xml?timestamp= " + new Date().getTime();
        xmlHttp.open("GET", url, true);
        xmlHttp.onreadystatechange = fillDetailTable;
        xmlHttp.send(null);

        if (!$('#detailContainer').hasClass('collapse in') || isSame) {
            $('#detailBtn').click();
        }
    }
}

function sendMail() {
    var link = "mailto:"
        + document.getElementById("detailEmail").innerText
        + "?subject="
        + encodeURIComponent("Nachhilfe im Fach ")
        + document.getElementById("detailFach").innerText
        + "&body="
        + encodeURIComponent("Hallo ")
        + document.getElementById("detailName").innerText
        + encodeURIComponent(",\n\nich benötige Nachhilfe für das Fach ")
        + document.getElementById("detailFach").innerText
        + encodeURIComponent(".\nMeine Daten sind:\n\n")
        + document.getElementById("vorName").value
        + encodeURIComponent(" ")
        + document.getElementById("nachName").value
        + encodeURIComponent("\n")
        + document.getElementById("eMail").value
        + encodeURIComponent("\n")
        + document.getElementById("plz").value
        + encodeURIComponent(" ")
        + document.getElementById("stadt").value
        + encodeURIComponent("\n\nIch würde mich über eine Antwort freuen.\n ");

    window.location.href = link;
}

function getUhr() {
    console.log("bitton pressed");
    createXMLHttpRequest();
    var url = "1";
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = test;
    xmlHttp.send(null);
}

function test() {
    console.log("einleerertext");
    console.log("2"+xmlHttp.response.toString());
}