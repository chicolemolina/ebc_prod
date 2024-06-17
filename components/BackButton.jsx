'use client'
import { useRouter } from "next/navigation";
import { HiMiniArrowLeft } from "react-icons/hi2";
import { Tooltip as ReactTooltip } from "react-tooltip";

export const BackButton = () => {
  const router = useRouter()
  return (
    <div className="relative hidden md:flex">
      <button onClick={() => router.back()} data-tooltip-id="tooltip-1" className="rounded-full p-4 bg-[#e1e3ea] hover:bg-[#cdced3] transition shadow ml-10">
        <HiMiniArrowLeft />
      </button>
      <ReactTooltip
        id="tooltip-1"
        place="bottom"
        variant="info"
        content="Volver"
      />
    </div>
  )
}

