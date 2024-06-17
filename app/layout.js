
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Providers from '@/store/provider';

export const metadata = {
    title: "EBC APP",
    description: "Excellence Business Club",
    manifest: "/manifest.json",
    icons: {

        apple: "/icon.png"

    },
    themecolor: "#181c32"
};


export default function RootLayout({ children }) {

    return (
        <html lang="es">
            <Providers>
                <body>
                    {children}

                    <Toaster position="top-center" reverseOrder={false} />
                </body>
            </Providers>
        </html>

    );
}

