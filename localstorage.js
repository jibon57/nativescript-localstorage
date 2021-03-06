/**********************************************************************************
* (c) 2017, Nathanael Anderson.
* Licensed under the MIT license.
*
* Version 1.1.5                                        nathan@master-technology.com
**********************************************************************************/
'use strict';

var FileSystemAccess = require('file-system/file-system-access').FileSystemAccess;

// So that code that is looking for the "Storage" object will pass its check
if (!global.Storage) {
    global.Storage = function Storage() { }
}

if (!global.localStorage) {
    var localStorageData = {};
    var localStorageTimeout = null;

    var internalSaveData = function() {
        var fsa = new FileSystemAccess();
        var fileName = fsa.getDocumentsFolderPath() + "/localStorage.db";
        try {
            fsa.writeText(fileName, JSON.stringify(localStorageData));
        } catch (err) {
            // This should never happen on normal data, but if they tried to put non JS stuff it won't serialize
            console.log("localStorage: unable to write storage, error: ", err);
        }

    };

    var saveData = function()  {
        if (localStorageTimeout !== null) {
            clearTimeout(localStorageTimeout);
        }
        localStorageTimeout = setTimeout(internalSaveData, 250);
    };

    var loadData = function() {
        var fsa = new FileSystemAccess();
        var fileName = fsa.getDocumentsFolderPath() + "/localStorage.db";
        if (!fsa.fileExists(fileName)) {
            return;
        } 

        var data;
        try {
            var textData = fsa.readText(fileName);
            data = JSON.parse(textData);
            localStorageData = data;
        }
        catch (err) {
            console.log("localStorage: error reading storage, Error: ", err);
        }
    };

    loadData();


    global.localStorage = {
        getItem: function (name) {
            if (localStorageData.hasOwnProperty(name)) {
                return localStorageData[name];
            }
            return null;
        },
        key: function(id) {
            var keys = Object.keys(localStorageData);
            if (id >= keys.length) { return null; }
            return keys[id];
        },
        setItem: function (name, value) {
            localStorageData[name] = value;
            saveData();
        },
        removeItem: function (name) {
            if (localStorageData[name]) {
                delete localStorageData[name];
                saveData();
            }
        },
        clear: function () {
            localStorageData = {};
            saveData();
        }
    };
    Object.defineProperty(global.localStorage, "length", {
        get: function() {
            return (Object.keys(localStorageData).length);
        },
        enumerable: true,
        configurable: true
    });
}


if (!global.sessionStorage) {
    var sessionStorageData = {};

    global.sessionStorage = {
        getItem: function (name) {
            if (sessionStorageData.hasOwnProperty(name)) {
                return sessionStorageData[name];
            }
            return null;
        },
        key: function(id) {
            var keys = Object.keys(sessionStorageData);
            if (id >= keys.length) { return null; }
            return keys[id];
        },
        setItem: function (name, value) {
            sessionStorageData[name] = value;
        },
        removeItem: function (name) {
            if (sessionStorageData[name]) {
                delete sessionStorageData[name];
            }
        },
        clear: function () {
            sessionStorageData = {};
        }
    };
    Object.defineProperty(global.sessionStorage, "length", {
        get: function() {
            return (Object.keys(sessionStorageData).length);
        },
        enumerable: true,
        configurable: true
    });
}

module.exports = global.localStorage;
