// Licensed to the end users under one or more agreements.
// Copyright (c) 2025 Junaid Atari, and contributors
// Repository: https://github.com/blacksmoke26/ims-frontend

import cn from 'classnames';

interface Props {
  centerAll?: boolean;
  children: React.ReactNode;
}

const PageContent = (props: Props) => {
  return (
    <div className="page-content">
      <div className="content-wrapper">
        <div className="content-inner">
          <div className={cn({'content d-flex justify-content-center align-items-center': props?.centerAll})}>
            {props.children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageContent;
