import React, { useEffect } from 'react'
import { Row,Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {LinkContainer}from 'react-router-bootstrap'
import categories from '../categories'
import './Home.css'
import { useDispatch, useSelector } from "react-redux";
import axios from "../axios";
import { updateProducts } from "../features/productSlice";
import ProductPreview from '../components/ProductPreview'
function Home() {

    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);
    useEffect(() => {
        axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
    }, []);

  return (
    <div>
    <img
      src="https://lh3.googleusercontent.com/p/AF1QipPXlMDBJtpAQMW4sEmcrLPp4xKqz3ZcJKwMfDYI=s680-w680-h510"
      style={{ width: "150vh", height: "60vh" }}
      className="home-banner"
    ></img>
  
    <div className="featured-products-containter container mt-4">
      <h2>Zadnji proizvodi</h2>
      <div className="d-flex justify-content-center flex-wrap">
        {lastProducts.map((product) => (
          <ProductPreview {...product} />
        ))}
      </div>
    </div>
  
    <div>
      <Link
        to="/category/all"
        style={{ textAlign: "right", display: "block", textDecoration: "none" }}
      >
        Vidi vise {">>"}
      </Link>
    </div>
  
    <div className="sale_banner--container mt-4">
      <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" alt="Sale Banner" />
    </div>
  
    <div className="recent-products-container container mt-4">
      <h2>Kategorije</h2>
      <Row>
        {categories.map((category) => (
          <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
              <div
                style={{
                  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                  gap: "10px",
                }}
                className="category-tile"
              >
                {category.name.charAt(0).toUpperCase() +
                  category.name.slice(1).replace(/-/g, " ")}
              </div>
            </Col>
          </LinkContainer>
        ))}
      </Row>
    </div>
  
    <div className="footer">
      <div className="sb__footer selection__padding">
        <div className="sb__footer-links">
          <div className="nesto">
            <div className="sb__footer-links_div">
              <h4>Za biznis</h4>
              <a href="/">
                <p>Zaposlenici</p>
              </a>
              <a href="/">
                <p>Zdravi plan</p>
              </a>
              <a href="/">
                <p>Individualno</p>
              </a>
            </div>
  
            <div className="sb__footer-links_div">
              <h4>Kompanija</h4>
              <a href="/about">
                <p>O kompaniji</p>
              </a>
              <a href="/">
                <p>Kontakt</p>
              </a>
              <a href="/">
                <p>Karijera</p>
              </a>
            </div>
  
            <div className="sb__footer-links_div">
              <h4>Kontaktirajte</h4>
              <div className="socialmedia">
                <div>
                  <a href="https://www.facebook.com/mtifavitez/">
                    <img
                      style={{ width: "30px", height: "30px", display: "inline-block" }}
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYNLFwZX-v7Gc4KIwpdiMfjbLWELnAsGttLA&usqp=CAU"
                      alt="Facebook"
                    />
                  </a>
                  <p style={{ display: "inline-block", marginLeft: "10px" }}>M-Tifa Vitez</p>
                </div>
                <div>
                  <img
                    style={{ width: "30px",backgroundColor:"white", height: "30px", display: "inline-block" }}
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yE/r/2PIcyqpptfD.png"
                    alt="Email"
                  />
                  <p style={{ display: "inline-block", marginLeft: "10px" }}>m.tifa@bih.net.ba</p>
                </div>
                <div>
                  <img
                    style={{ width: "30px",backgroundColor:"white", height: "30px", display: "inline-block" }}
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yT/r/Dc7-7AgwkwS.png"
                    alt="Phone"
                  />
                  <p style={{ display: "inline-block", marginLeft: "10px" }}>030 522-177</p>
                </div>
                <div>
                  <img
                    style={{ width: "30px", backgroundColor:"white",height: "30px", display: "inline-block" }}
                    src="https://static.xx.fbcdn.net/rsrc.php/v3/yW/r/8k_Y-oVxbuU.png"
                    alt="Address"
                  />
                  <p style={{ display: "inline-block", marginLeft: "10px" }}>Poculica bb</p>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="sb__footer-below">
          <div className="sb__footer-copyright">
            <p style={{ paddingTop: "10px" }}>
              @{new Date().getFullYear()} Husein Cisic. Prava u potpunosti zadržana.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  



  )
}

export default Home