'use client'

import { useMediaQuery } from '@mui/material';
import ResponsiveSideBar from './ResponsiveSideBar'
import Sidebar from './Sidebar'
// import Appbar from './Appbar';
import { useState } from 'react';
// import Table from '../'
const MainFile = () => {
  const isMobile = useMediaQuery("(min-width:600px)");
  

  return <>
  
  {isMobile ? <Sidebar /> : <ResponsiveSideBar />} 
 
  </>

}

export default MainFile