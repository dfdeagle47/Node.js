console.log(process.argv);

function add (a, b) {

    console.log(parseInt(a) + parseInt(b));
}

add(process.argv[2], process.argv[3]);

    module.exports = add;
