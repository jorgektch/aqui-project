import React from 'react'
interface ButtonPrimaryProps {
  children: React.ReactNode;
    href: string;
}


function ButtonPrimary({children, href} : ButtonPrimaryProps) {
  return (
        <a href={href} className="text-lg bg-neutral-800 flex items-center justify-center py-2 text-white mt-4 w-full">
            {children}
        </a>
  )
}

export default ButtonPrimary