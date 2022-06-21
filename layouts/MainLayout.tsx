import Header from "../components/header/Header";
import background from '../assets/background.png'

export default function MainLayout({children}: any) {
  return(
    <div style={{background: `url(${background.src}) #fff`}} className="mainLayout">
      <div className="mainLayoutContainer">
        <Header />
        {children}
      </div>
  
    </div>
  )
}