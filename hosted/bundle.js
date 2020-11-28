"use strict";

var handleLocation = function handleLocation(e) {
  e.preventDefault(); //  $("#screenMessage").animate({width:'hide'}, 350);

  if ($("#locName").val() == '' || $("#loctype").val() == '' || $("#longitude").val() == '' || $("#latitude").val() == '') {
    handleError("All fields are required");
    return false;
  }

  sendAjax('POST', $("#addForm").attr("action"), $("#addForm").serialize(), function () {
    loadLocsFromServer();
  });
  return false;
};

var AddForm = function AddForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "addForm",
    name: "addForm",
    onSubmit: handleLocation,
    action: "/add",
    method: "POST",
    className: "addForm"
  }, /*#__PURE__*/React.createElement("h3", null, "Add A Skate Location"), /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "locName",
    type: "text",
    name: "name",
    placeholder: "Location Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "type"
  }, "Type: "), /*#__PURE__*/React.createElement("select", {
    id: "locType",
    name: "type"
  }, /*#__PURE__*/React.createElement("option", {
    value: "park",
    defaultValue: true
  }, "Skate Park"), /*#__PURE__*/React.createElement("option", {
    value: "shop"
  }, "Skate Shop"), /*#__PURE__*/React.createElement("option", {
    value: "spot"
  }, "Skate Spot")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "coords"
  }, "Coordinates: "), "( ", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "long",
    className: "lnglat",
    name: "long",
    required: true
  }), " ,", /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "lat",
    className: "lnglat",
    name: "lat",
    required: true
  }), " )", /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    className: "makeLocSubmit",
    type: "submit",
    value: "Make Location"
  }));
};

var LocationList = function LocationList(props) {
  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "LocationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyLocation"
    }, "No Locations yet"));
  }

  var locNodes = props.locations.map(function (loc) {
    var image = "";

    switch (loc.type) {
      case "park":
        image = "/assets/img/park-icon.png";
        break;

      case "shop":
        image = "/assets/img/shop-icon.png";
        break;

      case "spot":
        image = "/assets/img/spot-icon.png";
        break;

      default:
        image = "/assets/img/board.jpg";
        break;
    }

    return /*#__PURE__*/React.createElement("div", {
      key: locations._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/board.jpg",
      alt: "DEFAULT",
      className: "board"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "locName"
    }, "Name: ", loc.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locType"
    }, "Type: ", loc.type, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locCoords"
    }, "Coordinates: (", loc.longitude, ", ", loc.latitude, ")"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "LocationList"
  }, locNodes);
};

var loadLocsFromServer = function loadLocsFromServer() {
  sendAjax('GET', '/getMyLocations', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
      locations: data.locations
    }), document.querySelector("#locations"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(AddForm, {
    csrf: csrf
  }), document.querySelector("#controls"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LocationList, {
    locations: []
  }), document.querySelector("#locations"));
  loadLocsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message); //  $("#screenMessage").animate({width:'toggle'}, 350);
};

var redirect = function redirect(response) {
  //  $("#screenMessage").animate({width:'hide'}, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
