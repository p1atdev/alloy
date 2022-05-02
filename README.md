# Alloy - An application installer for restriced macOS

> Note: This is in experimental stage. Please report any bugs.

## TOC
-   [What is Alloy](#What-is-Alloy)
-   [Installation](#Installation)
-   [Usage](#Usage)
    -  [Installing applications](#Installing-applications)
        -  [Supported applications](#Supported-applications)
    -  [Uninstalling applications](#Uninstalling-applications)
-   [TODO](#TODO)
-   [Contributing](#Contributing)

## What is Alloy

## Installation

Requirements:
- [Deno](https://deno.land/)

To install Alloy:
```bash
deno install -fqAn alloy --unstable https://deno.land/x/alloy/main.ts
```

To uninstall Alloy:
```bash
deno uninstall alloy
```

## Usage

### Help
    
```bash
alloy --help
```

```bash
alloy -h
```

### Installing applications

To install an application:
```bash
alloy install <app-name>
```

For example:
```bash
alloy install chrome
```

#### Supported applications

- Spotify
- Google Chrome
- Firefox (Not yet)
- NextDNS (Not yet)
- Keka (Not yet)
- Visual Studio Code (Not yet)
- Figma (Not yet)

### Uninstalling applications

## TODO

## Contributing