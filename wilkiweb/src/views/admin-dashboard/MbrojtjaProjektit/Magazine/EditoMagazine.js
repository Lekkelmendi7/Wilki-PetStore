import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function EditoMagazine(props) {
  const [magazine, setMagazine] = useState([]);

  const [publisher, setPublisher] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [magazines, setMagazines] = useState([]);
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
    const vendosMagazines = async () => {
      try {
        const magazines = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Magazine/ShfaqMagazine`, authentikimi);
        setMagazines(magazines.data);
        const publisher = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Publisher/ShfaqPublisher', authentikimi);
        setPublisher(publisher.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosMagazines();
  }, [perditeso]);

  useEffect(() => {
    const shfaqMagazine = async () => {
      try {
        const magazineKerkim = await axios.get(
          `https://localhost:7251/api/MbrojtjaEProjektit/Magazine/ShfaqMagazineNgaID?MagazineID=${props.id}`,
          authentikimi
        );
        setMagazine(magazineKerkim.data);

        console.log(magazine);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqMagazine();
  }, []);

  const handleChange = (propertyName) => (event) => {
    setMagazine((prev) => ({
      ...prev,
      [propertyName]: event.target.value
    }));

    console.log(magazine);
  };

  const handlePublisherChange = (event) => {
    setMagazine((prev) => ({ ...prev, publisherID: event }));
  };

  function isNullOrEmpty(value) {
    return value === null || value === '' || value === undefined;
  }

  function handleSubmit() {
    axios
      .put(
        `https://localhost:7251/api/MbrojtjaEProjektit/Magazine/PerditesoMagazine?MagazineID=${magazine.magazineID}`,
        magazine,
        authentikimi
      )
      .then((x) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Magazine u Perditesua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.error('Error:', error);
        props.setTipiMesazhit('danger');
        props.setPershkrimiMesazhit('Ndodhi nje gabim gjate perditesimit te magazine!');
        props.perditesoTeDhenat();
        props.shfaqmesazhin();
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(magazine.magazineName) || magazine.issueNumber < 0  || isNullOrEmpty(magazine.publisherID)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoMagazine == false &&
        magazines.filter(
          (item) => item.magazineName === magazine.magazineName && item.issueNumber == magazine.issueNumber && item.publisherID == magazine.publisherID
        ).length !== 0
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
      <Modal className="modalEditShto" show={true} onHide={() => props.largo()}>
        <Modal.Header closeButton>
          <Modal.Title>Edito Magazine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Magazine ID</Form.Label>
              <Form.Control value={magazine.magazineID} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                Title<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleChange('magazineName')}
                value={magazine.magazineName}
                type="text"
                placeholder="magazineName"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                IssueNumber<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control
                onChange={handleChange('issueNumber')}
                value={magazine.issueNumber}
                type="text"
                placeholder="issueNumber"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Publisher</Form.Label>
              <select
                placeholder="Publisher"
                className="form-select"
                value={magazine.publisherID}
                onChange={(e) => handlePublisherChange(e.target.value)}
              >
                <option selected disabled hidden>
                  {magazine.publisher && magazine.publisher.publisherName} - {magazine.publisher && magazine.publisher.location}
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
            Edito Magazine <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditoMagazine;
