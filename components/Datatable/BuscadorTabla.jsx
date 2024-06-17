import React from 'react'

export const BuscadorTabla = ({searchText, handleSearchChange}) => {

    return (
        <input
            type="text"
            placeholder="Buscar..."
            value={searchText}
            onChange={handleSearchChange}
            className="border border-gray-300 mt-5 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
    )

}
