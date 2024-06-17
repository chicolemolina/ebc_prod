import "./globals.css";
import Navbar from "./components/Navbar";
import SideBarNav from "./components/SidebarNav";
import Footer from "./components/footer";
import ButtonPwa from "./components/ButtonPwa";


export const metadata = {
  title: "EBC APP",
  description: "Excellence Business Club",
  manifest:"/manifest.json",
  icons: {

    apple:"/icon.png"

  },
  themecolor:"#181c32"
};

export default function RootLayout({ children }) {


  return (
    <html lang="es">
      <body>
        <Navbar />
        <SideBarNav />
        {children}
        <Footer />
        <ButtonPwa />
        </body>
    </html>
    
  );
}

