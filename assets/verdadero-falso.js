/*
  Juego de Verdadero o Falso.
  En una página, escribir:

  <div class="vf-juego" markdown>
  ### ¿Verdadero o falso?
  <div class="vf" data-correcta="verdadero" data-explica="Explicación corta.">Texto de la afirmación.</div>
  <div class="vf" data-correcta="falso" data-explica="Explicación corta.">Otra afirmación.</div>
  </div>
*/
(function () {
  function armarJuego(juego) {
    var items = juego.querySelectorAll(".vf");
    var respondidas = 0, aciertos = 0;

    var puntaje = document.createElement("p");
    puntaje.className = "vf-puntaje";
    var otraVez = document.createElement("button");
    otraVez.className = "md-button vf-otra";
    otraVez.type = "button";
    otraVez.textContent = "Volver a intentar";
    otraVez.addEventListener("click", function () {
      items.forEach(reiniciar);
      respondidas = 0; aciertos = 0;
      puntaje.style.display = "none";
      otraVez.style.display = "none";
    });

    function reiniciar(item) {
      item.classList.remove("correcta", "incorrecta");
      item.querySelectorAll("button").forEach(function (b) {
        b.disabled = false; b.classList.remove("elegido");
      });
    }

    items.forEach(function (item) {
      var texto = item.innerHTML;
      var correcta = (item.dataset.correcta || "").toLowerCase();
      var explica = item.dataset.explica || "";
      item.innerHTML = "";

      var p = document.createElement("p");
      p.className = "vf-pregunta";
      p.innerHTML = texto;

      var botones = document.createElement("div");
      botones.className = "vf-botones";

      var resp = document.createElement("p");
      resp.className = "vf-respuesta";
      resp.setAttribute("role", "status");

      ["verdadero", "falso"].forEach(function (op) {
        var b = document.createElement("button");
        b.type = "button";
        b.textContent = op === "verdadero" ? "Verdadero" : "Falso";
        b.addEventListener("click", function () {
          var ok = op === correcta;
          botones.querySelectorAll("button").forEach(function (x) { x.disabled = true; });
          b.classList.add("elegido");
          item.classList.add(ok ? "correcta" : "incorrecta");
          resp.innerHTML = (ok ? "<strong>¡Muy bien!</strong> " : "<strong>No es así.</strong> ") + explica;
          respondidas++; if (ok) aciertos++;
          if (respondidas === items.length) {
            puntaje.textContent = "Acertaste " + aciertos + " de " + items.length + ".";
            puntaje.style.display = "block";
            otraVez.style.display = "inline-block";
          }
        });
        botones.appendChild(b);
      });

      item.appendChild(p);
      item.appendChild(botones);
      item.appendChild(resp);
    });

    juego.appendChild(puntaje);
    juego.appendChild(otraVez);
  }

  function iniciar() {
    document.querySelectorAll(".vf-juego").forEach(function (j) {
      if (!j.dataset.listo) { j.dataset.listo = "1"; armarJuego(j); }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
