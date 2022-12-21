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
        codigo_banco = "59438325"; //204
        break;

      case "Santander":
        codigo_banco = "90400888"; //033
        break;

      case "Itau":
        codigo_banco = "60701190"; //341
        break;
      
      case "Caixa":
        codigo_banco = "00360305"; //104
        break;

      case "Banco_do_Brasil":
        codigo_banco = "00000000"; //001
        break;  
    }
  }

  var APIKEY = document.getElementById("api_key_user").value;
  console.log(APIKEY);

  var URL_API = "https://back-end.demovalidacion.prometeoapi.com/validate-account/"
  //var URL_API = "http://127.0.0.1:5000/validate-account/"


  console.log("Datos a usar: ", cuenta, codigo_banco, pais);
  
  if (pais == "BR"){

    var input_branch_code = document.getElementById("input_branch_code").value;

    var input_tax_id = document.getElementById("input_tax_id").value;

    body_request= {
      nro_cbu: cuenta,
      bk_code: codigo_banco,
      country_code: pais,
      branch_code: input_branch_code,
      tax_id: input_tax_id
    }
  }
  else{
    body_request= {
      nro_cbu: cuenta,
      bk_code: codigo_banco,
      country_code: pais,
    }
  }

  console.log(body_request)

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
    body: new URLSearchParams(body_request),
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
    
/* 
  //Segundo metodo para la request
  var settings = {
    url: URL_API,
    method: "POST",
    timeout: 0,
    headers: {
      "x-api-key": APIKEY,
      "Content-Type": "application/x-www-form-urlencoded",
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      nro_cbu: cuenta,
      bk_code: codigo_banco,
      country_code: pais,
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    try {
      if (response.data.valid) {
        swal("", JSON.stringify(response, null, 2), "success")
      }
      else {
        swal("", JSON.stringify(response, null, 2), "error")
      };
    }
    catch {
      swal("", JSON.stringify(response, null, 2), "error")
    }
  });*/
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
      var json = { Bradesco: "", Santander: "", Itau: "", Caixa: "", Banco_do_Brasil: ""};
    } else {
      var json = { "---": "" };
    }
    addOptions("bkcode", json);

    //Agregar los divs con los label = input para cada campo de validación extra en brasil
    if (pais == "BR") {
      var html = '<div id="br_branch_code"> <label for="full-name">Número de sucursal</label> <input id="input_branch_code" type="text" placeholder="Ej: 1234" name="input_branch_code" required /> </div> <div id="br_tax_id"> <label for="full-name">Número de documento</label> <input id="input_tax_id" type="text" placeholder="Ej: 12.123.123/0001-40" name="input_tax_id" required /> </div>';
      document.getElementById('dinamic-div').insertAdjacentHTML('beforebegin', html);
    }
    //Eliminar los divs con los label = input para cada campo de validación extra, si el pais seleccionado no es Brasil 
    else{
      var br_branch_code = document.getElementById('br_branch_code');
      br_branch_code.remove();
      
      var br_tax_id = document.getElementById('br_tax_id');
      br_tax_id.remove();
    }
  }

  // Rutina para agregar opciones a un <select>
  function addOptions(domElement, json) {
    var select = document.getElementsByName(domElement)[0];
    let options = select.getElementsByTagName("option");

    // Remove olds
    for (var i = options.length; i--;) {
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