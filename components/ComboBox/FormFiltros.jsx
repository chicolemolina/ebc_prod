
import { Grid } from "@mui/material";
import React from "react";

export const FormFiltros = ({ children, className }) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Enviado");
    };

    return (

        <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center" className='mb-5'>

                {children}

                {/* <Grid item>
                    <Button type="submit" variant="contained" color="primary">
                        Aplicar
                    </Button>
                </Grid> */}
            </Grid>
        </form>
    )
}

