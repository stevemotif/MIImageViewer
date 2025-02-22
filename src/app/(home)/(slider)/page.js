import React from 'react'
import Backgroundimg from '../../../../public/images/scandefault.png'

const page = ({image}) => {
  return (
    <>
    <section className="page-title page-title-layout3 bg-img" style={{backgroundImage: `url(${image?(image):(Backgroundimg)})`, backgroundSize: 'cover', backgroundPosition: 'center center'}}>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5">
            {/* <h1 className="pagetitle__heading">Caring For The Health &amp; Well Being Of Family.</h1>*/}
            <p className="pagetitle__desc">
          
            </p> 

          </div>{/* /.col-xl-5 */}
        </div>{/* /.row */}
      </div>{/* /.container */}
    </section>
    </>
  )
}

export default page
