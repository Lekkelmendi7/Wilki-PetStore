import { useEffect, useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Tabela from '../../../../components/Tabela/Tabela';
import Mesazhi from '../../../../components/Mesazhi';
import ShtoSatellite from './ShtoSatellite';
import EditoSatellite from './EditoSatellite';
import LargoSatellite from './LargoSatellite';
import KontrolloAksesinNeFaqe from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFaqe';
import Titulli from './../../../../components/Titulli';
import { Button, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';

function Satellite(props) {
  const [satellite, setSatellite] = useState([]);
  const [perditeso, setPerditeso] = useState('');
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState('');
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState('');
  const [loading, setLoading] = useState(false);

  const [planet, setPlanet] = useState('');

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const shfaqSatellite = async () => {
      try {
        setLoading(true);
        const satellite = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Satellite/shfaqSatellite', authentikimi);
        setSatellite(
          satellite.data.map((k) => ({
            ID: k.satelliteID,
            Name: k.name,
            Planet: (k.planet && k.planet.name) + ' - ' + (k.planet && k.planet.type)
          }))
        );
        const planet = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet', authentikimi);
        setPlanet(planet.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    shfaqSatellite();
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

  const handleKerkoNgaIDPrimare = async (planetID) => {
    try {
      const Satellite = await axios.get(`https://localhost:7251/api/MbrojtjaEProjektit/Satellite/ShfaqSatellite`, authentikimi);
      console.log(planetID);
      setSatellite(
        Satellite.data
          .filter((item) => item.planetID == planetID)
          .map((k) => ({
            ID: k.satelliteID,
            Name: k.name,
            Role: k.role,
            Planet: (k.planet && k.planet.name) + ' - ' + (k.planet && k.planet.type)
          }))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <KontrolloAksesinNeFaqe vetemAdmin />
      <Titulli titulli={'Satellite'} />
      {shfaqMesazhin && <Mesazhi setShfaqMesazhin={setShfaqMesazhin} pershkrimi={pershkrimiMesazhit} tipi={tipiMesazhit} />}
      {shto && (
        <ShtoSatellite
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
        <EditoSatellite
          largo={handleEditoMbyll}
          id={id}
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
      {fshij && (
        <LargoSatellite
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
              variant="outline-secondary"
              title="Zgjedhni Planet"
              id="input-planet-dropdown-2"
              align="end"
              onSelect={handleKerkoNgaIDPrimare}
            >
              {planet &&
                planet.map((item) => {
                  return (
                    <Dropdown.Item key={item.planetID} eventKey={item.planetID}>
                      {item.name} - {item.type}
                    </Dropdown.Item>
                  );
                })}
            </DropdownButton>
            <Button variant="outline-secondary" onClick={() => setPerditeso(Date.now())}>
              Pastro Filtrat
            </Button>
          </InputGroup>

          <Tabela
            data={satellite}
            tableName="Lista e Satellite"
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

export default Satellite;
