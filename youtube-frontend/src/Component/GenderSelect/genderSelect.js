import React, { useState } from "react";
import styled from 'styled-components';
import TripOriginOutlinedIcon from "@mui/icons-material/TripOriginOutlined";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
const GenderSelect = ({ onGenderSelect, selectedGender }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const handleGenderClick = (gender) => {
    onGenderSelect(gender);
    setDropdownOpen(false);
  };
  return (
    <StyledWrapper>
    <div className="form-select gradient-input position-relative" id="genderSelect" style={{ cursor: "pointer" }}onClick={() => setDropdownOpen(!isDropdownOpen)}>
      <span id="selectedGender">
        {selectedGender ? (
          <>
            {selectedGender === "Male" && <MaleIcon sx={{ fontSize: "1em", marginRight: "4px" }} />}
            {selectedGender === "Female" && <FemaleIcon sx={{ fontSize: "1em", marginRight: "4px" }} />}
            {selectedGender === "Other" && <TransgenderIcon sx={{ fontSize: "1em", marginRight: "4px" }} />}
            {selectedGender}
          </>
        ) : (
          <>
            <TripOriginOutlinedIcon sx={{ fontSize: "1em", marginRight: "4px" }} />
            Gender
          </>
        )}
      </span>
      {isDropdownOpen && (
        <div className="options"  id="genderOptions">
          <div className="option" onClick={() => handleGenderClick("Male")}>
            <MaleIcon sx={{ fontSize: "1em", marginRight: "4px" }} /> Male
          </div>
          <div className="option" onClick={() => handleGenderClick("Female")}>
            <FemaleIcon sx={{ fontSize: "1em", marginRight: "4px" }} /> Female
          </div>
          <div className="option" onClick={() => handleGenderClick("Other")}>
            <TransgenderIcon sx={{ fontSize: "1em", marginRight: "4px" }} /> Other
          </div>
        </div>
      )}
    </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
#genderSelect {
    display: flex;
    align-items: center;
    padding-right: 30px;
}
#genderSelect::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 32 32"><path d="M29.604 10.528L17.531 23.356a2.102 2.102 0 0 1-3.062 0L2.396 10.528c-.907-.964-.224-2.546 1.1-2.546h25.008c1.324 0 2.007 1.582 1.1 2.546z" fill="%23ffffff"/></svg>');
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
}
.options {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgb(26, 26, 26) !important;
    border: 1px solid #ffffff;
    border-radius: 15px;
    z-index: 3;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
}
.option {
    padding: 10px;
    color: white;
    cursor: pointer;
}
.option:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.gradient-input:focus ~ .form-label,
.gradient-input:not(:placeholder-shown) ~ .form-label {
    position: absolute;
    top: -8px;
    left: 12px;
    padding: 0px 10px;
    background: rgb(26, 26, 26) !important;
    color: #a7a7a7 !important;
    z-index: 1;
}
.gradient-input:focus {
    border: none;
    outline: none;
    z-index: 1;
}
.gradient-border-svg {
    opacity: 0;
    transition: opacity 0.7s ease, stroke-dashoffset 0.7s ease-in-out, stroke 0.7s ease;
    z-index: 0; 
    border-radius: 15px;
}
.transition-stroke-dashoffset {
    transition:
        stroke-dashoffset 0.7s ease-in-out,
        stroke 0.7s ease;
}
.gradient-input:focus ~ .gradient-border-svg {
    opacity: 1;
}
.gradient-border-svg .transition-stroke-dashoffset {
    stroke-dashoffset: 0;
}
    .form-floating {
    position: relative;
}
.form-floating > label {
    height: inherit;
    padding: 12px;
}
.form-floating>.form-control-plaintext:focus, .form-floating>.form-control-plaintext:not(:placeholder-shown), .form-floating>.form-control:focus, .form-floating>.form-control:not(:placeholder-shown), .form-floating>.form-select:focus, .form-floating>.form-select:not(:placeholder-shown) {
    padding:20px;
}
.form-floating>.form-control, .form-floating>.form-control-plaintext, .form-floating>.form-select{
    height: 50px;
    min-height: 20px;
}
.form-label {
    transition: top 0.3s ease, left 0.3s ease, transform 0.3s ease, background-color 0.3s ease, padding 0.3s ease, color 0.3s ease;
    margin: 0;
}
.form-label::after {
    content: none !important;
}
.form-control, .form-select {
    background: transparent !important;
    color: #ffffff !important;
    box-shadow: none !important;
    border-radius: 15px;
    z-index: 1;
}
`;
export default GenderSelect;