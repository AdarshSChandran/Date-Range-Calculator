import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Container, Typography } from "@mui/material";
import "./DatePicker1.scss";

const DatePicker1 = () => {
  const [firstValue, setFirstValue] = useState(null);
  const [secondvalue, setSecondValue] = useState(null);
  const [days, setDays] = useState(null);
  const [earnedLeave, setEarnedLeave] = useState(null);
  const [remainingDays, setRemainingDays] = useState(null);
  const [divider, setDivider] = useState();
  const [isActiveOne, setIsActiveOne] = useState(false);
  const [isActiveTwo, setIsActiveTwo] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);

  const handleElevenStyle = () => {
    setError(false);
    setIsActiveTwo(false);
    setIsActiveOne(true);
    setDivider(11);
  };
  const handleTwentyTwoStyle = () => {
    setError(false);
    setIsActiveOne(false);
    setIsActiveTwo(true);
    setDivider(22);
  };

  const handleDate = () => {
    const datediff = secondvalue.$d - firstValue.$d;
    const TotalDays = Math.ceil(datediff / (1000 * 60 * 60 * 24) + 1);
    if (
      (firstValue && secondvalue) !== null &&
      (isActiveOne || isActiveTwo) === true &&
      secondvalue > firstValue &&
      TotalDays >= divider
    ) {
      setWarning(false);
      setDays(TotalDays);
      setEarnedLeave(
        Math.floor((datediff / (1000 * 60 * 60 * 24) + 1) / divider)
      );
      setRemainingDays(
        Math.ceil(datediff / (1000 * 60 * 60 * 24) + 1) % divider
      );
    }

    if ((isActiveOne || isActiveTwo) !== true) {
      setError(true);
    }
    if (secondvalue <= firstValue) {
      setWarning(true);
    }
    if (TotalDays < divider) {
      setDays(0);
      setWarning(true);
    }
  };

  return (
    <Container className="container">
      <div className="header">
        <h1>Date Range Calculator</h1>
      </div>
      <div className="button">
        <Button
          variant="contained"
          sx={{ marginRight: "20px" }}
          onClick={handleElevenStyle}
          className={isActiveOne === true ? "buttonStyle" : null}
        >
          11 Day Calculator
        </Button>
        <Button
          variant="contained"
          sx={{ marginRight: "20px" }}
          onClick={handleTwentyTwoStyle}
          className={isActiveTwo === true ? "buttonStyle" : null}
        >
          22 Day Calculator
        </Button>
      </div>
      <div className="top">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Start Date"
            value={firstValue}
            onChange={(newValue) => {
              setFirstValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="End Date"
            value={secondvalue}
            onChange={(newValue) => {
              setSecondValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <Button variant="contained" onClick={handleDate}>
          Submit
        </Button>
      </div>
      <div className="bottom">
        {days !== null ? (
          <div>
            {warning !== true ? (
              <>
                <h3>Total Days: {days} </h3>
                <h3>Earned Leave: {earnedLeave}</h3>
                <h3>Remaining Days: {remainingDays}</h3>
              </>
            ) : (
              <Typography variant="h6" sx={{ color: "red" }}>
                Choose a proper date range!!
              </Typography>
            )}
          </div>
        ) : null}
        {error === true ? (
          <Typography variant="h6" sx={{ color: "red" }}>
            Select a Calculator !!
          </Typography>
        ) : null}
      </div>
    </Container>
  );
};

export default DatePicker1;
