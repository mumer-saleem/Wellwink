import { useEffect, useState } from "react";
import { BackHandler} from "react-native";


   const useBackButton = (handler) => {
   useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handler
      );
    };
  }, [handler]);
}

export default useBackButton