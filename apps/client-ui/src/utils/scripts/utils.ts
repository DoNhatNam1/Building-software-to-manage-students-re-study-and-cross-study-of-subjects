
interface LabelValueSchema {
  value: string;
  label: string;
}

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isUpperCase(str: string) {
  if (str && str.length > 0) {
    return str.charAt(0) === str.charAt(0).toUpperCase()
  }
  return false // or handle the undefined case as per your requirement
}

export const filterOption = (
  input: string,
  option?: { label: string; value: string },
) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())


// Hàm chung để tạo label và value cho Select options
export const createLabelValueArray = <T extends { [key: string]: any }>(
  data: T[],
  key: keyof T
): LabelValueSchema[] => {
  return data.map(item => ({
    value: item[key],
    label: isUpperCase(item[key])
      ? item[key].toLowerCase()
      : item[key],
  }));
};