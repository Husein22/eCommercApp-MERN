import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Container, Row, Col, Badge, ButtonGroup, Form, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from '../components/ToastMessage'
function ProductPage() {
    const { id } = useParams();
    const user = useSelector((state) => state.user);
    const [product, setProduct] = useState(null);
    const [similar, setSimilar] = useState(null);
const [addToCard,{isSuccess}]=useAddToCartMutation();

    const handleDragStart = (e) => e.preventDefault();
    useEffect(() => {
        axios.get(`/products/${id}`).then(({ data }) => {
            setProduct(data.product);
            setSimilar(data.similar);
        });
    }, [id]);

    if (!product) {
        return <Loading />;
    }
    

    const imageUrl = product.slika;
  

    const responsive = {
        0: { items: 1 },
        568: { items: 2 },
        1024: { items: 3 },
    };
    
   let similarProducts = [];
    if (similar) {
        similarProducts = similar.map((product, idx) => (
            <div className="item" data-value={idx}>
                <SimilarProduct {...product} />
            </div>
        ));
    }

    return (
        <Container className="pt-4" style={{ position: "relative" }}>
            <Row>
                <Col lg={6}>
                <AliceCarousel mouseTracking items={[<img src={imageUrl} alt="Product Image" className="product__carousel--image" />]} controlsStrategy="alternate" />
                 </Col>
             
                <Col lg={6} className="pt-4">
                    <h1>{product.name}</h1>
                    <p>
                        <Badge bg="primary">{product.kategorija}</Badge>
                    </p>
                    <h2 className="product__price">
                        <strong> {product.cijena} KM</strong></h2>
                    <p style={{ textAlign: "justify"  }} className="py-3">
                        <strong >Opis:</strong> <br/> <h6 style={{ whiteSpace: 'pre-line' , fontWeight: 'normal', lineHeight: '1.2' }}> {product.opis}</h6> 
                    </p>


                    {user && !user.isAdmin && (
                        <ButtonGroup style={{ width: "90%" }}>
                            <Form.Select size="lg" style={{ width: "40%", borderRadius: "0" }}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                            <Button size="lg" onClick={()=>addToCard({userId:user._id,productId:id,price:product.cijena,image:product.slika})} >
                                Dodaj u korpu
                            </Button>
                        </ButtonGroup>
                    )}
                    {user && user.isAdmin && (
                        <LinkContainer to={`/product/${product._id}/edit`}>
                            <Button size="lg">Uredi proizvod</Button>
                        </LinkContainer>
                    )}

{isSuccess && <ToastMessage bg="info" title="Dodano u korpu" body={`${product.name} je u tvojoj korpi`} />}
              

                      </Col>
            </Row>
            
            <div className="my-4">
                <h2 style={{margin:"40px"}}>Slicni proizvodi</h2>
                <div className="d-flex justify-content-center align-items-center flex-wrap">
                    <AliceCarousel mouseTracking items={similarProducts} responsive={responsive} controlsStrategy="alternate" />
                </div>
            </div>
        </Container>
    );
}

export default ProductPage;