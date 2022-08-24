import React, { useEffect } from 'react'

function MyAccount() {
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push('/')
        }
    }, [])
  return (
    <div>
      MyAccount
    </div>
  )
}

export default MyAccount
