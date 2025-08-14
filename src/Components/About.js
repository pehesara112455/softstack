import react from "react";
import Navbar from "./Navbar";
import '../Styles/Aboutstyle.css';
import Img1 from     '../Resousers/Img1.png';
import Footer from './Footer';
import Img2 from     '../Resousers/Img2.png';
import Img3 from     '../Resousers/Img3.png';
import Img4 from     '../Resousers/Img4.png';









function Aboutpage(){
    return(
        
            <div className="About-container">
                <Navbar/>
               <div className="content">
                  <div className="left-side">
        
        <img
        src={Img1}
        alt="img1"
        className="IMG1"
        />
        <div className="mission-section">
          <h2>OUR MISSION</h2>
          <ol>
    <li>
      Safeguarding the rights of the people who are subjected to poverty, injustice and oppression.
      <ul>
        <li>
          Appearing on behalf of economic processes based on people-oriented policies and supporting such alternative processes.
        </li>
      </ul>
    </li>
    <li>
      Promoting democratic good governance in state and other institutions at divisional, provincial and national levels.
    </li>
    <li>
      Encouraging women to become involved in social and economic development, making them realize their oppression and directing them to organize to gain their rights.
    </li>
    <li>
      Pressurizing those responsible and educating the people to promote a structure based on a people-friendly health policy.
      <ul>
        <li>
          Promoting health practices and knowledge which include the indigenous health system.
        </li>
      </ul>
    </li>
    <li>
      Forming and organizing a group of youth and students who value humanness, who are intelligent and who will become opinion-makers.
    </li>
    <li>
      Educating, directing and activating people for conserving and nourishing the environment.
    </li>
  </ol>

          
        </div>
        <img src={Img2} alt="img2" className="IMG2"/>
        
      </div>
      <div className="right-side">
       
        <div className="Vision">
          <h2>OUR VISION</h2>
            <p>
              A society in which the democratic rights of all are ensured, regardless of differences in race, creed, caste, gender, etc. The core values of society are respected, and it is devoid of poverty, injustice, and repression. It also ensures the preservation of the environment, including all living beings.
            </p>

        </div>
        <img
        src={Img3}
        alt="img3"
        className="IMG3"/>
        <div className="vision-section">
          <div className="philosophy-section">
    <h2>OUR OVERALL PHILOSOPHY</h2>
    <ol>
      <li>We believe in the equal dignity of all human beings.</li>
      <li>We believe that people should be able to lead healthy, contented, fulfilled lives, as far as possible.</li>
      <li>We realize that the present world structures, completely controlled by profit motives, make the lives of the majority miserable, forcing them to live subhuman lives.</li>
      <li>We believe that these structures can and should be changed.</li>
      <li>We believe that both oppressed and other concerned groups can and should be motivated to work for desired change.</li>
      <li>We believe that sustaining the hope for a better world for our children provides deep motivation to work out plans for change.</li>
      <li>Since every person is a social being, social development is as important as individual development, and the sustained balance between the two aspects is necessary.</li>
    </ol>
  </div>
   
  </div>
   

  

        
        
      </div>


               </div>
                
                
      <div className="description">
    <p>
      The Community Education Centre (CEC) began in the mid-1970s as a small group of committed individuals responding to the suffering and injustices faced by marginalized communities in Sri Lanka. From 1976–1978, they traveled across the country, engaging with grassroots organizations, conducting leadership training, and offering alternative health education. In the following years, CEC expanded its focus to include alternative pre-schools, health worker training, and deepened its political awareness through partnerships with farmers, workers, and women. The 1980s saw CEC responding to the racial violence of Black July and forming new farmer and women's associations. Despite facing death threats during the violent political climate of the late 1980s, the Centre stood firmly for peace, justice, and nonviolence.
    </p>
    <p>
      During the 1990s, CEC’s reach expanded significantly. It played an active role in the Free and Fair Elections campaign, contributed to the National Poverty Alleviation Program, and participated in global movements such as the Beijing Women's Conference. The Centre’s community-based programs particularly in education, health, and women's empowerment flourished across five districts. However, the political disappointments and funding cuts after 1996 led to a reduction in certain activities, especially children's programs. Nevertheless, the spirit of resilience remained strong. From 1999 to 2002, CEC revitalized its presence by reorganizing local networks and strengthening its governance and health programs. It promoted leadership, good governance, and community health under the theme of an "Alternative People’s Health Policy."
    </p>
  </div> 
  <div className="content">
    <div className="left-side2">
      <div className="todaycec">
         <p className="intro-paragraph">
    Today, CEC works in partnership with nine legally recognized regional organizations:
  </p>
  <ul className="partner-list">
    <li>Uwa Wellassa Farmer Women's Organisation – Monaragala</li>
    <li>Community Resource Protection Centre – Monaragala</li>
    <li>Human Resource Development Youth Guild – Hambantota</li>
    <li>Ruhunu Community Development Centre – Kosgoda</li>
    <li>Dambulla Community Resource Development Centre – Matale</li>
    <li>Youth Resources Development Guild – Matale</li>
    <li>Rajarata Janaprobodhini Foundation – Kakirawa</li>
    <li>Vanni Community Development Foundation – Thanthirimale</li>
    <li>Eastern United Women’s Organization – Kantale</li>
  </ul>

  <p className="core-paragraph">
    The national centre continues to coordinate and support these partners through four core sections:
  </p>
  <ul className="core-sections">
    <li>Training</li>
    <li>Information and Documentation</li>
    <li>Networking</li>
    <li>Field Activities</li>
  </ul>

  <p className="mission-note">
    This structure ensures CEC’s long-standing commitment to justice, equity, and grassroots empowerment continues into the new millennium.
  </p>

      </div>
    </div>
    <div className="right-side2">
        <img src={Img3} alt="Img4" className="IMG4"/>
    </div>
  </div>

<Footer/>
            </div>
            
            
        
    )
}
export default Aboutpage;