# Arsa Bodegas© · arsabodegas.com

Sitio de Arsa Bodegas (mini bodegas en contenedores de 20' en El Sauzal, Ensenada) publicado con **GitHub Pages** desde la rama `main`.

- `index.html`: página pública (12 idiomas, Morse sonoro y receptor RX).
- `inventario/`: inventario privado de empleados con pedimentos. `datos.cifrado.json` va cifrado AES-256-GCM (llave PBKDF2-SHA-256, 150 000 vueltas) con la clave de empleados; sin la clave no se puede leer.
- `_comun/`: estilos, idiomas y Morse compartidos (copia de `sitios-vhrs/public/_comun`).
- Fuente de verdad: repo privado `sitios-vhrs` (`public/arsabodegas.com/`). Este repo es su copia publicada.

DNS en Squarespace: 4 registros `A @` a 185.199.108.153, .109, .110 y .111 y `CNAME www` a `victorhugoramirezsalgado-boop.github.io`.

© Víctor Hugo Ramírez Salgado. Arsa Bodegas© y ContenedorEns© son obras registradas en Safe Creative. Todos los derechos reservados.
