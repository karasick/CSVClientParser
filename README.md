# CSV Client Data Parser

## Description

Test task for parsing csv data files from zip archive to json file.

**Only Windows support provided for now.**

## Installation

Download latest release archive for your OS and extract it to any folder.

### Build (Optional)

If you want to build executable by yourself - pull latest commit and run next commands within root folder:

```
$ npm run build
$ npm run package
``` 

## Usage

```
client-parser.exe [command]

Commands:
  client-parser.exe parse <inputName>       Parse zip archive <inputName> with
  [--outputName=<outputName>]               csv files to json file <outputName>


Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]
```

## Example

1. Within folder with executable with the next structure:

```
.
├── client-parser.exe       # Compiled executable
└── csvData.zip             # Target zip archive with scv files
```

2. Run this command:

```
$ client-parser.exe parse csvData.zip
```

3. Get your result file.

```
.
├── client-parser.exe       # Compiled executable
├── csvData.zip             # Target zip archive with scv files
└── result.json             # Result json file with data

```

---
