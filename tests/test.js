const obj = {
  namex: "luiggy",
  body: {
    human: true,
  },
};

const {
  namex,
  body: { human },
} = obj;
console.log(namex, human);
