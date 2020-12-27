import React from "react"
import { Link } from "react-router-dom"
import { Image } from "react-bootstrap"

const Promo = () => {
  return (
    <>
      <div className="promo-block">
        <div>
          <Image src="/assets/promo/80331473_184683979321816_1434081165030083279_n.webp" alt="Promo Block" />
          <div className="promo-block-button-container">
            <Link to="/products/5fe6eb0e187920f33697b6dd" target="_blank">
              <Image src="/uploads/image-1608969334624.jpg" alt="Promo Block" />
              <div className="promo-block-button">ПОДРОБНЕЕ</div>
            </Link>
          </div>
        </div>
        <div>
          <Image src="/assets/promo/joanna-kosinska-b2dPj4L8vZs-unsplash.webp" alt="Promo Block" />
          <Image src="/assets/promo/freestocks-k-Rp0V0XWWU-unsplash.webp" alt="Promo Block" />
        </div>
        <div>
          <div className="promo-block-button-container">
            <Link to="/products/5fd9c80930203c1975431952" target="_blank">
              <Image src="/uploads/image-1608189301093.jpg" alt="Promo Block" />
              <div className="promo-block-button">ПОДРОБНЕЕ</div>
            </Link>
          </div>
        </div>
        <div>
          <Image src="/assets/promo/76877129_631712434302829_2274931547804815072_n.webp" alt="Promo Block" />
          <div className="promo-block-button-container">
            <Link to="/products/5fe6e7e760af6cf2331164c9" target="_blank">
              <Image src="/uploads/image-1608968725901.jpg" alt="Promo Block" />
              <div className="promo-block-button">ПОДРОБНЕЕ</div>
            </Link>
          </div>
        </div>
        <div>
          <div className="promo-block-button-container">
            <Link to="/products/5fe7f934be9ee90017f179c4" target="_blank">
              <Image src="/uploads/image-1608189301100.jpg" alt="Promo Block" />
              <div className="promo-block-button">ПОДРОБНЕЕ</div>
            </Link>
          </div>
          <Image src="/assets/promo/79645455_172311820520261_3764907917497880995_n.webp" alt="Promo Block" />
        </div>
      </div>
      <div className="promo-block-main-text">
        <h1>Всех с Новым Годом и Рождеством!</h1>
      </div>
    </>
  )
}

export default Promo
