import _ from "lodash";

export const capValue = (v, options = {}) => {
  v = Number(v);
  // !_.isEmpty(options) && console.log("cvOPTIONS: ", v, options);
  if (options.cap) return Math.min(v, Number(options.cap));
  return v;
};

export const displayPercent = (v, options = {}) => {
  // !_.isEmpty(options) && console.log("OPTIONS: ", v, options);
  v = Number(v);
  if (!isFinite(v)) return "NA";
  if (options.cap && v > Number(options.cap)) {
    const x = `>${options.cap}%`;
    // console.log("!!!!", x, v, options.cap);
    return x;
  }
  if (v > 100) console.warn("Incorrect %");

  const decimals = options.decimals || 0;
  return _.round(v, decimals).toString() + "%";
};

export const displayNumber = (v, options = {}) => {
  v = Number(v);
  if (options.coarseFormatting) {
    if (v > 1000000000) {
      return _.round(v / 1000000000, 1).toString() + " billion";
    } else if (v > 1000000) {
      return _.round(v / 1000000, 1).toString() + " million";
    } else if (v < 100) {
      return "<100";
    } else if (v < 200) {
      return "<200";
    } else if (v < 500) {
      return "<500";
    } else if (v < 1000) {
      return "<1000";
    } else {
      v = Number(v.toPrecision(2));
    }
  }

  // insert spaces rather than commas
  return v.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};

export const transformLink = (t) =>
  t.replaceAll("<a ", "<a target='_blank' rel='noopener noreferrer'");
