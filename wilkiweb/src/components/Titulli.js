import { Helmet } from 'react-helmet';

function Titulli({ titulli }) {
  return (
    <Helmet>
      <title>{titulli} | Wilki</title>
    </Helmet>
  );
}

export default Titulli;
