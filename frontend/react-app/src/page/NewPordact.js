
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useCreateProductMutation } from "../services/appApi";
import "./NewProduct.css"
function NewPordact() {
  const [name, setName] = useState("");
    const [opis, setDescription] = useState("");
    const [cijena, setPrice] = useState("");
    const [kategorija, setCategory] = useState("");
    const [slika, setImages] = useState([]);
    const navigate = useNavigate();
    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();
 
 

  function handleSubmit(e) {
      e.preventDefault(); 
      if (!name || !opis || !cijena || !kategorija || !slika) {
        return alert("Molimo da unesete sva polja");
    }
    createProduct({ name, opis, cijena, kategorija, slika }).then(({ data }) => {
      if (data.length > 0) {
          setTimeout(() => {
              navigate("/");
          }, 1500);
      }
  });
}


 
 
 
    return (
  
  <Container>
  <Row>
                <Col md={6} className="new-product__form--container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
                        <h1 className="mt-4">Kreiraj produkt</h1>
                        {isSuccess && <Alert variant="success">Kreiranje uspjesno obavljeno</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Product name</Form.Label>
                            <Form.Control type="text" placeholder="Unesite ime produkta" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Product opis</Form.Label>
                            <Form.Control as="textarea" placeholder="Produkt opis" style={{ height: "300px" }} value={opis} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Cijena(KM)</Form.Label>
                            <Form.Control type="number" placeholder="Cijena (KM)" value={cijena} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Kategorija</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Odaberite jedno --
                                </option>
                                <option value="klime">klime</option>
                                <option value="masine-za-ves">masina za ves</option>
                                <option value="ugrandbene-sudjarice">sudjerice</option>
                                <option value="zidne-nape">zidna napa</option>
                                <option value="ugradbene-ploče">ugradbena-indukcijska ploča</option>
                                <option value="frižideri">frižider </option>
                                <option value="ugradbene-pećnice">ugradbena pećnica</option>
                               
                                
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Slika</Form.Label>
                            <Form.Control as="textarea" placeholder="URL slike" style={{ height: "100px" }} value={slika} required onChange={(e) => setImages(e.target.value)} />
                       </Form.Group>

                        <Form.Group>
                            <Button type="submit" disabled={isLoading || isSuccess}>
                                Kreiraj Product
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="new-product__image--container"></Col>
            </Row>


    </Container>
  )
}

export default NewPordact