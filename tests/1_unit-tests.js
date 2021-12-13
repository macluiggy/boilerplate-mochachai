// en los comentarios $1, $2, $3, $4, etc. quiere decir 'n argumento': primer argumento, segundo argumento, etc.
const chai = require("chai");
const assert = chai.assert;

suite("Unit Tests", function () {
  suite("Basic Assertions", function () {
    // #1
    test("#isNull, #isNotNull" , function () {
      assert.isNull(
        null,
        "This is an optional error description - e.g. null is null"
      );
      assert.isNotNull(1, "1 is not null");
    });
    // #2
    test("#isDefined, #isUndefined", function () {
      assert.isDefined(null, "null is not undefined");
      assert.isUndefined(undefined, "undefined IS undefined");
      assert.isDefined("hello", "A string is not undefined");
    });
    // #3
    test("#isOk, #isNotOk", function () {
      // esto va a verificar que sea un valor truthy o no (falsy)
      assert.isNotOk(null, "null is falsey");
      assert.isOk("I'm truthy", "A string is truthy");
      assert.isOk(true, "true is truthy");
    });
    // #4
    test("#isTrue, #isNotTrue", function () {
      assert.isTrue(true, "true is true");
      assert.isTrue(
        !!"double negation",
        "Double negation of a truthy value is true"
      );
      assert.isNotTrue(
        { value: "truthy" },
        "Objects are truthy, but are not boolean values"
      );
    });
  });

  // -----------------------------------------------------------------------------

  suite("Equality", function () {
    // #5
    test("#equal, #notEqual", function () {
      // este tomara los primeros dos argumentos y los evaluara para ver si son iguales usando el operador ==
      assert.equal(12, "12", "Numbers are coerced into strings with ==");
      assert.notEqual(
        { value: 1 },
        { value: 1 },
        "== compares object references"
      );
      assert.equal(6 * "2", "12");
      assert.notEqual(6 + "2", "12");
    });
    // #6
    test("#strictEqual, #notStrictEqual", function () {
      // este hace lo mismo que el anterior pero usando el operador ===
      assert.notStrictEqual(6, "6");
      assert.strictEqual(6, 3 * 2);
      assert.strictEqual(6 * "2", 12);
      assert.notStrictEqual([1, "a", {}], [1, "a", {}]);
    });
    // #7
    test("#deepEqual, #notDeepEqual", function () {
      // se testea que dos objetos son o no profundamente iguales
      assert.deepEqual(
        { a: "1", b: 5 },
        { b: 5, a: "1" },
        "The order of keys doesn't matter"
      );
      assert.notDeepEqual(
        { a: [5, 6] },
        { a: [6, 5] },
        "The order of array elements does matter"
      );
    });
  });

  // -----------------------------------------------------------------------------

  function weirdNumbers(delta) {
    return 1 + delta - Math.random();
  }

  suite("Comparisons", function () {
    // #8 evalua si el primer argumento es mayor o es menor o igual al segundo
    test("#isAbove, #isAtMost", function () {
      assert.isAtMost("hello".length, 5);
      assert.isAbove(1, 0);
      assert.isAbove(Math.PI, 3);
      assert.isAtMost(1 - Math.random(), 1);
    });
    // #9 evalua que el primer argumento sea menor o mayor o igual al segundo
    test("#isBelow, #isAtLeast", function () {
      assert.isAtLeast("world".length, 5);
      assert.isAtLeast(2 * Math.random(), 0);
      assert.isBelow(5 % 2, 2);
      assert.isBelow(2 / 3, 1);
    });
    // #10 este evalua el el primer argumento ($1) debe estar entre $2 - $3 y $2 + $3 o dicho de forma matematica $2-$3<=$1<=$2+$3
    test("#approximately", function () {
      assert.approximately(weirdNumbers(0.5), 1, 0.5);
      assert.approximately(weirdNumbers(0.2), 1, 0.8);
    });
  });

  // -----------------------------------------------------------------------------

  const winterMonths = ["dec,", "jan", "feb", "mar"];
  const backendLanguages = ["php", "python", "javascript", "ruby", "asp"];
  suite("Arrays", function () {
    // #11
    test("#isArray, #isNotArray", function () {
      //verifica que el $1 (argumento 1) es un array, el $2 (argumento 2) es una descripcion nomas
      assert.isArray(
        "isThisAnArray?".split(""),
        "String.prototype.split() returns an array"
      );
      assert.isNotArray([1, 2, 3].indexOf(2), "indexOf returns a number");
    });
    // #12
    test("Array #include, #notInclude", function () {
      // se pone un array en el $1 y se verifica el que valor del $2 este incluido en este
      assert.notInclude(winterMonths, "jul", "It's summer in july...");
      assert.include(
        backendLanguages,
        "javascript",
        "JS is a backend language"
      );
    });
  });

  // -----------------------------------------------------------------------------

  const formatPeople = function (name, age) {
    return "# name: " + name + ", age: " + age + "\n";
  };
  suite("Strings", function () {
    // #13
    test("#isString, #isNotString", function () {
      // evalua que el $1 sea o no un string
      assert.isNotString(Math.sin(Math.PI / 4), "A float is not a string");
      assert.isString(
        process.env.PATH,
        "An env variable is a string (or undefined)"
      );
      assert.isString(JSON.stringify({ type: "object" }), "JSON is a string");
    });
    // #14
    test("String #include, #notInclude", function () {
      // evalua que el $1 contenga todo o parte del $2, ejemplo $1 = Hola, $2 = ola, $2 esta contenido en $1
      assert.include("Arrow", "row", "'Arrow' contains 'row'");
      assert.notInclude("dart", "queue", "But 'dart' doesn't contain 'queue'");
    });
    // #15
    test("#match, #notMatch", function () {
      // verifica que el $1 encage con la expresion regular que es el $2
      const regex = /^#\sname\:\s[\w\s]+,\sage\:\s\d+\s?$/;
      assert.match(formatPeople("John Doe", 35), regex);
      assert.notMatch(formatPeople("Paul Smith III", "twenty-four"), regex);
    });
  });

  // -----------------------------------------------------------------------------

  const Car = function () {
    this.model = "sedan";
    this.engines = 1;
    this.wheels = 4;
  };

  const Plane = function () {
    this.model = "737";
    this.engines = ["left", "right"];
    this.wheels = 6;
    this.wings = 2;
  };

  const myCar = new Car();
  const airlinePlane = new Plane();

  suite("Objects", function () {
    // #16
    test("#property, #notProperty", function () {
      // testea que el el objeto de $1 tenga la propiedad que se encuentra como $2
      assert.notProperty(myCar, "wings", "Cars don't have wings");
      assert.property(airlinePlane, "engines", "Planes have engines");
      assert.property(myCar, "wheels", "Cars have wheels");
    });
    // #17
    test("#typeOf, #notTypeOf", function () {
      // evalua que el $1 sea de typo $2
      assert.typeOf(myCar, "object");
      assert.typeOf(myCar.model, "string");
      assert.notTypeOf(airlinePlane.wings, "string");
      assert.typeOf(airlinePlane.engines, "array");
      assert.typeOf(myCar.wheels, "number");
    });
    // #18
    test("#instanceOf, #notInstanceOf", function () {
      // verifica que $1 sea una instancia o no de $2
      assert.notInstanceOf(myCar, Plane);
      assert.instanceOf(airlinePlane, Plane);
      assert.instanceOf(airlinePlane, Object);
      assert.notInstanceOf(myCar.wheels, String);
    });
  });

  // -----------------------------------------------------------------------------
});
