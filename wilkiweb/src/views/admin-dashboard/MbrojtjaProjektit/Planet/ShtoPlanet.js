import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function ShtoPlanet(props) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const [perditeso, setPerditeso] = useState('');
  const [planet, setPlanet] = useState([]);
  const [kontrolloPlanet, setKontrolloPlanet] = useState(false);
  const [konfirmoPlanet, setKofirmoPlanet] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const vendosplanet = async () => {
      try {
        const planet = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet`, authentikimi);
        setPlanet(planet.data);
        console.log(planet.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosplanet();
  }, [perditeso]);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .post(
        'https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShtoPlanet',
        {
          name: name,
          type: type
        },
        authentikimi
      )
      .then((response) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Planet u insertua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(name) || isNullOrEmpty(type)) {
      setFushatEZbrazura(true);
    } else {
      if (konfirmoPlanet == false && planet.filter((item) => item.name == name && item.type == type).length !== 0) {
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
      <Modal className="modalEditShto" show={props.shfaq} onHide={() => props.largo()}>
        <Modal.Header closeButton>
          <Modal.Title>Shto Planet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange(setName)} value={name} type="text" placeholder="Name" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Type<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange(setType)} value={type} type="text" placeholder="Type" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.largo()}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="Butoni" onClick={handleKontrolli}>
            Shto Planet <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShtoPlanet;
