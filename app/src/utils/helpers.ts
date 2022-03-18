export const convertNumToThousandths = (num: any) =>
  Number(num).toLocaleString();

export const timestampFormatter = (timestamp: Date) => {
  return (
    timestamp.toString().substring(0, 10) +
    " " +
    timestamp.toString().substring(11, 16)
  );
};
