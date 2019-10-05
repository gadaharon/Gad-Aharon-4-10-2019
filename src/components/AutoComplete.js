import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Context from "../context/Context";
import { autocompleteURL } from "../context/State";

const autocomplete = [
  {
    Version: 1,
    Key: "213181",
    Type: "City",
    Rank: 31,
    LocalizedName: "Haifa",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    },
    AdministrativeArea: {
      ID: "HA",
      LocalizedName: "Haifa"
    }
  },
  {
    Version: 1,
    Key: "2589281",
    Type: "City",
    Rank: 85,
    LocalizedName: "Haifang Township",
    Country: {
      ID: "CN",
      LocalizedName: "China"
    },
    AdministrativeArea: {
      ID: "SD",
      LocalizedName: "Shandong"
    }
  },
  {
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv"
    }
  },
  {
    Version: 1,
    Key: "3431644",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telanaipura",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JA",
      LocalizedName: "Jambi"
    }
  },
  {
    Version: 1,
    Key: "300558",
    Type: "City",
    Rank: 45,
    LocalizedName: "Telok Blangah New Town",
    Country: {
      ID: "SG",
      LocalizedName: "Singapore"
    },
    AdministrativeArea: {
      ID: "05",
      LocalizedName: "South West"
    }
  },
  {
    Version: 1,
    Key: "325876",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telford",
    Country: {
      ID: "GB",
      LocalizedName: "United Kingdom"
    },
    AdministrativeArea: {
      ID: "TFW",
      LocalizedName: "Telford and Wrekin"
    }
  },
  {
    Version: 1,
    Key: "169072",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telavi",
    Country: {
      ID: "GE",
      LocalizedName: "Georgia"
    },
    AdministrativeArea: {
      ID: "KA",
      LocalizedName: "Kakheti"
    }
  },
  {
    Version: 1,
    Key: "230611",
    Type: "City",
    Rank: 51,
    LocalizedName: "Telsiai",
    Country: {
      ID: "LT",
      LocalizedName: "Lithuania"
    },
    AdministrativeArea: {
      ID: "TE",
      LocalizedName: "Telšiai"
    }
  },
  {
    Version: 1,
    Key: "2723742",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telégrafo",
    Country: {
      ID: "BR",
      LocalizedName: "Brazil"
    },
    AdministrativeArea: {
      ID: "PA",
      LocalizedName: "Pará"
    }
  },
  {
    Version: 1,
    Key: "186933",
    Type: "City",
    Rank: 55,
    LocalizedName: "Tela",
    Country: {
      ID: "HN",
      LocalizedName: "Honduras"
    },
    AdministrativeArea: {
      ID: "AT",
      LocalizedName: "Atlántida"
    }
  },
  {
    Version: 1,
    Key: "3453754",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telaga Asih",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java"
    }
  },
  {
    Version: 1,
    Key: "3453755",
    Type: "City",
    Rank: 55,
    LocalizedName: "Telagamurni",
    Country: {
      ID: "ID",
      LocalizedName: "Indonesia"
    },
    AdministrativeArea: {
      ID: "JB",
      LocalizedName: "West Java"
    }
  }
];

export default function AutoComplete() {
  const [textField, setTextField] = useState("Tel Aviv");
  const [city, setCity] = useState({
    Version: 1,
    Key: "215854",
    Type: "City",
    Rank: 31,
    LocalizedName: "Tel Aviv",
    Country: {
      ID: "IL",
      LocalizedName: "Israel"
    },
    AdministrativeArea: {
      ID: "TA",
      LocalizedName: "Tel Aviv"
    }
  });
  const [cities, setCities] = useState(autocomplete);

  const context = useContext(Context);
  const { setLocation } = context;

  useEffect(() => {
    setLocation(city);
  }, [city]);

  const onSubmit = e => {
    e.preventDefault();
    changeLocation();
  };

  const onClick = (e, city) => {
    setTextField(e.target.value);
    setCity(city);
  };

  const onTextChange = e => {
    setTextField(e.target.value);
    // getLocations()
  };

  const changeLocation = () => {
    setCity(city);
  };

  //   Get Locations By Name
  const getCities = () => {
    axios
      .get(`${autocompleteURL}${city}`)
      .then(res => {
        console.log(res.data);
        setCities(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={textField}
          onChange={onTextChange}
          className="form-control mt-3 col-sm-5 mr-auto ml-auto "
          placeholder="Search"
        />
        <div className="input-group mt-2 col-sm-5 mr-auto ml-auto">
          <div className="autocomplete">
            {cities.map((item, i) => {
              if (
                textField !== "" &&
                item.LocalizedName.toLowerCase().includes(
                  textField.toLowerCase()
                )
              ) {
                return (
                  <input
                    key={i}
                    type="button"
                    onClick={e => onClick(e, item)}
                    className="btn btn-block btn-secondary"
                    value={item.LocalizedName}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
