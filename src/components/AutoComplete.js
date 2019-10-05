import React, { useContext, useState, useEffect } from "react";
import Context from "../context/Context";

export default function AutoComplete() {
  const [city, setCity] = useState("Tel Aviv");
  const [cities, setCities] = useState([]);

  const context = useContext(Context);
  const { setLocation, getLocation, location } = context;

  useEffect(() => {
    if (Object.keys(location).length === 0) {
      setLocation(city);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault();
    setLocation(city);
    setCities([]);
  };

  const onClick = name => {
    setCity(name);
    setLocation(name);
    setCities([]);
  };

  const onTextChange = e => {
    setCity(e.target.value);
    getCities();
  };

  //   Get Locations By Name
  const getCities = () => {
    if (city && city !== "") {
      getLocation(city, res => {
        setCities(res);
      });
    }
  };

  return (
    <form onSubmit={onSubmit} autoComplete="off">
      <div className="form-group">
        <input
          type="text"
          name="name"
          value={city}
          onChange={onTextChange}
          className="form-control mt-3 col-sm-5 mr-auto ml-auto "
          placeholder="Search"
        />
        <div className="input-group mt-2 col-sm-5 mr-auto ml-auto">
          <div className="autocomplete">
            {cities.map((item, i) => {
              if (
                city !== "" &&
                item.LocalizedName.toLowerCase().includes(city.toLowerCase())
              ) {
                return (
                  <input
                    key={i}
                    type="button"
                    onClick={() => onClick(item.LocalizedName)}
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
