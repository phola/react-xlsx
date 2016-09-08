const sample = {
  "SheetNames": [
    "Main"
  ],
  "Sheets": {
    "Main": {
      "!merges": [
        {
          "s": {
            "c": 0,
            "r": 0
          },
          "e": {
            "c": 2,
            "r": 0
          }
        }
      ],
      "A1": {
        "v": "This is a submerged cell",
        "s": {
          "border": {
            "left": {
              "style": "thick",
              "color": {
                "auto": 1
              }
            },
            "top": {
              "style": "thick",
              "color": {
                "auto": 1
              }
            },
            "bottom": {
              "style": "thick",
              "color": {
                "auto": 1
              }
            }
          }
        },
        "t": "s"
      },
      "B2": {
        "v": "Pirate ship",
        "s": {
          "border": {
            "top": {
              "style": "thick",
              "color": {
                "auto": 1
              }
            },
            "bottom": {
              "style": "thick",
              "color": {
                "auto": 1
              }
            }
          }
        },
        "t": "s"
      },
      "!ref": "A1:F14"
    }
  }
}

export default sample
