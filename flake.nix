{
  inputs.dream2nix.url = "github:nix-community/dream2nix";
  outputs = inputs: {
    packages.x86_64-linux.default = inputs.dream2nix.lib.evalModules {
      packageSets.nixpkgs = inputs.dream2nix.inputs.nixpkgs.legacyPackages.x86_64-linux;
      modules = [ ./default.nix ];
    };
  };
}
