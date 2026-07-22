# Autos Alegre

Web multipágina para Autos Alegre, inspirada en una dirección editorial de lujo: fondo marfil, fotografía en blanco y negro, tipografía clásica y acentos rosa.

## Páginas

- `index.html`: presentación de The Alegre Style.
- `conductores.html`: 10 perfiles con estadísticas y cartas interactivas.
- `backstage.html`: coordinación y equipo detrás del servicio.
- `historia.html`: historia interactiva desde 1945.
- `flota.html`: selector visual de vehículos.
- `servicios.html`: aeropuerto, corporativo, eventos y disposición por horas.
- `reservas.html`: demostración visual; no envía ni guarda datos.
- `contacto.html`: formulario visual de contacto.

## Desarrollo local

```bash
python -m http.server 8000 --bind 127.0.0.1
```

Abre `http://127.0.0.1:8000/index.html`.

## Build para Sites

```bash
npm run build
npm run test:sites
```

La salida se genera en `dist/` con el contenido estático y el Worker de Sites.
