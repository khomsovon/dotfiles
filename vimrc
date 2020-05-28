call plug#begin('~/.vim/plugged')

"Plug 'micha/vim-colors-solarized'
Plug 'vim-airline/vim-airline'
Plug 'vim-airline/vim-airline-themes'
Plug 'christoomey/vim-system-copy'
Plug 'scrooloose/nerdtree'
Plug 'tpope/vim-rails'
Plug 'tpope/vim-fugitive'
Plug 'airblade/vim-gitgutter'
Plug 'ervandew/supertab'
Plug 'simeji/winresizer'
Plug 'tpope/vim-surround'
Plug 'ctrlpvim/ctrlp.vim'
Plug 'tpope/vim-endwise'
Plug 'tpope/vim-commentary'
Plug 'w0rp/ale'
Plug 'Raimondi/delimitMate'
Plug 'ngmy/vim-rubocop'
Plug 'tpope/vim-bundler'
Plug 'bogado/file-line'
Plug 'nathanaelkane/vim-indent-guides'
Plug 'SirVer/ultisnips'
Plug 'leafgarland/typescript-vim'
Plug 'vim-ruby/vim-ruby'
Plug 'tpope/vim-haml'
Plug 'kchmck/vim-coffee-script'
Plug 'majutsushi/tagbar'
Plug '/usr/local/opt/fzf'
Plug 'junegunn/fzf.vim'
Plug 'janko-m/vim-test'
Plug 'tpope/vim-dispatch'
Plug 'ntpeters/vim-better-whitespace'
Plug 'jiangmiao/auto-pairs'
Plug 'wellle/targets.vim'
Plug 'liuchengxu/vim-which-key'
Plug 'chr4/nginx.vim'
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
Plug 'othree/yajs.vim'
Plug 'lifepillar/vim-solarized8'
call plug#end() "set nocompatible
"filetype off


" filetype plugin indent on    " required
filetype plugin on
" *********************************************
" *               General config              *
" *********************************************
let mapleader=","
syntax on
set number
set noswapfile                                            " turn off swap file
set nobackup                                              " turn off backup file
set nowb
set showcmd
set autoread
set visualbell
set mouse=v
set encoding=UTF-8
set rtp+=/usr/local/opt/fzf
"Make backspace works like most program
set backspace=indent,eol,start
" Enable completion where available.
let g:ale_completion_enabled = 1
" ale (syntax checker)
let g:ale_lint_on_enter = 0
let g:ale_lint_on_save = 1
let g:ale_lint_on_text_changed = 'never'
let g:ycm_log_level = 'debug'

let g:ale_echo_msg_error_str = 'E'
let g:ale_echo_msg_warning_str = 'W'
let g:ale_echo_msg_format = '[%linter%] %s [%severity%]'
"Run Ruby code analyzer
let g:vimrubocop_keymap = 0
" loading the plugin
let g:webdevicons_enable = 1
" adding the flags to NERDTree
let g:webdevicons_enable_nerdtree = 1
map <leader><leader> :RuboCop<cr>
"" Running Rubocop with auto-correct
let g:vimrubocop_keymap = 0
map <leader>fr :w<CR> :RuboCop --auto-correct %<CR><leader>q
"Indentation
filetype plugin indent on    " required
set autoindent
set smartindent
set smarttab
set shiftwidth=2

set softtabstop=2
set tabstop=2
set expandtab
set pyxversion=2
" Nerdtree modifyable
set modifiable
set foldlevelstart=99

" sequest file complete
set wildmode=list:longest         " Complete files like a shell.
set wildmenu                      " Enhanced command line completion.
set wildignore=*.o,*.obj,*~       " Stuff to ignore when tab completing

" Run and compile C programming
noremap <leader>kc :w <CR> :!clear && gcc % <CR>
noremap <leader>rc :w <CR> :!clear && gcc % -o %< && ./%< <CR>

"most recently visted files fzf
nnoremap <silent> <Leader>p :Files<CR>
nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>ag :Ag <C-R><C-W><CR>

" cleanup whitespace and save
nnoremap <leader><CR> :StripWhitespace<CR> \| :w<CR>
" vim-which-key show key map
nnoremap <silent> <leader> :WhichKey '<Space>'<CR>

" --- Strip trailing whitespace ---
function! StripWhitespace ()
    let save_cursor = getpos(".")
    let old_query = getreg('/')
    :%s/\s\+$//e
    call setpos('.', save_cursor)
    call setreg('/', old_query)
endfunction

" Trailing white space (strip spaces)
noremap <leader>ss :call StripWhitespace()<CR>

" Insert mode completion fzf
imap <c-x><c-k> <plug>(fzf-complete-word)
imap <c-x><c-f> <plug>(fzf-complete-path)
imap <c-x><c-j> <plug>(fzf-complete-file-ag)
imap <c-x><c-l> <plug>(fzf-complete-line)
" vim-gitgutter
highlight clear SignColumn
let g:gitgutter_realtime = 0
let g:gitgutter_eager = 0

" rename current file
map <leader>n :call RenameFile()<cr>

"Nerdtree
map \ :NERDTreeToggle<CR>
map \| :NERDTreeFind<CR>
"Cursor setup
let &t_SI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=1\x7\<Esc>\\"
let &t_SR = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=2\x7\<Esc>\\"
let &t_EI = "\<Esc>Ptmux;\<Esc>\<Esc>]50;CursorShape=0\x7\<Esc>\\"

" vim-test
nmap <silent> <leader>rf :TestFile -strategy=basic<CR>
" nmap <silent> <leader>r :TestNearest -strategy=basic<CR>
nmap <silent> <leader>tn :TestNearest -strategy=basic<CR>
nmap <silent> <leader>A :TestSuite<CR>
nmap <silent> <leader>. :TestLast<CR>
nmap <silent> <leader>g :TestVisit<CR>
let test#strategy = "dispatch"

"" CompleteMe
"let g:ycm_key_list_previous_completion=['<Up>']

"" Ultisnips
let g:UltiSnipsExpandTrigger="<c-tab>"
let g:UltiSnipsListSnippets="<c-s-tab>"

" indentation

"Search
set incsearch                     " Find as  type search
set hlsearch                      " Highlight search terms
set ignorecase                    " Case-insensitive searching.
set smartcase                     " But case-sensitive if expression contains a capital letter.
highlight IncSearch guibg=green ctermbg=green term=underline
set tags=./tags

"Status bar
set laststatus=2                  " Show the status line all the time
if !has('gui_running')
  set t_Co=256
endif

" vim-haml
autocmd FileType haml setlocal foldmethod=indent


" Easier navigation between split windows

nnoremap <c-j> <c-w>j
nnoremap <c-k> <c-w>k
nnoremap <c-h> <c-w>h
nnoremap <c-l> <c-w>l

" Clear last search highlighting
nnoremap <Space> :noh<cr>

" Toggle Folding
nnoremap <leader>f za

" toggle between bash and vim
noremap <C-d> :sh<cr>

" cleanup whitespace and save
nnoremap <leader><CR> :StripWhitespace<CR> \| :w<CR>

" tagbar
nnoremap <silent> <Leader>? :TagbarToggle<CR>

" General Mapping
map ; :

function! RenameFile()
    let old_name = expand('%')
    let new_name = input('New file name: ', expand('%'), 'file')
    if new_name != '' && new_name != old_name
        exec ':saveas ' . new_name
        exec ':silent !rm ' . old_name
        redraw!
    endif
endfunction

" *********************************************
" *            Plugin configuration           *
" *********************************************
"Color Scheme
syntax enable
set background=dark
colorscheme solarized8

"Airline
let g:airline_powerline_fonts = 1
let g:airline#extensions#tagbar#enabled = 0

