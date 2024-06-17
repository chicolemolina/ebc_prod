'use client'

import GridSocios from "./components/gridSocios";

export default function Home() {

    const HeadingSTyle = "mb-6 text-3xl font-semibold leading-none tracking-tight md:text-2xl lg:text-4xl"

    return (

        <div className="mx-[40px] mt-[100px] md:ml-[300px]">

            <h1 className={HeadingSTyle}>Socios</h1>

            <GridSocios />

        </div>

    );
}



