import React from "react";
import TextField from "@material-ui/core/TextField";

export default function DiscountSelector(props) {
  const handleChange = id => event => {
    props.onChange({
        discountId: id,
        name: event.target.name,
        value: event.target.value
    });
  };
  return (
    <div>
      {props.discounts.map(discount => (
        <div key={discount.discountId}>
          <TextField
            label="Minimun people"
            name="minPeople"
            defaultValue={discount.minPeople}
            onChange={handleChange(discount.discountId)}
            margin="normal"
          />
          <TextField
            label="Discount applied"
            name="discount"
            defaultValue={discount.discount}
            onChange={handleChange(discount.discountId)}
            margin="normal"
          />
        </div>
      ))}
    </div>
  );
}
