import React, { useState, Suspense } from "react";
import showTaskStyle from '../assests/styles/index.module.scss'
const Header = React.lazy(() => import('../components/Header'));
const ShowTask = React.lazy(() => import('../components/ShowTask'));
const RadialBarChart = React.lazy(() => import('../components/RadialBarChart'));


function Home() {
  const [flag, setFlag] = useState(true)

  return (
    <main className={showTaskStyle['home-container']}>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <RadialBarChart flag={flag} />
          <ShowTask setFlag={setFlag} flag={flag} />
        </Suspense>
    </main>
  );
}

export default Home;