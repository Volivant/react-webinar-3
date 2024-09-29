import { memo } from 'react';
import { Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import MainCatalog from '../main-catalog';
import MainProduct from '../main-product';


function Main() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" exact element={<MainCatalog/>} />
        <Route path="/product" element={<MainProduct/>} />
      </Routes>
    </PageLayout>
  );
}

export default memo(Main);
