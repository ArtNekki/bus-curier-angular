export const Pattern = {
  Text: '^[a-zA-Z][a-zA-Z0-9-_\\.]{1,1000}$',
  Phone: /((\(\d{3}\)?)|(\d{3}-))?\d{3}-\d{4}/,
  RusPassport: /(\d{4} \d{6})/,
  DriverLicense: /(\d{2} \d{2} \d{6})/
};
