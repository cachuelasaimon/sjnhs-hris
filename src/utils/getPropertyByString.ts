/**
 *
 * @param obj - nested source object
 * @param propString - property chain of the nested object
 * @returns
 */

export const getPropertyByString = (obj: any, propString: string) => {
  if (!propString) return obj;

  let prop;

  const props = propString.split('.');
  let i, iLen;
  for (i = 0, iLen = props.length - 1; i < iLen; i++) {
    prop = props[i];

    const candidate = obj[prop];
    if (candidate !== undefined) {
      obj = candidate;
    } else {
      break;
    }
  }
  return obj[props[i]];
};
