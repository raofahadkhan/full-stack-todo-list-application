"use client"

// import services
// import { useState, useContext } from "react";
import { useState } from "react";

// import types
import { Alert } from "@/types";

// import chakra elements
import { Stack } from "@chakra-ui/react";

// import components
import AlertItem from "./AlertItem";
// import alertContext from "@/context/alert/alertContext";

// COMPONENT
const Alerts = () => {

  // const { alerts } = useContext(alertContext);
  let [alerts, setAlerts] = useState<Alert[]>([
    // {
    //   type: AlertType.SUCCESS,
    //   message: "Successfully Login"
    // },
    // {
    //   type: AlertType.ERROR ,
    //   message: "Error 404"
    // }
  ])


  // function to remove alert from state
  let removeAlert = (index: number) => {
    setAlerts((prev) => prev.filter((alert , i) => i !== index))
  }

  return (
    <Stack
      spacing={1}
      width='300px' maxWidth={'500px'}
      position='absolute' right='15px' top='15px'
    >
      { alerts.map((alert , index) => <AlertItem alert={alert} key={index} onClose={removeAlert}/>) }
    </Stack>
  );
}

export default Alerts;