{pkgs ? import <nixpkgs> {}}:
pkgs.mkShell {
    buildInputs = [
        pkgs.bun
        pkgs.git
        pkgs.nodejs
    ];

    shellHook = ''
        # Add bun to PATH without homebrew
        export PATH="$PATH:/opt/homebrew/bin"
    '';
}
