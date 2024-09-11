import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function EditoPlanet(props) {
  const [planet, setPlanet] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [planets, setPlanets] = useState([]);
  const [kontrolloPlanet, setKontrolloPlanet] = useState(false);
  const [konfirmoPlanet, setKonfirmoPlanet] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const vendosPlanets = async () => {
      try {
        const planets = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet`, authentikimi);
        setPlanets(planets.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosPlanets();
  }, [perditeso]);

  useEffect(() => {
    const shfaqPlanet = async () => {
      try {
        const planetKerkim = await axios.get(
          `https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanetNgaID?PlanetId=${props.id}`,
          authentikimi
        );
        setPlanet(planetKerkim.data);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqPlanet();
  }, []);

  const handleChange = (propertyName) => (event) => {
    setPlanet((prev) => ({
      ...prev,
      [propertyName]: event.target.value
    }));
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .put(
        `https://localhost:7251/api/MbrojtjaEProjektit/Planet/PerditesoPlanet?PlanetId=${planet.planetID}`,
        planet,
        authentikimi
      )
      .then((x) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Planet u Perditesua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.error('Error:', error);
        props.setTipiMesazhit('danger');
        props.setPershkrimiMesazhit('Ndodhi nje gabim gjate perditesimit te planet!');
        props.perditesoTeDhenat();
        props.shfaqmesazhin();
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(planet.name) || isNullOrEmpty(planet.type)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoPlanet == false &&
        planets.filter((item) => item.name == planet.name && item.type == planet.type).length !== 0
      ) {
        setKontrolloPlanet(true);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <KontrolloAksesinNeFunksione
        largo={() => props.largo()}
        shfaqmesazhin={() => props.shfaqmesazhin()}
        perditesoTeDhenat={() => props.perditesoTeDhenat()}
        setTipiMesazhit={(e) => props.setTipiMesazhit(e)}
        setPershkrimiMesazhit={(e) => props.setPershkrimiMesazhit(e)}
      />
      {fushatEZbrazura && (
        <Modal size="sm" show={fushatEZbrazura} onHide={() => setFushatEZbrazura(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: 'red' }} as="h6">
              Ndodhi nje gabim
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: '10pt' }}>
              Ju lutemi plotesoni te gjitha fushat me <span style={{ color: 'red' }}>*</span>
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="danger">
              Mbylle <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {kontrolloPlanet && (
        <Modal size="sm" show={kontrolloPlanet} onHide={() => setKontrolloPlanet(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: '10pt' }}>Ky Planet ekziston ne sistem!</span>
            <br />
            <strong style={{ fontSize: '10pt' }}>A jeni te sigurt qe deshironi te vazhdoni?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="danger" onClick={() => setKontrolloPlanet(false)}>
              Korrigjo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => {
                handleSubmit();
              }}
            >
              Vazhdoni
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal className="modalEditShto" show={true} onHide={() => props.largo()}>
        <Modal.Header closeButton>
          <Modal.Title>Edito Planet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Planet ID</Form.Label>
              <Form.Control value={planet.planetID} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange('name')} value={planet.name} type="text" placeholder="Name" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Type<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control onChange={handleChange('type')} value={planet.type} as="textarea" placeholder="Type" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.largo()}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="Butoni" onClick={handleKontrolli}>
            Edito Planet <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditoPlanet;
