const handleSearch = (e) => {
  e.preventDefault();
   
  sendAjax('POST', $("#searchForm").attr("action"), $("#searchForm").serialize(), function() {
    loadLocsFromServer();
  });
  
  return false;
};

const SearchForm = (props) => {
  return (
    
  <form id="searchForm" 
    name="searchForm" 
    onSubmit={handleSearch} 
    action="/search" 
    method="POST" 
    className="searchForm"
    >
    <h3>Filter Skate Locations</h3>  
      
    <label htmlFor="type">Type: </label>
    <select id="locType" name="type" >
      <option value='shop'>Skate Shop</option>
      <option value='park'>Skate Park</option>
      <option value='spot'>Skate Spot</option>
    </select><br />
      
    <input type="hidden" name="_csrf" value={props.csrf} /> <br/><br/>
    <input className="searchLocSubmit" type="submit" value="Search" />  
  </form>
  );
};

const LocationList = function(props) {
  if (props.locations.length === 0){
    return (
      <div className="LocationList">
        <h3 className="emptyLocation">No Locations found</h3>
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
        <p className="locAbout">Description: {loc.about}</p>
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
  sendAjax('GET', '/getLocationsType', null, (data) => {
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