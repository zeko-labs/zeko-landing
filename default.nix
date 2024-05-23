{
  lib,
  config,
  dream2nix,
  ...
}:

let
  fetchFont = name: url: outputHash:
    let
      fod = config.deps.runCommandNoCC "fetchFont-${name}" {
        inherit outputHash;
        outputHashMode = "recursive";
        nativeBuildInputs = with config.deps; [ curl cacert ];
      } ''
        set -xe
        mkdir "$out"
        cd "$out"
        user_agent='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36'
        curl -A "$user_agent" -L -o font.css '${url}'
        urls=$(sed -n 's/.*url(\(.*woff2\)).*/\1/p' font.css)
        for url in $urls
        do
          curl -A "$user_agent" -LO "$url"
        done
      '';
      patched = config.deps.runCommandNoCC "fetchFont-${name}-patched" {} ''
        cp -r --no-preserve=all ${fod} "$out"
        sed -i -e "s|https://fonts.gstatic.com/s/lexend/v19|$out|g" "$out/font.css"
      '';
    in patched;
  google_css_url_700 = "https://fonts.googleapis.com/css2?family=Lexend:wght@700&display=swap";
  google_css_url_300 = "https://fonts.googleapis.com/css2?family=Lexend:wght@300&display=swap";
  google_css_url_100_900 = "https://fonts.googleapis.com/css2?family=Lexend:wght@100..900&display=swap";
  google_css_700 = fetchFont "google_css_700" google_css_url_700 "sha256-7WQ0ad0+y0JEHQ7LiyRN5t3uO4lGISaVxU6MzTU1p7Q=";
  google_css_300 = fetchFont "google_css_300" google_css_url_300 "sha256-IehNYD+Q/70lgtZj9asLP4U4vyBCs6ytsfJUrQsk6+A=";
  google_css_100_900 = fetchFont "google_css_100_900" google_css_url_100_900 "sha256-l6RvVlJFJtYIN7dDaVeMRDOouoFgRw/V5xqc5p+/f1I=";
  mock = builtins.toFile "mocked-font.css" ''
    fs = require('fs')
    module.exports = {
      '${google_css_url_700}': fs.readFileSync(process.env.GOOGLE_CSS_700, 'utf8'),
      '${google_css_url_300}': fs.readFileSync(process.env.GOOGLE_CSS_300, 'utf8'),
      '${google_css_url_100_900}': fs.readFileSync(process.env.GOOGLE_CSS_100_900, 'utf8'),
    }
  '';
in {
  imports = [
    dream2nix.modules.dream2nix.nodejs-package-lock-v3
    dream2nix.modules.dream2nix.nodejs-granular-v3
  ];

  mkDerivation = {
    src = ./.;
    version = "0.1";
  };

  deps = {nixpkgs, ...}: {
    inherit
      (nixpkgs)
      stdenv
      curl
      cacert
      ;
  };

  nodejs-package-lock-v3 = {
    packageLockFile = "${config.mkDerivation.src}/package-lock.json";
  };

  name = "zeko-landing";
  version = "0.1";

  paths.projectRoot = ./.;
  paths.package = ./.;
  paths.projectRootFile = "dream2nix-module.nix";

  env.GOOGLE_CSS_700 = "${google_css_700}/font.css";
  env.GOOGLE_CSS_300 = "${google_css_300}/font.css";
  env.GOOGLE_CSS_100_900 = "${google_css_100_900}/font.css";
  env.NEXT_FONT_GOOGLE_MOCKED_RESPONSES = mock;

}
