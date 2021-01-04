import Link from 'next/link';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const getMenuTitle = (sub) => {
  if (`/${sub}` === '/') return 'Home';
  return sub;
};

const getUrl = (path, sub, index) => {
  return path.split(sub)[0] + sub;
};

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <>
      <h1>{heading}</h1>
      <BreadcrumbItems match={match} />
    </>
  );
};

const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split('/');
  if (paths[paths.length - 1].indexOf(':') > -1) {
    paths = paths.filter((x) => x.indexOf(':') === -1);
  }
  return (
    <>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
        {paths.map((sub, index) => {
          return (
            <BreadcrumbItem
              key={index.toString()}
              active={paths.length === index + 1}
            >
              {paths.length !== index + 1 ? (
                <Link href={`/${getUrl(path, sub, index)}`} passHref>
                  <a>{getMenuTitle(sub)}</a>
                </Link>
              ) : (
                getMenuTitle(sub)
              )}
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadcrumbContainer;
