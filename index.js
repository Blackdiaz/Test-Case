let hidden = false;
let divisa = true;
const userInputForm = document.getElementById('userInputForm');
const empleadosTabla = document.getElementById('propiedadesEmpleado');
let noEmpleados = 0;
let crearElemento = false;
let rIndex = 0;
let width = 320;
let height = 0;
let streaming = false;
let video = null;
let canvas = null;
let photo = null;
let startbutton = null;

function startup(filaFoto) {
    console.log('photo' + filaFoto);
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo' + filaFoto);
    startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function (stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function (err) {
            console.log("An error occurred: " + err);
        });

    video.addEventListener('canplay', function (ev) {
        if (!streaming) {
            height = video.videoHeight / (video.videoWidth / width);



            if (isNaN(height)) {
                height = width / (4 / 3);
            }

            video.setAttribute('width', width);
            video.setAttribute('height', height);
            canvas.setAttribute('width', width);
            canvas.setAttribute('height', height);
            streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function (ev) {
        takepicture();
        ev.preventDefault();
        document.getElementById('contentarea').style.display = "none";
        streaming = false;

    }, false);

    clearphoto();
}
function stopStreamedVideo(videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(function (track) {
        track.stop();
    });

    videoElem.srcObject = null;
}


function clearphoto() {
    let context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    let data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);

}


function takepicture() {
    let context = canvas.getContext('2d');
    if (width && height) {
        canvas.width = width;
        canvas.height = height;
        context.drawImage(video, 0, 0, width, height);

        let data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);

    } else {
        clearphoto();
    }
}




userInputForm.addEventListener("submit", event => {
    event.preventDefault();

    let formdataElemnt = new FormData(event.target);
    let userInputNombreEmpleado = formdataElemnt.get("inputNombreEmpleado");
    let userInputEmpresa = formdataElemnt.get("inputEmpresa");
    let userinputSalario = formdataElemnt.get("inputSalario");
    if (crearElemento) {
        CreateTableElement(userInputNombreEmpleado, userInputEmpresa, userinputSalario);
        ClearInput();
        AlternateColorRows();
    } else {
        ModifyTable(userInputNombreEmpleado, userinputSalario);
        ClearInput();
    }

});

function ModifyTable(nombreEmpleado, salario) {
    let tr = empleadosTabla.getElementsByTagName("tr");
    tr[rIndex].cells[0].innerHTML = nombreEmpleado;
    tr[rIndex].cells[2].innerHTML = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "USD", maximumFractionDigits: "2" }).format(salario);

}

function ActionInput(modificar) {
    crearElemento = !modificar;
    if (!hidden) {
        userInputForm.style.display = 'block';
        if (modificar) {
            alert("Haga click en la fila que desea editar");
            document.getElementById('inputEmpresa').disabled = true;
            SelectEmpleado();

        } else {
            document.getElementById('inputEmpresa').disabled = false;


        }
    }
}

function SelectEmpleado() {

    let tr = empleadosTabla.getElementsByTagName("tr");

    for (let i = 1; i < tr.length; i++) {
        tr[i].onclick = function () {
            console.log(this.rowIndex);
            rIndex = this.rowIndex;

            document.getElementById("inputNombreEmpleado").value = this.cells[0].innerHTML;
            document.getElementById("inputEmpresa").value = this.cells[1].innerHTML;
            document.getElementById("inputSalario").innerHTML = this.cells[2].innerHTML;
        }
    }


}

function CambiarDivisa() {
    divisa = !divisa;
    let tr = empleadosTabla.getElementsByTagName("tr");

    if (divisa) {
        document.getElementById('labelDivisa').innerHTML = "Divisa MX";
        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            if (tr.length > 1) {

                td[2].innerHTML = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "USD", maximumFractionDigits: "2" }).format(td[2].innerHTML.replace(/[$,]/g, "") * 21.50);

                if (td[2].innerHTML.replace(/[$,]/g, "") < 10000) {
                    td[2].style.background = "#e81515";
                } else {
                    td[2].style.background = "#10e610";
                }

            }
        }
    } else {
        document.getElementById('labelDivisa').innerHTML = "Divisa USD";

        for (i = 1; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
            if (tr.length > 1) {

                td[2].innerHTML = new Intl.NumberFormat("ja-JP", { style: "currency", currency: "USD", maximumFractionDigits: "2" }).format(td[2].innerHTML.replace(/[$,]/g, "") * 0.046511627);

                if (td[2].innerHTML.replace(/[$,]/g, "") < 10000) {
                    td[2].style.background = "#e81515";
                } else {
                    td[2].style.background = "#10e610";
                }
            }
        }

    }
}


function CreateTableElement(nombre, empresa, salario) {
    noEmpleados++;
    document.getElementById("empleados").innerHTML = noEmpleados;
    let tblBody = document.createElement("tbody");
    let hilera = document.createElement("tr");
    let celdaNombre = document.createElement("td");
    let celdaEmpresa = document.createElement("td");
    let celdaSalario = document.createElement("td");
    let celdaImagen = document.createElement("td");
    let anexarImagenButton = document.createElement("button");
    let img = document.createElement("img");
    img.id = "photo" + (noEmpleados - 1);
    anexarImagenButton.id = noEmpleados - 1;
    anexarImagenButton.onclick = function () {
        startup(anexarImagenButton.id);
        document.getElementById('contentarea').style.display = "inline";

    };
    anexarImagenButton.innerHTML = "Click para tomar foto";

    let textInputNombre = document.createTextNode(nombre);
    let textInputEmpresa = document.createTextNode(empresa);
    let textInputSalario = document.createTextNode(new Intl.NumberFormat("ja-JP", { style: "currency", currency: "USD", maximumFractionDigits: "2" }).format(salario));

    celdaImagen.appendChild(anexarImagenButton);
    celdaImagen.appendChild(img);
    celdaNombre.appendChild(textInputNombre);
    celdaEmpresa.appendChild(textInputEmpresa);
    celdaSalario.appendChild(textInputSalario);
    if (salario < 10000) {
        celdaSalario.style.background = "#e81515";
    } else {
        celdaSalario.style.background = "#10e610";
    }

    hilera.appendChild(celdaNombre);
    hilera.appendChild(celdaEmpresa);
    hilera.appendChild(celdaSalario);
    hilera.appendChild(celdaImagen);
    tblBody.appendChild(hilera);
    empleadosTabla.appendChild(tblBody);

}

function ClearInput() {
    document.getElementById("inputNombreEmpleado").value = ""
    document.getElementById("inputEmpresa").value = ""
    document.getElementById("inputSalario").value = ""

}
function AlternateColorRows() {
    let tr = empleadosTabla.getElementsByTagName("tr");

    for (i = 1; i < tr.length; i++) {

        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length - 1; j++) {


            if (i % 2 == 0) {
                td[0].style.background = "#dddddd";
                td[1].style.background = "#dddddd";
                td[3].style.background = "#dddddd";
            }
        }

    }

}

function FilterTable() {
    let valorabuscar = document.getElementById("filtrar").value.toLowerCase().trim();


    let tr = empleadosTabla.getElementsByTagName("tr");
    for (i = 1; i < tr.length; i++) {
        visible = false;

        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length - 2; j++) {
            if (td[j] && td[j].innerHTML.toLowerCase().indexOf(valorabuscar) > -1) {
                visible = true;
            }
        }
        if (visible === true) {
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
    }
}


