import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import KontrolloAksesinNeFunksione from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFunksione';

function EditoPublisher(props) {
  const [publisher, setPublisher] = useState([]);

  const [perditeso, setPerditeso] = useState('');
  const [publishers, setPublishers] = useState([]);
  const [kontrolloPublisher, setKontrolloPublisher] = useState(false);
  const [konfirmoPublisher, setKonfirmoPublisher] = useState(false);
  const [fushatEZbrazura, setFushatEZbrazura] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const vendosPublishers = async () => {
      try {
        const publishers = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Publisher/ShfaqPublisher`, authentikimi);
        setPublishers(publishers.data);
      } catch (err) {
        console.log(err);
      }
    };

    vendosPublishers();
  }, [perditeso]);

  useEffect(() => {
    const shfaqPublisher = async () => {
      try {
        const publisherKerkim = await axios.get(
          `https://localhost:7251/api/MbrojtjaEProjektit/Publisher/ShfaqPublisherNgaID?PublisherId=${props.id}`,
          authentikimi
        );
        setPublisher(publisherKerkim.data);
      } catch (err) {
        console.log(err);
      }
    };

    shfaqPublisher();
  }, []);

  const handleChange = (propertyName) => (event) => {
    setPublisher((prev) => ({
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
        `https://localhost:7251/api/MbrojtjaEProjektit/Publisher/PerditesoPublisher?PublisherId=${publisher.publisherID}`,
        publisher,
        authentikimi
      )
      .then((x) => {
        props.setTipiMesazhit('success');
        props.setPershkrimiMesazhit('Publisher u Perditesua me sukses!');
        props.perditesoTeDhenat();
        props.largo();
        props.shfaqmesazhin();
      })
      .catch((error) => {
        console.error('Error:', error);
        props.setTipiMesazhit('danger');
        props.setPershkrimiMesazhit('Ndodhi nje gabim gjate perditesimit te publisher!');
        props.perditesoTeDhenat();
        props.shfaqmesazhin();
      });
  }

  const handleKontrolli = () => {
    if (isNullOrEmpty(publisher.publisherName) || isNullOrEmpty(publisher.location)) {
      setFushatEZbrazura(true);
    } else {
      if (
        konfirmoPublisher == false &&
        publishers.filter((item) => item.publisherName == publisher.publisherName && item.location == publisher.location).length !== 0
      ) {
        setKontrolloPublisher(true);
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
      {kontrolloPublisher && (
        <Modal size="sm" show={kontrolloPublisher} onHide={() => setKontrolloPublisher(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: '10pt' }}>Ky Publisher ekziston ne sistem!</span>
            <br />
            <strong style={{ fontSize: '10pt' }}>A jeni te sigurt qe deshironi te vazhdoni?</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="danger" onClick={() => setKontrolloPublisher(false)}>
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
          <Modal.Title>Edito Publisher</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Publisher ID</Form.Label>
              <Form.Control value={publisher.publisherID} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                PublisherName<span style={{ color: 'red' }}>*</span>
              </Form.Label>
              <Form.Control onChange={handleChange('publisherName')} value={publisher.publisherName} type="text" placeholder="Location" autoFocus />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Location<span style={{ color: 'red' }}>*</span></Form.Label>
              <Form.Control onChange={handleChange('location')} value={publisher.location} as="textarea" placeholder="Location" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => props.largo()}>
            Anulo <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button className="Butoni" onClick={handleKontrolli}>
            Edito Publisher <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditoPublisher;
