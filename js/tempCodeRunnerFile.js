  var data = {
    code: 42,
    items: [{
      id: 1,
      name: 'foo'
    }, {
      id: 2,
      name: 'bar'
    }]
  };
  
  
  // Method 4  Destructuring
  let { items: [, { name: [""] }] } = data;
  console.log(secon_nam);