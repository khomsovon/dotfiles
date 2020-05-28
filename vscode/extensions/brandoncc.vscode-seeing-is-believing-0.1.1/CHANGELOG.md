# Change Log

## 0.1.1

Document `seeing-is-believing.halt-run-on-error` in the readme.

## 0.1.0

- Update the extension to use Typescript.
- Add `seeing-is-believing.halt-run-on-error` to fix errors interfering with the
  extension functioning on Ruby MRI 2.7.0.

## 0.0.6

Fix a bug handling spaces in windows paths with the `--as` flag.

## 0.0.5

- Code cleanup
- Reintroduce the ability to use `require_relative`, thanks to the new
  `--local-cwd` flag for the binary. Thanks @JoshCheek!

## 0.0.4

- Revert 0.0.3, because I experience problems in certain situations when
  directories were not writeable.
- Spawn the process in a shell on Windows

## 0.0.3

Write editor contents to a temporary file, then run that file through
seeing-is-believing. By doing this, `require_relative` works properly.
Previously, the editor contents were written to the stdin of the
seeing-is-believing process, but the presence of `require_relative` in the
editor text caused an exception.

## 0.0.2

- Don't show error message twice
- Refactor specs to test all commands against execution in non-ruby files
- Rely on VS Code's error message if a command's returned promise is rejected

## 0.0.1

- Initial release
