import { Link } from 'react-router-dom'
import BootDotDev from '../../../assets/boot.dev.jpg'
import FlexBoxFroggy from '../../../assets/flexbox-froggy_100006.webp'
import GridGarden from '../../../assets/grid-garden.png'
import Scrimba from '../../../assets/scrimba.jpg'

import './MoreResources.css'

export const MoreResources = () => {
  return (
    <div className='more-ressources-container'>
        <h2>DES RESSOURCES SUPPLEMENTAIRES POUR S'ENTRAINER</h2>
        <div className='more-resources-websites'>
            <div className='scrimba'>
                <Link to="https://scrimba.com/home" target='_blank'>
                    <img src={Scrimba} alt="Scrimba" />
                </Link>
                <h3>SCRIMBA</h3>
            </div>
            <div className='flexbox-froggy'>
                <Link to="https://flexboxfroggy.com" target='_blank'>
                    <img src={FlexBoxFroggy} alt="Flexbox Froggy" />
                </Link>
                <h3>FLEXBOX FROGGY</h3>
            </div>
            <div className='grid-garden'>
                <Link to="https://cssgridgarden.com" target='_blank'>
                    <img src={GridGarden} alt="Grid Garden" />
                </Link>
                <h3>GRID GARDEN</h3>
            </div>
            <div className='boot-dot-dev'>
                <Link to="https://www.boot.dev/" target='_blank'>
                    <img src={BootDotDev} alt="Boot.dev" />
                </Link>
                <h3>BOOT.DEV</h3>
            </div>
        </div>
    </div>
  )
}
