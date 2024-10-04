import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function ShtoMagazine(props) {
  const [magazineName, setMagazineName] = useState('');
  const [issueNumber, setIssueNumber] = useState('');
  const [publisherID, setPublisherID] = useState('');

  const [publisher, setPublisher] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [magazine, setMagazine] = useState([]);
  const [kontrolloMagazine, setKontrolloMagazine] = useState(false);
  const [konfirmoMagazine, setKonfirmoMagazine] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const vendosMagazine = async () => {
      try {
        const magazine = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Magazine/ShfaqMagazine`, authentikimi);
        setMagazine(magazine.data);
        const publisher = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Publisher/ShfaqPublisher', authentikimi);
        setPublisher(publisher.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosMagazine();
  }, [perditeso]);

  const handleChange = (setState) => (event) => {
    setState(event.target.value);
  };

  const handlePublisherChange = (event) => {
    setPublisherID(event);
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .post(
        'https://localhost:7251/api/MbrojtjaEProjektit/Magazine/ShtoMagazine',
        {
          magazineName: magazineName,
          issueNumber: issueNumber,
          publisherID: publisherID
        },
        authentikimi
      )
      .then((response) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Magazine u insertua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(magazineName) || isNullOrEmpty(issueNumber) || magazine.issueNumber < 0 || isNullOrEmpty(publisherID)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoMagazine == false &&
        magazine.filter((item) => item.magazineName === magazineName && item.issueNumber === issueNumber && item.publisherID == publisherID).length !== 0
      ) {
        setKontrolloMagazine(true);
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
      {kontrolloMagazine && (
        <Modal size="sm" show={kontrolloMagazine} onHide={() => setKontrolloMagazine(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: '10pt' }}>Ky Magazine ekziston ne sistem!</span>
            <br />
            <strong style={{ fontSize: '10pt' }}>A jeni te sigurt qe deshironi te vazhdoni?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="danger" onClick={() => setKontrolloMagazine(false)}>
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
          <Modal.Title>Shto Magazine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                MagazineName<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange(setMagazineName)} value={magazineName} type="text" placeholder="MagazineName" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                IssueNumber<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange(setIssueNumber)} value={issueNumber} type="text" placeholder="IssueNumber" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Publisher</Form.Label>
              <select
                placeholder="Publisher"
                className="form-select"
                value={publisherID}
                onChange={(e) => handlePublisherChange(e.target.value)}
              >
                <option defaultValue disabled value="">
                  Zgjedhni Publisher
                </option>
                {publisher &&
                  publisher.map((item) => {
                    return (
                      <option key={item.publisherID} value={item.publisherID}>
                        {item.publisherName} - {item.location}
                      </option>
                    );
                  })}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.largo()}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="Butoni" onClick={handleKontrolli}>
            Shto Magazine <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ShtoMagazine;
