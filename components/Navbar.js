import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

function Navbar() {
  return (
    <header className="text-gray-600 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <div className="logo mr-auto mx-5 md:mx-5 my-2 cursor-pointer">
          <Link href={"/"}>
            <a>
              <Image src={"/logo.png"} alt="logo" width={120} height={30} />
            </a>
          </Link>
        </div>
        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
          <Link href={"/tshirts"}><a className="mr-5 hover:text-gray-900">Tshirts</a></Link>
          <Link href={"/hoodies"}><a className="mr-5 hover:text-gray-900">Hoodies</a></Link>
          <Link href={"/stickers"}><a className="mr-5 hover:text-gray-900">Stickers</a></Link>
          <Link href={"/mugs"}><a className="mr-5 hover:text-gray-900">Mugs</a></Link>

        </nav>

      </div>
    </header>
  )
}

export default Navbar