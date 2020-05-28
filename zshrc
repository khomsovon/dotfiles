# If you come from bash you might have to change your $PATH.
# export PATH=$HOME/bin:/usr/local/bin:$PATH

# Path to your oh-my-zsh installation.
export ZSH=/Users/khomsovon/.oh-my-zsh
export TERM=xterm-256color
export PATH="$HOME/.composer/vendor/bin:$PATH"
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:`pwd`/flutter/bin
export CURL_CA_BUNDLE=~/cacert.pem
export GEM_HOME="$HOME/.gems"

# Set name of the theme to load. Optionally, if you set this to "random"
# it'll load a random theme each time that oh-my-zsh is loaded.
# See https://github.com/robbyrussell/oh-my-zsh/wiki/Themes
ZSH_THEME="powerlevel9k/powerlevel9k"
ZSH_DISABLE_COMPFIX=true

# For compilers to find zlib you may need to set:
export LDFLAGS="-L/usr/local/opt/zlib/lib"
export CPPFLAGS="-I/usr/local/opt/zlib/include"
# export LDFLAGS="-L/usr/local/opt/openssl@1.1/lib"
# export CPPFLAGS="-I/usr/local/opt/openssl@1.1/include"

#For pkg-config to find zlib you may need to set:
export PKG_CONFIG_PATH="/usr/local/opt/zlib/lib/pkgconfig"

# export PKG_CONFIG_PATH="/usr/local/opt/openssl@1.1/lib/pkgconfig"

# Set list of themes to load
# Setting this variable when ZSH_THEME=random
# cause zsh load theme from this variable instead of
# looking in ~/.oh-my-zsh/themes/
# An empty array have no effect
# ZSH_THEME_RANDOM_CANDIDATES=( "robbyrussell" "agnoster" )

# Uncomment the following line to use case-sensitive completion.
# CASE_SENSITIVE="true"

# Uncomment the following line to use hyphen-insensitive completion. Case
# sensitive completion must be off. _ and - will be interchangeable.
# HYPHEN_INSENSITIVE="true"

# Uncomment the following line to disable bi-weekly auto-update checks.
# DISABLE_AUTO_UPDATE="true"

# Uncomment the following line to change how often to auto-update (in days).
# export UPDATE_ZSH_DAYS=13

# Uncomment the following line to disable colors in ls.
# DISABLE_LS_COLORS="true"

# Uncomment the following line to disable auto-setting terminal title.
# DISABLE_AUTO_TITLE="true"

# Uncomment the following line to enable command auto-correction.
# ENABLE_CORRECTION="true"

# Uncomment the following line to display red dots whilst waiting for completion.
# COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to disable marking untracked files
# under VCS as dirty. This makes repository status check for large repositories
# much, much faster.
# DISABLE_UNTRACKED_FILES_DIRTY="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
# HIST_STAMPS="mm/dd/yyyy"

# Would you like to use another custom folder than $ZSH/custom?
# ZSH_CUSTOM=/path/to/new-custom-folder

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
plugins=(
  git
)

source $ZSH/oh-my-zsh.sh

# User configuration

# export MANPATH="/usr/local/man:$MANPATH"

# You may need to manually set your language environment
# export LANG=en_US.UTF-8

# Preferred editor for local and remote sessions
export EDITOR='vim'

# Compilation flags
# export ARCHFLAGS="-arch x86_64"

# ssh
# export SSH_KEY_PATH="~/.ssh/rsa_id"
#
eval "$(pyenv init -)"
eval "$(pyenv virtualenv-init -)"

# Set personal aliases, overriding those provided by oh-my-zsh libs,
# plugins, and themes. Aliases can be placed here, though oh-my-zsh
# users are encouraged to define aliases within the ZSH_CUSTOM folder.
# For a full list of active aliases, run `alias`.
# Example aliases
alias tree="find . -print | sed -e 's;[^/]*/;|____;g;s;____|; |;g'"
# alias zshconfig="mate ~/.zshrc"
# alias ohmyzsh="mate ~/.oh-my-zsh"
if which rbenv > /dev/null; then eval "$(rbenv init -)"; fi

#tmuxifire
export PATH="$HOME/.tmuxifier/bin:$PATH"
export TMUXIFIER_LAYOUT_PATH="$HOME/.tmux-layouts"
eval "$(tmuxifier init -)"
#########################
# Plugins Customization #
#########################
# Custom POWERLEVEL9K Theme
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(dir vcs)
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status rbenv time)
POWERLEVEL9K_SHORTEN_DIR_LENGTH=1
POWERLEVEL9K_SHORTEN_DELIMITER=""
POWERLEVEL9K_SHORTEN_STRATEGY="truncate_from_right"
POWERLEVEL9K_RBENV_BACKGROUND="green"
POWERLEVEL9K_PROMPT_ON_NEWLINE=true
POWERLEVEL9K_RPROMPT_ON_NEWLINE=true

# don't check for new mail
MAILCHECK=0

# Default options fzf
[ -f ~/.fzf.zsh ] && source ~/.fzf.zsh
export FZF_DEFAULT_OPTS="--extended"
export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"

#export PATH="/usr/local/opt/openssl/bin:$PATH"
# export PATH="/usr/local/opt/openssl/bin:$PATH"
# export PATH="/usr/local/opt/openssl/bin:$PATH"
export PATH="/usr/local/opt/v8@3.15/bin:$PATH"
export PATH="/usr/local/opt/libxslt/bin:$PATH"
export PATH="/usr/local/opt/libxml2/bin:$PATH"

#alias php=/Applications/MAMP/bin/php/php7.1.12/bin/php

alias cleandb="rails db:drop && rails db:create && rails db:migrate && rails db:seed"
#export PATH="/usr/local/opt/php@7.1/bin:$PATH"
#export PATH="/usr/local/opt/php@7.1/sbin:$PATH"
#export PATH="/usr/local/etc/php/7.3/$PATH"
#export PATH="/usr/local/etc/php/7.3/sbin:$PATH"
export PATH="/Applications/MAMP/bin/php/php7.1.12/bin/$PATH"
export PATH="/Applications/MAMP/bin/php/php7.1.12/sbin/$PATH"
export PATH="/Applications/MAMP/Library/bin/mysql/$PATH"
export PATH="/usr/local/opt/ncurses/bin:$PATH"
export PATH="/usr/local/opt/ruby/bin:$PATH"
export PATH="/usr/local/opt/openssl@1.1/bin:$PATH"
export PATH="$HOME/.rbenv/bin:$HOME/.rbenv/shims:$PATH"
