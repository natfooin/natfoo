import React from 'react'
import './FooterIcon.css'
function FooterIcon({icon,link}) {

  return (
    <>
        <div className="FooterIcon">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <div className="inner-FooterIcon">
              {icon}
            </div>
            </a>
        </div>
    </>
  )
}

export default FooterIcon