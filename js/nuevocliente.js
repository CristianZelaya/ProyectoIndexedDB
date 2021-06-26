(() => {

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);

    });

    const validarCliente = ( e ) => {

        e.preventDefault();

        // Leer todos los input
        const nombre   = document.querySelector('#nombre').value,
              email    = document.querySelector('#email').value,
              telefono = document.querySelector('#telefono').value,
              empresa  = document.querySelector('#empresa').value;

        if ( nombre === '' || email === '' || telefono === '' || empresa === '') {

            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;

        };

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
            id: Date.now()
        };

        crearNuevoCliente( cliente );

    };

    const crearNuevoCliente = ( cliente ) => {

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        objectStore.add(cliente);

        transaction.onerror = () => {

            imprimirAlerta('Hubo un error', 'error');

        };

        transaction.oncomplete = () => {

            imprimirAlerta('Cliente se agreago correctamente');

            setTimeout(() => {

                window.location.href = 'index.html';
                
            }, 3000);

        };

    };

})();