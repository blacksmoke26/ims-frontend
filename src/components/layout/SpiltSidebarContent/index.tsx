// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend


import {Container} from 'react-bootstrap';

// layout
import NavigationBar from '~components/layout/NavigationBar';
import Sidebar from './Sidebar.tsx';

interface SplitSidebarContentProps {
  children?: React.ReactNode;
  caption: React.ReactNode;
}

const SpiltSidebarContent = (props: SplitSidebarContentProps) => {
  return (
    <>
      <NavigationBar/>
      <Container className="layout-boxed px-0 mt-4">
        <div className="page-content">
          <div className="sidebar sidebar-dark sidebar-main sidebar-expand">
            <div className="sidebar-content">
              <div className="sidebar-section">
                <Sidebar/>
              </div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="content-inner">
              <div className="content pt-0">
                <div className="card">
                  <div className="card-body" style={{minHeight: 700}}>
                    <h4 className="page-title fw-normal pt-0 m-0">
                      {props.caption}
                    </h4>
                    <hr className="mt-2 mb-4"/>
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SpiltSidebarContent;
