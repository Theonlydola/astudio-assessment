import { HomeRounded, Person, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import './Home.scss'
import styles from './Home.scss'
function Home() {
    const navigate = useNavigate();
    return (
        <div className='home'>
            <section>
                <HomeRounded sx={{ color: styles.yellow, fontSize: '200px' }} />
            </section>
            <section>
                <h1>  Welcome to the Users and Products Fetching Project! </h1>
                <br />
                <h3> Assessment for <a href='https://www.astudio.ae/' target="_blank" rel="noreferrer">ASTUDIO</a> </h3>
            </section>
            <br />
            <section className='navigator'>
                <div id='users' className='tile' onClick={() => navigate('/users')}>
                    <Person sx={{ color: styles.yellow, fontSize: '80px' }} />
                    <div>Users</div>
                </div>

                <div className='tile' onClick={() => navigate('/products')}>
                    <ShoppingCart sx={{ color: styles.yellow, fontSize: '80px' }} />
                    <div> Products </div>
                </div>
            </section>

        </div>
    );
}

export default Home;