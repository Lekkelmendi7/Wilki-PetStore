import { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Tabela from '../../../../components/Tabela/Tabela';
import Mesazhi from '../../../../components/Mesazhi';
import ShtoMagazine from './ShtoMagazine';
import EditoMagazine from './EditoMagazine';
import LargoMagazine from './LargoMagazine';
import KontrolloAksesinNeFaqe from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFaqe';
import Titulli from './../../../../components/Titulli';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';

function Magazine(props) {
  const [magazine, setMagazine] = useState([]);
  const [perditeso, setPerditeso] = useState('');
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState('');
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState('');
  const [loading, setLoading] = useState(false);

  const [publisher, setPublisher] = useState('');

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const shfaqMagazine = async () => {
      try {
        setLoading(true);
        const magazine = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Magazine/shfaqMagazine', authentikimi);
        setMagazine(
          magazine.data.map((k) => ({
            ID: k.magazineID,
            MagazineName: k.magazineName,
            IssueNumber: parseInt(k.issueNumber),
            Publisher: (k.publisher && k.publisher.publisherName) + ' - ' + (k.publisher && k.publisher.location)
          }))
        );
        const publisher = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Publisher/ShfaqPublisher', authentikimi);
        setPublisher(publisher.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    shfaqMagazine();
  }, [perditeso]);

  const [shto, setShto] = useState(false);
  const [edito, setEdito] = useState(false);
  const [fshij, setFshij] = useState(false);
  const [id, setId] = useState(0);

  const handleClose = () => {
    setShto(false);
  };
  const handleShow = () => setShto(true);

  const handleEdito = (id) => {
    setEdito(true);
    setId(id);
  };
  const handleEditoMbyll = () => setEdito(false);

  const handleFshij = (id) => {
    setFshij(true);
    setId(id);
  };
  const handleFshijMbyll = () => setFshij(false);

  const handleKerkoNgaIDPrimare = async (publisherID) => {
    try {
      const Magazine = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Magazine/ShfaqMagazine`, authentikimi);
      console.log(publisherID);
      setMagazine(
        Magazine.data
          .filter((item) => item.publisherID == publisherID)
          .map((k) => ({
            ID: k.magazineID,
            MagazineName: k.magazineName,
            IssueNumber: parseInt(k.issueNumber),
            Publisher: (k.publisher && k.publisher.publisherName) + ' - ' + (k.publisher && k.publisher.location)
          }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <KontrolloAksesinNeFaqe vetemAdmin />
      <Titulli titulli={'Magazine'} />
      {shfaqMesazhin && <Mesazhi setShfaqMesazhin={setShfaqMesazhin} pershkrimi={pershkrimiMesazhit} tipi={tipiMesazhit} />}
      {shto && (
        <ShtoMagazine
          shfaq={handleShow}
          largo={handleClose}
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
      {shfaqMesazhin && <Mesazhi setShfaqMesazhin={setShfaqMesazhin} pershkrimi={pershkrimiMesazhit} tipi={tipiMesazhit} />}
      {edito && (
        <EditoMagazine
          largo={handleEditoMbyll}
          id={id}
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
      {fshij && (
        <LargoMagazine
          largo={handleFshijMbyll}
          id={id}
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
      {loading ? (
        <div className="Loader">
          <TailSpin
            height="80"
            width="80"
            color="#009879"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-danger"
              title="Zgjedhni Publisher"
              id="input-group-dropdown-2"
              align="end"
              onSelect={handleKerkoNgaIDPrimare}
            >
              {publisher &&
                publisher.map((item) => {
                  return (
                    <Dropdown.Item key={item.publisherID} eventKey={item.publisherID}>
                      {item.publisherName} - {item.location}
                    </Dropdown.Item>
                  );
                })}
            </DropdownButton>
            <Button variant="outline-danger" onClick={() => setPerditeso(Date.now())}>
              Pastro Filtrat
            </Button>
          </InputGroup>

          <Tabela
            data={magazine}
            tableName="Lista e Magazine"
            kaButona
            funksionButonEdit={(e) => handleEdito(e)}
            funksionButonShto={() => handleShow()}
            funksionButonFshij={(e) => handleFshij(e)}
          />
        </>
      )}
    </div>
  );
}

export default Magazine;
