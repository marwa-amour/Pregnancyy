import '../../styles/validate.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {

  return (
    <div className='Footer'>
      <MDBFooter className='text-center text-lg-start text-muted'>
        <section className=''>
          <MDBContainer className='text-center text-md-start mt-2'>
            <MDBRow className='mt-2'>
              <MDBCol md="7" lg="7" xl="7" className='mx-auto mb-2'>
                <h6 className='text-uppercase text-center fw-bold mb-4'>
                  <MDBIcon icon="gem" className="me-3" />
                  About Us
                </h6>
                <p>
                An application that provides information and facts about pregnancy in a smooth and simplified manner, with the following features
                </p>
                <p>
                In every week of the pregnancy, the pregnant woman can view all information related to the fetus or the pregnant woman.
                </p>
                <p>
                Determine the final date of pregnancy, passing through the stages of pregnancy. Determine the beginning and end of pregnancy, showing the current period in days and weeks and months
                </p>
              </MDBCol>

              <MDBCol md="1" lg="1" xl="1" className='mx-auto mb-2'>
                <h6 className='text-uppercase text-center fw-bold mb-4'>Links</h6>
                <ul>
                  <li><a href='/' className='text-reset'>Home</a></li>
                  <li><a href='/posts' className='text-reset'>Posts</a></li>
                  <li><a href='sports' className='text-reset'>Sports</a></li>
                  <li><a href='weeks' className='text-reset'>Pregnancy's weeks</a></li>
                </ul>
              </MDBCol>

            </MDBRow>
          </MDBContainer>
        </section>

        <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
          © 2023 Copyright:
          <a className='text-reset fw-bold' href='/'>
            My Pregnancy in every specifics
          </a>
        </div>
      </MDBFooter>
    </div>
  );
}
