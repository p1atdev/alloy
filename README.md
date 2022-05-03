# Alloy - An application installer for restriced macOS

> Note: This is in experimental stage. Please report any bugs.

## TOC

- [What is Alloy](#What-is-Alloy)
  - [Features](#Features)
- [Installation](#Installation)
- [Usage](#Usage)
  - [Installing applications](#Installing-applications)
    - [Supported applications](#Supported-applications)
  - [Uninstalling applications](#Uninstalling-applications)
- [TODO](#TODO)
- [Contributing](#Contributing)

## What is Alloy

Alloy is an application installer for restricted macOS. It is a simple command line tool that installs applications on macOS.

### Features

- 🥳 Run without root privileges
- 🥳 Install applications with a single command ( `alloy install <app-name>` )
- 🥳 Support third-party applications (e.g. Chrome, Firefox, Spotify etc.)

## Installation

Requirements:

- [Deno](https://deno.land/)

To install Alloy:

```bash
deno run -A --unstable https://deno.land/x/alloy/install.ts
```

Tp update alloy:
```bash
alloy update-self
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

To uninstall an application:

```bash
alloy uninstall <app-name>
```

For example:

```bash
alloy uninstall chrome
```

## TODO

- [ ] Update installed applications command
- [ ] Add more applications
- [ ] Add completion support

## Contributing

