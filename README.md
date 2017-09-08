# EntrevistaJS


Objetivos de la practica:
1. Corregir interfaz para mostrar en la tabla el nombre del usuario (user.data.username)
2. Permitir al usuario final la funcionalidad de:
    - Agregar
    - Eliminar
    - Ordenar (id, user.username, user.email, user.phone)
3. Complementar la funcionalidad de mostrar posts
4. Crear una función de filtrado del número telefónico del usuario (user.data.phone) donde:
    - Se reemplazará (-) con espacios
    - Si el numero cuenta con un num de extensión (x) se reemplazará por "ext(${num})"
    - Ejemplo: 	1-770-736-8031 x56442 => 1 770 736 8031 ext(56442)