La arquitectura del proyecto es un contexto en el que se guarda la lista de Autores.
Los cuales tienen como atributo su fecha de nacimiento, su nombre, la URL de su imagen y una descripción.
Lo primero que hace es consumir la API mediante un fetch y hace la primera carga de autores.
tengo las funciones de añadir un autor, actualizar un autor y eliminar un autor.
Para esta entrega le añadi el atributo de si el autor es favorito o no, el cual se maneja con un toggle, que se invoca en cada una de las cards que uso para mostrar los autores en la pagina de autores, entonces ahí en la pagina de autores se muestra la card y permite cambiar de favorito a no favorito el autor.
también se copio la pagina de autores para hacer la pagina de favoritos y lo único que cambia es que se le hace un filtro para que solo se haga el maping y render de las cartas con los autores que efectivamente sean favoritos.
No se hicieron pruebas ni accesibilidad.
para correr el proyecto solo hace falta clonar el repositorio, hacer
npm install
npm run dev
se tiene que tener el Docker corriendo o si no no van a aparecer los autores.