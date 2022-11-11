export const parse = (template: any) => {
  let result = /{{(.*?)}}/g.exec(template);

  const arr = [];
  let firstPos;

  while (result) {
    firstPos = result.index;
    if (firstPos !== 0) {
      arr.push(template.substring(0, firstPos));
      template = template.slice(firstPos);
    }

    arr.push(result[0]);
    template = template.slice(result[0].length);
    result = /{{(.*?)}}/g.exec(template);
  }

  if (template) arr.push(template);
  return arr;
};

// console.log(parse("Hi my name is {{ name }}!"))

const compileToString = (template: any) => {
  const ast = template;
  let finalString = `""`;

  ast.map((t: any) => {
    // checking to see if it is an interpolation
    if (t.startsWith("{{") && t.endsWith("}}")) {
      // append it to finalString
      finalString += `+data.${t.split(/{{|}}/).filter(Boolean)[0].trim()}`;
    } else {
      // append the string to the finalString
      finalString += `+"${t}"`;
    }
  });

  return finalString;
};
// console.log(compileToString([ 'Hi my name is ', '{{ name }}', '!' ]))

export const compile = (template: any) => {
  return new Function("data", "return " + compileToString(template));
};

// Use Syntax like :
// ((compile(
//     parse("Hello my name is {{name}}")
// ))({name: "Sunmeet"}))
