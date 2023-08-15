'use client'

import { useMediaQuery } from '@mui/material';
import ResponsiveSideBar from './ResponsiveSideBar';
import Sidebar from './Sidebar';

const MainFile = () => {
  const isMobile = useMediaQuery("(max-width:500px)")
  return <>
    {isMobile ? <ResponsiveSideBar /> : <Sidebar />}
  </>

}
export default MainFile