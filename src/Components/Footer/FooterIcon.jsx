import React from 'react'
import './FooterIcon.css'
function FooterIcon({icon}) {
    const iconStyle={
        
    }
  return (
    <>
        <div className="FooterIcon">
            <div className="inner-FooterIcon">
              {icon}
            </div>
        </div>
    </>
  )
}

export default FooterIcon