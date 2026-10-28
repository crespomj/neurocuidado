# Neurocuidado

Sitio de formación para cuidadores, hecho con [MkDocs Material](https://squidfunk.github.io/mkdocs-material/).
No requiere login: se entra con un link o un QR.

## Ver el sitio en la computadora

```bash
pip install mkdocs-material
mkdocs serve          # abre http://127.0.0.1:8000 y se actualiza solo al editar
```

La carpeta `site/` ya trae una versión armada: se puede abrir `site/index.html` con doble clic.

## Cómo está organizado

```
mkdocs.yml                      configuración y menú (sección nav)
docs/index.md                   página de inicio con las tarjetas de módulos
docs/trastorno-de-conciencia/   un módulo = una carpeta
    index.md                    presentación del módulo
    01-que-es.md ...            un archivo por tema
    medios/                     audios (mp3) e imágenes del módulo
docs/assets/estilos.css         colores y tamaños de letra
docs/assets/verdadero-falso.js  el juego de verdadero o falso
```

## Agregar un módulo nuevo

1. Copiar la carpeta `docs/trastorno-de-conciencia` con otro nombre (ej.: `docs/acv`) y reemplazar los textos.
2. Agregar el módulo en la sección `nav:` de `mkdocs.yml`.
3. En `docs/index.md`, cambiar su tarjeta de `<div class="modulo pronto">` a un link `<a class="modulo" href="acv/index.html">`.

## Elementos que se pueden usar en las páginas

**Verdadero o falso**

```html
<div class="vf-juego" markdown>
### ¿Verdadero o falso?
<div class="vf" data-correcta="verdadero" data-explica="Por qué es verdadero.">Afirmación.</div>
<div class="vf" data-correcta="falso" data-explica="Por qué es falso.">Otra afirmación.</div>
</div>
```

**Pausa para pensar**

```markdown
!!! pausa "Pausa para pensar"
    ¿Pregunta para el cuidador?
```

**Audio**

```html
<div class="audio" markdown>
Título del audio

<audio controls preload="none" src="medios/archivo.mp3"></audio>
</div>
```

**Video de YouTube** (subido como "no listado")

```html
<div class="embed"><iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/CODIGO" title="Título" allowfullscreen></iframe></div>
```

**Presentación de Canva**: `--ratio:100%` si es cuadrada, `56.25%` si es 16:9.

```html
<div class="embed" style="--ratio:100%"><iframe loading="lazy" src="https://www.canva.com/design/.../view?embed" allowfullscreen title="Título"></iframe></div>
```

## Publicar gratis en GitHub Pages

1. Crear un repositorio en GitHub y subir esta carpeta.
2. Al hacer push a `main`, el workflow `.github/workflows/publicar.yml` arma y publica el sitio.
3. En el repo: Settings → Pages → Source: rama `gh-pages`.
4. El sitio queda en `https://USUARIO.github.io/REPO/`. Ese es el link para el QR.

## Estadísticas

Crear una cuenta gratis en [GoatCounter](https://www.goatcounter.com) y poner el código en `mkdocs.yml` → `extra.goatcounter`.
Para saber cuántos entran por el QR, usar en el QR el link con `?utm_source=qr-gimnasio`.

## Pendientes

- Validar con el equipo las preguntas de verdadero o falso (reemplazan a los Kahoot originales; están marcadas con `BORRADOR`).
- Confirmar que la encuesta de Microsoft Forms acepta respuestas sin iniciar sesión.
- Las láminas de Canva y Genially deben estar compartidas como "cualquiera con el enlace".
- Los títulos "Signos de sobreestimulación" del Moodle no tenían contenido: completar si corresponde.
