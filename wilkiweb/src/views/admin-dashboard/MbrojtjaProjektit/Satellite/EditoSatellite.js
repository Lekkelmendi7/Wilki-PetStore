import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function EditoSatellite(props) {
  const [satellite, setSatellite] = useState([]);

  const [planet, setPlanet] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [satellites, setSatellites] = useState([]);
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
    const vendosSatellites = async () => {
      try {
        const satellites = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Satellite/ShfaqSatellite`, authentikimi);
        setSatellites(satellites.data);
        const planet = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet', authentikimi);
        setPlanet(planet.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosSatellites();
  }, [perditeso]);

  useEffect(() => {
    const shfaqSatellite = async () => {
      try {
        const satelliteKerkim = await axios.get(
          `https://localhost:7251/api/MbrojtjaEProjektit/Satellite/ShfaqSatelliteNgaID?SatelliteID=${props.id}`,
          authentikimi
        );
        setSatellite(satelliteKerkim.data);

        console.log(satellite);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqSatellite();
  }, []);

  const handleChange = (propertyName) => (event) => {
    setSatellite((prev) => ({
      ...prev,
      [propertyName]: event.target.value
    }));

    console.log(satellite);
  };

  const handlePlanetChange = (event) => {
    setSatellite((prev) => ({ ...prev, planetID: event }));
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .put(
        `https://localhost:7251/api/MbrojtjaEProjektit/Satellite/PerditesoSatellite?SatelliteID=${satellite.satelliteID}`,
        satellite,
        authentikimi
      )
      .then((x) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Satellite u Perditesua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.error('Error:', error);
        props.setTipiMesazhit('danger');
        props.setPershkrimiMesazhit('Ndodhi nje gabim gjate perditesimit te satellite!');
        props.perditesoTeDhenat();
        props.shfaqmesazhin();
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(satellite.name) || isNullOrEmpty(satellite.planetID)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoSatellite == false &&
        satellites.filter(
          (item) => item.name === satellite.name && item.planetID == satellite.planetID
        ).length !== 0
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
      <Modal className="modalEditShto" show={true} onHide={() => props.largo()}>
        <Modal.Header closeButton>
          <Modal.Title>Edito Satellite</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Satellite ID</Form.Label>
              <Form.Control value={satellite.satelliteID} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Name<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleChange('name')}
                value={satellite.name}
                type="text"
                placeholder="Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Planet</Form.Label>
              <select
                placeholder="Planet"
                className="form-select"
                value={satellite.planetID}
                onChange={(e) => handlePlanetChange(e.target.value)}
              >
                <option selected disabled hidden>
                  {satellite.planet && satellite.planet.name} - {satellite.planet && satellite.planet.type}
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
            Edito Satellite <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditoSatellite;
