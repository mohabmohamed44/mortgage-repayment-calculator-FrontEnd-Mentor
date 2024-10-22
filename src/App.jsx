import { useEffect, useReducer } from "react";

const initialState = {
  amount: "",
  term: "",
  rate: "",
  mortgageType: "repayment",
  error: {
    amount: false,
    term: false,
    rate: false,
  },
  result: false,
};

function postReducer(state, action) {
  switch (action.type) {
    case "SET_AMOUNT":
      return { ...state, amount: action.payload };
    case "SET_TERM":
      return { ...state, term: action.payload };
    case "SET_RATE":
      return { ...state, rate: action.payload };
    case "SET_MORTGAGE_TYPE":
      return { ...state, mortgageType: action.payload };
    case "SET_ERROR":
      return {
        ...state,
        error: {
          ...state.error,
          [action.payload.field]: action.payload.hasError,
        },
      };
    case "CLEAR":
      return initialState;
    case "SET_RESULT":
      return { ...state, result: action.payload };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(postReducer, initialState);

  useEffect(() => {
    if (state.amount && state.rate && state.term) {
      console.log("true", state.error);
      dispatch({ type: "SET_RESULT", payload: true });
    } else {
      console.log("false", state.error);
      dispatch({ type: "SET_RESULT", payload: false });
    }
  }, [state.error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({ type: `SET_${name.toUpperCase()}`, payload: value });
  };

  const handleRadioChange = (e) => {
    dispatch({ type: "SET_MORTGAGE_TYPE", payload: e.target.value });
  };

  const handleClear = () => {
    dispatch({ type: "CLEAR" });
  };

  const calculate = () => {
    if (!state.amount) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "amount", hasError: true },
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "amount", hasError: false },
      });
    }
    if (!state.term) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "term", hasError: true },
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "term", hasError: false },
      });
    }
    if (!state.rate) {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "rate", hasError: true },
      });
    } else {
      dispatch({
        type: "SET_ERROR",
        payload: { field: "rate", hasError: false },
      });
    }
  };

  return (
    <div className="mortgagecalc__container">
      <div className="mortgagecalc__card">
        <div className="mortgagecalc__card-left">
          <div className="mortgagecalc__heading-container">
            <h2 className="mortgagecalc__heading">Mortgage Calculator</h2>
            <a className="mortgagecalc-link" onClick={handleClear}>
              Clear All
            </a>
          </div>
          <div className="mortgagecalc__input-container">
            <div className="mortgagecalc__amount">
              <label htmlFor="amount" className="calc-amountlabel">
                Mortgage Amount
              </label>
              <div className="calc-amount-container">
                <span
                  className={
                    state.error.amount ? "pound-icon error-icon" : "pound-icon"
                  }
                >
                  £
                </span>
                <input
                  name="amount"
                  value={state.amount}
                  onChange={handleChange}
                  type="number"
                  className={
                    state.error.amount
                      ? "calc-amount error-input"
                      : "calc-amount"
                  }
                />
              </div>
              {state.error.amount && (
                <span className="error-field">This field is required</span>
              )}
            </div>
            <div className="mortgagecal__termrate-container">
              <div className="mortgagecal__term">
                <label htmlFor="amount" className="calc-termlabel">
                  Mortgage Term
                </label>
                <div className="calc-term-container">
                  <span
                    className={
                      state.error.term ? "years-text error-icon" : "years-text"
                    }
                  >
                    years
                  </span>
                  <input
                    type="number"
                    className={
                      state.error.term ? "calc-term error-input" : "calc-term"
                    }
                    name="term"
                    value={state.term}
                    onChange={handleChange}
                  />
                </div>
                {state.error.term && (
                  <span className="error-field">This field is required</span>
                )}
              </div>
              <div className="mortgagecal__rate">
                <label htmlFor="amount" className="calc-ratelabel">
                  Mortgage Rate
                </label>
                <div className="calc-rate-container">
                  <span
                    className={
                      state.error.rate
                        ? "percent-text error-icon"
                        : "percent-text"
                    }
                  >
                    %
                  </span>
                  <input
                    type="number"
                    className={
                      state.error.rate ? "calc-rate error-input" : "calc-rate"
                    }
                    name="rate"
                    value={state.rate}
                    onChange={handleChange}
                  />
                </div>
                {state.error.rate && (
                  <span className="error-field">This field is required</span>
                )}
              </div>
            </div>
          </div>
          <div className="mortgagecalc__radio-container">
            <label className="mortgagecalc__radio-label">Mortgage Types</label>
            <div
              className={`mortgagecalc__radio-div ${
                state.mortgageType === "repayment" ? "checked" : ""
              }`}
              onClick={() =>
                handleRadioChange({ target: { value: "repayment" } })
              }
            >
              <input
                type="radio"
                className="mortgagecalc__radio-input"
                value="repayment"
                checked={state.mortgageType === "repayment"}
                onChange={handleRadioChange}
              />
              <span className="mortgagecalc__radio-value">Repayment</span>
            </div>
            <div
              className={`mortgagecalc__radio-div ${
                state.mortgageType === "interest-only" ? "checked" : ""
              }`}
              onClick={() =>
                handleRadioChange({ target: { value: "interest-only" } })
              }
            >
              <input
                type="radio"
                className="mortgagecalc__radio-input"
                value="interest-only"
                checked={state.mortgageType === "interest-only"}
                onChange={handleRadioChange}
              />
              <span className="mortgagecalc__radio-value">Interest Only</span>
            </div>
          </div>
          <div className="mortgagecalc__button-container">
            <span className="calculatorIcon">
              <img
                src="/assets/images/icon-calculator.svg"
                alt="Calculator Icon"
              />
            </span>
            <button
              className="mortgagecalc__calculate-button"
              onClick={calculate}
            >
              Calculate Repayments
            </button>
          </div>
        </div>
        <div className="mortgagecalc__card-right">
          {!state.result ? (
            <div className="mortgagecalc__empty">
              <div className="mortgagecalc__empty-imgcontainer">
                <img
                  src="/assets/images/illustration-empty.svg"
                  alt="empty illustration"
                />
              </div>
              <h2 className="mortgagecalc__empty-heading">
                Results shown here
              </h2>
              <p className="mortgagecalc__empty-info">
                Complete the form and click “calculate repayments” to see what
                your monthly repayments would be.
              </p>
            </div>
          ) : (
            <div className="mortgagecalc__active">
              <h2 className="mortgagecalc__active-heading">Your results</h2>
              <p className="mortgagecalc__active-info">
                Your results are shown below based on the information you
                provided. To adjust the results, edit the form and click
                “calculate repayments” again.
              </p>
              <div className="mortgagecalc__active-cardcontainer">
                <div className="mortgagecalc__active-cardtop">
                  <span className="cardtop-info">Your monthly repayments</span>
                  <span className="cardtop-repayment">£1232</span>
                </div>
                <div className="mortgagecalc__active-cardbottom">
                  <span className="cardbottom-term">Mortgage Term</span>
                  <span className="cardbottom-info">{state.term} years</span>
                  <span className="cardbottom-term">Mortgage Amount</span>
                  <span className="cardbottom-info">£{state.amount}</span>
                  <span className="cardbottom-term">Mortgage Rate</span>
                  <span className="cardbottom-info">{state.rate}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
