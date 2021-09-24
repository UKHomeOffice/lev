const { DateTime } = require('luxon');

// logic for validating input to Date field
export const format = (v: string): string => {
  const pad = (size: number, v: string): string => (
    v.padStart(size, '0')
  );
  const padYear = (v: string): string => {
    const year: number = Number(v);

    return (
      year < 50
      ? '19' + v
      : (
        50 < year && year < 100
        ? '20' + v
        : pad(4, v)
      )
    );
  };
  const isSet = (v: any): boolean => (
    !!(v || v === 0)
  );

  const matchWithDelimiters = /^(\d{1,4})\D?(\d{1,2})\D?(\d{1,4})$/.exec(v.trim())
  const matchNoDelimiters = /^(\d{8})$/.exec(v.trim())

  const formattedDate = (matchNoDelimiters)
    ? DateTime.fromFormat(`${v.slice(0, 2)} ${v.slice(2, 4)} ${v.slice(4, 8)}`, 'd M yyyy')
    : (matchWithDelimiters && (matchWithDelimiters[1].length>2 || parseInt(matchWithDelimiters[1], 10)>31))
      ? DateTime.fromFormat(`${matchWithDelimiters[1]} ${matchWithDelimiters[2]} ${matchWithDelimiters[3]}`, 'yyyy M d')
      : DateTime.fromFormat(`${matchWithDelimiters[1]} ${matchWithDelimiters[2]} ${matchWithDelimiters[3]}`, 'd M yyyy')

  if (formattedDate.isValid) {
    const day = formattedDate.toFormat('dd');
    const month = formattedDate.toFormat('MM');
    const year = formattedDate.toFormat('yyyy');

    return `${year}-${month}-${day}`;
  } else {
    return undefined;
  }
};

export const deformat = (v: string): string => {
  const [ year, month, day ] = v.split('-');

  return `${day}/${month}/${year}`;
};
