#!/bin/bash

brew install curl git the_silver_searcher zsh zsh-completions
chsh -s $(which zsh) # chsh -s /bin/zsh

sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

curl https://raw.github.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash
curl https://raw.github.com/git/git/master/contrib/completion/git-prompt.sh -o ~/.git-prompt.sh

git clone git@github.com:khomsovon/dotfiles.git ~/.dotfiles

ln -f -s ~/.dotfiles/zshrc ~/.zshrc

ln -s ~/.dotfiles/vim ~/.vim
ln -s ~/.dotfiles/vimrc ~/.vimrc

ln -s ~/.dotfiles/tmux.conf ~/.tmux.conf
ln -s ~/.dotfiles/tmuxifier ~/.tmuxifier
ln -s ~/.dotfiles/tmuxifier-layouts ~/.tmuxifier-layouts
ln -s ~/.dotfiles/pryrc ~/.pryrc
ln -s ~/.dotfiles/gemrc ~/.gemrc
ln -s ~/.dotfiles/irbrc ~/.irbrc
ln -s ~/.dotfiles/gitconfig ~/.gitconfig
ln -s ~/.dotfiles/gitignore_global ~/.gitignore_global
ln -s ~/.dotfiles/ctags ~/.ctags
ln -s ~/.dotfiles/vscode ~/.vscode

vim +PlugInstall +qall
