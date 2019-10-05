import React, { useContext } from "react";
import AlertContext from '../context/AlertContext';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Alerts = () => {
  const alertContext = useContext(AlertContext);
  const { alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        <FontAwesomeIcon icon="info-circle" /> {alert.msg}
      </div>
    ))
  );
};

export default Alerts;
