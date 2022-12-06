function validation() {
  var seleccion = document.getElementById("countrycode");
  var pais = seleccion.options[seleccion.selectedIndex].value;

  var seleccion = document.getElementById("bkcode");
  var banco = seleccion.options[seleccion.selectedIndex].value;

  var cuenta = document.getElementById("nro_cbu").value;

  var codigo_banco = "";

  if (pais == "PE") {
    codigo_banco = cuenta.substr(0, 3);
  } else if (pais == "UY") {
    switch (banco) {
      case "BROU":
        codigo_banco = "001";
        break;

      case "Santander":
        codigo_banco = "137";
        break;

      case "Itau":
        codigo_banco = "113";
        break;

      case "HSBC":
        codigo_banco = "157";
        break;

      case "BBVA":
        codigo_banco = "153";
        break;

      case "Scotia":
        codigo_banco = "128";
        break;
    }
  } else if (pais == "BR") {
    switch (banco) {
      case "Bradesco":
        codigo_banco = "204";
        break;

      case "Santander":
        codigo_banco = "033";
        break;

      case "Itau":
        codigo_banco = "341";
        break;
    }
  }

  var APIKEY = document.getElementById("api_key_user").value;
  console.log(APIKEY);

  var URL_API = "https://validation.prometeoapi.com/validate-account/";
  //var URL_API = "http://localhost:5005/validate-account/"

  console.log("Datos a usar: ", cuenta, codigo_banco, pais);

  const options = {
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
      "X-API-Key": APIKEY,
    },
    body: new URLSearchParams({
      nro_cbu: cuenta,
      bk_code: codigo_banco,
      country_code: pais,
    }),
  };
  fetch(URL_API, options)
    .then((response) => response.json())
    .then(function (response) {
      console.log(response);
      try {
        if (response.data.valid) {
          swal("", JSON.stringify(response, null, 2), "success");
        } else {
          swal("", JSON.stringify(response, null, 2), "error");
        }
      } catch {
        swal("", JSON.stringify(response, null, 2), "error");
      }
    })
    .catch((err) => console.error(err));
}

function info_options() {
  var seleccion = document.getElementById("countrycode");

  // funcion para Cargar los bancos al campo <select>
  function cargar_bancos() {
    var pais = seleccion.options[seleccion.selectedIndex].value;
    if (pais == "PE") {
      var json = { "": "" };
    } else if (pais == "UY") {
      var json = {
        BROU: "",
        Santander: "",
        Itau: "",
        HSBC: "",
        BBVA: "",
        Scotia: "",
      };
    } else if (pais == "BR") {
      var json = { Bradesco: "", Santander: "", Itau: "" };
    } else {
      var json = { "---": "" };
    }
    addOptions("bkcode", json);
  }

  // Rutina para agregar opciones a un <select>
  function addOptions(domElement, json) {
    var select = document.getElementsByName(domElement)[0];
    let options = select.getElementsByTagName("option");

    // Remove olds
    for (var i = options.length; i--; ) {
      select.removeChild(options[i]);
    }

    //Add news
    Object.keys(json).forEach(function (elm) {
      var option = document.createElement("option");
      option.text = elm;
      select.add(option);
    });
  }
  cargar_bancos();
}

(function () {
  var updateButton = document.getElementById("updateDetails");
  var cancelButton = document.getElementById("cancel");
  var favDialog = document.getElementById("APIKEY");

  // Update button opens a modal dialog
  updateButton.addEventListener("click", function () {
    favDialog.showModal();
  });

  // Form cancel button closes the dialog box
  cancelButton.addEventListener("click", function () {
    favDialog.close();
  });
})();
