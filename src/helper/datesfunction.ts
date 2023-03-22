const compareDateWithPresent = (dateValue: Date): number => {
  const diff = new Date().getTime().valueOf() - new Date(dateValue).valueOf();
  const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return diffDays;
};

const compareCreatedAndUpdatedDates = (
  createdDate: Date,
  updatedDate: Date
): boolean => {
  if (createdDate === updatedDate) return true;
  else return false;
};

export { compareDateWithPresent, compareCreatedAndUpdatedDates };
