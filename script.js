// Definición de la clase Producto para representar un producto en el sistema
class Producto {
    // Propiedades privadas usando # - solo accesibles dentro de la clase
    #codigo      // Identificador único del producto
    #nombre      // Nombre descriptivo del producto
    #precio      // Precio unitario del producto
    #stock       // Cantidad disponible en inventario
    #categoria   // Categoría a la que pertenece el producto
    
    // Constructor que inicializa un nuevo producto con sus propiedades
    constructor(codigo, nombre, precio, stock, categoria) {
        this.#codigo = codigo;        // Asigna el código recibido a la propiedad privada
        this.#nombre = nombre;        // Asigna el nombre recibido a la propiedad privada
        this.#precio = precio;        // Asigna el precio recibido a la propiedad privada
        this.#stock = stock;          // Asigna el stock recibido a la propiedad privada
        this.#categoria = categoria;  // Asigna la categoría recibida a la propiedad privada
    }
    
    // Método getter para obtener el código del producto
    getCodigo() { return this.#codigo; }
    // Método setter para modificar el código del producto
    setCodigo(codigo) { this.#codigo = codigo; }
    
    // Método getter para obtener el nombre del producto
    getNombre() { return this.#nombre; }
    // Método setter para modificar el nombre del producto
    setNombre(nombre) { this.#nombre = nombre; }
    
    // Método getter para obtener el precio del producto
    getPrecio() { return this.#precio; }
    // Método setter para modificar el precio del producto
    setPrecio(precio) { this.#precio = precio; }
    
    // Método getter para obtener el stock del producto
    getStock() { return this.#stock; }
    // Método setter para modificar el stock del producto
    setStock(stock) { this.#stock = stock; }
    
    // Método getter para obtener la categoría del producto
    getCategoria() { return this.#categoria; }
    // Método setter para modificar la categoría del producto
    setCategoria(categoria) { this.#categoria = categoria; }
    
    // Método que retorna una cadena con todos los detalles del producto formateados
    mostrarDetalle() {
        return `Código: ${this.getCodigo()}, Nombre: ${this.getNombre()}, Precio: ${this.getPrecio()}, Stock: ${this.getStock()}, Categoría: ${this.getCategoria()}`;
    }
    
    // Método para incrementar o decrementar el stock del producto
    actualizarStock(cantidad) {
        this.#stock += cantidad;  // Suma la cantidad al stock actual (puede ser negativa)
    }
}

// Definición de la clase Carrito para manejar los productos seleccionados por un usuario
class Carrito {
    // Propiedades privadas del carrito
    #usuario         // Nombre del usuario propietario del carrito
    #productos       // Array que contiene los productos agregados al carrito
    #total           // Valor total calculado de todos los productos en el carrito
    #fechaCreacion   // Fecha en que se creó el carrito
    #estado          // Estado actual del carrito (Pendiente, Procesando, etc.)
    
    // Constructor con valores por defecto para crear un nuevo carrito
    constructor(usuario, productos = [], fechaCreacion = new Date(), estado = "Pendiente") {
        this.#usuario = usuario;                        // Asigna el usuario recibido
        this.#productos = productos;                    // Asigna el array de productos (vacío por defecto)
        this.#total = 0;                               // Inicializa el total en 0
        this.#fechaCreacion = fechaCreacion;           // Asigna la fecha (actual por defecto)
        this.#estado = estado;                         // Asigna el estado ("Pendiente" por defecto)
        this.calcularTotal();                          // Calcula el total inicial del carrito
    }
    
    // Métodos getter y setter para acceder y modificar las propiedades privadas
    getUsuario() { return this.#usuario; }                      // Retorna el usuario del carrito
    setUsuario(usuario) { this.#usuario = usuario; }           // Modifica el usuario del carrito
    
    getProductos() { return this.#productos; }                 // Retorna el array de productos
    setProductos(productos) { this.#productos = productos; }   // Modifica el array de productos
    
    getTotal() { return this.#total; }                         // Retorna el total calculado
    setTotal(total) { this.#total = total; }                   // Modifica el total manualmente
    
    getFechaCreacion() { return this.#fechaCreacion; }         // Retorna la fecha de creación
    setFechaCreacion(fechaCreacion) { this.#fechaCreacion = fechaCreacion; } // Modifica la fecha
    
    getEstado() { return this.#estado; }                       // Retorna el estado actual
    setEstado(estado) { this.#estado = estado; }               // Modifica el estado del carrito
    
    // Método para agregar un producto al carrito
    agregarProducto(producto) {
        this.#productos.push(producto);  // Añade el producto al final del array
        this.calcularTotal();            // Recalcula el total después de agregar
    }
    
    // Método para eliminar un producto del carrito por su código
    eliminarProducto(codigoProducto) {
        // Busca el índice del producto con el código especificado
        const index = this.#productos.findIndex(producto => producto.getCodigo() === codigoProducto);
        if (index !== -1) {                      // Si encuentra el producto
            this.#productos.splice(index, 1);    // Elimina el producto del array
            this.calcularTotal();                // Recalcula el total después de eliminar
            return true;                         // Retorna true indicando éxito
        }
        return false;                            // Retorna false si no encontró el producto
    }
    
    // Método para calcular el total sumando los precios de todos los productos
    calcularTotal() {
        let total = 0;                          // Inicializa la variable total en 0
        this.#productos.forEach(producto => {   // Itera sobre cada producto en el array
            total += producto.getPrecio();      // Suma el precio del producto al total
        });
        this.#total = total;                    // Asigna el total calculado a la propiedad privada
    }
    
    // Método que retorna una descripción detallada del carrito
    mostrarDetalle() {
        // Crea la línea de información general del carrito
        let detalle = `Usuario: ${this.#usuario}, Total: ${this.#total}, Estado: ${this.#estado}\n`;
        detalle += "Productos:\n";              // Añade encabezado de productos
        this.#productos.forEach(producto => {   // Itera sobre cada producto
            detalle += `  - ${producto.mostrarDetalle()}\n`;  // Añade el detalle de cada producto
        });
        return detalle;                         // Retorna la cadena completa con todos los detalles
    }
}

// Definición de la clase Orden que representa una orden de compra
class Orden {
    // Propiedades privadas de la orden
    #idOrden           // Identificador único de la orden
    #carrito           // Objeto carrito asociado a esta orden
    #estado            // Estado actual de la orden (Pendiente, Confirmada, etc.)
    #fechaEnvio        // Fecha programada para el envío
    #direccionEntrega  // Dirección donde se entregará la orden
    
    // Constructor con valores por defecto para crear una nueva orden
    constructor(idOrden, carrito, direccionEntrega, estado = "Pendiente", fechaEnvio = null) {
        this.#idOrden = idOrden;                   // Asigna el ID único de la orden
        this.#carrito = carrito;                   // Asigna el carrito con los productos
        this.#estado = estado;                     // Asigna el estado ("Pendiente" por defecto)
        this.#fechaEnvio = fechaEnvio;            // Asigna la fecha de envío (null por defecto)
        this.#direccionEntrega = direccionEntrega; // Asigna la dirección de entrega
    }
    
    // Métodos getter y setter para acceder y modificar las propiedades privadas
    getIdOrden() { return this.#idOrden; }                          // Retorna el ID de la orden
    setIdOrden(idOrden) { this.#idOrden = idOrden; }               // Modifica el ID de la orden
    
    getCarrito() { return this.#carrito; }                         // Retorna el carrito asociado
    setCarrito(carrito) { this.#carrito = carrito; }               // Modifica el carrito asociado
    
    getEstado() { return this.#estado; }                           // Retorna el estado actual
    setEstado(estado) { this.#estado = estado; }                   // Modifica el estado de la orden
    
    getFechaEnvio() { return this.#fechaEnvio; }                   // Retorna la fecha de envío
    setFechaEnvio(fechaEnvio) { this.#fechaEnvio = fechaEnvio; }   // Modifica la fecha de envío
    
    getDireccionEntrega() { return this.#direccionEntrega; }       // Retorna la dirección de entrega
    setDireccionEntrega(direccionEntrega) { this.#direccionEntrega = direccionEntrega; } // Modifica la dirección
    
    // Método para confirmar la orden y establecer fecha de envío
    confirmarOrden() {
        this.#estado = "Confirmada";              // Cambia el estado a "Confirmada"
        this.#fechaEnvio = new Date();            // Establece la fecha actual como fecha de envío
        console.log(`Orden ${this.#idOrden} confirmada exitosamente.`); // Muestra mensaje en consola
    }
    
    // Método para cancelar la orden
    cancelarOrden() {
        this.#estado = "Cancelada";               // Cambia el estado a "Cancelada"
        console.log(`Orden ${this.#idOrden} ha sido cancelada.`); // Muestra mensaje en consola
    }
    
    // Método que genera y retorna una factura formateada como string
    generarFactura() {
        return `
=== FACTURA ===
Orden ID: ${this.#idOrden}                                          // Muestra el ID de la orden
Estado: ${this.#estado}                                             // Muestra el estado actual
Fecha de Envío: ${this.#fechaEnvio ? this.#fechaEnvio.toLocaleDateString() : 'Pendiente'} // Fecha formateada o 'Pendiente'
Dirección: ${this.#direccionEntrega}                                // Muestra la dirección de entrega
Total: ${this.#carrito.getTotal()}                                 // Muestra el total del carrito
===============`;
    }
    
    // Método que retorna un resumen breve de la orden
    mostrarDetalle() {
        return `ID: ${this.#idOrden} | Estado: ${this.#estado} | Total: ${this.#carrito.getTotal()} | Dirección: ${this.#direccionEntrega}`;
    }
}

// Arrays globales para almacenar datos del sistema
let ordenes = [];     // Array que almacena todas las órdenes creadas en el sistema
let productos = [     // Array con productos de ejemplo precargados en el sistema
    new Producto("P001", "Laptop", 1200, 10, "Electrónicos"),      // Crea producto Laptop
    new Producto("P002", "Mouse", 25, 50, "Accesorios"),           // Crea producto Mouse
    new Producto("P003", "Teclado", 75, 30, "Accesorios")          // Crea producto Teclado
];

// FUNCIONES CRUD PARA ÓRDENES

// CREATE - Función para crear una nueva orden en el sistema
function crearOrden() {
    try {  // Bloque try-catch para manejo de errores
        // Solicita al usuario el ID de la nueva orden
        const idOrden = prompt("Ingrese el ID de la orden:");
        if (!idOrden || idOrden.trim() === "") {  // Valida que el ID no esté vacío
            alert("El ID de la orden es obligatorio.");  // Muestra mensaje de error
            return;  // Sale de la función si no hay ID
        }
        
        // Verifica que el ID no exista ya en el sistema
        if (ordenes.find(orden => orden.getIdOrden() === idOrden)) {
            alert("Ya existe una orden con ese ID.");  // Muestra mensaje de error
            return;  // Sale de la función si el ID ya existe
        }
        
        // Solicita datos adicionales al usuario
        const usuario = prompt("Ingrese el nombre del usuario:");      // Pide nombre de usuario
        const direccionEntrega = prompt("Ingrese la dirección de entrega:");  // Pide dirección
        
        // Valida que todos los campos requeridos estén completos
        if (!usuario || !direccionEntrega) {
            alert("Todos los campos son obligatorios.");  // Muestra mensaje de error
            return;  // Sale de la función si faltan datos
        }
        
        // Crea un nuevo carrito vacío para el usuario especificado
        const carrito = new Carrito(usuario);
        
        // Construye una cadena con la lista de productos disponibles
        let listaProductos = "Productos disponibles:\n";
        productos.forEach((producto, index) => {  // Itera sobre cada producto disponible
            listaProductos += `${index + 1}. ${producto.mostrarDetalle()}\n`;  // Añade producto a la lista
        });
        
        // Solicita al usuario que seleccione productos por número
        const seleccion = prompt(listaProductos + "\nIngrese los números de productos separados por comas (ej: 1,2):");
        
        if (seleccion) {  // Si el usuario hizo una selección
            // Convierte la selección en un array de índices numéricos
            const indices = seleccion.split(',').map(num => parseInt(num.trim()) - 1);
            indices.forEach(index => {  // Itera sobre cada índice seleccionado
                if (index >= 0 && index < productos.length) {  // Valida que el índice sea válido
                    carrito.agregarProducto(productos[index]);  // Agrega el producto al carrito
                }
            });
        }
        
        // Crea una nueva orden con los datos recopilados
        const nuevaOrden = new Orden(idOrden, carrito, direccionEntrega);
        ordenes.push(nuevaOrden);  // Añade la nueva orden al array global
        // Muestra mensaje de confirmación con el total
        alert(`Orden ${idOrden} creada exitosamente.\nTotal: ${carrito.getTotal()}`);
        
    } catch (error) {  // Captura cualquier error que ocurra
        alert("Error al crear la orden: " + error.message);  // Muestra el mensaje de error
    }
}

// READ - Función para mostrar todas las órdenes registradas
function mostrarOrdenes() {
    if (ordenes.length === 0) {  // Verifica si no hay órdenes en el sistema
        alert("No hay órdenes registradas.");  // Muestra mensaje informativo
        return;  // Sale de la función
    }
    
    let lista = "=== LISTA DE ÓRDENES ===\n\n";  // Inicializa la cadena con encabezado
    ordenes.forEach((orden, index) => {  // Itera sobre cada orden en el array
        lista += `${index + 1}. ${orden.mostrarDetalle()}\n`;  // Añade cada orden a la lista
    });
    
    alert(lista);  // Muestra la lista completa en un alert
}

// READ - Función para buscar y mostrar una orden específica por su ID
function buscarOrdenPorId() {
    if (ordenes.length === 0) {  // Verifica si no hay órdenes en el sistema
        alert("No hay órdenes registradas.");  // Muestra mensaje informativo
        return null;  // Retorna null indicando que no hay órdenes
    }
    
    const id = prompt("Ingrese el ID de la orden a buscar:");  // Solicita el ID al usuario
    if (!id) return null;  // Si no ingresa ID, retorna null
    
    // Busca la orden con el ID especificado en el array
    const orden = ordenes.find(orden => orden.getIdOrden() === id);
    
    if (orden) {  // Si encuentra la orden
        // Construye un detalle completo con información de la orden
        const detalle = `
=== DETALLE DE LA ORDEN ===
${orden.mostrarDetalle()}

=== CARRITO ===
${orden.getCarrito().mostrarDetalle()}

=== FACTURA ===
${orden.generarFactura()}`;
        alert(detalle);  // Muestra el detalle completo
        return orden;    // Retorna la orden encontrada
    } else {  // Si no encuentra la orden
        alert("Orden no encontrada.");  // Muestra mensaje de error
        return null;  // Retorna null indicando que no se encontró
    }
}

// UPDATE - Función para actualizar una orden existente
function actualizarOrden() {
    if (ordenes.length === 0) {  // Verifica si no hay órdenes en el sistema
        alert("No hay órdenes registradas.");  // Muestra mensaje informativo
        return;  // Sale de la función
    }
    
    const id = prompt("Ingrese el ID de la orden a actualizar:");  // Solicita el ID al usuario
    if (!id) return;  // Si no ingresa ID, sale de la función
    
    // Busca la orden con el ID especificado
    const orden = ordenes.find(orden => orden.getIdOrden() === id);
    
    if (!orden) {  // Si no encuentra la orden
        alert("Orden no encontrada.");  // Muestra mensaje de error
        return;  // Sale de la función
    }
    
    // Muestra información actual de la orden que se va a actualizar
    alert(`Actualizando orden: ${orden.mostrarDetalle()}`);
    
    // Define las opciones disponibles para actualizar
    const opcionesUpdate = `¿Qué desea actualizar?
1. Estado de la orden
2. Dirección de entrega
3. Confirmar orden
4. Cancelar orden
5. Cancelar actualización`;
    
    const opcion = prompt(opcionesUpdate);  // Solicita la opción al usuario
    
    switch (opcion) {  // Evalúa la opción seleccionada
        case "1":  // Caso para actualizar el estado
            // Solicita el nuevo estado mostrando el actual
            const nuevoEstado = prompt(`Estado actual: ${orden.getEstado()}\nIngrese el nuevo estado:`);
            if (nuevoEstado) {  // Si ingresó un nuevo estado
                orden.setEstado(nuevoEstado);  // Actualiza el estado de la orden
                alert("Estado actualizado exitosamente.");  // Confirma la actualización
            }
            break;
            
        case "2":  // Caso para actualizar la dirección
            // Solicita la nueva dirección mostrando la actual
            const nuevaDireccion = prompt(`Dirección actual: ${orden.getDireccionEntrega()}\nIngrese la nueva dirección:`);
            if (nuevaDireccion) {  // Si ingresó una nueva dirección
                orden.setDireccionEntrega(nuevaDireccion);  // Actualiza la dirección
                alert("Dirección actualizada exitosamente.");  // Confirma la actualización
            }
            break;
            
        case "3":  // Caso para confirmar la orden
            orden.confirmarOrden();  // Llama al método confirmarOrden()
            alert("Orden confirmada exitosamente.");  // Confirma la acción
            break;
            
        case "4":  // Caso para cancelar la orden
            orden.cancelarOrden();  // Llama al método cancelarOrden()
            alert("Orden cancelada exitosamente.");  // Confirma la acción
            break;
            
        case "5":  // Caso para cancelar la actualización
            alert("Actualización cancelada.");  // Informa que se canceló
            break;
            
        default:  // Caso para opción inválida
            alert("Opción inválida.");  // Informa error de opción
    }
}

// DELETE - Función para eliminar una orden del sistema
function eliminarOrden() {
    if (ordenes.length === 0) {  // Verifica si no hay órdenes en el sistema
        alert("No hay órdenes registradas.");  // Muestra mensaje informativo
        return;  // Sale de la función
    }
    
    const id = prompt("Ingrese el ID de la orden a eliminar:");  // Solicita el ID al usuario
    if (!id) return;  // Si no ingresa ID, sale de la función
    
    // Busca el índice de la orden con el ID especificado
    const index = ordenes.findIndex(orden => orden.getIdOrden() === id);
    
    if (index !== -1) {  // Si encuentra la orden
        const orden = ordenes[index];  // Obtiene referencia a la orden
        // Solicita confirmación mostrando los detalles de la orden
        const confirmacion = confirm(`¿Está seguro de eliminar la orden ${id}?\n${orden.mostrarDetalle()}`);
        
        if (confirmacion) {  // Si el usuario confirma la eliminación
            ordenes.splice(index, 1);  // Elimina la orden del array
            alert(`Orden ${id} eliminada exitosamente.`);  // Confirma la eliminación
        } else {  // Si el usuario cancela la eliminación
            alert("Eliminación cancelada.");  // Informa que se canceló
        }
    } else {  // Si no encuentra la orden
        alert("Orden no encontrada.");  // Muestra mensaje de error
    }
}

// FUNCIÓN PRINCIPAL - Menú principal del sistema
function mostrarMenuComprasInternet() {
    let opcion;  // Variable para almacenar la opción seleccionada por el usuario
    do {  // Inicia un bucle do-while que se ejecuta hasta que el usuario elija salir
        // Muestra el menú principal con todas las opciones disponibles
        opcion = prompt(`=== SISTEMA DE GESTIÓN DE ÓRDENES ===

1. Crear nueva orden
2. Mostrar todas las órdenes
3. Buscar orden por ID
4. Actualizar orden
5. Eliminar orden
6. Generar reporte
7. Salir

Ingrese una opción (1-7):`);
        
        if (opcion === null) {  // Si el usuario presiona Cancelar en el prompt
            opcion = "7";  // Asigna la opción de salir automáticamente
        }
        
        switch (opcion) {  // Evalúa la opción seleccionada por el usuario
            case "1":  // Opción para crear nueva orden
                crearOrden();  // Llama a la función crearOrden()
                break;  // Sale del case
                
            case "2":  // Opción para mostrar todas las órdenes
                mostrarOrdenes();  // Llama a la función mostrarOrdenes()
                break;  // Sale del case
                
            case "3":  // Opción para buscar orden por ID
                buscarOrdenPorId();  // Llama a la función buscarOrdenPorId()
                break;  // Sale del case
                
            case "4":  // Opción para actualizar orden
                actualizarOrden();  // Llama a la función actualizarOrden()
                break;  // Sale del case
                
            case "5":  // Opción para eliminar orden
                eliminarOrden();  // Llama a la función eliminarOrden()
                break;  // Sale del case
                
            case "6":  // Opción para generar reporte
                generarReporte();  // Llama a la función generarReporte()
                break;  // Sale del case
                
            case "7":  // Opción para salir del sistema
                alert("¡Gracias por usar el Sistema de Gestión de Órdenes.");  // Mensaje de despedida
                break;  // Sale del case
                
            default:  // Caso para cualquier opción inválida
                alert("Opción inválida. Por favor, seleccione una opción del 1 al 7.");  // Mensaje de error
        }
    } while (opcion !== "7");  // Continúa el bucle mientras la opción no sea "7" (salir)
}

// FUNCIÓN ADICIONAL - Función para generar un reporte estadístico del sistema
function generarReporte() {
    if (ordenes.length === 0) {  // Verifica si no hay órdenes para reportar
        alert("No hay órdenes para generar reporte.");  // Muestra mensaje informativo
        return;  // Sale de la función
    }
    
    // Calcula estadísticas básicas del sistema
    const totalOrdenes = ordenes.length;  // Cuenta el total de órdenes en el sistema
    // Suma todos los totales de los carritos para obtener las ventas totales
    const totalVentas = ordenes.reduce((total, orden) => total + orden.getCarrito().getTotal(), 0);
    // Cuenta las órdenes que están en estado "Pendiente"
    const ordenesPendientes = ordenes.filter(orden => orden.getEstado() === "Pendiente").length;
    // Cuenta las órdenes que están en estado "Confirmada"
    const ordenesConfirmadas = ordenes.filter(orden => orden.getEstado() === "Confirmada").length;
    // Cuenta las órdenes que están en estado "Cancelada"
    const ordenesCanceladas = ordenes.filter(orden => orden.getEstado() === "Cancelada").length;
    
    // Construye el reporte completo con todas las estadísticas calculadas
    const reporte = `
=== REPORTE DE ÓRDENES ===

 Estadísticas Generales:
• Total de órdenes: ${totalOrdenes}                                        // Muestra el número total de órdenes
• Ventas totales: $${totalVentas.toFixed(2)}                              // Muestra las ventas totales con 2 decimales
• Promedio por orden: $${(totalVentas / totalOrdenes).toFixed(2)}         // Calcula y muestra el promedio por orden

 Estado de Órdenes:
• Pendientes: ${ordenesPendientes}                                         // Muestra cantidad de órdenes pendientes
• Confirmadas: ${ordenesConfirmadas}                                       // Muestra cantidad de órdenes confirmadas
• Canceladas: ${ordenesCanceladas}                                         // Muestra cantidad de órdenes canceladas

 Orden con mayor valor: $${Math.max(...ordenes.map(orden => orden.getCarrito().getTotal())).toFixed(2)}  // Encuentra y muestra el valor máximo
 Orden con menor valor: $${Math.min(...ordenes.map(orden => orden.getCarrito().getTotal())).toFixed(2)}  // Encuentra y muestra el valor mínimo
`;
    
    alert(reporte);  // Muestra el reporte completo en un alert
}

// INICIALIZACIÓN DEL SISTEMA
mostrarMenuComprasInternet();  // Llama a la función principal para iniciar el sistema