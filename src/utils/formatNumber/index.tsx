export const formatNumber = (amount: number) => {
  return new Intl.NumberFormat().format(amount);
};
export const FormatPhone = (phoneNumberString:string) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");

  var processed_data = "";
  if (cleaned.length) {
    processed_data += "(";
  }

  if (cleaned.length > 3) {
    processed_data += cleaned.substring(0, 3) + ") ";
  } else {
    processed_data += cleaned;
  }
  if (cleaned.length > 3) {
    processed_data += cleaned.substring(3, 6);
  }
  if (cleaned.length > 6) {
    processed_data += "-" + cleaned.substring(6, 10);
    if (cleaned.length > 10) processed_data += "x";
  }
  if (cleaned.length > 10) {
    processed_data += cleaned.substring(10, 15);
  }
  // return props.handleChange(state ? state : null)
  // return this.setState({ [state ? state : null]: processed_data })
  return processed_data;
};