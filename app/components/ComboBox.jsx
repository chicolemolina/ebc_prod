import { TextField, Autocomplete, Button, Box, Grid } from '@mui/material';

export const ComboBox = ({ arrayDatos, handleSubmit, selectedOption, getOptionLabel, isOptionEqualToValue, onChangeFunction }) => {

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" className='mb-5'>

                <Grid item md={2}>
                    <Autocomplete
                        id="catDoc_CodPK"
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
                                label="Buscar"
                                variant="outlined"
                                name='catDoc_CodPK'
                            />
                        }
                    />
                </Grid>

                <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                        Aplicar
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}

