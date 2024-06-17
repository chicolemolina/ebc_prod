"use client"; 
import React, { useEffect, useState } from "react";


const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = e => {
      e.preventDefault();
      console.log("we are being triggered :D");
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = evt => {
    evt.preventDefault();
    if (!promptInstall) {
      return;
    }
    promptInstall.prompt();
  };
  if (!supportsPWA) {
    return null;
  }
  return (
    <div className="text-center md:text-left  bg-[#ffffff] shadow w-full p-2 fixed bottom-0 left-0">

      


           <div>

              <div className="text-black text-sm mb-0">Excellence Business Club</div>
              <div className="italic text-xs">Noticias, eventos y toda la actualidad sobre EBC</div>


            </div>
       
            <button
            className="text-white bg-[#181c32] mt-1 py-1 px-3 rounded text-sm"
            id="setup_button"
            aria-label="Install app"
            title="Install app"
            onClick={onClick}
          >
            INSTALAR APP
          </button>
          
      
      

    </div>
  );
};

export default InstallPWA;