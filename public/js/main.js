$(document).ready(function() {
    QUnit.test( "hello test", function( assert ) {
        assert.ok( 1 == "1", "Passed!" );
    });

    test("strictEqual", 3, function() {
        var actual = 5 - 4;

        strictEqual(actual, 1,     "passes because 1 === 1");
        strictEqual(actual, true,  "fails because 1 !== true");
        strictEqual(actual, false, "fails because 1 !== false");
    });

    test("notStrictEqual", 3, function(){
        var actual = 5-4;
        notStrictEqual(actual, 1, "fails because 1 === 1");
        notStrictEqual(actual, true,  "passes because 1 !== true");
        notStrictEqual(actual, false, "passes because 1 !== false");
    });

    test("deepEqual", 7, function(){
        var actual = {a: 1};

        equal(actual, {a: 1}, "Fails because objects are different");
        deepEqual(actual, {a: 1}, "passes because objects are equivalent");
        deepEqual(actual, {a: "1"}, "fails because '1' !== 1");

        var a = $("body > *");
        var b = $("body").children();

        equal(a, b, "fails because jQuery objects are different");
        deepEqual(a, b, "fails because jQuery objects are not equivalent");
        equal(a.get(), b.get(), "fails because elements arrays are different");
        deepEqual(a.get(), b.get(), "passes because element arrays are equivalent");

    });
    test("raises", 3, function() {
        raises(function() {
            throw new Error("Look ma, I'm an error!");
        }, "passes because an error is thrown inside the callback");

        raises(function() {
            x // ReferenceError: x is not defined
        }, "passes because an error is thrown inside the callback");

        raises(function() {
            var a = 1;
        }, "fails because no error is thrown inside the callback");
    });

    asyncTest("asyncTest & start", function() {
        expect(1);

        var actual = false;

        setTimeout(function() {
            ok(actual, "this test actually runs, and fails");
            start();
        }, 1000);
    });

    test("stops & starts", function() {
        expect(212044);

        var url = "http://localhost:3000/colleges/topten";

        stop();
        $.getJSON(url, {a: 212044}, function(data) {
            ok(data, "data is returned from the server");
            equal(data.a, "1", "the value of data.a should be 1");
            start();
        });

        stop();
        $.getJSON(url, {b: 98778}, function(data) {
            ok(data, "data is returned from the server");
            equal(data.b, "2", "the value of data.b should be 2");
            start();
        });
    });

    $.mockAjax("json", {
        "/user": {status: -1},
        "/user/(\\d+)": function(matches) {
            return {status: 1, user: "sample user " + matches[1]};
        }
    });

    //Unit Test

    test("user tests", function(){
        expect(5);

        stop();
        $.getJSON("/user", function(data){
            ok(data, "data is returned from server");
            equal(data.status, "-1", "no user specified, status should be -1 ");
            start();
        });

        stop();
        $.getJSON("/user/123", function(data){
            ok(data, "data is returned from server");
            equal(data.status, "1", "user found, status should be 1");
            equal(data.user, "sample user 123", "user found, id should be 123");
            start();
        })
    });

    // Runs once at the very beginning.

    QUnit.begin = function() {
        console.log("Running Test Suite");
    };

// Runs once at the very end.

    QUnit.done = function(failures, total) {
        console.info("Suite: %d failures / %d tests", failures, total);
    };

// Runs once after each assertion.

    QUnit.log = function(result, message) {
        console[ result ? "log" : "error" ](message);
    };

// Runs before each test.

    QUnit.testStart = function(name) {
        console.group("Test: " + name);
    };

// Runs after each test.

    QUnit.testDone = function(name, failures, total) {
        console.info("Test: %d failures / %d tests", failures, total);
        console.groupEnd();
    };

// Runs before each module.

    QUnit.moduleStart = function(name) {
        console.group("Module: " + name);
    };

// Runs after each module.

    QUnit.moduleDone = function(name, failures, total) {
        console.info("Module: %d failures / %d tests", failures, total);
        console.groupEnd();
    };

// Runs after each test group. Redefining this function will
// override the built-in #qunit-fixture reset logic.

    QUnit.reset = function() {
        console.log("Test done!");
    };

});