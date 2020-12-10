import { Row } from 'reactstrap';
import Link from 'next/link';

import { Colxx } from '../../../components/common/CustomBootstrap';

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="footer-content">
        <div className="container-fluid">
          <Row>
            <Colxx xxs="12" sm="6">
              <p className="mb-0 text-muted">ColoredStrategies 2020</p>
            </Colxx>
            <Colxx className="col-sm-6 d-none d-sm-block">
              <ul className="breadcrumb pt-0 pr-0 float-right">
                <li className="breadcrumb-item mb-0">
                  <Link href="/" passHref>
                    <a className="btn-link">Review</a>
                  </Link>
                </li>
                <li className="breadcrumb-item mb-0">
                  <Link href="/" passHref>
                    <a className="btn-link">Purchase</a>
                  </Link>
                </li>
                <li className="breadcrumb-item mb-0">
                  <Link href="/" passHref>
                    <a className="btn-link">Docs</a>
                  </Link>
                </li>
              </ul>
            </Colxx>
          </Row>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
