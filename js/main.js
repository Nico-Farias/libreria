


let categoriasLibros = [];
let carrito = new Carrito([]);


iniciar();

function iniciar() {
    loadData();
}

function loadData() {
    LoadCategorias();
    crearCategorias();
    showLibros();
}

function LoadCategorias() {
    const categorias = libros.map(element => element.categoria);
    const categoriasSet = new Set(categorias);
    const categoriasUnicas = [...categoriasSet];

    categoriasLibros = categoriasUnicas.map(element => {
        return {
            nombre: element,
        }
    })
}

function crearCategorias() {
    const navegacionCategorias = document.getElementById("navegacion-principal");
    categoriasLibros.forEach(element => {
        const btnCategorias = document.createElement("button");
        btnCategorias.classList.add("btnCat");
        btnCategorias.innerHTML = element.nombre;

        btnCategorias.addEventListener("click", () => {
            showLibros(element.nombre);
        })
        navegacionCategorias.appendChild(btnCategorias);


    })
}

function showLibros(categoriaNombre = "") {


    let librosToShow = libros;


    let filtrarCards = categoriaNombre !== "" ? librosToShow = libros.filter(libro => libro.categoria === categoriaNombre) : console.log("error al cargar cards");

    if (categoriaNombre !== "") {
        librosToShow = libros.filter(element => element.categoria === categoriaNombre);

    }

    const nodoH2 = document.getElementById("categoriaNombre");
    nodoH2.innerText = categoriaNombre.toUpperCase();



    const nodoLibros = document.getElementById("cards");
    nodoLibros.innerHTML = "";



    librosToShow.forEach(libro => {
        const div = document.createElement("div");
        div.classList.add("cards");
        div.innerHTML = `
                     <div class = "card-libros">
                                <h2>${libro.nombre}</h2>
                                <div class="img-libro">
                                    <img src="${libro.portada}" alt="">
                                </div>
                                <div class="info-libro">

                                    <p class = "precio">${libro.precio}</p>
                                    
                                    <p>Hasta 12 cuotas con tarjeta de credito</p>
                                    <div class="cant-lib">
                                        <label for="number">Cantidad</label>
                                        <input type="number">
                                    </div>
                                    <button id="botonCarrito" class="boton-carrito"
                                    onclick="addLibro ('${libro.id}')">Agregar al carrito</button>
                                </div>


                                <a class="mas-info" href="#">Ver mas informacion </a>
                      <div/>      

        `
        nodoLibros.appendChild(div);





    })



}

function addLibro(idProducto) {
    const producto = libros.find(element => element.id == idProducto);
    carrito.libro.push(producto);
    showCarrito();

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: `Has agregado ${producto.nombre} tu carrito`,
        imageUrl: `${producto.portada}`,
        imageWidth: 200,
        imageHeight: 200,
        showConfirmButton: false,
        timer: 1500
    })


}



function showCarrito() {
    const listaCompra = document.getElementById("carritoPrincipal");
    listaCompra.innerHTML = "";

    carrito.libro.forEach(libro => {
        const divCarrito = document.createElement("div");
        divCarrito.classList.add("carrito-principal");
        divCarrito.setAttribute("id", "carritoCompra")
        divCarrito.innerHTML = `
        
                    <div class="izquierda-carrito">
                        <div class="imagenCarrito"><img src="${libro.portada}" alt="" srcset=""></div>
                        <div class="nombrelibro">
                            <h2>Agregaste a tu carrito</h2>
                            <p> - ${libro.nombre} -</p>
                        </div>
                    </div>
                    <div class="derecha-carrito">
                        <div>
                            <p>1 producto en tu carrito : ${libro.precio}</p>
                        </div>
                        <div>
                            <button id="btnEliminar${libro.id}" class="btn-eliminar" >X</button>
                            
                        </div>

                    </div>
        
        `

        listaCompra.appendChild(divCarrito);


        const btnX = document.getElementById(`btnEliminar${libro.id}`);
        btnX.addEventListener("click", () => {
            divCarrito.remove(libro)
        })


        localStorage.setItem("Agregado al carrito", JSON.stringify(carrito))




    })


}



