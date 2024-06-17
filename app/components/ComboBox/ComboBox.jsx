import { Autocomplete, Grid, TextField } from '@mui/material'
import React from 'react'

export const ComboBox = ({tamanyoGrid, arrayDatos, getOptionLabel, selectedOption, isOptionEqualToValue, onChangeFunction, name, getOptionKey, placeholder}) => {
   
    return (
        <Grid item md={tamanyoGrid}>
            <Autocomplete
                id={name}
                className='bg-white'
                options={arrayDatos}
                getOptionLabel={getOptionLabel}
                style={{ width: "100%" }}
                value={selectedOption}
                isOptionEqualToValue={isOptionEqualToValue}
                onChange={onChangeFunction}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        label={`Buscar ${placeholder}`}
                        variant="outlined"
                        name={name}
                    />
                }
                getOptionKey={getOptionKey}
            />
        </Grid>
    )
}
