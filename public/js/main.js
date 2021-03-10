$(function () {

  $("#bt_unirse").click(function () {
    const nombre = $("#txt_nombre").val();
    const val = $("#txt_unirse").val();
    if (!validar(val) || !validar(nombre)) return alert("Debes ingresar los datos");
    
    window.location = `/pages/jugar.html?type=join&id=${val}&nombre=${nombre}`;

  })

  $("#bt_crear").click(function () {
    const nombre = $("#txt_nombre").val();
    const val = $("#txt_crear").val();
    if (!validar(val) || !validar(nombre)) return alert("Debes ingresar los datos");
    window.location = `/pages/jugar.html?type=create&id=${val}&nombre=${nombre}`;
  })

  function validar(val) {
    if (val === "") return false;
    return true;
  }

  

})
