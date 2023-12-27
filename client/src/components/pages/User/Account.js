import './Account.css'
import axios from 'axios';

import { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from 'react-router-dom';

import MountDisplay from '../../interface/tools/MountDisplay';
import ConnectedApps from './ConnectedApps';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faWrench } from '@fortawesome/free-solid-svg-icons';
import camera from '../../../media/images/camera.png'

const serverUrl = (process.env.NODE_ENV === 'development') 
? 'http://localhost:8080'
: 'https://www.kagwave.com';

const Account = (props) => {

  const { user, isLoggedIn } = props;
  const navigate = useNavigate();

  const [editedInfo, setEditedInfo] = useState({});
  const [toolbarTitle, setToolbarTitle] = useState('Your Account');
  const [connectResponse, setConnectResponse] = useState(null);
  const [userPhoto, setUserPhoto] = useState(user ? user.profile_photo : null);
  const [accountInfo, setAccountInfo] = useState();
  
  //Init
  useEffect(() => {
    console.log(isLoggedIn)
    if (isLoggedIn) {
      fetchAccount();
      window.location.hash = "id=" + user.id;
    }
    getLoginStatus();
  }, [props]);

  useEffect(() => {
    if (accountInfo) {
      MountDisplay(accountInfo.profile_photo, accountInfo.name.first_name + "'s Account");
    }
  }, [accountInfo]);

  const getLoginStatus = () => {
    fetch(`${serverUrl}/login/status`, {credentials: 'include'})
      .then(response => {
        return response.json();
      })
      .then(data => {
        setConnectResponse(data.status);
      })
      .catch((error) => {
        console.log(error)
      });
  }

  const fetchAccount = () => {
    axios({
      method: "POST", 
      url: `${serverUrl}/account/info`, 
      data: user
    }).then((response)=>{
      setAccountInfo(response.data);
    }).catch(err => { console.log(err); });
  }

  const saveEdits = () => {
    console.log(editedInfo);
    //update database
    axios({
      method: "POST", 
      url: `${serverUrl}/account/save`, 
      headers: {
        'Content-Type': 'application/json',
      },
      data:  editedInfo
    }).then((response)=>{
        return;
    }).catch(err => { console.log(err); 
  });


  //update fields
    Object.keys(editedInfo.edits).forEach(key => {
      if (key === 'name'){
        Object.keys(editedInfo.edits.name).forEach(partOfName => {
          document.getElementById(`${partOfName}`).placeholder = editedInfo.edits.name[partOfName]
        });
        /*Object.keys(editedInfo.edits[key]).forEach(subKey => {
          console.log(subKey);
          document.getElementById(`${subKey}`).placeholder = editedInfo.edits[key][subKey]
        });*/
      } else if (key === 'gender') {
        document.querySelector('.gender-placeholder').innerHTML = (editedInfo.edits[key].charAt(0).toUpperCase() + editedInfo.edits[key].slice(1));
      } else {
        document.getElementById(`${key}`).placeholder = editedInfo.edits[key];
        document.getElementById(`${key}`).style.width = '100%';
      }
    });
    exitEditor();
  }

  const discardEdits = () => {
    setEditedInfo({});
    setUserPhoto(props.user.profile_photo);
    exitEditor();
  }

  const openEditor = () => {
    window.location.hash = "id=" + user.id + "?edit";
    setToolbarTitle('Edit Information');
    setEditedInfo({
      userId: user.id,
      edits: {
        //make sure name stays intact
        name: {
          first_name: accountInfo.name.first_name,
          last_name: accountInfo.name.last_name
        }
      }
    });
    var userImg = document.querySelector('.user-img');
    userImg.style.opacity = 0.7;
     
    var inputs = document.getElementsByClassName('profile-input');
    var editBtn = document.querySelector('.edit-btn');
    var submitBtns = document.querySelector('.edit-account-options');
    var noInputs = document.getElementsByClassName('profile-info-no-input');
    var hiddenInputs = document.getElementsByClassName('hidden-profile-input');
    
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = false;
      inputs[i].style.border = '1px solid gray';
      inputs[i].value = inputs[i].placeholder;
      inputs[i].classList.add('fade-in-quick');
    } for (let i = 0; i < noInputs.length; i++) {
      noInputs[i].style.display = 'none'
    } for (let i = 0; i < hiddenInputs.length; i++) {
      hiddenInputs[i].style.display = 'flex';
    }

    editBtn.style.display = 'none';
    submitBtns.style.display = "flex";
  }

  const exitEditor = () => {
    window.location.hash = "id=" + props.user.id;
    setToolbarTitle('Your Account');

    var userImg = document.querySelector('.user-img');
    userImg.style.opacity = 1;

    var inputs = document.getElementsByClassName('profile-input');
    var editBtn = document.querySelector('.edit-btn');
    var submitBtns = document.querySelector('.edit-account-options');
    var noInputs = document.getElementsByClassName('profile-info-no-input');
    var hiddenInputs = document.getElementsByClassName('hidden-profile-input');
    

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].readOnly = true;
      inputs[i].value = null;
      inputs[i].style.border = 'none';
      inputs[i].classList.add('fade-in-quick');
    } for (let i = 0; i < noInputs.length; i++) {
      noInputs[i].style.display = 'flex'
    } for (let i = 0; i < hiddenInputs.length; i++) {
      hiddenInputs[i].style.display = 'none'
    }

    editBtn.style.display = 'flex';
    submitBtns.style.display = "none";

  }

  const handleChange = (e) => {
    let label = e.target.id;
    let entry = e.target.value;
    if (label === "profilePhoto") {
      let base64String = "";
      var src = URL.createObjectURL(e.target.files[0]);
      var file = e.target.files[0];
  
      var reader = new FileReader();
      console.log("next");
        
      reader.onload = function () {
          base64String = reader.result.replace("data:", "")
              .replace(/^.+,/, "");
    
          //imageBase64Stringsep = base64String;
          setEditedInfo((prevState) => ({
            ...prevState,
            edits : {
              ...prevState.edits,
              profile_photo: base64String}
          }));
          // alert(imageBase64Stringsep);
          console.log(base64String);
      }
      reader.readAsDataURL(file);

      setUserPhoto(src);
    } else if (label === 'first_name' || label === 'last_name'){
      setEditedInfo((prevState) => ({
        ...prevState,
        edits : {
          ...prevState.edits,
          name: { 
            ...prevState.edits.name,
            [label]: entry
          }
        }
      }));
    } else {
      setEditedInfo((prevState) => ({
        ...prevState,
        edits : {
          ...prevState.edits,
          [label]: entry
        }
      }));
    }
    //setTimeout(() => {
    //console.log(e.target.files[0])
    //}, 1000)
  };

  const handleSelect = (e) => {
    let select = document.getElementById('gender');
    let currentOpt = select.options[select.selectedIndex].text.toLowerCase();
    setEditedInfo((prevState) => ({
      ...prevState,
      edits : {
        ...prevState.edits,
        gender: currentOpt
      }
    }));
  };


  
  return ( 
    <div id="page-content" >

      <div className="profile-pg">
      
      {isLoggedIn !== null ? 
      
        (isLoggedIn ?
      
          (accountInfo &&
          <div className="user-profile">
            
            <div className="user-overview">
            
              <div className="user-img" style={{
                backgroundImage:`url(${accountInfo ? accountInfo.profile_photo : userPhoto})`,
                backgroundSize: '100% 100%',
                width: '16vw', height: '16vw',
                minHeight: '120px', minWidth: '120px'
              }}>
                <div className="edit-user-img hidden-profile-input">
                  <input type="file" name="file" id="profilePhoto" className="file-input" accept="image/*"
                    onChange={handleChange}
                  />
                  <label for="profilePhoto" className="edit-img-btn">
                    <img src={camera} id="edit-img-icon" alt="Edit" />
                  </label>
                </div>
              </div> 

              <div className="user-joined">
                <h1>Joined</h1>
                <h2>{accountInfo && accountInfo.date_joined}</h2>
              </div>

            </div>

            <div id="seperator" className="info-sep draw-up" style={{minHeight: '100%', width: '3px'}}></div>

            <div className="user-information-container">

              <div className="user-information">

                <div className="user-information-toolbar">
                  <h1>{toolbarTitle}</h1>
                  
                  <div className="edit-btn fade-in"
                    onClick={openEditor}
                    onMouseEnter={() => {document.querySelector('.edit-profile-btn-txt').innerHTML = "&nbsp Edit";}}
                    onMouseLeave={() => {document.querySelector('.edit-profile-btn-txt').innerHTML = ""}}
                  >
                    <FontAwesomeIcon icon={faWrench} size="lg"/>  
                    <span className="edit-profile-btn-txt"> </span>
                  </div>

                  <div className="edit-account-options fade-in-quick" style={{display:'none'}}>
                    <button type="submit" className="edit-account-options-btn" style={{backgroundColor: 'rgb(49, 96, 154)'}}
                      onClick={saveEdits}> Save
                    </button>
                    <button className="edit-account-options-btn" style={{backgroundColor: 'black'}}
                      onClick={discardEdits}> Discard
                    </button>
                  </div>

                </div>
              
                <div id="seperator" className="draw-right"></div>

                <div className="user-information-categories">
                  
                  <div className="user-basic-info">

                    <div className="profile-info-group">
                      <h1> Name</h1>

                      <div className="name-field-container">
                        <div className="name-field">
                          <h2>First</h2>
                          <input type="profile-name" id="first_name" className="profile-input" autoComplete='off'
                            onChange={handleChange} placeholder={accountInfo ? accountInfo.name.first_name : null} readOnly
                          />
                        </div>
                        <div className="name-field">
                          <h2>Last</h2>
                          <input type="profile-name" id="last_name" className="profile-input" autoComplete='off'
                            onChange={handleChange} placeholder={accountInfo ? accountInfo.name.last_name : null} readOnly
                          />
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-group">
                      <h1>Email</h1>

                      <div className="input-container" style={{width: '100%'}}> 
                        <input type="profile" id="email" className="profile-input" autoComplete='off'
                            onChange={handleChange} 
                            placeholder={accountInfo ? accountInfo.email : null} 
                            readOnly
                            pattern="^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$" 
                            title="example@provider.com"
                            style={{width: '100%'}}
                        />
                      </div>
                      <div style={{textIndent: '7px', fontFamily: "Neo", color: 'gray', fontSize: '12px', marginTop: '5px'}}>
                        {accountInfo ? (accountInfo.email_activated ? "(Verified)" : "(Pending)") : null }
                      </div>
                    </div>

                    <div className="profile-info-group">
                      <h1>Birthday</h1>

                      <div className="input-container">
                        <input type="profile" id="birthday" className="profile-input" autoComplete='off'
                            onChange={handleChange} readOnly
                            placeholder={accountInfo ? accountInfo.birthday : null} 
                            pattern="^(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d$"
                            title="mm/dd/yyyy"
                        />
                      </div>
                    </div>
                      
                    <div className="profile-info-group">
                      <h1>Gender</h1>

                      <div className="input-container">
                        <div className="profile-info-no-input gender-placeholder">
                          {accountInfo ? (accountInfo.gender ? (accountInfo.gender.charAt(0).toUpperCase() + accountInfo.gender.slice(1)) : null) : null }
                        </div>

                        <div className="hidden-profile-input">
                          <select id="gender" onChange={handleSelect}>
                            <option className="gender-option">(choose one)</option>
                            <option value="Male" className="gender-option">Male</option>
                            <option value="Female" className="gender-option">Female</option>
                            <option value="Non-binary" className="gender-option">Non-Binary</option>
                          </select>
                        </div>

                      </div>
                    </div>

                  </div>

                  <div className="user-extra-info">
                    <div className="profile-info-group">
                      <h1> Address</h1>

                      <div className="address-field" style={{width: '100%'}}>
                        <h2>Street</h2>

                        <input type="profile" id="address-street" style={{marginBottom: '10px', width: '100%'}} className="profile-input"
                            onChange={handleChange} placeholder="" readOnly autoComplete='off'
                        />
                      </div>

                      <div id="address-field-container">

                        <div className="address-field">
                          <h2>Country</h2>
                          <input type="profile-name" id="address-country" className="profile-input"
                            onChange={handleChange} placeholder='' readOnly autoComplete='off'
                          />
                        </div>

                        <div className="address-field">
                          <h2>Zip</h2>
                          <input type="profile-name" id="address-zip" className="profile-input"
                            onChange={handleChange} placeholder='' readOnly autoComplete='off'
                          />
                        </div>
                      </div>
                    </div>

                    <div className="profile-info-group">
                      <h1> Connected Apps</h1>
                      <ConnectedApps user={user} providers={accountInfo ? accountInfo.externalProviderInfo : null} fetchAccount={fetchAccount}/>
                      <div className="connectionResponse">
                        {connectResponse}
                      </div>
                    </div>

                    <div className="profile-info-group">
                      <NavLink to="/world/profile" style={{textDecoration: 'none'}}>
                        <h3> Your kagwave Account <FontAwesomeIcon icon={faChevronRight}/></h3>
                      </NavLink>
                    </div>

                  </div>

                </div>

              </div>
              
            </div>

          </div>)
        :

          <div className="not-logged-in fade-in-quick">
            <h1>You are not logged in.</h1>
            <span style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}} onClick={() => navigate('/login')}>
              <h2> Sign in to access your profile.&nbsp;</h2>
              <FontAwesomeIcon icon={faChevronRight} color="white"/>
            </span>
          </div> 
        )
      
      :

        <div className="macOS-loader">
          <div className="spinner center">
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
            <div className="spinner-blade"></div>
          </div>
        </div>

      }

      </div>
      
    </div>
  );
}
 
export default Account;