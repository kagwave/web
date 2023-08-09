
import './Contact.css';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom'

import MountDisplay from '../../interface/tools/MountDisplay';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

const Contact = (props: any) => {

  const { match } = props;
  const history = useHistory();

  const [contactForm, setContactForm] = useState<any>({
    name: '', 
    company: '',
    position: '', 
    email: '', 
    inquiry: '', 
    message: '', 
    isSent: false, 
    err: ''
  });
  const [isSending, setIsSending] = useState<boolean | string>();
  const [response, setResponse] = useState();


  //init
  useEffect(() => {
    MountDisplay(undefined, "Contact");
  }, []);

  const handleChange = (e: any) => {
    setContactForm({
      ...contactForm,
      buttonText: 'Send',
      buttonColor: '#43CAEE',
    });
    let label = e.target.id;
    let entry = e.target.value;
    setContactForm((prevState: any) => ({
      ...prevState,
      [label]: entry
    }));
  };

  const handleSelect = (e: any) => {
    let select: any = document.getElementById('inquiry');
    let currentOpt = select.options[select.selectedIndex].text; 
    setContactForm((prevState: any) => ({
      ...prevState,
      inquiry: currentOpt
    }));
  };

  const formSubmit = async (e: any) => {
    e.preventDefault();
    setIsSending(true);
    try {
      let response = await axios.post(`${serverUrl}/contact`, contactForm);
      if (response.data.status === 'Success'){
        history.push(`${match.url}/success`);
        setIsSending('sent');
      } 
    } catch (err) {
      setIsSending(false);
    }

  };
  
  const resetForm = () => {
    setContactForm({name: '', 
    company: '',
    position: '', 
    email: '', 
    inquiry: '', 
    message: '',
    sent: false,
    err: ''})
  }
  
  return ( 
    <div id="page-content">

      <div className="contact-pg fade-in">

      <Route exact path={`${match.url}`} render={() => <>
        <div className="contact-pg-header">
          Get in touch.
        </div>

        <div id="smaller-seperator"></div>

        <div className="contact-box ">

            <form id="contact-form" onSubmit={formSubmit} method="POST">

              <div id="input-fields">

                <input type="text" id="name" placeholder="Name" className='contact-form-input'required value={contactForm.name} onChange={handleChange}/>

                <input type="text" id="company" placeholder="Brand/Company" className='contact-form-input' value={contactForm.company} onChange={handleChange}/>
          
                <input type="text" id="email" placeholder="Email" className='contact-form-input' required value={contactForm.email}  onChange={handleChange}/>

                <select onChange={handleSelect} id="inquiry" className='contact-form-input'> 
                  <option value="canada">(select inquiry type)</option>
                  <option value="licensing">Licensing</option>
                  <option value="bookings">Bookings</option>
                  <option value="customprod">Custom Production</option>
                  <option value="mixmaster">Mix Engineering/Mastering</option>
                  <option value="creativeconsult">Creative Consultancy</option>
                  <option value="other">Other</option>
                </select>

                <textarea id="message" placeholder="Message.." style={{height:'200px'}} className='contact-form-input'
                  required value={contactForm.message}
                  onChange= {handleChange}
                />
          
              </div>

              <button id="submit" type="submit" style={{backgroundColor: '#43CAEE'}}>
                {isSending ? 
                  'Sending'
                :
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} />
                    Send
                  </>
                }
              </button>

            </form>
        </div>
      </>}/>

      {isSending === 'sent' &&
        <Route exact path={`${match.url}/success`} render={() => 
          <div className="contact-success-pg">
            <h1>Thanks for reaching out!</h1>
              <br/>
            <p>We will be in touch shortly.</p>
          </div>
        }/>
      }

      </div>
    </div>
  );
}
 
export default Contact;