import React from "react";
import Autocomplete from "react-autocomplete";
import { Card } from "pcln-design-system";

const menuStyle = {
  borderRadius: "3px",
  boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
  background: "rgba(255, 255, 255, 1)",
  padding: "5px 0 10px",
  width: "100%",
  top: "40px",
  left: 0,
  fontSize: "85%",
  position: "absolute",
  zIndex: 999,
  overflow: "auto"
};

const wrapperStyle = {
  display: "block",
  position: "relative",
  zIndex: 9999,
  width: "100%"
};

const inputStyle = {
  height: "40px",
  display: "block",
  width: "100%",
  padding: "0 10px",
  fontSize: "90%",
  border: "1px solid #efefef"
};

const renderInput = props => (
  <input
    id="location"
    style={inputStyle}
    placeholder="Example: Room 2, Cali Villa, Alaska"
    {...props}
  />
);

const renderItem = (address, isHighlighted) => {
  return (
    typeof address !== undefined &&
    address.body.length > 1 && (
      <Card
        borderColor="white"
        key={Math.random()}
        style={{
          background: isHighlighted ? "#007aff" : "white",
          color: isHighlighted ? "white" : "inherit"
        }}
        px={2}
        pt={2}
      >
        {address.body}
      </Card>
    )
  );
};

const AutocompleteAddressInput = props => {
  return (
    <Autocomplete
      style={{
        background: "white",
        width: "100%"
      }}
      value={props.address}
      onChange={e => {
        props.onSetAddress(e.target.value);
      }}
      getItemValue={address => address.body}
      items={props.userAddresses}
      renderItem={renderItem}
      inputProps={{
        onFocus: e => e.target.select(),
        onBlur: e => props.onSetAddressInputDisabled(true),
        disabled: props.isAddressInputDisabled
      }}
      renderInput={renderInput}
      menuStyle={menuStyle}
      wrapperStyle={wrapperStyle}
      onSelect={val => props.onSetAddress(val)}
    />
  );
};

export default AutocompleteAddressInput;
