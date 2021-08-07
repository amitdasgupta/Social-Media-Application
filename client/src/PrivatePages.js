import ROUTES, { RenderRoutes } from './Route';
import styles from './stylesheets/pages/Home.module.scss';
import TopBar from './components/Topbar/TopBar';
import Sidebar from './components/Sidebar';

function PrivatePages() {
  const privateRoutes = ROUTES.PRIVATE;
  return (
    <>
      <TopBar />
      <div className={styles.mainContent}>
        <Sidebar />
        <RenderRoutes routes={privateRoutes} />
      </div>
    </>
  );
}

export default PrivatePages;
