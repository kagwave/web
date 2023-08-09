import authService from "./services/auth/index";

"use strict"

require("ignore-styles");

require("@babel/register")({
  ignore: [/(node_modules)/],
  presets: [
    "@babel/preset-react" , 
    "@babel/preset-env" , 
    "@babel/preset-typescript"
   ],
   plugins: [
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-class-properties",
    [
      "transform-assets",
      {
        "extensions": [
          "css",
          "svg",
          'mp3',
        ],
        "name" : "static/media/[name].[hash:8].[ext]"
      }
    ]
  ]
})


authService.start();