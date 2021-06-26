( () => {

    let idCliente;
    const nombreInput   = document.querySelector('#nombre'),
          correoInput   = document.querySelector('#email'),
          telefonoInput = document.querySelector('#telefono'),
          empresaInput  = document.querySelector('#empresa');

    document.addEventListener('DOMContentLoaded', () => {

        formulario.addEventListener('submit', actualizarCliente)
        
        conectarDB();

        // verificar el ID de la URL
        const parametroURL = new URLSearchParams(window.location.search);
        idCliente = parametroURL.get('id');

        if( idCliente ) {
            
            setTimeout(() => {
                
                obtenerCliente( idCliente );

            }, 100);

        };

    });

    const obtenerCliente = ( id ) => {

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');
        const cliente = objectStore.openCursor();

        cliente.onsuccess = ( e ) => {

            const cursor = e.target.result;

            if ( cursor ) {

                if ( cursor.value.id === Number(id) ) {

                    llenarForm( cursor.value );

                };

                cursor.continue();

            };
        };
    };

    const actualizarCliente = ( e ) => {

        e.preventDefault();

        if ( nombreInput.value === '' || correoInput.value === '' || telefonoInput.value === '' || empresaInput.value === ''){

            imprimirAlerta('Todos los campos son obligatorios para editar', 'error');

            return;
        };

        // Actualizar cliente

        const clienteActualizado = {

            nombre: nombreInput.value,
            email: correoInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number( idCliente )

        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = () => {

            imprimirAlerta('Editado correctamente');

            setTimeout(() => {

                window.location.href = 'index.html';
                
            }, 2000);

        };

        transaction.onerror = () => {

            imprimirAlerta('Hubo un error', 'error')
            
        };

    };

    const llenarForm = ( datosCliente ) => {

        const { nombre, email, telefono, empresa, id } = datosCliente;

        nombreInput.value = nombre;
        correoInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;

    }

})();