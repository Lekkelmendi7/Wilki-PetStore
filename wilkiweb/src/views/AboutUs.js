import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Titulli from '../components/Titulli';

function AboutUs() {
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState([]);
  const [perditeso, setPerditeso] = useState(Date.now());

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const ShfaqTeDhenat = async () => {
      try {
        const teDhenat = await axios.get('https://localhost:7251/api/Biznesi/TeDhenatBiznesit/ShfaqTeDhenat', authentikimi);
        setTeDhenatBiznesit(teDhenat.data);
        console.log(teDhenat.data);
      } catch (err) {
        console.log(err);
      }
    };

    ShfaqTeDhenat();
  }, [perditeso]);

  return (
    <>
      <Titulli titulli={'About Us'} />
      <section id="about-us" className="py-5">
        <Container>
          <h2 className="text-center mb-5">About Us</h2>
          <p className="lead text-center">
            Welcome to <strong>{teDhenatBiznesit && teDhenatBiznesit.emriIBiznesit}</strong>, where pets and their care come first!
          </p>
          <p className="text-center">
            At <strong>{teDhenatBiznesit && teDhenatBiznesit.emriIBiznesit}</strong>, we are passionate about 
            providing the best products and solutions to keep your pets happy and healthy. Whether you have a dog, 
            cat, bird, or any other companion, we have everything you need to take care of them with love and dedication.
          </p>
          <h3 className="mt-5">Our Mission</h3>
          <p>
            Our mission is to simplify your pet care shopping experience by offering a curated selection of high-quality pet products, 
            along with exceptional customer service. We strive to be your go-to destination for all your pet needs, providing everything 
            from food and toys to grooming and healthcare items.
          </p>
          <h3 className="mt-5">Why Choose Us?</h3>
          <Row>
            <Col md={6}>
              <h4>Wide Range of Products</h4>
              <p>
                From nutritious food to cozy beds, toys, grooming essentials, and more, we offer a diverse range of products for all 
                kinds of pets. We stock items from trusted brands that prioritize the well-being of your pets.
              </p>
              <h4>Quality Assurance</h4>
              <p>
                We are committed to delivering high-quality products that meet both your expectations and your pet's needs. 
                Each product in our inventory is selected with care to ensure it supports the health and happiness of your furry friends.
              </p>
            </Col>
            <Col md={6}>
              <h4>Expert Pet Care Advice</h4>
              <p>
                Our team of tech experts is here to assist you every step of the way. Whether you need help choosing the right product or
                troubleshooting technical issues, we're always ready to lend a helping hand.
              </p>
              <h4>Secure Shopping Experience</h4>
              <p>
                Your security is our top priority. We utilize the latest encryption technologies to safeguard your personal information 
                and ensure a safe and secure shopping experience.
              </p>
            </Col>
          </Row>
          <h3 className="mt-5">Our Logo</h3>
          <Row className="mb-4 align-items-center justify-content-center">
            <Col sm={8}>
              <Image src={`${process.env.PUBLIC_URL}/img/web/${teDhenatBiznesit.logo}`} fluid alt="Partner Logo 1" />
            </Col>
          </Row>
          <p className="text-center">
            Thank you for choosing {teDhenatBiznesit && teDhenatBiznesit.emriIBiznesit}. Together, let's make your pets' lives better!
          </p>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default AboutUs;
