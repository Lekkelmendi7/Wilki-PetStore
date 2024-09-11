import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { TailSpin } from 'react-loader-spinner';
import Tabela from '../../../../components/Tabela/Tabela';
import Mesazhi from '../../../../components/Mesazhi';
import { Helmet } from 'react-helmet';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import ShtoPlanet from './ShtoPlanet';
import EditoPlanet from './EditoPlanet';
import LargoPlanet from './LargoPlanet';
import KontrolloAksesinNeFaqe from '../../../../components/KontrolliAksesit/KontrolloAksesinNeFaqe';
import Titulli from './../../../../components/Titulli';
import { Description } from '@mui/icons-material';

function Planet(props) {
  const [planet, setPlanet] = useState([]);
  const [perditeso, setPerditeso] = useState('');
  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
  const [tipiMesazhit, setTipiMesazhit] = useState('');
  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState('');
  const [loading, setLoading] = useState(false);

  const getToken = localStorage.getItem('token');

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`
    }
  };

  useEffect(() => {
    const ShfaqPlanet = async () => {
      try {
        setLoading(true);
        const Planet = await axios.get('https://localhost:7251/api/MbrojtjaEProjektit/Planet/ShfaqPlanet', authentikimi);
        setPlanet(
          Planet.data.map((k) => ({
            ID: k.planetID,
            Name: k.name,
            Type: k.type
          }))
        );
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    ShfaqPlanet();
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

  return (
    <div>
      <KontrolloAksesinNeFaqe vetemAdmin />
      <Titulli titulli={'Planet'} />
      {shfaqMesazhin && <Mesazhi setShfaqMesazhin={setShfaqMesazhin} pershkrimi={pershkrimiMesazhit} tipi={tipiMesazhit} />}
      {shto && (
        <ShtoPlanet
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
        <EditoPlanet
          largo={handleEditoMbyll}
          id={id}
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        />
      )}
      {fshij && (
        <LargoPlanet
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
          <Tabela
            data={planet}
            tableName="Lista e Planet"
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

export default Planet;
