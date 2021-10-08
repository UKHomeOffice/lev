const { DateTime } = require('luxon');

// logic for validating input to Date field
export const format = (v: string): string => {
  const matchWithDelimiters = /^(\d{1,4})\D?(\d{1,2})\D?(\d{1,4})$/.exec(v.trim())
  const matchNoDelimiters = /^(\d{8})$/.exec(v.trim())

  if(v === undefined || matchWithDelimiters === null) {
    return undefined;
  }

  const formattedDate = (matchNoDelimiters)
    ? DateTime.fromFormat(`${v.slice(0, 2)} ${v.slice(2, 4)} ${v.slice(4, 8)}`, 'd M yyyy')
    : (matchWithDelimiters[1].length>2 || parseInt(matchWithDelimiters[1], 10)>31)
      ? DateTime.fromFormat(`${matchWithDelimiters[1]} ${matchWithDelimiters[2]} ${matchWithDelimiters[3]}`, 'yyyy M d')
      : DateTime.fromFormat(`${matchWithDelimiters[1]} ${matchWithDelimiters[2]} ${matchWithDelimiters[3]}`, 'd M yyyy')

  if (formattedDate.isValid) {
    return `${formattedDate.toFormat('yyyy-MM-dd')}`;
  } else {
    return undefined;
  }
};

export const deformat = (v: string): string => {
  const [ year, month, day ] = v.split('-');

  return `${day}/${month}/${year}`;
};
