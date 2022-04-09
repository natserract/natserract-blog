---
title: "Rust · macOS Setup Guide"
date: "2021-12-30"
author: "Alfin Surya"
excerpt: "Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency. Rust is *syntactically similar to C++*, but can guarantee memory safety by using a borrow checker to validate references. Rust achieves memory safety without garbage collection, and reference counting is optional. Rust has been called a systems programming language and in addition to high-level features such as [functional programming](https://en.wikipedia.org/wiki/Functional_programming) it also offers mechanisms for low-level memory management."
---

Rust is a multi-paradigm, general-purpose programming language designed for performance and safety, especially safe concurrency. Rust is *syntactically similar to C++*, but can guarantee memory safety by using a borrow checker to validate references. Rust achieves memory safety without garbage collection, and reference counting is optional. Rust has been called a systems programming language and in addition to high-level features such as [functional programming](https://en.wikipedia.org/wiki/Functional_programming) it also offers mechanisms for low-level memory management.

Rust was originally designed by **Graydon Hoare** at [Mozilla](mozilla.org/) Research, with contributions from Dave Herman, Brendan Eich, and others. The designers refined the language while writing the Servo experimental browser engine, and the Rust compiler. It has gained increasing use in industry, and Microsoft has been experimenting with the language for secure and safety-critical software components.

## Install Rust
Run the following in your terminal, then follow the onscreen instructions.
```sh
λ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```
When the Rust installer is finished, you'll be ready to program with Rust. If you wanna check, just type this command `cargo --version`. If you see a version number printed, then that confirms that Rust installed correctly.

## Install Nightly Toolchain
Rustup makes it easy to change between different release channels of Rust, on a global or per-project basis. By default, you’ll have stable Rust installed. To install nightly, for example:
```sh
λ rustup toolchain install nightly
```
After finish, if you wanna set **nightly** as default just type `rustup default nightly`.

You can see all of the toolchains (releases of Rust and associated components) you have installed with rustup as well. Here’s an example on one of your authors’ computers:

```sh
λ rustup toolchain list
```
## Instal VSCode Extensions
Install those required extensions:
- [Rust (rls) - For auto complete](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust)
- [Rust analyzer](https://marketplace.visualstudio.com/items?itemName=matklad.rust-analyzer)

After installing, open a rust file in the editor and you will be asked: `some rust components not installed. Install it?`. Click **Yes**

## Some VSCode Error Reports
- `Component 'rls' for target 'x86_64-apple-darwin' is unavailable/Cannon install rls..`, in my case set toolchain in specific version `rustup default nightly-2018-08-19-x86_64-apple-darwin`.
- `Failed to read cargo metada`, add rustc `rustup component add rustc`. If you want to clean your project just type `cargo clean`
- `Rust component can’t installed`, set default nightly toolchain to stable versions and add **rls** `rustup component add rls`.

That's all. Quite simple, with a bit of tweaking.

## References:
- [http://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/second-edition/ch01-03-how-rust-is-made-and-nightly-rust.html](http://web.mit.edu/rust-lang_v1.25/arch/amd64_ubuntu1404/share/doc/rust/html/book/second-edition/ch01-03-how-rust-is-made-and-nightly-rust.html)
- [https://dev.to/thiagomg/developing-in-rust-using-visual-studio-code-4kkl](https://dev.to/thiagomg/developing-in-rust-using-visual-studio-code-4kkl)
- [https://github.com/rust-lang/rls/issues/641#issuecomment-415700561](https://github.com/rust-lang/rls/issues/641#issuecomment-415700561)