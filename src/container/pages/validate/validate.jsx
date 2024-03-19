import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Validate = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(location.state);
  }, []);
  return (
    <>
      <div className="text-2xl text-center">Validate</div>
    </>
  );
};

export default Validate;
