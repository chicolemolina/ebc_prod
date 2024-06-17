import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatoNumero = (numero) => {
    return parseFloat(numero).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// Función para formatear la fecha
export const cambiaf_a_formato_espanol = (dateString) => {
    
    const date = new Date(dateString);
    return format(date, 'dd MMMM yyyy', { locale: es });
};