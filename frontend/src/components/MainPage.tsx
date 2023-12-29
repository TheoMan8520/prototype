import { ReactNode } from 'react';
import '../css/main-page.css';
import Header from './Header';

interface Props {
    children: ReactNode;
}

const MainPage = ({children}: Props) => {
  return (
    <div className="page">
        <Header text="Weekly"/>
        <div className="working-frame">
            <div className="left-body-section"></div>
            <div className="middle-body-section">
                {children}
            </div>
            <div className="right-body-section"></div>
        H</div>
    </div>
  )
}

export default MainPage
