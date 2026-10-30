/*
  Tarjetas de lectura deslizables.
  En una página, escribir:

  <div class="tarjetas" markdown>
  <div class="tarjeta" markdown>
  ### Título de la tarjeta
  Texto corto.
  </div>
  <div class="tarjeta" markdown>
  ...
  </div>
  </div>

  Sin JavaScript, las tarjetas se ven una debajo de la otra.
*/
(function () {
  var hayVoz = "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  function vozEspanol() {
    if (!hayVoz) return null;
    var voces = window.speechSynthesis.getVoices();
    var pref = ["es-AR", "es-419", "es-US", "es-MX", "es-ES"];
    for (var i = 0; i < pref.length; i++) {
      for (var j = 0; j < voces.length; j++) if (voces[j].lang === pref[i]) return voces[j];
    }
    for (var k = 0; k < voces.length; k++) if (voces[k].lang.indexOf("es") === 0) return voces[k];
    return null;
  }

  function armar(caja) {
    var tarjetas = Array.prototype.slice.call(caja.querySelectorAll(":scope > .tarjeta"));
    if (tarjetas.length < 2) return;
    var total = tarjetas.length, actual = 0, hablando = false;

    var pista = document.createElement("div");
    pista.className = "tarjetas-pista";
    pista.setAttribute("tabindex", "0");
    pista.setAttribute("aria-label", "Tarjetas: deslice para pasar");
    tarjetas.forEach(function (t, i) {
      t.setAttribute("role", "group");
      t.setAttribute("aria-label", "Tarjeta " + (i + 1) + " de " + total);
      pista.appendChild(t);
    });

    var barra = document.createElement("div");
    barra.className = "tarjetas-barra";
    var relleno = document.createElement("span");
    barra.appendChild(relleno);

    var controles = document.createElement("div");
    controles.className = "tarjetas-controles";
    var ant = boton("Anterior", "tarjetas-ant");
    var sig = boton("Siguiente", "tarjetas-sig");
    var cont = document.createElement("span");
    cont.className = "tarjetas-cuenta";
    cont.setAttribute("aria-live", "polite");
    controles.appendChild(ant);
    controles.appendChild(cont);
    controles.appendChild(sig);

    var escuchar = null;
    if (hayVoz) {
      escuchar = boton("Escuchar", "tarjetas-escuchar");
      escuchar.addEventListener("click", function () {
        if (hablando) { callar(); return; }
        var u = new SpeechSynthesisUtterance(tarjetas[actual].innerText);
        var v = vozEspanol();
        if (v) u.voice = v;
        u.lang = v ? v.lang : "es-AR";
        u.rate = 0.92;
        u.onend = u.onerror = function () { hablando = false; escuchar.textContent = "Escuchar"; };
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
        hablando = true;
        escuchar.textContent = "Detener";
      });
    }

    caja.innerHTML = "";
    caja.appendChild(barra);
    caja.appendChild(pista);
    caja.appendChild(controles);
    if (escuchar) caja.appendChild(escuchar);
    caja.classList.add("activas");

    function boton(txt, cls) {
      var b = document.createElement("button");
      b.type = "button"; b.className = cls; b.textContent = txt;
      return b;
    }
    function callar() {
      if (hayVoz) window.speechSynthesis.cancel();
      hablando = false;
      if (escuchar) escuchar.textContent = "Escuchar";
    }
    function ir(i) {
      i = Math.max(0, Math.min(total - 1, i));
      pista.scrollTo({ left: i * pista.clientWidth, behavior: "smooth" });
      marcar(i);
    }
    function marcar(i) {
      if (i !== actual) callar();
      actual = i;
      cont.textContent = (i + 1) + " de " + total;
      relleno.style.width = ((i + 1) / total * 100) + "%";
      ant.disabled = i === 0;
      sig.disabled = i === total - 1;
      sig.textContent = i === total - 1 ? "Fin" : "Siguiente";
    }

    ant.addEventListener("click", function () { ir(actual - 1); });
    sig.addEventListener("click", function () { ir(actual + 1); });
    pista.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); ir(actual + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); ir(actual - 1); }
    });
    var t;
    pista.addEventListener("scroll", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var i = Math.round(pista.scrollLeft / pista.clientWidth);
        if (i !== actual) marcar(i);
      }, 80);
    });
    marcar(0);
  }

  function iniciar() {
    document.querySelectorAll(".tarjetas").forEach(function (c) {
      if (!c.dataset.listo) { c.dataset.listo = "1"; armar(c); }
    });
  }
  if (hayVoz) window.speechSynthesis.getVoices();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
  else iniciar();
})();
