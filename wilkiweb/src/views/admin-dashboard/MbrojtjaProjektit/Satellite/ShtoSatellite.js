import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function ShtoSatellite(props) {
  const [name, setName] = useState('');
  const [planetID, setPlanetID] = useState('');

  const [planet, setPlanet] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [satellite, setSatellite] = useState([]);
  const [kontrolloSatellite, setKontrolloSatellite] = useState(false);
  const [konfirmoSatellite, setKonfirmoSatellite] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const vendosSatellite = async () => {
      try {
        const satellite = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Satellite/ShfaqSatellite`, authentikimi);
        setSatellite(satellite.data);
        const planet = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet', authentikimi);
        setPlanet(planet.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosSatellite();
  }, [perditeso]);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handlePlanetChange = (event) => {
    setPlanetID(event);
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .post(
        'https://localhost:7251/api/MbrojtjaEProjektit/Satellite/ShtoSatellite',
        {
          name: name,
          planetID: planetID
        },
        authentikimi
      )
      .then((response) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Satellite u insertua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(name) || isNullOrEmpty(planetID)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoSatellite == false &&
        satellite.filter((item) => item.name === name && item.planetID == planetID).length !== 0
      ) {
        setKontrolloSatellite(true);
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
            <Button size="sm" onClick={() => setFushatEZbrazura(false)} variant="secondary">
              Mbylle <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {kontrolloSatellite && (
        <Modal size="sm" show={kontrolloSatellite} onHide={() => setKontrolloSatellite(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: '10pt' }}>Ky Satellite ekziston ne sistem!</span>
            <br />
            <strong style={{ fontSize: '10pt' }}>A jeni te sigurt qe deshironi te vazhdoni?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setKontrolloSatellite(false)}>
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
          <Modal.Title>Shto Satellite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange(setName)} value={name} type="text" placeholder="Name" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Planet</Form.Label>
              <select
                placeholder="Planet"
                className="form-select"
                value={planetID}
                onChange={(e) => handlePlanetChange(e.target.value)}
              >
                <option defaultValue disabled value="">
                  Zgjedhni Planet
                </option>
                {planet &&
                  planet.map((item) => {
                    return (
                      <option key={item.planetID} value={item.planetID}>
                        {item.name} - {item.type}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => props.largo()}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="Butoni" onClick={handleKontrolli}>
            Shto Satellite <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShtoSatellite;
