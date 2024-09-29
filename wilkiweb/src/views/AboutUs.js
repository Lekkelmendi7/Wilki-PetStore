import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet';
import Titulli from '../components/Titulli';

function MissionCard({ title, description }) {
  return (
    <div
      style={{
        backgroundColor: 'white',
        color: 'black',
        padding: '20px',
        margin: '10px',
        borderRadius: '10px',
        width: '250px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <h3 style={{ fontSize: '1.4em', marginBottom: '15px' }}>{title}</h3>
      <p style={{ fontSize: '1em', lineHeight: '1.6' }}>{description}</p>
    </div>
  );
}

function AboutUs() {
  const [teDhenatBiznesit, setTeDhenatBiznesit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const getToken = localStorage.getItem('token');

  const authentikimi = getToken
    ? {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      }
    : {};

  useEffect(() => {
    const ShfaqTeDhenat = async () => {
      try {
        const teDhenat = await axios.get(
          'https://localhost:7251/api/Biznesi/TeDhenatBiznesit/ShfaqTeDhenat',
          authentikimi
        );
        setTeDhenatBiznesit(teDhenat.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch business data.');
        setLoading(false);
      }
    };

    ShfaqTeDhenat();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <Titulli titulli="About Us" />
      <section id="about-us" className="py-5">
        <Container>
          <h2 className="text-center mb-5">About Us</h2>
          <p className="lead text-center">
            Welcome to{' '}
            <strong>{teDhenatBiznesit?.emriIBiznesit || 'Our Business'}</strong>
            , where pets and their care come first!
          </p>
          <p className="text-center">
            At{' '}
            <strong>{teDhenatBiznesit?.emriIBiznesit || 'Our Business'}</strong>
            , we are passionate about providing the best products and solutions
            to keep your pets happy and healthy.
          </p>

      {/* Info Box Section */}
      {/* Info Box Section */}
{/* Info Box Section */}
<div
  style={{
    backgroundColor: '#b51b1b',
    color: 'white',
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    width: '1440px',
    height: '200px',
    position: 'relative', // Required for the paw image to be positioned inside the box
    overflow: 'hidden',  // Ensure no overflow
  }}
>
  <h3 style={{ margin: 0, fontWeight: 'bold', fontSize: '1.8em' }}>
    How We Started, Where We’re Going
  </h3>
  <p style={{ margin: 0, fontSize: '1.2em' }}>
    Wilki was founded in 2024 in Ferizaj, Republic of Kosovo. Since
    then, we’ve grown from one store in Prishtina to 18 stores—one of
    the largest independent pet supply retailers in the Balkans.
  </p>

  {/* Add the paw image inside the red box */}
  <img
    src="https://petpros.net/wp-content/uploads/2022/03/petpros-big-paw.png" // Paw image link
    alt="Paw Print"
    style={{
      position: 'absolute',
      bottom: '10px',  // Adjusted to keep it fully inside the box
      right: '10px',   // Adjusted to keep it fully inside the box
      width: '80px',   // Size of the paw image
      opacity: 'opacity: 0.7; transition: opacity 0.3s ease;',  // Transparency effect
    }}
  />
</div>
            <br/>
            <br/>
            <br/>
          
          <Row className="align-items-center mb-4">
  <Col md={6} className="text-center">
    <Image
      src="https://petpros.net/wp-content/uploads/2022/03/petpros-girl-pet.jpg"
      alt="Girl with pet"
      fluid
      rounded
    />
  </Col>
  <Col md={6}>
    {/* Title Above the Text */}
    <h3 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>
      Our Commitment to You
    </h3>
    {/* Text with increased font size */}
    <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
      From day one, we’ve made it our mission to deliver old-fashioned
      customer service. We’ve dedicated ourselves to empowering pet
      owners, providing them with knowledge to keep their pets happy,
      healthy, and safe. Our strength lies in building relationships
      with people in their neighborhood, making a difference in their
      (and our) community, and in treating our neighbors and their
      pets like family. Because they are.
    </p>
  </Col>
</Row>

<Row className="align-items-center mb-4">
  {/* Move the text to the left on medium and larger screens */}
  <Col md={6} className="order-md-2 text-center">
    <Image
      src="https://petpros.net/wp-content/uploads/2022/03/petpros-boy-pet.jpg"
      alt="Guy with a pet"
      fluid
      rounded
    />
  </Col>
  {/* Move the image to the right on medium and larger screens */}
  <Col md={6} className="order-md-1">
    <h3 style={{ fontSize: '2em', fontWeight: 'bold', marginBottom: '20px' }}>
      Our Team
    </h3>
    <p style={{ fontSize: '1.2em', lineHeight: '1.6' }}>
      Our team reflects our company values—respect, fairness, and honesty. Our team knows a lot, and they love learning more—from our customers, our customers’ pets, their own pets (they all have pets), and from each other. We offer continuing education and training to our team. Our team loves these trainings. We’re not kidding. They love their job, and they’re committed to our customers, to their pets, and to providing the excellent service that keeps our customers returning year after year.
    </p>
  </Col>
</Row>


          <br/>
          {/* Mission Section */}
          <section
            style={{
              backgroundColor: '#003F5C',
              color: 'white',
              padding: '40px 20px',
              textAlign: 'center',
              marginTop: '40px',
            }}
          >
            <div>
              <h2 style={{ fontSize: '2em', marginBottom: '20px' }}>
                Our Mission
              </h2>
              <p
                style={{
                  fontSize: '1.2em',
                  marginBottom: '40px',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}
              >
                At Pet Pros, <strong>We Love Pets!</strong> That's why you can
                count on us for healthy products, knowledgeable staff, and
                friendly service in a warm and inviting atmosphere.
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <MissionCard
                title="Natural, Healthy Products"
                description="We provide high-quality, natural pet food, treats, and supplies to ensure pets live a healthy and happy life."
              />
              <MissionCard
                title="Education"
                description="We empower our guests with knowledge to keep their pets safe and healthy. Our staff receives ongoing training for this purpose."
              />
              <MissionCard
                title="Fun"
                description="We love to see pets and their owners having fun. We carry products that help pets have fun and offer in-store experiences."
              />
              <MissionCard
                title="Community"
                description="Being involved in local communities is important to us. We treat our neighbors and their pets like family."
              />
            </div>
          </section>


          {/* Updated Button Section */}
          <section
            className="buttons-section"
            style={{ textAlign: 'center', marginTop: '40px' }}
          >
            <Link
              to="/produktet"
              className="button"
              style={{
                backgroundColor: '#A10000',
                color: 'white',
                padding: '15px 40px',
                margin: '10px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '1.2em',
                display: 'inline-block',
              }}
            >
              Products
            </Link>
            <Link
              to="/ContactUs"
              className="button"
              style={{
                backgroundColor: '#A10000',
                color: 'white',
                padding: '15px 40px',
                margin: '10px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '1.2em',
                display: 'inline-block',
              }}
            >
              Contact Us
            </Link>
            <Link
              to="/"
              className="button"
              style={{
                backgroundColor: '#A10000',
                color: 'white',
                padding: '15px 40px',
                margin: '10px',
                textDecoration: 'none',
                borderRadius: '5px',
                fontSize: '1.2em',
                display: 'inline-block',
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </Link>
          </section>

          <p className="text-center">
            Thank you for choosing{' '}
            {teDhenatBiznesit?.emriIBiznesit || 'Our Business'}. Together, let's
            make your pets' lives better!
          </p>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export default AboutUs;
