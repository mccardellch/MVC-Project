const handleLocation = (e) => {
  e.preventDefault();
  
//  $("#screenMessage").animate({width:'hide'}, 350);
  
  if($("#locName").val() == '' || $("#locType").val() == '' || $("#locLocation").val() == '' || $("#locAbout").val() == '') {
    
    console.log("location error");
    handleError("All fields are required");
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
    <h3>Add A Skate Location</h3>  

    <label htmlFor="name">Name: </label><input id="locName" type="text" name="name" placeholder="Location Name"/>
      
    <label htmlFor="type">Type: </label>
    <select id="locType" name="type" >
      <option value='shop'>Skate Shop</option>
      <option value='park'>Skate Park</option>
      <option value='spot'>Skate Spot</option>
    </select><br />

    <label htmlFor="location">Location: </label>      
    <input type='text' id='locLocation' name='location' required />
      
    <label htmlFor="About">about: </label>      
    <input type='text' id='locAbout' name='about' required />
      
    <input type="hidden" name="_csrf" value={props.csrf} /> <br/><br/>
    <input className="makeLocSubmit" type="submit" value="Make Location" />   
  </form>
  );
};

const LocationList = function(props) {
  if (props.locations.length === 0){
    return (
      <div className="LocationList">
        <h3 className="emptyLocation">No Locations yet</h3>
      </div>
    );
  }
  
const locNodes = props.locations.map(function(loc) {     
    var image = "";
    switch (loc.type) {
      case 'park':
        image = "/assets/img/park-icon.png";
        break;
      case 'shop':
        image = "/assets/img/shop-icon.png";
        break;
      case 'spot':
        image = "/assets/img/spot-icon.png";
        break;
      default:
        image = "/assets/img/board.jpg";
        break;
    }
    
    return (
      <div key={locations._id} className="location">
        <img src={image} alt="icon" className="board" />
        <h3 className="locName">Name: {loc.name} </h3>
        <h3 className="locType">Type: {loc.type} </h3>
        <h3 className="locLocation">Location: {loc.location}</h3>
        <p className="locDescription">Description: {loc.description}</p>
      </div>
    );
  });
  
  return (
    <div className="LocationList">
      {locNodes}
    </div> 
  );
};

const loadLocsFromServer = () => {
  sendAjax('GET', '/getMyLocations', null, (data) => {
    ReactDOM.render(
      <LocationList locations={data.locations} />, document.querySelector("#locations")
    );
  });
};

const setup = function(csrf) {
  ReactDOM.render(
    <AddForm csrf={csrf} />, document.querySelector("#controls")
  );
  
  ReactDOM.render(
    <LocationList locations={[]} />, document.querySelector("#locations")
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