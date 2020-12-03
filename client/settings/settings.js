const InfoList = function(props) {
  const accDataNodes = props.accountData.map(function(data) {         
    return (
      <div key={accountData._id} className="accData">
        <h3 className="accUsername">User: {data.username}</h3>
        <h3 className="accCreatedDate">Created Date: {data.createdDate}</h3>
      </div>
    );
  });
  
  return (
    <div className="accData">
      {accDataNodes}
    </div> 
  );
};

const loadInfoFromServer = () => {
  sendAjax('GET', '/info', null, (data) => {
    ReactDOM.render(
      <InfoList accountData={data.username} />, document.querySelector("#accInfo")
    );
  });
};

const setup = function() {
  ReactDOM.render(
    <InfoList accountData={[]} />, document.querySelector("#accInfo")
  );
  
  loadInfoFromServer();
};

const getToken = () => {
  sendAjax('GET', '/getToken', null, (result)=> {
    setup(result.csrfToken);
  });
};

$(document).ready(function() {
  getToken();
});