

export const BotonDescarga_Contacto = () => {
    const supportsContactsAPI = 'contacts' in navigator && 'ContactsManager' in window;

    const addContact = async () => {
        try {
            const newContact = {
                name: 'Nombre del Socio', // nombre del socio
                tel: [{ value: 'Número de Teléfono', type: 'mobile' }] // teléfono del socio
            };

            const contact = await navigator.contacts.create(newContact);
            await contact.save();

            console.log('Contacto agregado con éxito:', contact);
            alert('Contacto agregado con éxito.');
        } catch (error) {
            console.error('Error al agregar el contacto:', error);
            alert('Hubo un error al intentar agregar el contacto.');
        }
    };

    const requestPermission = async () => {
        try {
            const permissionStatus = await navigator.permissions.query({ name: 'contacts' });
            if (permissionStatus.state === 'granted') {
                // Permiso ya concedido
                addContact();
            } else if (permissionStatus.state === 'prompt') {
                // Pedir permiso al usuario
                const result = await navigator.permissions.request({ name: 'contacts' });
                if (result.state === 'granted') {
                    addContact();
                } else {
                    console.log('El usuario no concedió permiso para acceder a los contactos.');
                    alert('Para agregar contactos, necesitas conceder permisos.');
                }
            } else {
                // El permiso está denegado
                console.log('El permiso para acceder a los contactos está denegado.');
                alert('Para agregar contactos, necesitas conceder permisos.');
            }
        } catch (error) {
            console.error('Error al solicitar permiso:', error);
            alert('Hubo un error al intentar acceder a los contactos.');
        }
    };


    return (
        
        (supportsContactsAPI) ?
            <button onClick={requestPermission} className="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded text-xs">
                <svg className="fill-current w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" /></svg>
                <span className="hidden sm:inline">Descargar Contacto</span>
            </button>
        : 
            <small>La importación de contactos no es compatible en este navegador.</small>
                  
    )
}

