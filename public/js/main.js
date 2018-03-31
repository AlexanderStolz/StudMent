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
            document.getElementById("Ladebalken").style.display = "none";
            var table = document.getElementById("searchMentorTable");
            var mentors = JSON.parse(xmlHttp.responseText);
            for (mentor of mentors) {
                var name = mentor.prename;
                var id = mentor._id;
                var subjects = mentor.subject;
                for (subject of subjects) {
                    var title = subject.title;
                    var tr = document.createElement("tr");
                    var td = document.createElement("td");
                    var node = document.createTextNode(title);
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
            document.getElementById("Ladebalken").style.display = "none";
            var mentor = JSON.parse(xmlHttp.responseText);
            document.getElementById("detailName").innerText = mentor.prename + " " + mentor.name;
            document.getElementById("detailEmail").innerText = mentor.email;
            var subjects = mentor.subject;
            var title = document.getElementById("detailFach").innerText;
            for (subject of subjects) {
                if (subject.title == title) {
                    if (subject.monday) {
                        document.getElementById("detailMontag").innerText = subject.monday + "Uhr";
                    } else {
                        document.getElementById("detailMontag").innerText = "nicht verfügbar";
                    }
                    if (subject.tuesday) {
                        document.getElementById("detailDienstag").innerText = subject.tuesday + "Uhr";
                    } else {
                        document.getElementById("detailDienstag").innerText = "nicht verfügbar";
                    }
                    if (subject.wednesday) {
                        document.getElementById("detailMittwoch").innerText = subject.wednesday + "Uhr";
                    } else {
                        document.getElementById("detailMittwoch").innerText = "nicht verfügbar";
                    }
                    if (subject.thursday) {
                        document.getElementById("detailDonnerstag").innerText = subject.thursday + "Uhr";
                    } else {
                        document.getElementById("detailDonnerstag").innerText = "nicht verfügbar";
                    }
                    if (subject.friday) {
                        document.getElementById("detailFreitag").innerText = subject.friday + "Uhr";
                    } else {
                        document.getElementById("detailFreitag").innerText = "nicht verfügbar";
                    }
                    if (subject.saturday) {
                        document.getElementById("detailSamstag").innerText = subject.saturday + "Uhr";
                    } else {
                        document.getElementById("detailSamstag").innerText = "nicht verfügbar";
                    }
                    if (subject.sunday) {
                        document.getElementById("detailSonntag").innerText = subject.sunday + "Uhr";
                    } else {
                        document.getElementById("detailSonntag").innerText = "nicht verfügbar";
                    }
                }
            }
        }
    }
}

function getMentors() {
    createXMLHttpRequest();
    var url = "mentors/get?timestamp=" + new Date().getTime();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = fillTable;
    xmlHttp.send(null);
    document.getElementById("Ladebalken").style.display = "block";
}

function getMentor() {
    if (event.srcElement.tagName === "TD") {
        var parent = $(event.srcElement).parent();
        var id = parent.attr('mid');
        var fach = parent.children(".fach").text();
        var isSame = (fach == document.getElementById("detailFach").innerText);
        document.getElementById("detailFach").innerText = fach;

        if (!$('#detailContainer').hasClass('collapse in') || isSame) {
            $('#detailBtn').click();
        }
        if (!($('#detailContainer').hasClass('collapse in') && isSame)) {
            createXMLHttpRequest();
            var url = "mentor/get?_id=" + id + "&timestamp= " + new Date().getTime();
            xmlHttp.open("GET", url, true);
            xmlHttp.onreadystatechange = fillDetailTable;
            xmlHttp.send(null);
            document.getElementById("Ladebalken").style.display = "block";
        }
    }
}

function toggleView(user) {
    if (user == 'user') {
        if ($('#applicationBody').hasClass('collapse in')) {
            $('#appQues').click();
        }
    } else if (user == 'mentor') {
        if ($('#createAppointment').hasClass('collapse in')) {
            $('#quesBtn').click();
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

function login() {
    var uname = document.getElementById("loguname").value;
    var password = document.getElementById("logupassword").value;
    createXMLHttpRequest();
    var url = "login?name=" + uname + "&password=" + password + "&timestamp=" + new Date().getTime();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4) {
            if (xmlHttp.status === 200) {
                if (xmlHttp.responseText === "true") {
                    window.open("adminPage.html", "_self");
                }
            }
        }
    };
    xmlHttp.send(null);
    document.getElementById("Ladebalken").style.display = "block";
}

function sendApplication() {
    createXMLHttpRequest();
    var url = "applicant/put?name="
        + document.getElementById("AppNachName").value
        + "&prename="
        + document.getElementById("AppVorName").value
        + "&postcode="
        + document.getElementById("AppPlz").value
        + "&city="
        + document.getElementById("AppStadt").value
        + "&email="
        + document.getElementById("AppEMail").value
        + "&timestamp="
        + new Date().getTime();
    xmlHttp.open("GET", url, true);
    xmlHttp.onreadystatechange = sendAppSubjects;
    xmlHttp.send(null);
    document.getElementById("Ladebalken").style.display = "block";
}

function sendAppSubjects() {
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.status == 200) {
            var subs = document.getElementById("AppFaecher").value.split(",");
            for (sub of subs){
                sub.trim();
                var url = "applicant/put/subject?_id="
                    + xmlHttp.responseText
                    + "&title="
                    + sub
                    + "&timestamp="
                    + new Date().getTime();
                createXMLHttpRequest();
                xmlHttp.open("GET", url);
                xmlHttp.send(null);
            }
            document.getElementById("Ladebalken").style.display = "none";
            $('#appQues').click();
        }
    }
}

function setBlack() {
    event.srcElement.style.borderColor = "lightgray";
}