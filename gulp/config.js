﻿'use strict';

var notifier = require('node-notifier');
var argv = require('yargs').argv;

module.exports = (function () {
    var projectName = "novicell-gulp";

    var projectPath = "./";
    var bowerPath = projectPath + "vendor/bower"; // remember to edit .bowerrc aswell (for CLI)
    var distPath = projectPath + "dist";
    var jsonIconOptions = {
        path: distPath + "/icons/",
        fileName: "icons.json"
    };
    var typescriptPath = projectPath + "scripts/typescript";
    var cleanPaths = [distPath];
    var preprocessor = "less"; //choose between "less" or "scss"
    var enableTypescript = false; // Set to false to disable

    return {
        // ------------- Bundles -------------
        bundles: [
            {
                name: "vendor",
                ignorePlugins: ["jscs", "jshint", "watch"], // add "minify", to ignore minifaction on a bundle
                scripts: [
                    bowerPath + "/svg4everybody/dist/svg4everybody.js",
                    bowerPath + "/jquery/dist/jquery.js"
                ]
            },
            {
                // For styling Umbraco Grid editors in backoffice
                name: "backofficemaster",
                scripts: [
                    projectPath + "scripts/backofficemaster.js"
                ],
                styles: ["./" + preprocessor + "/backofficemaster." + preprocessor],
            },
            {
                name: "webfont",
                styles: ["./" + preprocessor + "/base/base.fonts." + preprocessor],
            },
            {
                name: "master",
                scripts: [
                    projectPath + "scripts/components/highlight.pack.js",
                    projectPath + "scripts/master.js"
                ],
                styles: [projectPath + preprocessor + "/master." + preprocessor],
                images: [projectPath + "images/**/*.{jpg,png,svg,gif}"],
                icons: [projectPath + "icons/**/*.svg"],
                html: [projectPath + "html/*.html"],
                htmlIncludes: [projectPath + "html/includes/html/*.html"]
            }
        ],


        // ------------- Styles -------------
        stylesDist: distPath + "/css",
        stylesVendorPrefixes: [
            "last 2 version",
            "safari 5",
            "ie 9",
            "opera 12.1",
            "ios 8",
            "android 4"
        ],

        // ------------- Scripts -------------
        scriptsDist: distPath + "/scripts",

        // ------------- Icons ---------------
        iconsDist: distPath,
        spriteConfig: {
            shape : {
                // Set maximum dimensions
                dimension       : {
                    maxWidth    : 32,
                    maxHeight   : 32
                }
            },
            mode : {
                view : {
                    bust : false,
                    render : {
                        less : true
                    },
                    dest : 'icons',
                    sprite : 'icons-css.svg'
                },
                symbol : {
                    dest : 'icons',
                    sprite : 'icons.svg'
                }
            }
        },

        // ------------- Fonts -------------
        fontsDist: distPath + "/fonts",

        // ------------- Images -------------
        imagesDist: distPath + "/images",
        imagesOptimizationLevel: 5,
        imagesProgressive: true,
        imagesInterlaced: true,

        // -------------- HTML --------------
        htmlFileIncludeConfig: {
            prefix: '@@',
            basepath: '@file'
        },

        // ----------- HTML Escape ------------
        htmlEscapeDistPath: distPath + "/includes/html/",
        htmlEscapeConfig: {

        },

        // ------------- Livereload ---------
        livereloadPort: 35729,
        livereloadPaths: [
            "./dist/scripts/*.js",
            "./dist/css/*.css",
            "./Views/**/*.cshtml",
            "./html/**/*.html"
        ],

        // ------------- Watch -------------
        watchImages: [ projectPath + "images/**/*", projectPath + '!images/icons/*' ],
        watchIcons: [ projectPath + "images/icons/*" ],
        watchFonts: [ projectPath + "fonts/*" ],
        watchHtml: [ projectPath + "html/**/*" ],
        watchScripts: [
            projectPath + "scripts/**/*.js",
            projectPath + "vendor/**/*.js"
        ],
        watchStyles: [
            projectPath + preprocessor + "/**/*." + preprocessor,
            projectPath + "vendor/**/*.{less, scss}"
        ],

        // ------------- Copy on build --------
        buildCopy: [{
            from: projectPath + "fonts/**/*",
            to: distPath  + "/fonts"
        },
        {
            from: projectPath + "html/includes/css/*",
            to: distPath  + "/includes/css/"
        },],


        // ------------- Tasks -------------
        loadTasks: [
            "bower", "typescript", "styles",
            "scripts", "images", "icons",
            "copy", "watch", "build",
            "html", "html-escape"
        ],
        buildTasks: [
            "styles", "typescript", "scripts",
            "images", "icons", "copy", "html"
        ],

        // ------------- Return Paths -------------
        projectPath: projectPath,
        bowerPath: bowerPath,
        cleanPaths: cleanPaths,
        typescriptPath: typescriptPath,
        enableTypescript: enableTypescript,
        preprocessor: preprocessor,
        distPath: distPath,
        jsonIconOptions: jsonIconOptions,

        // ---------- Errorhandler ------
        errorHandler: function(taskName)
        {
            return function (e) {
                notifier.notify({
                    "title": taskName,
                    "message": "An error occured in the " + e.plugin + " plugin."
                });
                console.log(e.message);
                this.emit("end");
            };
        }
    }
})();
