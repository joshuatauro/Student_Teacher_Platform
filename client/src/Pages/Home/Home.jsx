import './home.scss';
import MainNavbar from '../../Components/MainNavbar';
import CollegeList from '../../Components/CollegeList/CollegeList';

function Home() {
  return (
    <>
      
      <div id="Home" className="Home">
      
        <MainNavbar />
        <CollegeList />
        <section class="hero">
          <div class="content">
            <div class="textbox">
              <h1>WELCOME TO<br/>HIVE<span>!</span></h1>
              <h3>"Discover your path to higher education with just a few clicks."</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis cum, maxime provident sit, voluptate eum commodi cumque eos placeat officia eius.</p>

              
                
                <div class="search">

                  <input type="text" placeholder="Search for college..."/>
                  <button>search</button>
                </div>
            </div>
            <div class="imgbox">
              <img src="./img.png"></img>
            </div>
          </div>

        </section>
        
      </div>
    </>
    
  );
}

export default Home;
