"use strict";

var handleLocation = function handleLocation(e) {
  e.preventDefault(); //  $("#screenMessage").animate({width:'hide'}, 350);

  if ($("#locName").val() == '' || $("#locType").val() == '' || $("#locLocation").val() == '' || $("#locAbout").val() == '') {
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
    value: "shop"
  }, "Skate Shop"), /*#__PURE__*/React.createElement("option", {
    value: "park"
  }, "Skate Park"), /*#__PURE__*/React.createElement("option", {
    value: "spot"
  }, "Skate Spot")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("label", {
    htmlFor: "location"
  }, "Location: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "locLocation",
    name: "location",
    required: true
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "About"
  }, "about: "), /*#__PURE__*/React.createElement("input", {
    type: "text",
    id: "locAbout",
    name: "about",
    required: true
  }), /*#__PURE__*/React.createElement("input", {
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

    return /*#__PURE__*/React.createElement("div", {
      key: locations._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "icon",
      className: "board"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "locName"
    }, "Name: ", loc.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locType"
    }, "Type: ", loc.type, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locLocation"
    }, "Location: ", loc.location), /*#__PURE__*/React.createElement("p", {
      className: "locAbout"
    }, "Description: ", loc.about));
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

var handleSearch = function handleSearch(e) {
  e.preventDefault();
  sendAjax('POST', $("#searchForm").attr("action"), $("#searchForm").serialize(), function () {
    loadLocsFromServer();
  });
  return false;
};

var SearchForm = function SearchForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "searchForm",
    name: "searchForm",
    onSubmit: handleSearch,
    action: "/search",
    method: "POST",
    className: "searchForm"
  }, /*#__PURE__*/React.createElement("h3", null, "Filter Skate Locations"), /*#__PURE__*/React.createElement("label", {
    htmlFor: "type"
  }, "Type: "), /*#__PURE__*/React.createElement("select", {
    id: "locType",
    name: "type"
  }, /*#__PURE__*/React.createElement("option", {
    value: "shop"
  }, "Skate Shop"), /*#__PURE__*/React.createElement("option", {
    value: "park"
  }, "Skate Park"), /*#__PURE__*/React.createElement("option", {
    value: "spot"
  }, "Skate Spot")), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), " ", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("input", {
    className: "searchLocSubmit",
    type: "submit",
    value: "Search"
  }));
};

var LocationList = function LocationList(props) {
  if (props.locations.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "LocationList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyLocation"
    }, "No Locations found"));
  }

  var locNodes = props.locations.map(function (loc) {
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

    return /*#__PURE__*/React.createElement("div", {
      key: locations._id,
      className: "location"
    }, /*#__PURE__*/React.createElement("img", {
      src: image,
      alt: "icon",
      className: "board"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "locName"
    }, "Name: ", loc.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locType"
    }, "Type: ", loc.type, " "), /*#__PURE__*/React.createElement("h3", {
      className: "locLocation"
    }, "Location: ", loc.location), /*#__PURE__*/React.createElement("p", {
      className: "locAbout"
    }, "Description: ", loc.about));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "LocationList"
  }, locNodes);
};

var loadLocsFromServer = function loadLocsFromServer() {
  sendAjax('GET', '/getLocationsType', null, function (data) {
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
  $("#errorMessage").text(message);
  $("#screenMessage").show();
};

var redirect = function redirect(response) {
  $("#screenMessage").animate({
    width: 'hide'
  }, 350);
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
