const handleLocation = (e) => {
  e.preventDefault();
  
  $("#screenMessage").animate({width:'hide'}, 350);
  
  if($("#locName").val() == '' || $("#loctype").val() == '') || $("#longitude").val() == '' || $("#latitude").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }
  
  sendAjax('POST', $("#addForm").attr("action"), $("#addForm").serialize(), function() {
    loadLocsFromServer();
  });
  
  return false;
};

const AddForm = (props) => {
  return (
  <form id="addForm" 
    name="addForm" 
    onSubmit={handleLocation} 
    action="/add" 
    method="POST" 
    className="addForm"
    >
    <label htmlFor="name">Name: </label>
    <input id="locName" type="text" name="name" placeholder="Location Name"/>
    <label htmlFor="type">Type: </label>
    <input id="locType" type="text" name="type" placeholder="Location Type"/>
    <label htmlFor="coords">Coordinates :</label>
      
    ( <input type='text' id='longitude' class='lnglat' name='longitude' required /> ,
    <input type='text' id='latitude' class='lnglat' name='latitude' required /> )
      
    <input type="hidden" name="_csrf" value={props.csrf} />
    <input className="makeLocSubmit" type="submit" value="Make Location" />   
  </form>
  );
};

const LocationList = function(props) {
  if (props.domos.length === 0){
    return (
      <div className="LocationList">
        <h3 className="emptyLocation">No Locations yet</h3>
      </div>
    );
  }
  
  const locNodes = props.domos.map(function(loc) {
    return (
      <div key={domo._id} className="domo">
        <img src="/assets/img/board.jpeg" alt="DEFAULT" className="board" />
        <h3 className="locName">Name: {loc.name} </h3>
        <h3 className="locType">Type: {loc.Type} </h3>
      </div>
    );
  });
  
  return (
    <div className="LocationList">
      {domoNodes}
    </div> 
  );
};

const loadLocsFromServer = () => {
  sendAjax('GET', '/getLocation', null, (data) => {
    ReactDOM.render(
      <DomoList domos={data.domos} />, document.querySelector("#domos")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <AddForm csrf={csrf} />, document.querySelector("#makeDomo")
  );
  
  ReactDOM.render(
    <LocationList domos={[]} />, document.querySelector("#domos")
  );
  
  loadLocsFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result)=> {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});